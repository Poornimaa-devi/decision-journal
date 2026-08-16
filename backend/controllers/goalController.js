let goals = [
  {
    id: 1,
    title: "Learn React",
    deadline: "2026-09-01",
    priority: "high",
    progress: 100,
    completed: true,
  },
  {
    id: 2,
    title: "Build Node.js API",
    deadline: "2026-09-10",
    priority: "medium",
    progress: 60,
    completed: false,
  },
];

let nextId = 3;

function findGoalById(id) {
  return goals.find((goal) => goal.id === Number(id));
}

function validateProgress(value) {
  const progress = Number(value);

  if (Number.isNaN(progress) || progress < 0 || progress > 100) {
    return null;
  }

  return progress;
}

function getAllGoals(req, res) {
  const { completed, priority } = req.query;

  let filteredGoals = [...goals];

  if (completed !== undefined) {
    filteredGoals = filteredGoals.filter(
      (goal) => goal.completed === (completed === "true")
    );
  }

  if (priority) {
    filteredGoals = filteredGoals.filter((goal) => goal.priority === priority);
  }

  res.json(filteredGoals);
}

function getGoalById(req, res) {
  const goal = findGoalById(req.params.id);

  if (!goal) {
    return res.status(404).json({ message: "Goal not found" });
  }

  res.json(goal);
}

function createGoal(req, res) {
  const { title, deadline, priority, progress } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ message: "Goal title is required" });
  }

  const safeProgress = validateProgress(progress ?? 0);

  if (safeProgress === null) {
    return res.status(400).json({
      message: "Progress must be a number between 0 and 100",
    });
  }

  const newGoal = {
    id: nextId,
    title: title.trim(),
    deadline: deadline || "",
    priority: priority || "medium",
    progress: safeProgress,
    completed: safeProgress >= 100,
  };

  goals.push(newGoal);
  nextId += 1;

  return res.status(201).json(newGoal);
}

function updateGoal(req, res) {
  const goal = findGoalById(req.params.id);

  if (!goal) {
    return res.status(404).json({ message: "Goal not found" });
  }

  const { title, deadline, priority, progress, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "Goal title cannot be empty" });
    }
    goal.title = title.trim();
  }

  if (deadline !== undefined) goal.deadline = deadline;
  if (priority !== undefined) goal.priority = priority;

  if (progress !== undefined) {
    const safeProgress = validateProgress(progress);

    if (safeProgress === null) {
      return res.status(400).json({
        message: "Progress must be a number between 0 and 100",
      });
    }

    goal.progress = safeProgress;
  }

  if (completed !== undefined) {
    goal.completed = Boolean(completed);
  }

  goal.completed = goal.progress >= 100;

  return res.json(goal);
}

function deleteGoal(req, res) {
  const goalIndex = goals.findIndex(
    (goal) => goal.id === Number(req.params.id)
  );

  if (goalIndex === -1) {
    return res.status(404).json({ message: "Goal not found" });
  }

  const deletedGoal = goals.splice(goalIndex, 1)[0];

  return res.json({
    message: "Goal deleted successfully",
    goal: deletedGoal,
  });
}

module.exports = {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
};