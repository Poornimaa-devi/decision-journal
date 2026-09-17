import { useState, useEffect } from "react";
import Header from "../components/Header";
import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";

// ⚠️ TEMPORARY — will be replaced once a real login page exists
const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTlkOGNlZjExYWI3YjMyZjg0MDZkZDkiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3ODk2NjQ3MDQsImV4cCI6MTc4OTc1MTEwNH0.x8l9v73IV9lnai9ER_gG-81NBUqIRqeOJlhbg8_OxGs";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await fetch("http://localhost:3000/api/goals", {
          headers: {
            Authorization: `Bearer ${TEMP_TOKEN}`,
          },
        });

        if (!response.ok) {
          console.error("Fetch failed with status:", response.status);
          return;
        }

        const data = await response.json();
        setGoals(data);
      } catch (err) {
        console.error("Network error:", err.message);
      }
    }

    fetchGoals();
  }, []);

  function handleAddGoal(newGoal) {
    setGoals([...goals, { ...newGoal, progress: 0 }]);
  }

  return (
    <div>
      <Header />
      <GoalForm onAddGoal={handleAddGoal} />
      {goals.map((goal) => (
        <GoalCard
          key={goal._id}
          title={goal.title}
          priority={goal.priority}
          progress={goal.progress}
        />
      ))}
    </div>
  );
}

export default App;