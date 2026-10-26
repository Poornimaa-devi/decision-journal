// One-off migration: give every ownerless document to one user.
// Usage (from the backend folder):  node scripts/claimOrphans.js <your user _id>
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/Users");
const Goal = require("../models/Goals");
const Decision = require("../models/Decision");
const Progress = require("../models/Progress");
const Milestone = require("../models/Milestone");
const Reflection = require("../models/Reflection");

async function run() {
  const userId = process.argv[2];
  if (!userId || !mongoose.isValidObjectId(userId)) {
    console.error("Usage: node scripts/claimOrphans.js <userId>  (the 24-character _id from GET /api/users/me)");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  const owner = new mongoose.Types.ObjectId(userId);

  if (!(await User.exists({ _id: owner }))) {
    console.error("No user found with that _id. Nothing was changed.");
    await mongoose.disconnect();
    process.exit(1);
  }

  const orphan = { $or: [{ user: { $exists: false } }, { user: null }] };
  const models = { Goal, Decision, Progress, Milestone, Reflection };

  for (const [name, Model] of Object.entries(models)) {
    const found = await Model.countDocuments(orphan);
    const result = await Model.updateMany(orphan, { $set: { user: owner } });
    console.log(`${name}: ${found} ownerless found, ${result.modifiedCount} assigned`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
