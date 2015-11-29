import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { find } from 'test-helper';
import HelloContainer from 'ui/hello/HelloContainer.jsx';

describe('HelloContainer', function () {
  var container;

  beforeEach(function () {
    container = TestUtils.renderIntoDocument(<HelloContainer/>);
  });

  it('renders without problems', function () {
    expect(container).toExist();
  });

  it('should have button', function () {
    expect(find(container, '.button')).toExist();
  });
});

