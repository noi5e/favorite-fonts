import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from "redux-logger";
import { requestFonts, receiveFonts, fetchFonts, userLoginSuccess } from './actions';
import reducer from './reducers';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

export default createStore(reducer, applyMiddleware(...middlewares));
