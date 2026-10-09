import { useState, useEffect } from "react";
import Header from "../components/Header";
import GoalForm from "../components/GoalForm";
import Dashboard from "../components/Dashboard";
import Analytics from "../components/Analytics";
import { TEMP_TOKEN } from "../config";


function App() {
  const [goals, setGoals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  async function fetchGoals() {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (priorityFilter) params.append("priority", priorityFilter);
      if (sortBy) params.append("sort", sortBy);

      const url = `http://localhost:3000/api/goals?${params.toString()}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${TEMP_TOKEN}` },
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      const data = await response.json();
      setGoals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  fetchGoals();
}, [searchTerm, priorityFilter, sortBy]);


  async function handleAddGoal(newGoal) {
    try {
      const response = await fetch("http://localhost:3000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TEMP_TOKEN}`,
        },
        body: JSON.stringify(newGoal),
      });
      if (!response.ok) throw new Error(`Failed to create goal: ${response.status}`);
      const savedGoal = await response.json();
      setGoals([...goals, savedGoal]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggleComplete(goalId) {
    const goalToToggle = goals.find((g) => g._id === goalId);
    try {
      const response = await fetch(`http://localhost:3000/api/goals/${goalId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TEMP_TOKEN}`,
        },
        body: JSON.stringify({ completed: !goalToToggle.completed }),
      });
      if (!response.ok) throw new Error(`Failed to update goal: ${response.status}`);
      const updatedGoal = await response.json();
      setGoals(goals.map((g) => (g._id === goalId ? updatedGoal : g)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteGoal(goalId) {
    try {
      const response = await fetch(`http://localhost:3000/api/goals/${goalId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${TEMP_TOKEN}` },
      });
      if (!response.ok) throw new Error(`Failed to delete goal: ${response.status}`);
      setGoals(goals.filter((g) => g._id !== goalId));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
  <div>
    <Header />
     <Analytics />
    <GoalForm onAddGoal={handleAddGoal} />

    <input
      type="text"
      placeholder="Search goals..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <input
      type="text"
      placeholder="Search goals..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
    <option value="">All priorities</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
    </select>

    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
    <option value="newest">Newest first</option>
    <option value="oldest">Oldest first</option>
    <option value="progress">By progress</option>
    </select>

    {isLoading ? (
      <p>Loading goals...</p>
    ) : error ? (
      <p>Something went wrong: {error}</p>
    ) : (
      <Dashboard
        goals={goals}
        onToggleComplete={handleToggleComplete}
        onDeleteGoal={handleDeleteGoal}
      />
    )}
  </div>
);
}

export default App;