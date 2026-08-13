const express = require("express");

const app = express();

const PORT = 3000;

// Home route
app.get("/", (req, res) => {
    res.send("Decision Journal API is running");
});

// API route
app.get("/api", (req, res) => {
    res.send("Welcome to Decision Journal API");
});

// Goals route
app.get("/api/goals", (req, res) => {

    const goals = [
        {
            id: 1,
            title: "Learn React"
        },
        {
            id: 2,
            title: "Learn Node.js"
        }
    ];

    res.json(goals);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});