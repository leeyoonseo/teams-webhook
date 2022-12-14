import React, { useCallback, useEffect } from 'react';
import './App.css';

const App = () => {
 
  useEffect(() => {
    // throw Error('useEffect에서 에러발생!');
  }, []);

  const onClick = useCallback(async() => {
    try {
      new Promise(() => {
        throw Error('Error!')
      });
    } catch (error) {
      /* global TeamsWebhook */
      if (error instanceof Error) {
        window.TeamsWebhook.error(error);
      }
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