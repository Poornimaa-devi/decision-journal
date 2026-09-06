const express = require("express");
const {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const validateGoal = require("../middleware/validateGoal");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/goals", authMiddleware, getAllGoals);
router.get("/api/goals/:id", authMiddleware, getGoalById);
router.post("/api/goals", authMiddleware, validateGoal, createGoal);
router.patch("/api/goals/:id", authMiddleware, validateGoal, updateGoal);
router.delete("/api/goals/:id", authMiddleware, deleteGoal);

module.exports = router;