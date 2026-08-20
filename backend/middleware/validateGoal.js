function validateGoal(req, res, next) {
  const { title, priority, progress, completed } = req.body;

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ message: "Goal title cannot be empty" });
  }

  if (priority !== undefined && !["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium, or high",
    });
  }

  if (progress !== undefined) {
    const numericProgress = Number(progress);

    if (Number.isNaN(numericProgress) || numericProgress < 0 || numericProgress > 100) {
      return res.status(400).json({
        message: "Progress must be a number between 0 and 100",
      });
    }
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ message: "Completed must be a boolean" });
  }

  next();
}

module.exports = validateGoal;