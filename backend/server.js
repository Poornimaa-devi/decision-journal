const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

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
    {
        id: 3,
        title: "Finish portfolio project",
        deadline: "2026-09-20",
        priority: "high",
        progress: 25,
        completed: false,
    }
];

let nextId = 4;

function findGoalById(id) {
    const goalId = Number(id);
    return goals.find((goal) => goal.id === goalId);
}

function validateProgress(value) {
    const progress = Number(value);

    if (Number.isNaN(progress) || progress < 0 || progress > 100) {
        return null;
    }

    return progress;
}

// Home route
app.get("/", (req, res) => {
    res.send("Decision Journal API is running");
});

// API route
app.get("/api", (req, res) => {
    res.send("Welcome to Decision Journal API");
});

// GET /api/goals - read all goals (supports query filters)
app.get("/api/goals", (req, res) => {
    const { completed, priority } = req.query;
    let filteredGoals = [...goals];

    if (completed !== undefined) {
        const boolValue = completed === "true";
        filteredGoals = filteredGoals.filter((goal) => goal.completed === boolValue);
    }

    if (priority) {
        filteredGoals = filteredGoals.filter((goal) => goal.priority === priority);
    }

    res.json(filteredGoals);
});

// GET /api/goals/:id - read one goal
app.get("/api/goals/:id", (req, res) => {
    const goal = findGoalById(req.params.id);

    if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
    }

    res.json(goal);
});

// POST /api/goals - create a goal
app.post("/api/goals", (req, res) => {
    const { title, deadline, priority, progress } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ message: "Goal title is required" });
    }

    const safeProgress = validateProgress(progress ?? 0);

    if (safeProgress === null) {
        return res.status(400).json({ message: "Progress must be a number between 0 and 100" });
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

    res.status(201).json(newGoal);
});

// PATCH /api/goals/:id - update a goal
app.patch("/api/goals/:id", (req, res) => {
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

    if (deadline !== undefined) {
        goal.deadline = deadline;
    }

    if (priority !== undefined) {
        goal.priority = priority;
    }

    if (progress !== undefined) {
        const safeProgress = validateProgress(progress);

        if (safeProgress === null) {
            return res.status(400).json({ message: "Progress must be a number between 0 and 100" });
        }

        goal.progress = safeProgress;
    }

    if (completed !== undefined) {
        goal.completed = Boolean(completed);

        if (goal.completed && goal.progress < 100) {
            goal.progress = 100;
        }
    }

    goal.completed = goal.progress >= 100;

    res.json(goal);
});

// DELETE /api/goals/:id - delete a goal
app.delete("/api/goals/:id", (req, res) => {
    const goalIndex = goals.findIndex((goal) => goal.id === Number(req.params.id));

    if (goalIndex === -1) {
        return res.status(404).json({ message: "Goal not found" });
    }

    const deletedGoal = goals.splice(goalIndex, 1)[0];

    res.json({
        message: "Goal deleted successfully",
        goal: deletedGoal,
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});