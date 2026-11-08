
import Analytics from "../components/insights/Analytics";
import Notifications from "../components/insights/Notifications";
import { usePageTitle } from "../hook/usePageTitle";

function InsightsPage() {
  usePageTitle("Insights");

  return (
    <div className="insights-page">
      <div className="insights-intro">
        <span className="section-eyebrow">YOUR PERSONAL OVERVIEW</span>
        <h2>Progress at a glance</h2>
        <p>
          Reflect on your goals, understand your decisions, and see
          how far you've come.
        </p>
      </div>

      <Analytics />

      <Notifications />
    </div>
  );
}

export default InsightsPage;
