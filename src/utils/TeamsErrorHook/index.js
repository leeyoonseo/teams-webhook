import axios from 'axios';
import errorMessage from './message/error';

// (테스트) yoon-test channel
// const teamsChannelAPI = '/webhookb2/7d3fcf9f-30c9-4b1f-9290-ebfd7b3831d3@2f455741-b4a6-43b0-b9ae-e860bf49b020/IncomingWebhook/0356a389e55b430b8056f9d14b64c34d/e3761004-6a49-4e81-8ebf-43fdb0f27aca';

// TODO:
// - 전역 관리 (project 정보등 지속적으로 넣을 이유 없음)
// new TeamsErrorHook({
//  project: 'Teams Webhook Demo',
//  channelUrl: teamsChannelAPI
// }).call(error);
// - 모듈화, tsx
// - 크로스브라우징 (기준이 Chrome이므로 다른 브라우저에 대해서 확인되어야함.)
// - ssr에 대한 지원 ? 
// - 디테일한 정보 (유명한 lib 사용하여 종속성을 가져가면서 유저의 디테일한 정보(os, ip)들을 노출할 것인가.
//  ㄴ UA 브라우저 및 디바이스 등 ua를 통해 디테일한 작업을 하고 싶다면..: ua-parser-js, @types/ua-parser-js

class TeamsErrorHook {
  constructor({ project, channelUrl }) {
    this.name = 'TeamsErrorHook';
    this.errorMessage = errorMessage;
    this.project = project;
    this.channelUrl = channelUrl;
    this.error = null;
  }

  get title () {
    return `❗️${this.error.name}: ${this.error.message}`;
  }

  get stackTrace() {
    const stackArr = this.error.stack.split('at');
    return stackArr.filter((_, i) => i !== 0).join('<br/> at');
  }

  get today() {
    let date = new Date();
    // 브라우저체크 필요
    date = date.toLocaleString('ko-kr');
    return date.replace(/ /g, '').replace('오전', ' am').replace('오후', ' pm');
  }

  get facts() {
    const { href } = window.location;

    return [
      {
        'name': 'Project',
        'value': this.project
      },
      {
        'name': 'Date',
        'value': this.today,
    },
    {
        'name': 'URL',
        'value': href,
      },
    ];
  }

  async _request() {
    try {
      const response = await new axios.post(
        this.channelUrl,
        this.errorMessage
      );
 
      // API 전송 실패
      if (!(response.statusText === 'OK' && response.data === 1)) {
        console.log('Failed to send error message!');
      }
    } catch (error) {
      console.log('Failed to send error message! :>>', error);
    }
  }

  call(error) {
    this.error = error;

    this.errorMessage.title = this.title;
    this.errorMessage.text = this.stackTrace;
    this.errorMessage.message = error.message;
    this.errorMessage.sections[0].activitySubtitle = window.navigator.userAgent;
    this.errorMessage.sections[0].facts = this.facts;

    this._request();
    return this;
  }
}

export default TeamsErrorHook;