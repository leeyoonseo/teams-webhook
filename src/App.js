import React, { useCallback, useEffect } from 'react';
import './App.css';
// Teams webhook
import axios from 'axios';

const errorTemplate = {
  "type" : "message",
  "attachments" : [
     {
        "contentType":"application/vnd.microsoft.card.adaptive",
        "contentUrl":null,
        "content":{
           "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",
           "type":"AdaptiveCard",
           "version":"1.2",
           "body":[
              {
                 "type": "TextBlock",
                 "text": "For Samples and Templates, see [https://adaptivecards.io/samples](https://adaptivecards.io/samples)"
              }
           ]
        }
     }
  ]
};

const App = () => {
  // useEffect(() => {
  //   throw Error('useEffect에서 throw Error 시도');
  // }, []);

  const onClick = useCallback(() => {
    console.log('click');
    console.log('errorTemplate :>> ', errorTemplate);
    const teamsChannelUrl = '/webhookb2/7d3fcf9f-30c9-4b1f-9290-ebfd7b3831d3@2f455741-b4a6-43b0-b9ae-e860bf49b020/IncomingWebhook/0356a389e55b430b8056f9d14b64c34d/e3761004-6a49-4e81-8ebf-43fdb0f27aca';
    const response = new axios.post(teamsChannelUrl, errorTemplate);
    console.log('response :>> ', response);
  }, []);

  return (
     <div className="App">
       <header className="App-header">Teams Webhook Test</header>
       <button className="App-button-error" onClick={onClick}>Click!!!</button>
     </div>
  )
};

export default App;

