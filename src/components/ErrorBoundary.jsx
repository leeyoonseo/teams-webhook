class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    /* global TeamsWebhook */
    TeamsWebhook.send(error);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;