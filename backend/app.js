const express = require("express");
const progressRoutes = require("./routes/progressRoutes");
const goalRoutes = require("./routes/goalRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Decision Journal API is running");
});

app.get("/api", (req, res) => {
  res.send("Welcome to Decision Journal API");
});

app.use(progressRoutes);
app.use(goalRoutes);

app.get("/api/test-error", (req, res) => {
  throw new Error("Test error");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;