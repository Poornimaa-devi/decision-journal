import { useState, useEffect } from "react";
import { getGoalAnalytics } from "../../api/goals";
import { getDecisionAnalytics } from "../../api/decisions";

function Analytics() {
  const [data, setData] = useState(null);
  const [decisionData, setDecisionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGoalAnalytics().then(setData).catch((err) => setError(err.message));
    getDecisionAnalytics().then(setDecisionData).catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Could not load analytics: {error}</p>;
  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <p>
        {data.overall.completedGoals} of {data.overall.totalGoals} goals completed
      </p>

      <h3>Goals by Priority</h3>
      {data.byPriority.map((item) => (
        <p key={item._id}>
          {item._id}: {item.count} goals, avg progress {Math.round(item.avgProgress)}%
        </p>
      ))}

      {decisionData && (
        <div>
          <h3>Decisions by Status</h3>
          <p>Total: {decisionData.overall.totalDecisions}</p>
          {decisionData.byStatus.map((item) => (
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