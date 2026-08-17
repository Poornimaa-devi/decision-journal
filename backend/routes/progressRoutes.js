const express = require("express");
const {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/progressController");

const router = express.Router();

router.get("/api/progress", getAllProgress);
router.get("/api/progress/:id", getProgressById);
router.post("/api/progress", createProgress);
router.put("/api/progress/:id", updateProgress);
router.delete("/api/progress/:id", deleteProgress);

module.exports = router;