const express = require("express");
const progressRoutes = require("./routes/progressRoutes");
const goalRoutes = require("./routes/goalRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = 3000;

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

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Basic error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});