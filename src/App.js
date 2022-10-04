import React, { useCallback, useEffect } from 'react';
import './App.css';
// Teams webhook
// import axios from 'axios';
import TeamsErrorHook from './utils/TeamsErrorHook/index';
const teamsChannelAPI = '/webhookb2/7d3fcf9f-30c9-4b1f-9290-ebfd7b3831d3@2f455741-b4a6-43b0-b9ae-e860bf49b020/IncomingWebhook/0356a389e55b430b8056f9d14b64c34d/e3761004-6a49-4e81-8ebf-43fdb0f27aca';


const App = ({errorhook}) => {
  useEffect(() => {
    console.log('errorhook :>> ', errorhook);
    // react strict mode 때문에 2번 렌더링 됨
    // throw Error('useEffect에서 어떠한 이유에서 에러가 생겨버렸네!');
    // throw Error('ERROR!!');
  }, []);


  const onClick = useCallback(async() => {
    try {
      new Promise('/');
    } catch (error) {
      errorhook.call(error);

      // const teamsErrorHook = new TeamsErrorHook({
      //  project: 'Teams Webhook Demo',
      //  channelUrl: teamsChannelAPI
      // });

      // teamsErrorHook.call(error);
      // errorhook.call(error);
      // const info = {
      //  project: 'teams-webhook',
      // }
      // // init 해야겠다.
      // errorHook({
      //  info,
      //  error,
      // });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">Teams Webhook Test</header>
      <button className="App-button-error" onClick={onClick}>Click!!!</button>
    </div>
  )
};

export default App;