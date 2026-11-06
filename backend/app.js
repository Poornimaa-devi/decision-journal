const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { apiLimiter, authLimiter } = require("./middleware/rateLimiters");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const progressRoutes = require("./routes/progressRoutes");
const goalRoutes = require("./routes/goalRoutes");
const authRoutes = require("./routes/authRoutes");
const decisionRoutes = require("./routes/decisionRoutes");
const milestoneRoutes = require("./routes/milestoneRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reflectionRoutes = require("./routes/reflectionRoutes");

const app = express();

// Behind a proxy (Render, Railway...) set TRUST_PROXY=1 so rate limiting sees the real client IP.
if (process.env.TRUST_PROXY === "1") app.set("trust proxy", 1);

// Secure HTTP headers (also removes "X-Powered-By: Express").
// "cross-origin" is needed because the React app (another origin) reads this API's responses.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Only the frontend addresses listed in CLIENT_ORIGIN may call this API from a browser.
const allowedOrigins = (
  process.env.CLIENT_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins }));

// Rate limits (switched off while running the automated tests).
if (process.env.NODE_ENV !== "test") {
  app.use("/api", apiLimiter());
  app.use("/api/auth", authLimiter());
}

app.use(express.json({ limit: "10kb" }));
app.use(logger);
app.use(decisionRoutes);
app.use(milestoneRoutes);
app.use(reflectionRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("Decision Journal API is running");
});

app.get("/api", (req, res) => {
  res.send("Welcome to Decision Journal API");
});

app.use(progressRoutes);
app.use(goalRoutes);
app.use(authRoutes);

// A deliberate crash used while learning error handling. Never exposed in production.
if (process.env.NODE_ENV !== "production") {
  app.get("/api/test-error", () => {
    throw new Error("Test error");
  });
}

app.use(notificationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;