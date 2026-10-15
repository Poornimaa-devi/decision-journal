const mongoose = require("mongoose");
const Decision = require("../models/Decision");

async function getAllDecisions(req, res, next) {
  try {
    const decisions = await Decision.find({ user: req.user.userId });
    res.json(decisions);
  } catch (err) {
    next(err);
  }
}

async function getDecisionAnalytics(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const byStatus = await Decision.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const overall = await Decision.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, totalDecisions: { $sum: 1 } } },
    ]);

    res.json({
      byStatus,
      overall: overall[0] || { totalDecisions: 0 },
    });
  } catch (err) {
    next(err);
  }
}

async function getDecisionById(req, res, next) {
  try {
    const decision = await Decision.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!decision) {
      return res.status(404).json({ message: "Decision not found" });
    }
    res.json(decision);
  } catch (err) {
    next(err);
  }
}

async function createDecision(req, res, next) {
  try {
    const { user, ...decisionData } = req.body; // any client-sent "user" is discarded
    const newDecision = await Decision.create({
      ...decisionData,
      user: req.user.userId,
    });
    res.status(201).json(newDecision);
  } catch (err) {
    next(err);
  }
}

async function updateDecision(req, res, next) {
  try {
    const { user, ...updates } = req.body;
    const updatedDecision = await Decision.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updates,
      { new: true, runValidators: true }
    );
    if (!updatedDecision) {
      return res.status(404).json({ message: "Decision not found" });
    }
    res.json(updatedDecision);
  } catch (err) {
    next(err);
  }
}

async function deleteDecision(req, res, next) {
  try {
    const deletedDecision = await Decision.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedDecision) {
      return res.status(404).json({ message: "Decision not found" });
    }
    res.json({ message: "Decision deleted", decision: deletedDecision });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllDecisions,
  getDecisionAnalytics,
  getDecisionById,
  createDecision,
  updateDecision,
  deleteDecision,
};