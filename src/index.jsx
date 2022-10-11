import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';
import TeamsWebhook from './utils/teams-webhook/index';

TeamsWebhook.init({
  project: process.env.PROJECT_NAME,
  channelUrl: process.env.CHANNEL_URL,
});

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);