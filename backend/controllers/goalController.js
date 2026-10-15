const mongoose = require("mongoose");
const Goal = require("../models/Goals");
const Decision = require("../models/Decision");

async function getAllGoals(req, res, next) {
  try {
    const { search, priority, completed, sort } = req.query;

    const filter = { user: req.user.userId };
    if (search) filter.title = { $regex: search, $options: "i" };
    if (priority) filter.priority = priority;
    if (completed !== undefined) filter.completed = completed === "true";

    const sortOptions = {
      progress: "progress",
      newest: "-createdAt",
      oldest: "createdAt",
    };
    const sortBy = sortOptions[sort] || "-createdAt";

    const goals = await Goal.find(filter).sort(sortBy).populate("decision", "title");
    res.json(goals);
  } catch (err) {
    next(err);
  }
}

async function getGoalById(req, res, next) {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }).populate("decision", "title");

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json(goal);
  } catch (err) {
    next(err);
  }
}

async function createGoal(req, res, next) {
  try {
    const { user, ...goalData } = req.body; // any client-sent "user" is discarded

    if (goalData.decision) {
      const ownsDecision = await Decision.findOne({
        _id: goalData.decision,
        user: req.user.userId,
      });
      if (!ownsDecision) {
        return res.status(404).json({ message: "Decision not found" });
      }
    }

    const newGoal = await Goal.create({ ...goalData, user: req.user.userId });
    await newGoal.populate("decision", "title");
    res.status(201).json(newGoal);
  } catch (err) {
    next(err);
  }
}

async function updateGoal(req, res, next) {
  try {
    const { user, ...updates } = req.body;

    if (updates.decision) {
      const ownsDecision = await Decision.findOne({
        _id: updates.decision,
        user: req.user.userId,
      });
      if (!ownsDecision) {
        return res.status(404).json({ message: "Decision not found" });
      }
    }

    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updates,
      { new: true, runValidators: true }
    ).populate("decision", "title");

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json(updatedGoal);
  } catch (err) {
    next(err);
  }
}

async function deleteGoal(req, res, next) {
  try {
    const deletedGoal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json({ message: "Goal deleted", goal: deletedGoal });
  } catch (err) {
    next(err);
  }
}

async function getGoalAnalytics(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const byPriority = await Goal.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
          avgProgress: { $avg: "$progress" },
        },
      },
    ]);

    const overall = await Goal.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          totalGoals: { $sum: 1 },
          completedGoals: { $sum: { $cond: ["$completed", 1, 0] } },
        },
      },
    ]);

    res.json({
      byPriority,
      overall: overall[0] || { totalGoals: 0, completedGoals: 0 },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
  getGoalAnalytics,
};