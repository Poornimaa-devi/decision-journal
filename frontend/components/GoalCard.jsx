function GoalCard({ title, priority, progress }) {
  return (
    <div className="goal-card">
      <h3>{title}</h3>
      <p>Priority: {priority}</p>
      <p>Progress: {progress}%</p>
    </div>
  );
}

export default GoalCard;