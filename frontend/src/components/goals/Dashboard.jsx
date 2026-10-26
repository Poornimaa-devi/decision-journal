import GoalCard from "./GoalCard";

function Dashboard({
  goals,
  onToggleComplete,
  onDeleteGoal,
  hasFilters = false,
  onClearFilters,
}) {
  const total = goals.length;
  const completed = goals.filter((g) => g.completed).length;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (total === 0) {
    if (hasFilters) {
      return (
        <div className="empty-state">
          <p>No goals match your search or filters.</p>
          {onClearFilters && <button onClick={onClearFilters}>Clear filters</button>}
        </div>
      );
    }
    return (
      <div className="empty-state">
        <h3>No goals yet</h3>
        <p>
          Add your first goal using the form above. You can link it to a decision to
          remember why you set it.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <section className="dashboard-summary" aria-label="Goal summary">
        <h2>Your progress</h2>
        <p>
          {completed} of {total} goals completed ({rate}%)
          {hasFilters && " (filtered view)"}
        </p>
        <progress value={rate} max="100" aria-label="Overall completion" />
      </section>

      <div className="goal-list">
        {goals.map((goal) => (
          <GoalCard
            key={goal._id}
            id={goal._id}
            title={goal.title}
            priority={goal.priority}
            progress={goal.progress}
            completed={goal.completed}
            decision={goal.decision}
            onToggleComplete={onToggleComplete}
            onDeleteGoal={onDeleteGoal}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;