const express = require("express");
const {
  getAllDecisions,
  getDecisionById,
  createDecision,
  updateDecision,
  deleteDecision,
} = require("../controllers/decisionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/decisions", authMiddleware, getAllDecisions);
router.get("/api/decisions/:id", authMiddleware, getDecisionById);
router.post("/api/decisions", authMiddleware, createDecision);
router.patch("/api/decisions/:id", authMiddleware, updateDecision);
router.delete("/api/decisions/:id", authMiddleware, deleteDecision);

module.exports = router;