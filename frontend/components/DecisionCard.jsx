function DecisionCard({ title, status, onSelect }) {
  return (
    <div className="decision-card" onClick={onSelect}>
      <h3>{title}</h3>
      <p>Status: {status}</p>
    </div>
  );
}

export default DecisionCard;