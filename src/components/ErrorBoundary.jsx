import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
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
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "inherit", opacity: 0.7 }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
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
        </div>
      );
    }

    return this.props.children;
  }
}
