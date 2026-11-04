// The question this file answers: can one user see or change another user's data?
// Two users (Alice and Bob). Alice owns one of everything. Bob must get nothing.
const Goal = require("../models/Goals");
const Decision = require("../models/Decision");
const { connectTestDb, clearTestDb, closeTestDb, createUser, as, seedFor } = require("./helpers");

let alice, bob, a; // a = Alice's seeded records

beforeAll(connectTestDb);
afterAll(closeTestDb);
beforeEach(async () => {
  await clearTestDb();
  alice = await createUser("alice@example.com");
  bob = await createUser("bob@example.com");
  a = await seedFor(alice);
});

const lists = ["goals", "decisions", "progress", "milestones", "reflections"];
const withGetById = ["goals", "decisions", "progress", "milestones"]; // reflections have no GET /:id

// one record id and one harmless edit per resource
const target = () => ({
  goals: { id: a.goal._id, edit: { title: "HACKED" } },
  decisions: { id: a.decision._id, edit: { title: "HACKED" } },
  progress: { id: a.progress._id, edit: { note: "HACKED" } },
  milestones: { id: a.milestone._id, edit: { title: "HACKED" } },
  reflections: { id: a.reflection._id, edit: { content: "HACKED" } },
});

describe("sanity check: the owner can see her own data", () => {
  it.each(lists)("Alice sees her %s", async (resource) => {
    const res = await as(alice).get(`/api/${resource}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});

describe("reading", () => {
  it.each(lists)("Bob's list of %s is empty", async (resource) => {
    const res = await as(bob).get(`/api/${resource}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it.each(withGetById)("Bob cannot fetch Alice's %s by id (404, the same as 'does not exist')", async (resource) => {
    const res = await as(bob).get(`/api/${resource}/${target()[resource].id}`);
    expect(res.status).toBe(404);
  });

  it("Bob sees no progress entries or milestones for Alice's goal", async () => {
    expect((await as(bob).get(`/api/progress/goal/${a.goal._id}`)).body).toEqual([]);
    expect((await as(bob).get(`/api/milestones/goal/${a.goal._id}`)).body).toEqual([]);
  });
});

describe("changing and deleting", () => {
  it.each(lists)("Bob cannot edit Alice's %s, and it stays untouched", async (resource) => {
    const { id, edit } = target()[resource];
    const res = await as(bob).patch(`/api/${resource}/${id}`, edit);

    expect(res.status).toBe(404);
    const aliceSees = await as(alice).get(`/api/${resource}`);
    expect(JSON.stringify(aliceSees.body)).not.toContain("HACKED");
  });

  it.each(lists)("Bob cannot delete Alice's %s, and it is still there", async (resource) => {
    const res = await as(bob).delete(`/api/${resource}/${target()[resource].id}`);

    expect(res.status).toBe(404);
    expect((await as(alice).get(`/api/${resource}`)).body).toHaveLength(1);
  });
});

describe("attaching things to someone else's records", () => {
  it("Bob cannot add progress to Alice's goal", async () => {
    const res = await as(bob).post("/api/progress", { goal: a.goal._id, value: 99 });
    expect(res.status).toBe(404);
    expect((await as(alice).get(`/api/progress/goal/${a.goal._id}`)).body).toHaveLength(1);
  });

  it("Bob cannot add a milestone to Alice's goal", async () => {
    const res = await as(bob).post("/api/milestones", { goal: a.goal._id, title: "Sneaky" });
    expect(res.status).toBe(404);
  });

  it("Bob cannot reflect on Alice's goal or decision", async () => {
    const onGoal = await as(bob).post("/api/reflections", { targetType: "Goal", goal: a.goal._id, content: "x" });
    const onDecision = await as(bob).post("/api/reflections", { targetType: "Decision", decision: a.decision._id, content: "x" });
    expect(onGoal.status).toBe(404);
    expect(onDecision.status).toBe(404);
  });

  it("Bob cannot link his goal to Alice's decision (on create or on update)", async () => {
    const created = await as(bob).post("/api/goals", { title: "Mine", decision: a.decision._id });
    expect(created.status).toBe(404);

    const own = (await as(bob).post("/api/goals", { title: "Mine" })).body;
    const updated = await as(bob).patch(`/api/goals/${own._id}`, { decision: a.decision._id });
    expect(updated.status).toBe(404);
  });

  it("nothing leaked into Bob's account from those attempts", async () => {
    await as(bob).post("/api/progress", { goal: a.goal._id, value: 99 });
    await as(bob).post("/api/milestones", { goal: a.goal._id, title: "Sneaky" });
    for (const resource of lists) {
      expect((await as(bob).get(`/api/${resource}`)).body).toEqual([]);
    }
  });
});

describe("the owner always comes from the token, never from the request body", () => {
  it("a goal created by Bob with user=Alice is stored as Bob's", async () => {
    const res = await as(bob).post("/api/goals", { title: "Planted", user: alice.id });

    expect(res.status).toBe(201);
    expect(String((await Goal.findById(res.body._id)).user)).toBe(bob.id);
    expect(await as(alice).get("/api/goals").then((r) => r.body.map((g) => g.title))).not.toContain("Planted");
  });

  it("a decision created by Bob with user=Alice is stored as Bob's", async () => {
    const res = await as(bob).post("/api/decisions", { title: "Planted", reasoning: "r", user: alice.id });

    expect(res.status).toBe(201);
    expect(String((await Decision.findById(res.body._id)).user)).toBe(bob.id);
    expect((await as(alice).get("/api/decisions")).body).toHaveLength(1); // only her original one
    expect((await as(bob).get("/api/decisions")).body).toHaveLength(1);
  });

  it("Alice cannot hand her goal to Bob with PATCH {user}", async () => {
    await as(alice).patch(`/api/goals/${a.goal._id}`, { user: bob.id });

    expect((await as(alice).get("/api/goals")).body).toHaveLength(1);
    expect((await as(bob).get("/api/goals")).body).toEqual([]);
  });

  it("a progress entry cannot be re-parented to another goal with PATCH {goal}", async () => {
    const other = (await as(alice).post("/api/goals", { title: "Other goal" })).body;
    const res = await as(alice).patch(`/api/progress/${a.progress._id}`, { goal: other._id, note: "moved?" });

    expect(res.status).toBe(200);
    expect(res.body.note).toBe("moved?");
    expect(res.body.goal._id).toBe(a.goal._id); // still the original goal
  });

  it("a reflection's target cannot be changed with PATCH", async () => {
    const res = await as(alice).patch(`/api/reflections/${a.reflection._id}`, {
      targetType: "Decision", decision: a.decision._id, content: "edited",
    });

    expect(res.status).toBe(200);
    expect(res.body.content).toBe("edited");
    expect(res.body.targetType).toBe("Goal");
    expect(res.body.decision).toBeNull();
  });
});

describe("computed endpoints only count your own data", () => {
  it("goal analytics: Alice sees her goal, Bob sees zeros", async () => {
    const alicesStats = (await as(alice).get("/api/goals/analytics")).body;
    const bobsStats = (await as(bob).get("/api/goals/analytics")).body;

    expect(alicesStats.overall.totalGoals).toBe(1);
    expect(bobsStats.overall).toEqual({ totalGoals: 0, completedGoals: 0 });
    expect(bobsStats.byPriority).toEqual([]);
  });

  it("decision analytics: Alice sees her decision, Bob sees zeros", async () => {
    const alicesStats = (await as(alice).get("/api/decisions/analytics")).body;
    const bobsStats = (await as(bob).get("/api/decisions/analytics")).body;

    expect(alicesStats.overall.totalDecisions).toBe(1);
    expect(bobsStats.overall).toEqual({ totalDecisions: 0 });
    expect(bobsStats.byStatus).toEqual([]);
  });

  it("notifications: Alice has some (days=0), Bob has none", async () => {
    await new Promise((r) => setTimeout(r, 10)); // make sure the records are older than "now"
    const alices = (await as(alice).get("/api/notifications?days=0")).body;
    const bobs = (await as(bob).get("/api/notifications?days=0")).body;

    expect(alices.count).toBeGreaterThan(0);
    expect(bobs).toEqual({ count: 0, notifications: [] });
  });

  it("/api/users/me returns the caller's own account", async () => {
    expect((await as(alice).get("/api/users/me")).body.email).toBe("alice@example.com");
    expect((await as(bob).get("/api/users/me")).body.email).toBe("bob@example.com");
  });
});