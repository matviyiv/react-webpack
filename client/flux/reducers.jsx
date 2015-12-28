export function reducerFirst(state = {example: 1}, action) {
  const actions = {
    INCREMENT: (st) => {
      st.example += 1;
      return st;
    },
    LOADING: (st) => {
      st.loadingJSON = true;
      return st;
    },
    LOADING_FINISHED: (st, data) => {
      st.loadingJSON = false;
      st.loadedData = data;
      return st;
    },
    default: (st) => { return st; }
  };

  const modifier = actions[action.type] || actions.default;

  return modifier(state, action.data);
}

export function reducerSecond(state = {}) {
  return state;
}