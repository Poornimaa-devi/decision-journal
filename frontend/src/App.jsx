import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import GoalForm from "./components/goals/GoalForm";
import Dashboard from "./components/goals/Dashboard";
import Analytics from "./components/insights/Analytics";
import Notifications from "./components/insights/Notifications"; 
import Profile from "./components/profile/Profile";
import { TEMP_TOKEN } from "./config";

const API_URL = "http://localhost:3000";
const authHeaders = { Authorization: `Bearer ${TEMP_TOKEN}` };
const jsonAuthHeaders = { "Content-Type": "application/json", ...authHeaders };

function App() {
  const [goals, setGoals] = useState([]);
  const [decisions, setDecisions] = useState([]);
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

        const response = await fetch(`${API_URL}/api/goals?${params.toString()}`, {
          headers: authHeaders,
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        setGoals(await response.json());
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGoals();
  }, [searchTerm, priorityFilter, sortBy]);

  useEffect(() => {
    async function fetchDecisions() {
      try {
        const response = await fetch(`${API_URL}/api/decisions`, {
          headers: authHeaders,
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        setDecisions(await response.json());
      } catch (err) {
        console.error("Could not load decisions:", err.message);
      }
    }
    fetchDecisions();
  }, []);

  async function handleAddGoal(newGoal) {
    try {
      const response = await fetch(`${API_URL}/api/goals`, {
        method: "POST",
        headers: jsonAuthHeaders,
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
      const response = await fetch(`${API_URL}/api/goals/${goalId}`, {
        method: "PATCH",
        headers: jsonAuthHeaders,
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
      const response = await fetch(`${API_URL}/api/goals/${goalId}`, {
        method: "DELETE",
        headers: authHeaders,
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
      <Profile />
      <Analytics />
      <GoalForm onAddGoal={handleAddGoal} decisions={decisions} />

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