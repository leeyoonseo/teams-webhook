import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';
import TeamsWebhook from './utils/teams-webhook/index';

if (process.env.PROJECT_NAME && process.env.CHANNEL_URL) {
  TeamsWebhook.init({
    project: process.env.PROJECT_NAME,
    channelUrl: process.env.CHANNEL_URL,
  });
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('html에 #root 가 없습니다.');
}

createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);