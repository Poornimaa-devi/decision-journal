const request = require("supertest");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const { app, connectTestDb, clearTestDb, closeTestDb, createUser } = require("./helpers");

beforeAll(connectTestDb);
afterEach(clearTestDb);
afterAll(closeTestDb);

describe("POST /api/auth/signup", () => {
  it("creates an account and never returns the password", async () => {
    const res = await request(app).post("/api/auth/signup").send({ email: "a@example.com", password: "secret123" });

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe("a@example.com");
    expect(res.body.user.id).toBeDefined();
    expect(JSON.stringify(res.body)).not.toMatch(/password|secret123/i);
  });

  it("stores a bcrypt hash, never the plain password", async () => {
    await request(app).post("/api/auth/signup").send({ email: "a@example.com", password: "secret123" });

    const saved = await User.findOne({ email: "a@example.com" });
    expect(saved.password).not.toBe("secret123");
    expect(saved.password).toMatch(/^\$2[aby]\$10\$/); // bcrypt, 10 salt rounds
  });

  it("rejects a duplicate email with 409", async () => {
    await createUser("a@example.com");
    const res = await request(app).post("/api/auth/signup").send({ email: "a@example.com", password: "secret123" });

    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it("treats emails as case-insensitive (A@x.com and a@x.com are the same account)", async () => {
    await createUser("same@example.com");
    const res = await request(app).post("/api/auth/signup").send({ email: "SAME@Example.com", password: "secret123" });

    expect(res.status).toBe(409);
    expect(await User.countDocuments()).toBe(1);
  });

  it("rejects missing fields with 400", async () => {
    expect((await request(app).post("/api/auth/signup").send({ email: "a@example.com" })).status).toBe(400);
    expect((await request(app).post("/api/auth/signup").send({ password: "secret123" })).status).toBe(400);
    expect((await request(app).post("/api/auth/signup").send({})).status).toBe(400);
  });

  it("rejects a too-short password with 400 and a field-level message", async () => {
    const res = await request(app).post("/api/auth/signup").send({ email: "a@example.com", password: "123" });

    expect(res.status).toBe(400);
    expect(res.body.errors.password).toMatch(/at least 6/i);
    expect(await User.countDocuments()).toBe(0);
  });

  it.todo("rejects malformed email addresses (the backend has no format validation yet; only the frontend checks)");
});

describe("POST /api/auth/login", () => {
  it("returns a token that carries the user id and expires in one day", async () => {
    const user = await createUser("a@example.com");
    const payload = jwt.verify(user.token, process.env.JWT_SECRET);

    expect(payload.userId).toBe(user.id);
    expect(payload.email).toBe("a@example.com");
    expect(payload.exp - payload.iat).toBe(24 * 60 * 60);
  });

  it("gives the same 401 message for a wrong password and an unknown email (no user enumeration)", async () => {
    await createUser("a@example.com", "secret123");

    const wrongPassword = await request(app).post("/api/auth/login").send({ email: "a@example.com", password: "nope-nope" });
    const unknownEmail = await request(app).post("/api/auth/login").send({ email: "ghost@example.com", password: "secret123" });

    expect(wrongPassword.status).toBe(401);
    expect(unknownEmail.status).toBe(401);
    expect(wrongPassword.body.message).toBe("Invalid email or password");
    expect(unknownEmail.body).toEqual(wrongPassword.body);
  });

  it("rejects missing fields with 400", async () => {
    expect((await request(app).post("/api/auth/login").send({ email: "a@example.com" })).status).toBe(400);
  });
});

describe("authentication on protected routes", () => {
  const protectedRoutes = [
    "/api/goals", "/api/goals/analytics", "/api/decisions", "/api/decisions/analytics",
    "/api/progress", "/api/milestones", "/api/reflections", "/api/notifications", "/api/users/me",
  ];

  it.each(protectedRoutes)("GET %s without a token returns 401", async (route) => {
    const res = await request(app).get(route);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("rejects a header that is not 'Bearer <token>'", async () => {
    const res = await request(app).get("/api/goals").set("Authorization", "Token abc");
    expect(res.status).toBe(401);
  });

  it("rejects a garbage token", async () => {
    const res = await request(app).get("/api/goals").set("Authorization", "Bearer not.a.token");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid or expired token");
  });

  it("rejects a token signed with a different secret", async () => {
    const forged = jwt.sign({ userId: "507f1f77bcf86cd799439011" }, "some-other-secret");
    const res = await request(app).get("/api/goals").set("Authorization", `Bearer ${forged}`);
    expect(res.status).toBe(401);
  });

  it("rejects an expired token", async () => {
    const expired = jwt.sign({ userId: "507f1f77bcf86cd799439011" }, process.env.JWT_SECRET, { expiresIn: -10 });
    const res = await request(app).get("/api/goals").set("Authorization", `Bearer ${expired}`);
    expect(res.status).toBe(401);
  });

  it("accepts a valid token", async () => {
    const user = await createUser("a@example.com");
    const res = await request(app).get("/api/goals").set("Authorization", `Bearer ${user.token}`);
    expect(res.status).toBe(200);
  });
});

describe("general behaviour", () => {
  it("returns a JSON 404 for unknown routes", async () => {
    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Route not found");
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await request(app).post("/api/auth/login").set("Content-Type", "application/json").send("{bad json");
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Request body is not valid JSON");
  });
});