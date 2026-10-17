function DecisionDetail({ decision, onBack }) {
  return (
    <div className="decision-detail">
      <button onClick={onBack}>← Back to list</button>
      <h2>{decision.title}</h2>
      <p><strong>Status:</strong> {decision.status}</p>
      <p><strong>Reasoning:</strong></p>
      <p>{decision.reasoning}</p>
    </div>
  );
}

export default DecisionDetail;