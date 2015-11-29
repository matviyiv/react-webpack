import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

export function find(component, cssSelector) {
  return ReactDOM.findDOMNode(component).querySelector(cssSelector);
}

export function findAll(component, cssSelector) {
  return ReactDOM.findDOMNode(component).querySelectorAll(cssSelector);
}

export function click(component, cssSelector) {
  return TestUtils.Simulate.click(find(component, cssSelector));
}