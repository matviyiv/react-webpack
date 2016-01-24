import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { findAll, click } from 'test-helper';
import { HelloContainer } from 'ui/hello/HelloContainer.jsx';

describe('HelloContainer', function () {
  var container, props;

  beforeEach(function () {
    props = {
      actions: {
        increment: expect.createSpy(),
        loadExampleJSON: expect.createSpy()
      }
    };
    container = TestUtils.renderIntoDocument(<HelloContainer {...props} />);
  });

  afterEach(function () {
    expect.restoreSpies();
  });

  it('renders without problems', function () {
    expect(container).toExist();
  });

  it('should have buttons', function () {
    expect(findAll(container, 'button').length).toBe(2);
  });

  it('should call increment action', function () {
    click(container, '.hello__button-increment');
    expect(props.actions.increment).toHaveBeenCalled();
  });

  it('should start loading JOSN', function () {
    click(container, '.hello__button-load');
    expect(props.actions.loadExampleJSON).toHaveBeenCalledWith(111);
  });
});

