const express = require("express");
const {
  getAllReflections,
  createReflection,
  updateReflection,
  deleteReflection,
} = require("../controllers/reflectionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/reflections", authMiddleware, getAllReflections);
router.post("/api/reflections", authMiddleware, createReflection);
router.patch("/api/reflections/:id", authMiddleware, updateReflection);
router.delete("/api/reflections/:id", authMiddleware, deleteReflection);

module.exports = router;