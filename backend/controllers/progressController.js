const Progress = require("../models/Progress");

async function getAllProgress(req, res, next) {
  try {
    const progressList = await Progress.find();
    res.json(progressList);
  } catch (err) {
    next(err);
  }
}

async function getProgressById(req, res, next) {
  try {
    const progress = await Progress.findById(req.params.id);
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
    const newProgress = await Progress.create(req.body);
    res.status(201).json(newProgress);
  } catch (err) {
    next(err);
  }
}

async function updateProgress(req, res, next) {
  try {
    const updatedProgress = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
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
    const deletedProgress = await Progress.findByIdAndDelete(req.params.id);
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
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
};