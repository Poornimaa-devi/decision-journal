const Progress = require("../models/Progress");
const Goal = require("../models/Goals");

async function getAllProgress(req, res, next) {
  try {
    const progressList = await Progress.find({ user: req.user.userId }).populate(
      "goal",
      "title"
    );
    res.json(progressList);
  } catch (err) {
    next(err);
  }
}

async function getProgressByGoal(req, res, next) {
  try {
    const progressList = await Progress.find({
      goal: req.params.goalId,
      user: req.user.userId,
    }).sort({ createdAt: -1 });
    res.json(progressList);
  } catch (err) {
    next(err);
  }
}

async function getProgressById(req, res, next) {
  try {
    const progress = await Progress.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }).populate("goal", "title");
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.json(progress);
  } catch (err) {
    next(err);
  }
}

async function createProgress(req, res, next) {
  try {
    const { user, ...data } = req.body;

    if (!data.goal) {
      return res.status(400).json({ message: "goal is required" });
    }

    const ownsGoal = await Goal.findOne({
      _id: data.goal,
      user: req.user.userId,
    });
    if (!ownsGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    const newProgress = await Progress.create({
      ...data,
      user: req.user.userId,
    });
    await newProgress.populate("goal", "title");
    res.status(201).json(newProgress);
  } catch (err) {
    next(err);
  }
}

async function updateProgress(req, res, next) {
  try {
    // user and goal can't be changed through an update
    const { user, goal, ...updates } = req.body;

    const updatedProgress = await Progress.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updates,
      { new: true, runValidators: true }
    ).populate("goal", "title");

    if (!updatedProgress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.json(updatedProgress);
  } catch (err) {
    next(err);
  }
}

async function deleteProgress(req, res, next) {
  try {
    const deletedProgress = await Progress.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedProgress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.json({ message: "Progress deleted", progress: deletedProgress });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllProgress,
  getProgressByGoal,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
};