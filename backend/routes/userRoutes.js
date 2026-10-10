const express = require("express");
const { getMe, updateMe } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/users/me", authMiddleware, getMe);
router.patch("/api/users/me", authMiddleware, updateMe);

module.exports = router;