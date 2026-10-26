const express = require("express");
const {
  getAllDecisions,
  getDecisionById,
  createDecision,
  updateDecision,
  deleteDecision,
  getDecisionAnalytics,
} = require("../controllers/decisionController");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

// Specific route first, so "analytics" is not treated as an :id
router.get("/api/decisions", authMiddleware, getAllDecisions);
router.get("/api/decisions/analytics", authMiddleware, getDecisionAnalytics);
router.get("/api/decisions/:id", authMiddleware, getDecisionById);
router.post("/api/decisions", authMiddleware, createDecision);
router.patch("/api/decisions/:id", authMiddleware, updateDecision);
router.delete("/api/decisions/:id", authMiddleware, deleteDecision);

module.exports = router;
