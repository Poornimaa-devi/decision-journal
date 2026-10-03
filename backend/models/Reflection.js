const mongoose = require("mongoose");

const reflectionSchema = new mongoose.Schema(
  {
    targetType: {
      type: String,
      enum: ["Goal", "Decision"],
      required: [true, "targetType is required"],
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      default: null,
    },
    decision: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Decision",
      default: null,
    },
    content: {
      type: String,
      required: [true, "Reflection content is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Reflection = mongoose.model("Reflection", reflectionSchema);

module.exports = Reflection;