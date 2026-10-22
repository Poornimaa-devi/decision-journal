import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import ErrorBoundary from "../common/ErrorBoundary";

function Layout() {
  const location = useLocation();

  return (
    <div className="container">
      <Header />
      <Navbar />
      <main>
        <ErrorBoundary key={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default Layout;