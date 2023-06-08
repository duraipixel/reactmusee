import React from "react";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "font-awesome/css/font-awesome.min.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ReactDOM from "react-dom/client";
import ScrollToTop from "./components/ScrollToTop";

let persistor = persistStore(store);

const RootApp = (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(RootApp);
