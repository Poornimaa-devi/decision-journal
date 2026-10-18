import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDecisionById } from "../api/decisions";

function DecisionDetailPage() {
  const { id } = useParams();
  const [decision, setDecision] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDecisionById(id)
      .then(setDecision)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div>
        <p>Could not load this decision: {error}</p>
        <Link to="/decisions">← Back to decisions</Link>
      </div>
    );
  }

  if (!decision) return <p>Loading decision...</p>;

  return (
    <div>
      <Link to="/decisions">← Back to decisions</Link>
      <h2>{decision.title}</h2>
      <p><strong>Status:</strong> {decision.status}</p>
      <p><strong>Reasoning:</strong></p>
      <p>{decision.reasoning}</p>
    </div>
  );
}

export default DecisionDetailPage;