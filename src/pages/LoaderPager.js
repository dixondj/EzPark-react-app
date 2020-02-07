import React from 'react';
import BigLogo from '../BigLogo.png'

function Loader() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={BigLogo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default Loader;