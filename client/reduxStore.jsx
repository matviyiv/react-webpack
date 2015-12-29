import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducerFirst, reducerSecond } from 'flux/reducers';

const reducer = combineReducers({ reducerFirst, reducerSecond});
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
)(createStore);

const store = createStoreWithMiddleware(reducer);

export default store;
