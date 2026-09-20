import { useState, useEffect } from "react";
import Header from "../components/Header";
import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";

const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTlkOGNlZjExYWI3YjMyZjg0MDZkZDkiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3ODk4ODA1NTksImV4cCI6MTc4OTk2Njk1OX0.Bbe8kVAn4zXOe50BBQbTOQ41L6cV6asZAmaV1kr9l9g";

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

      if (!response.ok) {
        throw new Error(`Failed to create goal: ${response.status}`);
      }

      const savedGoal = await response.json();
      setGoals([...goals, savedGoal]);
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
      ) : goals.length === 0 ? (
        <p>No goals yet. Add your first one above!</p>
      ) : (
        goals.map((goal) => (
          <GoalCard
            key={goal._id}
            title={goal.title}
            priority={goal.priority}
            progress={goal.progress}
          />
        ))
      )}
    </div>
  );
}

export default App;