import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { startSetUser } from "./actions/usersActions";
import App from "./App";
import configureStore from "./store/configureStore";

const store = configureStore();
console.log(store.getState());

// for handling page reloads
if (localStorage.getItem("authToken")) {
  store.dispatch(startSetUser());
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
