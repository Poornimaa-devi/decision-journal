
import { useState } from "react";

function DecisionDetail({ decision, onBack, onStatusChange }) {
  const [status, setStatus] = useState(decision.status);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleStatusChange(event) {
    const newStatus = event.target.value;

    setStatus(newStatus);
    setIsSaving(true);
    setError("");

    try {
      await onStatusChange(decision._id, newStatus);
    } catch (err) {
      setStatus(decision.status);
      setError(err.message || "Unable to update status");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="decision-detail">
      <button onClick={onBack}>← Back to list</button>

      <h2>{decision.title}</h2>

      <p>
        <strong>Status:</strong>
      </p>

      <select
        value={status}
        onChange={handleStatusChange}
        disabled={isSaving}
      >
        <option value="pending">Pending</option>
        <option value="decided">Decided</option>
        <option value="reviewing">Reviewing</option>
      </select>

      {isSaving && <p>Updating status...</p>}
      {error && <p>{error}</p>}

      <p><strong>Reasoning:</strong></p>
      <p>{decision.reasoning}</p>
    </div>
  );
}

export default DecisionDetail;
