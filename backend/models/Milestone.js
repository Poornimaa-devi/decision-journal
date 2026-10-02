const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: [true, "A linked goal is required"],
    },
    title: {
      type: String,
      required: [true, "Milestone title is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Milestone = mongoose.model("Milestone", milestoneSchema);

module.exports = Milestone;