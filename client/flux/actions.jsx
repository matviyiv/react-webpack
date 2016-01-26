import fetch from 'ui/utils/fetch';

const LOADING = 'LOADING',
  LOADING_FINISHED = 'LOADING_FINISHED',
  INCREMENT = 'INCREMENT';

export function loadExampleJSON(id) {
  return dispatch => {
    dispatch({
      type: LOADING
    });
    setTimeout(() => { // just to see loading text
      fetch.get(`/_assets/dummy.json?id=${id}`).
        then((response) => {
          dispatch({
            type: LOADING_FINISHED,
            data: response.data
          });
        });
    }, 500);
  };
}

export function increment() {
  return { type: INCREMENT };
}