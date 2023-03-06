import React from "react";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "font-awesome/css/font-awesome.min.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { hydrate, render } from "react-dom";

let persistor = persistStore(store);

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HashRouter>
            <App />
          </HashRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    rootElement
  );
}
