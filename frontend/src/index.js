import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./modules";
import ReduxThunk from "redux-thunk";
import { tempSetUser, check } from "./modules/user";
import { CookiesProvider } from "react-cookie";
import { HelmetProvider } from "react-helmet-async";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

function loadUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log("localStorage is not working");
  }
}

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <HelmetProvider>
        <CookiesProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </CookiesProvider>
      </HelmetProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
