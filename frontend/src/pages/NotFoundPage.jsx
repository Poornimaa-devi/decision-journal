import { Link } from "react-router-dom";
import { usePageTitle } from "../hook/usePageTitle";

function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <div>
      <h2>Page not found</h2>
      <Link to="/">Go back to goals</Link>
    </div>
  );
}

export default NotFoundPage;