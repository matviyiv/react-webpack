export function reducerFirst(state = {example: 1}, action) {
  const actions = {
    INCREMENT: (st) => {
      let newState = {
        example: st.example + 1
      };
      return { ...st, ...newState };
    },
    LOADING: (st) => {
      let newState = {
        loadingJSON: true
      };
      return { ...st, ...newState };
    },
    LOADING_FINISHED: (st, data) => {
      let newState = {
        loadingJSON: false,
        loadedData: data
      };

      return { ...st, ...newState };
    },
    default: (st) => { return st; }
  };

  const modifier = actions[action.type] || actions.default;

  return modifier(state, action.data);
}

export function reducerSecond(state = {}) {
  return state;
}