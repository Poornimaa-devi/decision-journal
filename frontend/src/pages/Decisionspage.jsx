import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DecisionForm from "../components/decisions/DecisionForm";
import { getDecisions, createDecision } from "../api/decisions";

function DecisionsPage() {
  const [decisions, setDecisions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDecisions()
      .then(setDecisions)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleAddDecision(newDecision) {
    try {
      const saved = await createDecision(newDecision);
      setDecisions([...decisions, saved]);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Decisions</h2>
      <DecisionForm onAddDecision={handleAddDecision} />

      {isLoading ? (
        <p>Loading decisions...</p>
      ) : error ? (
        <p>Something went wrong: {error}</p>
      ) : decisions.length === 0 ? (
        <p>No decisions recorded yet.</p>
      ) : (
        <ul>
          {decisions.map((d) => (
            <li key={d._id}>
              <Link to={`/decisions/${d._id}`}>{d.title}</Link> ({d.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DecisionsPage;