const express = require("express");
const {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const validateGoal = require("../middleware/validateGoal");

const router = express.Router();

router.get("/api/goals", getAllGoals);
router.get("/api/goals/:id", getGoalById);
router.post("/api/goals", validateGoal, createGoal);
router.patch("/api/goals/:id", validateGoal, updateGoal);
router.delete("/api/goals/:id", deleteGoal);

module.exports = router;