import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';
import TeamsErrorHook from './utils/TeamsErrorHook/index';

TeamsErrorHook.init({
  name: 'Teams Webhook Demo',
  channelUrl: process.env.TEAMS_CHANNEL_PARAMETER,
});

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);