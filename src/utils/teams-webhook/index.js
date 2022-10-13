import axios from 'axios';
import errorMessage from './message/error';
import defaultMessage from './message/default';

export default (() => {
  const _teamsWebhook = window.TeamsWebhook || {};

  const _getCurrentDate = () => {
    // TODO:
    // - 브라우저 체크, 사용하려는 포맷 결정 필요
    // - 코드 개선
    const date = new Date();
    return date.toLocaleString('ko-kr').replace(/ /g, '').replace('오전', ' am').replace('오후', ' pm');
  };

  const _postMessage = async () => {
    try {
      const res = await new axios.post(
        _teamsWebhook.channelUrl,
        _teamsWebhook.message
      );

      // API 전송 실패
      if (!(res.statusText === 'OK' && res.data === 1)) {
        console.log('메시지 전송 실패!');
      }
    } catch (error) {
      console.log('메시지 전송 에러 :>>', error);
    }
  };

  // TeamsWebhook.send(error); - error 객체만 넣어주면 됨
  const _getErrorMessage = (error) => {
    const message = { ...errorMessage };
    const title = `❗️${error.name}: ${error.message}`;
    const maxStackTraceLineNum = 10;
    // 브라우저 체크 필요 (0번째 에러, stackTrace)
    const excludedLineNum = 0;
    const stackTrace = error.stack.split('at', maxStackTraceLineNum).filter((_, i) => i !== excludedLineNum).join('<br/> at');
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
  const _getDefaultMessage = ({ title, text }) => {
    const message = { ...defaultMessage };
    message.title = title || '제목을 입력하세요.';
    message.text = text || '메시지를 입력하세요.';

    return message;
  }; 

  const send = (data) => {
    // 필수 데이터가 없는 경우, 진행 불가
    if (!_teamsWebhook?.channelUrl || !data) {
      throw Error('필수 데이터가 없다.');
    }

    _teamsWebhook.data = data;
    _teamsWebhook.type = data instanceof Error ? 'error' : (!data?.type ? 'default' : data.type);
    _teamsWebhook.message = data instanceof Error ? _getErrorMessage(data) : _getDefaultMessage(data);

    _postMessage();
  };

  const init = ({ project, channelUrl }) => {
    _teamsWebhook.project = project;
    _teamsWebhook.channelUrl = channelUrl;
  };

  _teamsWebhook.name = 'Teams--webhook';
  _teamsWebhook.init = init;
  _teamsWebhook.send = send;

  window.TeamsWebhook = _teamsWebhook;
  return _teamsWebhook;
})();