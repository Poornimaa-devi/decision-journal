import GoalCard from "./GoalCard";

function Dashboard({ goals, onToggleComplete, onDeleteGoal }) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed).length;
  const completionRate =
    totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

  if (totalGoals === 0) {
    return <p>No goals yet. Add your first one above!</p>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-summary">
        <h2>Your Progress</h2>
        <p>
          {completedGoals} of {totalGoals} goals completed ({completionRate}%)
        </p>
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
            onToggleComplete={onToggleComplete}
            onDeleteGoal={onDeleteGoal}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;