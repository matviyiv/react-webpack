exports.isBrowser = isBrowser;

function isBrowser() {
  return typeof window != 'undefined';
}