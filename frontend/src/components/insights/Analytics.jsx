import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import { useFetch } from "../../hook/useFetch";
import { getGoalAnalytics } from "../../api/goals";
import { getDecisionAnalytics } from "../../api/decisions";

function Analytics() {
  const goals = useFetch(getGoalAnalytics, []);
  const decisions = useFetch(getDecisionAnalytics, []);

  if (goals.isLoading && !goals.data) {
    return <Loading label="Loading analytics..." />;
  }

  if (goals.error && !goals.data) {
    return <ErrorMessage error={goals.error} onRetry={goals.reload} />;
  }

  const { overall, byPriority } = goals.data;

  return (
    <div className="analytics">
      <h2>Analytics</h2>

      <p>
        {overall.completedGoals} of {overall.totalGoals} goals completed
      </p>

      <h3>Goals by Priority</h3>
      {byPriority.length === 0 ? (
        <p>No goals yet.</p>
      ) : (
        byPriority.map((item) => (
          <p key={item._id}>
            {item._id}: {item.count} goals, avg progress {Math.round(item.avgProgress)}%
          </p>
        ))
      )}

      <h3>Decisions by Status</h3>
      {decisions.isLoading && !decisions.data ? (
        <Loading label="Loading decision stats..." />
      ) : decisions.error && !decisions.data ? (
        <ErrorMessage error={decisions.error} onRetry={decisions.reload} />
      ) : (
        <div>
          <p>Total: {decisions.data.overall.totalDecisions}</p>
          {decisions.data.byStatus.map((item) => (
            <p key={item._id}>
              {item._id}: {item.count}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Analytics;