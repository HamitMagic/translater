import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Store from './mobx/store';
import { createContext } from 'react';

const store = new Store();
export const Context = createContext({store})

function Main() {
  
  return (
    // <React.StrictMode>
      <Context.Provider value={{store}}>
          <App />
      </Context.Provider>
  // </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)
