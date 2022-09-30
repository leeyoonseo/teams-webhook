import React, { useCallback, useEffect } from 'react';
import './App.css';
// Teams webhook
// import axios from 'axios';
// import { errorHook } from './utils/teamsWebhook/index';

const App = () => {
  useEffect(() => {
    throw Error('useEffect에서 throw Error 시도');
  }, []);

  const onClick = useCallback(async () => {
    console.log('click');
    // errorHook();
    // console.log('errorTemplate :>> ', errorTemplate);
    // const teamsChannelUrl = '/webhookb2/7d3fcf9f-30c9-4b1f-9290-ebfd7b3831d3@2f455741-b4a6-43b0-b9ae-e860bf49b020/IncomingWebhook/0356a389e55b430b8056f9d14b64c34d/e3761004-6a49-4e81-8ebf-43fdb0f27aca';
    // const response = await new axios.post(teamsChannelUrl, errorTemplate);
    // console.log('response :>> ', response);
  }, []);

  return (
     <div className="App">
       <header className="App-header">Teams Webhook Test</header>
       <button className="App-button-error" onClick={onClick}>Click!!!</button>
     </div>
  )
};

export default App;

