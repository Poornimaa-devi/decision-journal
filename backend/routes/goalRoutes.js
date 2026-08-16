const express = require("express");
const {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const router = express.Router();

router.get("/api/goals", getAllGoals);
router.get("/api/goals/:id", getGoalById);
router.post("/api/goals", createGoal);
router.patch("/api/goals/:id", updateGoal);
router.delete("/api/goals/:id", deleteGoal);

module.exports = router;