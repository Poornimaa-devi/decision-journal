const Milestone = require("../models/Milestone");
const Goal = require("../models/Goals");

async function getAllMilestones(req, res, next) {
  try {
    const milestones = await Milestone.find({ user: req.user.userId }).populate(
      "goal",
      "title"
    );
    res.json(milestones);
  } catch (err) {
    next(err);
  }
}

async function getMilestonesByGoal(req, res, next) {
  try {
    const milestones = await Milestone.find({
      goal: req.params.goalId,
      user: req.user.userId,
    }).sort({ createdAt: 1 });
    res.json(milestones);
  } catch (err) {
    next(err);
  }
}

async function getMilestoneById(req, res, next) {
  try {
    const milestone = await Milestone.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }).populate("goal", "title");
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.json(milestone);
  } catch (err) {
    next(err);
  }
}

async function createMilestone(req, res, next) {
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

    const newMilestone = await Milestone.create({
      ...data,
      user: req.user.userId,
    });
    await newMilestone.populate("goal", "title");
    res.status(201).json(newMilestone);
  } catch (err) {
    next(err);
  }
}

async function updateMilestone(req, res, next) {
  try {
    // user and goal can't be changed through an update
    const { user, goal, ...updates } = req.body;

    const updatedMilestone = await Milestone.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updates,
      { new: true, runValidators: true }
    ).populate("goal", "title");

    if (!updatedMilestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.json(updatedMilestone);
  } catch (err) {
    next(err);
  }
}

async function deleteMilestone(req, res, next) {
  try {
    const deletedMilestone = await Milestone.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedMilestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.json({ message: "Milestone deleted", milestone: deletedMilestone });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllMilestones,
  getMilestonesByGoal,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
};