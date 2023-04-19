import React from 'react';
import logo from './logo.svg';
import { getFirebaseValue } from './firebase/firebase_utils';

import './App.css';
import { useApp } from './fetchers/app';

const App = () => {
  const app = useApp();
  console.log(app)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to RELOAD YOU MONSTER.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App