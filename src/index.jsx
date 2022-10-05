
import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import TeamsErrorHook from './modules/TeamsErrorHook/index';
import './index.css';

TeamsErrorHook.init({
 project: 'Teams Webhook Demo',
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