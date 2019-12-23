import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { requestFonts, receiveFonts, fetchFonts } from './actions';
import reducer from './reducers';

export default createStore(reducer, applyMiddleware(thunkMiddleware));
