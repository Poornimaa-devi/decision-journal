const express = require("express");
const { getNotifications } = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/notifications", authMiddleware, getNotifications);

module.exports = router;