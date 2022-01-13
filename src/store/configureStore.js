import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducers from "../reducers/userReducers";
import candidateReducers from "../reducers/candidateReducers";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducers,
      candidate: candidateReducers,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
