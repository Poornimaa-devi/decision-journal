const Reflection = require("../models/Reflection");
const Goal = require("../models/Goals");
const Decision = require("../models/Decision");

async function getAllReflections(req, res, next) {
  try {
    const reflections = await Reflection.find({ user: req.user.userId })
      .populate("goal", "title")
      .populate("decision", "title");
    res.json(reflections);
  } catch (err) {
    next(err);
  }
}

async function createReflection(req, res, next) {
  try {
    const { targetType, goal, decision, content } = req.body;

    if (targetType === "Goal") {
      if (!goal) {
        return res
          .status(400)
          .json({ message: "goal is required when targetType is 'Goal'" });
      }
      const ownsGoal = await Goal.findOne({ _id: goal, user: req.user.userId });
      if (!ownsGoal) {
        return res.status(404).json({ message: "Goal not found" });
      }
    } else if (targetType === "Decision") {
      if (!decision) {
        return res
          .status(400)
          .json({ message: "decision is required when targetType is 'Decision'" });
      }
      const ownsDecision = await Decision.findOne({
        _id: decision,
        user: req.user.userId,
      });
      if (!ownsDecision) {
        return res.status(404).json({ message: "Decision not found" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "targetType must be 'Goal' or 'Decision'" });
    }

    const newReflection = await Reflection.create({
      targetType,
      goal: targetType === "Goal" ? goal : null,
      decision: targetType === "Decision" ? decision : null,
      content,
      user: req.user.userId,
    });

    await newReflection.populate("goal", "title");
    await newReflection.populate("decision", "title");
    res.status(201).json(newReflection);
  } catch (err) {
    next(err);
  }
}

async function updateReflection(req, res, next) {
  try {
    // Only the content of a reflection can be edited. Owner and target are fixed.
    const { user, targetType, goal, decision, ...updates } = req.body;

    const updatedReflection = await Reflection.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updates,
      { new: true, runValidators: true }
    )
      .populate("goal", "title")
      .populate("decision", "title");

    if (!updatedReflection) {
      return res.status(404).json({ message: "Reflection not found" });
    }
    res.json(updatedReflection);
  } catch (err) {
    next(err);
  }
}

async function deleteReflection(req, res, next) {
  try {
    const deletedReflection = await Reflection.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedReflection) {
      return res.status(404).json({ message: "Reflection not found" });
    }
    res.json({ message: "Reflection deleted", reflection: deletedReflection });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllReflections,
  createReflection,
  updateReflection,
  deleteReflection,
};