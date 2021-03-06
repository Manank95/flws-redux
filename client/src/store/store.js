import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const defaultState = {};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store;