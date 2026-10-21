import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI crashed:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something broke on this page</h2>
          <p>Try another page, or reload.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;