
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const pageTitles = {
    "/": {
      title: "Your Goals",
      description: "Turn your intentions into meaningful progress."
    },
    "/decisions": {
      title: "Your Decisions",
      description: "Record your choices and understand your reasoning."
    },
    "/insights": {
      title: "Insights",
      description: "Understand your progress and decision-making patterns."
    },
    "/profile": {
      title: "Your Profile",
      description: "Manage your personal account information."
    }
  };

  const page = pageTitles[location.pathname] || {
    title: "Decision Details",
    description: "Review the reasoning behind your decision."
  };

  return (
    <header className="app-header">
      <div>
        <p className="header-eyebrow">DECISION JOURNAL / WORKSPACE</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
    </header>
  );
}

export default Header;
