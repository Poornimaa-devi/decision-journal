const Decision = require("../models/Decision");

async function getAllDecisions(req, res, next) {
  try {
    const decisions = await Decision.find();
    res.json(decisions);
  } catch (err) {
    next(err);
  }
}

async function getDecisionById(req, res, next) {
  try {
    const decision = await Decision.findById(req.params.id);
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
    const newDecision = await Decision.create(req.body);
    res.status(201).json(newDecision);
  } catch (err) {
    next(err);
  }
}

async function updateDecision(req, res, next) {
  try {
    const updatedDecision = await Decision.findByIdAndUpdate(
      req.params.id,
      req.body,
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
    const deletedDecision = await Decision.findByIdAndDelete(req.params.id);
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
  getDecisionById,
  createDecision,
  updateDecision,
  deleteDecision,
};