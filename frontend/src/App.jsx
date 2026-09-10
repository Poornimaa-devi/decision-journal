import Header from "./components/Header";
import GoalCard from "./components/GoalCard";

function App() {
  return (
    <div>
      <Header />
      <GoalCard title="Learn React Props" priority="high" progress={40} />
      <GoalCard title="Finish Backend Auth" priority="medium" progress={100} />
      <GoalCard title="Build Dashboard UI" priority="low" progress={10} />
    </div>
  );
}

export default App;