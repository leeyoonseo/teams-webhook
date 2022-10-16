import { Component, ErrorInfo, ReactNode } from "react";
import { IsError } from "../utils/teams-webhook/@typing";

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

  componentDidCatch(error: IsError, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    /* global TeamsWebhook */
    window.TeamsWebhook.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;