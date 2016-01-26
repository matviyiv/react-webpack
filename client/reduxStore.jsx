import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducerFirst, reducerSecond } from 'flux/reducers';

const reducer = combineReducers({ reducerFirst, reducerSecond}),
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )(createStore),
  store = createStoreWithMiddleware(reducer);

export default store;
