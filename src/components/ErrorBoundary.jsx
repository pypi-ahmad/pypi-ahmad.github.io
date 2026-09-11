import React from "react";
import "./ErrorBoundary.css";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.headingRef = React.createRef();
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // The failed subtree is gone, so move focus to the recovery heading after it mounts.
    this.headingRef.current?.focus();
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          aria-labelledby="error-title"
          aria-describedby="error-description"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
            fontFamily:
              "BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          }}
        >
          <h1 id="error-title" ref={this.headingRef} tabIndex={-1} style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Something went wrong
          </h1>
          <p id="error-description" style={{ marginBottom: "1.5rem", color: "inherit", opacity: 0.7 }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            className="error-boundary__refresh"
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 24px",
              fontSize: "1rem",
              border: "1px solid currentColor",
              borderRadius: "8px",
              background: "transparent",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            Refresh
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
