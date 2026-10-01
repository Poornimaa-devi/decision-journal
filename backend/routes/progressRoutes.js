const express = require("express");
const {
  getAllProgress,
  getProgressByGoal,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/progress", authMiddleware, getAllProgress);
router.get("/api/progress/goal/:goalId", authMiddleware, getProgressByGoal);
router.get("/api/progress/:id", authMiddleware, getProgressById);
router.post("/api/progress", authMiddleware, createProgress);
router.patch("/api/progress/:id", authMiddleware, updateProgress);
router.delete("/api/progress/:id", authMiddleware, deleteProgress);

module.exports = router;