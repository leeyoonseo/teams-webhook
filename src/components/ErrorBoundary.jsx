import React from 'react';
import TeamsErrorHook from '../utils/TeamsErrorHook/index';

const teamsChannelAPI = '/webhookb2/7d3fcf9f-30c9-4b1f-9290-ebfd7b3831d3@2f455741-b4a6-43b0-b9ae-e860bf49b020/IncomingWebhook/0356a389e55b430b8056f9d14b64c34d/e3761004-6a49-4e81-8ebf-43fdb0f27aca';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.errorhook = props.errorhook;
  }

  // error: 에러 내용
  // info: 에러 발생한 위치
  componentDidCatch(error, errorInfo) {
    console.log('ErrorBoundary');
    // console.log('ErrorBoundary error :>> ', error);
    // console.log('ErrorBoundary errorInfo :>> ', errorInfo);

    console.log('errorhook :>> ', this.errorhook);
    this.errorhook.call(error);
   
    // new TeamsErrorHook({
    //  project: 'Teams Webhook Demo',
    //  channelUrl: teamsChannelAPI
    // }).call(error);

    // const info = {
    //  project: 'teams-webhook'
    // }
    // errorHook({
    //  info,
    //  error,
    // });

    // error
    // at eval (App.js:20:11)
    // at commitHookEffectListMount (react-dom.development.js:23145:26)
    // at commitPassiveMountOnFiber (react-dom.development.js:24921:13)
    // at commitPassiveMountEffects_complete (react-dom.development.js:24886:9)
    // at commitPassiveMountEffects_begin (react-dom.development.js:24873:7)
    // at commitPassiveMountEffects (react-dom.development.js:24861:3)
    // at flushPassiveEffectsImpl (react-dom.development.js:27034:3)
    // at flushPassiveEffects (react-dom.development.js:26979:14)
    // at eval (react-dom.development.js:26764:9)
    // at workLoop (scheduler.development.js:266:34)

    // info
    // at App (webpack://my-webpack-project/./src/App.js?:19:51)
    // at ErrorBoundary (webpack://my-webpack-project/./src/components/ErrorBoundary.jsx?:34:5)"
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;