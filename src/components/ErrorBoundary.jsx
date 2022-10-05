import React from 'react';
import TeamsErrorHook from '../modules/TeamsErrorHook/index';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.errorhook = props.errorhook;
  }

  componentDidCatch(error, errorInfo) {
    TeamsErrorHook.catch(error);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;