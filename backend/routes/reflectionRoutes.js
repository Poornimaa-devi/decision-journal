const express = require("express");
const {
  getAllReflections,
  createReflection,
  updateReflection,
  deleteReflection,
} = require("../controllers/reflectionControllers");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/api/reflections", authMiddleware, getAllReflections);
router.post("/api/reflections", authMiddleware, createReflection);
router.patch("/api/reflections/:id", authMiddleware, updateReflection);
router.delete("/api/reflections/:id", authMiddleware, deleteReflection);

module.exports = router;