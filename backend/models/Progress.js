const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    goalId: {
      type: String,
      required: [true, "goalId is required"],
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
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;