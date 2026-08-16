const express = require("express");
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

app.use(goalRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});