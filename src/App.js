import React, { useCallback, useEffect } from 'react';
import './App.css';

import TeamsErrorHook from './utils/TeamsErrorHook/index';

const App = () => {
  const onClick = useCallback(async() => {
    try {
      new Promise('/');
    } catch (error) {
      TeamsErrorHook.captureException(error);
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