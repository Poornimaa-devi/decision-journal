require("dotenv").config();
const mongoose = require("mongoose");
const Goal = require("../models/Goal");
const Decision = require("../models/Decision");
const Progress = require("../models/Progress");
const Milestone = require("../models/Milestone");
const Reflection = require("../models/Reflection");

async function run() {
  const userId = process.argv[2];
  if (!userId) {
    console.error("Usage: node scripts/claimOrphans.js <userId>");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const models = { Goal, Decision, Progress, Milestone, Reflection };
  for (const [name, Model] of Object.entries(models)) {
    const result = await Model.updateMany(
      { user: { $exists: false } },
      { $set: { user: userId } }
    );
    console.log(`${name}: ${result.modifiedCount} updated`);
  }

  await mongoose.disconnect();
}

run();