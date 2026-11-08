
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
  const active = total - completed;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (total === 0) {
    return (
      <div className="empty-state dashboard-empty">
        <div className="empty-state-icon">✦</div>
        <h3>{hasFilters ? "No matching goals" : "Your journey starts here"}</h3>
        <p>
          {hasFilters
            ? "No goals match your current search or filters. Try adjusting them."
            : "You haven't created any goals yet. Add your first goal and start making meaningful progress."}
        </p>

        {hasFilters && onClearFilters && (
          <button type="button" onClick={onClearFilters}>
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="dashboard">
      <section className="goal-stats" aria-label="Goal statistics">
        <article className="stat-card">
          <div className="stat-card-top">
            <span className="stat-icon stat-icon-purple">◎</span>
            <span className="stat-label">ALL GOALS</span>
          </div>
          <h3>{total}</h3>
          <p>Goals you're working towards</p>
        </article>

        <article className="stat-card">
          <div className="stat-card-top">
            <span className="stat-icon stat-icon-green">✓</span>
            <span className="stat-label">COMPLETED</span>
          </div>
          <h3>{completed}</h3>
          <p>Goals successfully completed</p>
        </article>

        <article className="stat-card">
          <div className="stat-card-top">
            <span className="stat-icon stat-icon-orange">↗</span>
            <span className="stat-label">IN PROGRESS</span>
          </div>
          <h3>{active}</h3>
          <p>Goals still in progress</p>
        </article>
      </section>

      <section className="dashboard-summary" aria-label="Goal summary">
        <div className="summary-heading">
          <div>
            <span className="section-eyebrow">YOUR JOURNEY</span>
            <h2>Overall progress</h2>
            <p>
              {completed} of {total} goals completed
              {hasFilters && " · Filtered view"}
            </p>
          </div>

          <div className="progress-percentage">{rate}%</div>
        </div>

        <progress value={rate} max="100" aria-label="Overall completion" />

        <div className="summary-footer">
          <span>{completed} completed</span>
          <span>{active} remaining</span>
        </div>
      </section>

      <section className="goals-section">
        <div className="goals-section-heading">
          <div>
            <h2>Your goals</h2>
            <p>Keep moving forward, one step at a time.</p>
          </div>
          <span className="goal-count">{total} goals</span>
        </div>

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
      </section>
    </div>
  );
}

export default Dashboard;
