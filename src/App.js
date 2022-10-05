import React, { useCallback, useEffect } from 'react';
import './App.css';
import TeamsErrorHook from './modules/TeamsErrorHook/index';

const App = () => {
  useEffect(() => { // react strict mode 때문에 2번 렌더링 됨
    // TeamseErrorHook Example 1.
    // throw Error('NEW Error!!2222!');
  }, []);


  const onClick = useCallback(async() => {
    try {
      new Promise('/');
    } catch (error) {
      // TeamseErrorHook Example 2.
      TeamsErrorHook.catch(error);
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