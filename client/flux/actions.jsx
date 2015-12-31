import fetch from 'ui/utils/fetch';

const LOADING = 'LOADING';
const LOADING_FINISHED = 'LOADING_FINISHED';
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

const INCREMENT = 'INCREMENT';
export function increment() {
  return { type: INCREMENT };
}