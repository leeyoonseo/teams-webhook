import axios, { AxiosError, AxiosResponse } from 'axios';
import { errorMessage, ErrorMessage } from './message/error';
import { defaultMessage, DefaultMessage } from './message/default';

type IsError = Error | AxiosError;

interface InitArgs {
  channelUrl: string;
  project: string;
}

// TODO: 별도의 tsconfig.json을 가진다면 index.d.ts에 옮길것
declare global {
  interface Window {
    TeamsWebhook: {
      name: 'Teams-webhook';
      project: string;
      type: string; // 'error' | 'default';
      channelUrl: string;
      message: ErrorMessage | DefaultMessage;
      data: Error | AxiosError | DefaultMessage;
      init: (args: InitArgs) => void;
      send: (data: IsError | DefaultMessage) => void;
    };
  }
}


export default (() => {
  const _teamsWebhook = window.TeamsWebhook || {};

  const _getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleString('ko-kr').replace(/ /g, '').replace('오전', ' am').replace('오후', ' pm');
  };

  const _postMessage = async () => {
    try {
      const { channelUrl, message } = _teamsWebhook;

      // TODO: axios 별도로 instance
      await axios.post(channelUrl, message)
        .then((res: AxiosResponse) => {
          // API 전송 실패 시
          if (!(res.statusText === 'OK' && res.data === 1)) {
            console.log('메시지 전송 실패!');
          }
        }); 

    } catch (err) {
      const error = err as IsError;
      if(axios.isAxiosError(error)){
        Promise.reject(new Error(error.message))
      } else {
        console.log('Error :>>', error);
      }
    }
  };

  // TeamsWebhook.send(error); - error 객체만 넣어주면 됨
  const _getErrorMessage = (error: IsError) => {
    const message = { ...errorMessage }
    const title = `❗️${error.name}: ${error.message}`;
    const maxStackTraceLineNum = 10;
    const excludedLineNum = 0;
    const stackTrace = error.stack ? error.stack.split('at', maxStackTraceLineNum).filter((_, i) => i !== excludedLineNum).join('<br/> at') : '';
    const currentDate = _getCurrentDate();
    const facts = [
      {
        'name': 'Project',
        'value': _teamsWebhook.project
      },
      {
        'name': 'Environment',
        'value': 'development',
      },
      {
        'name': 'Date',
        'value': currentDate,
      },
      { // 환경에 따라서 다른 값이 노출되어야함
        'name': 'URL',
        'value': window.location.href,
      },
    ];

    message.title = title;
    message.text = stackTrace;
    message.message = error.message;
    message.sections[0].activitySubtitle = window.navigator.userAgent;
    message.sections[0].facts = facts;

    return message;
  };

  // TeamsWebhook.send({
  //  // type: 'default', - 선택안하면 default | 확장성고려?
  //  title: 'Teams  Webhook!',
  //  text: '잘가나?'
  // });
  const _getDefaultMessage = ({ title, text }: DefaultMessage) => {
    const message = { ...defaultMessage };
    message.title = title || '제목을 입력하세요.';
    message.text = text || '메시지를 입력하세요.';

    return message;
  }; 

  const send = (data: IsError | DefaultMessage) => {
    // 필수 데이터가 없는 경우, 진행 불가
    if (!_teamsWebhook?.channelUrl || !data) {
      throw Error('필수 데이터가 없다.');
    }

    _teamsWebhook.data = data;

    if (data instanceof Error || data instanceof AxiosError) {
      _teamsWebhook.type = 'error';
      _teamsWebhook.message = _getErrorMessage(data);
    } else {
      _teamsWebhook.message = _getDefaultMessage(data);
      _teamsWebhook.type = data?.type ?? 'default';
    }

    _postMessage();
  };

  const init = ({ project, channelUrl }: InitArgs) => {
    _teamsWebhook.project = project;
    _teamsWebhook.channelUrl = channelUrl;
  };

  _teamsWebhook.name = 'Teams-webhook';
  _teamsWebhook.init = init;
  _teamsWebhook.send = send;

  window.TeamsWebhook = _teamsWebhook;
  return _teamsWebhook;
})();