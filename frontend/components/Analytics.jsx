import { useState, useEffect } from "react";

const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWJkM2M3YWRkOGNmM2Q0ZTEwN2QyMjEiLCJlbWFpbCI6InBvb3JuaW1hYUBnbWFpbC5jb20iLCJpYXQiOjE3OTEzNTI2MTAsImV4cCI6MTc5MTQzOTAxMH0.PdISky8gku17SAJnvXOTQkZfZ_M85i15V86_lQeTGJY";

function Analytics() {
  const [data, setData] = useState(null);

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

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <p>
        {data.overall.completedGoals} of {data.overall.totalGoals} goals completed
      </p>
      <h3>By Priority</h3>
      {data.byPriority.map((item) => (
        <p key={item._id}>
          {item._id}: {item.count} goals, avg progress {Math.round(item.avgProgress)}%
        </p>
      ))}
    </div>
  );
}

export default Analytics;