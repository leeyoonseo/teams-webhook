
// import './entry/index';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';
import TeamsErrorHook from './utils/TeamsErrorHook/index';

const root = createRoot(document.getElementById('root'));

const teamsChannelAPI = '/webhookb2/7d3fcf9f-30c9-4b1f-9290-ebfd7b3831d3@2f455741-b4a6-43b0-b9ae-e860bf49b020/IncomingWebhook/0356a389e55b430b8056f9d14b64c34d/e3761004-6a49-4e81-8ebf-43fdb0f27aca';
const teamsErrorHook = new TeamsErrorHook({
  project: 'Teams Webhook Demo',
  channelUrl: teamsChannelAPI
});

root.render(
  <React.StrictMode>
    <ErrorBoundary errorhook={teamsErrorHook}>
      <App errorhook={teamsErrorHook} />
    </ErrorBoundary>
  </React.StrictMode>
);