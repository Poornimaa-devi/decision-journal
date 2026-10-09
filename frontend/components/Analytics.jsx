import { useState, useEffect } from "react";
import { TEMP_TOKEN } from "../config";

function Analytics() {
  const [data, setData] = useState(null);
  const [decisionData, setDecisionData] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      const response = await fetch("http://localhost:3000/api/goals/analytics", {
        headers: { Authorization: `Bearer ${TEMP_TOKEN}` },
      });
      const result = await response.json();
      setData(result);
    }
    fetchAnalytics();
  }, []);

  useEffect(() => {
    async function fetchDecisionAnalytics() {
      const response = await fetch("http://localhost:3000/api/decisions/analytics", {
        headers: { Authorization: `Bearer ${TEMP_TOKEN}` },
      });
      const result = await response.json();
      setDecisionData(result);
    }
    fetchDecisionAnalytics();
  }, []);

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