const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: [true, "A linked goal is required"],
    },
    value: {
      type: Number,
      required: [true, "Progress value is required"],
      min: 0,
      max: 100,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
      index: true,
    },
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;