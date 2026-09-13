import { useState } from "react";
import Header from "./components/Header";
import GoalCard from "./components/GoalCard";
import GoalForm from "./components/GoalForm";

function App() {
  const [goals, setGoals] = useState([
    { title: "Learn React Props", priority: "high", progress: 40 },
    { title: "Finish Backend Auth", priority: "medium", progress: 100 },
  ]);

  function handleAddGoal(newGoal) {
    setGoals([...goals, { ...newGoal, progress: 0 }]);
  }

  return (
    <div>
      <Header />
      <GoalForm onAddGoal={handleAddGoal} />
      {goals.map((goal, index) => (
        <GoalCard
          key={index}
          title={goal.title}
          priority={goal.priority}
          progress={goal.progress}
        />
      ))}
    </div>
  );
}

export default App;