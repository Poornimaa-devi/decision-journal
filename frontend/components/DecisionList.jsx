import { useState } from "react";
import DecisionCard from "./DecisionCard";
import DecisionDetail from "./DecisionDetail";

function DecisionList({ decisions }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedDecision = decisions.find((d) => d._id === selectedId);

  if (selectedDecision) {
    return (
      <DecisionDetail
        decision={selectedDecision}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  if (decisions.length === 0) {
    return <p>No decisions recorded yet.</p>;
  }

  return (
    <div className="decision-list">
      {decisions.map((decision) => (
        <DecisionCard
          key={decision._id}
          title={decision.title}
          status={decision.status}
          onSelect={() => setSelectedId(decision._id)}
        />
      ))}
    </div>
  );
}

export default DecisionList;