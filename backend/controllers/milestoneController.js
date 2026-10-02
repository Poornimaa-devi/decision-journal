const Milestone = require("../models/Milestone");

async function getAllMilestones(req, res, next) {
  try {
    const milestones = await Milestone.find().populate("goal", "title");
    res.json(milestones);
  } catch (err) {
    next(err);
  }
}

async function getMilestonesByGoal(req, res, next) {
  try {
    const milestones = await Milestone.find({ goal: req.params.goalId }).sort({
      createdAt: 1,
    });
    res.json(milestones);
  } catch (err) {
    next(err);
  }
}

async function getMilestoneById(req, res, next) {
  try {
    const milestone = await Milestone.findById(req.params.id).populate("goal", "title");
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
    const newMilestone = await Milestone.create(req.body);
    await newMilestone.populate("goal", "title");
    res.status(201).json(newMilestone);
  } catch (err) {
    next(err);
  }
}

async function updateMilestone(req, res, next) {
  try {
    const updatedMilestone = await Milestone.findByIdAndUpdate(
      req.params.id,
      req.body,
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
    const deletedMilestone = await Milestone.findByIdAndDelete(req.params.id);
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