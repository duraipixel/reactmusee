import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter  >
          <App />
        </HashRouter >
      </PersistGate>
    </Provider>
  </React.StrictMode>
);