import Analytics from "../components/insights/Analytics";
import Notifications from "../components/insights/Notifications";
import { usePageTitle } from "../hook/usePageTitle";

function InsightsPage() {
  usePageTitle("Insights");

  return (
    <div>
      <Notifications />
      <Analytics />
    </div>
  );
}

export default InsightsPage;