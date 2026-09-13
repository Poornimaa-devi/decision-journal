import { useState } from "react";

function GoalCard({ title, priority, progress }) {
  const [completed, setCompleted] = useState(false);

  function toggleCompleted() {
    setCompleted(!completed);
  }

  return (
    <div className="goal-card">
      <h3>{title}</h3>
      <p>Priority: {priority}</p>
      <p>Progress: {progress}%</p>
      <p>Status: {completed ? "Completed" : "In Progress"}</p>
      <button onClick={toggleCompleted}>
        Mark as {completed ? "In Progress" : "Completed"}
      </button>
    </div>
  );
}

export default GoalCard;