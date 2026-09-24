const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Decision title is required"],
      trim: true,
    },
    reasoning: {
      type: String,
      required: [true, "Reasoning is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "decided", "reviewing"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Decision = mongoose.model("Decision", decisionSchema);

module.exports = Decision;