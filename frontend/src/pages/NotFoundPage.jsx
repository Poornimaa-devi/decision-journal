import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h2>Page not found</h2>
      <Link to="/">Go back to goals</Link>
    </div>
  );
}

export default NotFoundPage;