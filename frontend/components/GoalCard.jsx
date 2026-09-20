

function GoalCard({ id, title, priority, progress, completed, onToggleComplete }) {
  return (
    <div className="goal-card">
      <h3>{title}</h3>
      <p>Priority: {priority}</p>
      <p>Progress: {progress}%</p>
      <p>Status: {completed ? "Completed" : "In Progress"}</p>
      <button onClick={() => onToggleComplete(id)}>
        Mark as {completed ? "In Progress" : "Completed"}
      </button>
    </div>
  );
}

export default GoalCard;