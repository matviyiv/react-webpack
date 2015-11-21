import { combineReducers, createStore } from 'redux';

let reducer = combineReducers({ reducerFirst, reducerSecond });
let store = createStore(reducer);

module.exports = store;

function reducerFirst(state = {example: 1}, action) {
  const actions = {
    INCREMENT: (st) => {
      st.example += 1;
      return st;
    },
    default: (st) => { return st; }
  };
  const modifier = actions[action.type] || actions.default;

  return modifier(state);
}

function reducerSecond(state = {}) {
  return state;
}
