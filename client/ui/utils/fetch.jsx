import _ from 'lodash';

export default {
  get: get,
  post: post
};

function get(url) {
  return fetch(url).
    then(responseHandler);
}

function post(url, body) {
  return fetch(url, { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: _.attempt(JSON.stringify.bind(null, body))
  }).
  then(responseHandler);
}

function responseHandler(res) {
  if (res.status >= 300) {
    return Promise.reject({
      status: res.status,
      text: res.statusText
    });
  }
  return res.json();
}