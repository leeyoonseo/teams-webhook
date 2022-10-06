import axios from 'axios';
import errorMessage from './message/error';

const TeamsErrorHook = (() => {
  const _hookInstance = window.TeamsErrorHook || {}; 

  const _getRequestMessage = () => {
    const { error } = _hookInstance;
    const requestMessage = { ...errorMessage };
    const title = `❗️${error.name}: ${error.message}`;
    const maxStackTraceLineNum = 10; // 외부 옵션으로 뺄 것인가
    const excludedLineNum = 0; // 0번째는 에러 타입? -> 브라우저 체크 필요
    // 브라우저 체크 필요
    const stackTrace = error.stack.split('at', maxStackTraceLineNum).filter((_, i) => i !== excludedLineNum).join('<br/> at');
    console.dir(error)

    let today = new Date();
    today = today.toLocaleString('ko-kr'); // 브라우저 체크, 사용하려는 포맷 결정 필요
    today = today.replace(/ /g, '').replace('오전', ' am').replace('오후', ' pm');
    const facts = [
      {
        'name': 'Project',
        'value': _hookInstance.name
      },
      {
        'name': 'Environment',
        'value': 'development',
      },
      {
        'name': 'Date',
        'value': today,
      },
      {
        'name': 'URL',
        'value': window.location.href,
      },
    ];

    requestMessage.title = title;
    requestMessage.text = stackTrace;
    requestMessage.message = error.message;
    requestMessage.sections[0].activitySubtitle = window.navigator.userAgent;
    requestMessage.sections[0].facts = facts;
   
    return requestMessage;
  };
 
  const _request = async () => {
    try {
      const res = await new axios.post(
        _hookInstance.channelUrl,
        _hookInstance.requestMessage
      );
 
      // API 전송 실패
      if (!(res.statusText === 'OK' && res.data === 1)) {
        console.log('Failed to send error message!');
      }
    } catch (error) {
      console.log('Failed to send error message! :>>', error);
    }
  };

  const _init = ({ name, channelUrl }) => {
    if (!window.TeamsErrorHook) {
      _hookInstance.name = name;
      _hookInstance.channelUrl = channelUrl;

      window.TeamsErrorHook = _hookInstance;
    }

    return _hookInstance;
  };

  const _captureException = (error) => {
    if (error && _hookInstance?.name && _hookInstance?.channelUrl) {
      _hookInstance.error = error;
      _hookInstance.requestMessage = _getRequestMessage();
     
      _request();
    } else {
      console.log('TeamsErrorHook의 init을 선행해야합니다.');
    }
  };

  return {
    init: _init,
    captureException: _captureException,
  }
})();

export default TeamsErrorHook;