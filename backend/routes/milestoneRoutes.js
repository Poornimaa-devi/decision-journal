const express = require("express");
const {
  getAllMilestones,
  getMilestonesByGoal,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
} = require("../controllers/milestoneController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/milestones", authMiddleware, getAllMilestones);
router.get("/api/milestones/goal/:goalId", authMiddleware, getMilestonesByGoal);
router.get("/api/milestones/:id", authMiddleware, getMilestoneById);
router.post("/api/milestones", authMiddleware, createMilestone);
router.patch("/api/milestones/:id", authMiddleware, updateMilestone);
router.delete("/api/milestones/:id", authMiddleware, deleteMilestone);

module.exports = router;