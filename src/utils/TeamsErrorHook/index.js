import axios from 'axios';
import errorMessage from './message/error';

const TeamsErrorHook = (() => {
  const _hookInstance = window.TeamsErrorHook || {}; 

  const _getRequestMessage = () => {
    const { error } = _hookInstance;
    const requestMessage = { ...errorMessage };
    const title = `❗️${error.name}: ${error.message}`;
    const maxStackTraceLineNum = 10;
    const excludedLineNum = 0;
    const stackTrace = error.stack.split('at', maxStackTraceLineNum).filter((_, i) => i !== excludedLineNum).join('<br/> at');

    console.log('stackTrace', stackTrace)
    let today = new Date();
    today = today.toLocaleString('ko-kr'); // 브라우저 체크, 사용하려는 포맷 결정 필요
    today = today.replace(/ /g, '').replace('오전', ' am').replace('오후', ' pm');
    const facts = [
      {
        'name': 'Project',
        'value': _hookInstance.project
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

  const _init = ({ project, channelUrl }) => {
    if (!window.TeamsErrorHook) {
      _hookInstance.project = project;
      _hookInstance.channelUrl = channelUrl;

      window.TeamsErrorHook = _hookInstance;
    }

    return _hookInstance;
  };

  const _catch = (error) => {
    if (error && _hookInstance?.project && _hookInstance?.channelUrl) {
      _hookInstance.error = error;
      _hookInstance.requestMessage = _getRequestMessage();
     
      _request();
    } else {
      console.log('TeamsErrorHook의 init을 선행해야합니다.');
    }
  };

  return {
    init: _init,
    catch: _catch,
  }
})();

export default TeamsErrorHook;