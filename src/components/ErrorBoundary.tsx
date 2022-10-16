import React, { Component, ErrorInfo, ReactNode } from "react";

interface State {
  hasError: boolean;
};

interface Props {
  children?: ReactNode;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    /* global TeamsWebhook */
    // TeamsWebhook.send(error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;