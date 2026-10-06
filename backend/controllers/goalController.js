const Goal = require("../models/Goals");

async function getAllGoals(req, res, next) {
  try {
    const { search, priority, completed, sort } = req.query;

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (priority) {
      filter.priority = priority;
    }
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

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
    await newGoal.populate("decision", "title");
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
    }).populate("decision", "title");

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