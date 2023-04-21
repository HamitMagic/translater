import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './toolkitRedux';
import './index.css';

function Main() {
  const [isLogin, setLogin] = useState(false)
  return (
    <React.StrictMode>
    <Provider store={store}>
        <App isLogin={isLogin} setLogin={setLogin} />
    </Provider>
  </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)
