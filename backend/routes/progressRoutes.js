const express = require("express");
const {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/progressController");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/api/progress", authMiddleware, getAllProgress);
router.get("/api/progress/:id", authMiddleware, getProgressById);
router.post("/api/progress", authMiddleware, createProgress);
router.put("/api/progress/:id", authMiddleware, updateProgress);
router.delete("/api/progress/:id", authMiddleware, deleteProgress);

module.exports = router;