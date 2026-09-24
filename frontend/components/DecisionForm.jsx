import { useState } from "react";

function DecisionForm({ onAddDecision }) {
  const [title, setTitle] = useState("");
  const [reasoning, setReasoning] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "" || reasoning.trim() === "") {
      return;
    }

    onAddDecision({ title, reasoning });

    setTitle("");
    setReasoning("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What did you decide?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Why did you decide this?"
        value={reasoning}
        onChange={(e) => setReasoning(e.target.value)}
        rows={3}
      />
      <button type="submit">Record Decision</button>
    </form>
  );
}

export default DecisionForm;