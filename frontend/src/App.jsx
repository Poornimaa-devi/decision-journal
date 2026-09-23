import { useState, useEffect } from "react";
import Header from "./components/Header";
import GoalForm from "./components/GoalForm";
import Dashboard from "./components/Dashboard";

const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTlkOGNlZjExYWI3YjMyZjg0MDZkZDkiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3OTAwMTI1MTQsImV4cCI6MTc5MDA5ODkxNH0.bw4KlVehdcyMWS-rKQ6TNQS1deZgAJJrfZbHaFHzmFU";

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await fetch("http://localhost:3000/api/goals", {
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
  }, []);

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
      <GoalForm onAddGoal={handleAddGoal} />

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