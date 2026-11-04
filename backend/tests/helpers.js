const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app"); // loading the app also registers every Mongoose model

// Each test file gets its own database on the shared in-memory server.
async function connectTestDb() {
  const dbName = `dj_test_${process.pid}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  await mongoose.connect(process.env.MONGO_TEST_URI, { dbName });
  // Make sure unique indexes (e.g. User.email) exist before any test runs.
  await Promise.all(Object.values(mongoose.models).map((model) => model.init()));
}

async function clearTestDb() {
  for (const collection of Object.values(mongoose.connection.collections)) {
    await collection.deleteMany({});
  }
}

async function closeTestDb() {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}

// Signs a user up, logs them in, and returns what tests need.
async function createUser(email = "user@example.com", password = "secret123") {
  await request(app).post("/api/auth/signup").send({ email, password }).expect(201);
  const login = await request(app).post("/api/auth/login").send({ email, password }).expect(200);
  return { email, password, token: login.body.token, id: login.body.user.id };
}

// as(user).get("/api/goals")  ->  a supertest request that is logged in as `user`
function as(user) {
  const call = (method) => (path, body) => {
    const req = request(app)[method](path).set("Authorization", `Bearer ${user.token}`);
    return body === undefined ? req : req.send(body);
  };
  return { get: call("get"), post: call("post"), patch: call("patch"), delete: call("delete") };
}

// One of everything, owned by `user`. Used by the ownership tests.
async function seedFor(user) {
  const api = as(user);
  const decision = (await api.post("/api/decisions", { title: "Decision", reasoning: "Because" }).expect(201)).body;
  const goal = (await api.post("/api/goals", { title: "Goal", priority: "high", decision: decision._id }).expect(201)).body;
  const progress = (await api.post("/api/progress", { goal: goal._id, value: 40, note: "note" }).expect(201)).body;
  const milestone = (await api.post("/api/milestones", { goal: goal._id, title: "Milestone" }).expect(201)).body;
  const reflection = (await api.post("/api/reflections", { targetType: "Goal", goal: goal._id, content: "Reflection" }).expect(201)).body;
  return { decision, goal, progress, milestone, reflection };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

module.exports = { app, connectTestDb, clearTestDb, closeTestDb, createUser, as, seedFor, sleep, daysAgo };