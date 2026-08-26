const Goal = require("../models/Goals");

async function getAllGoals(req, res, next) {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    next(err);
  }
}

async function getGoalById(req, res, next) {
  try {
    const goal = await Goal.findById(req.params.id);
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
    const newGoal = await Goal.create(req.body);
    res.status(201).json(newGoal);
  } catch (err) {
    next(err);
  }
}

async function updateGoal(req, res, next) {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json({ message: "Goal deleted", goal: deletedGoal });
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
};