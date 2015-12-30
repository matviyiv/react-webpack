import expect from 'expect';
import { reducerFirst } from 'flux/reducers';

describe('reducers', function () {
	describe('reducerFirst', function () {
    let initialState;
    beforeEach(function () {
      initialState = {
        example: 1
      };
    });

    it('INCREMENT', function () {
      let action = {
        type: 'INCREMENT'
      };
      expect(reducerFirst(initialState, action).example).toBe(2);
    });

    it('LOADING', function () {
      let action = {
        type: 'LOADING'
      };
      expect(reducerFirst(initialState, action).loadingJSON).toBe(true);
    });

    it('LOADING_FINISHED', function () {
      let action = {
        type: 'LOADING_FINISHED',
        data: { success: true }
      };
      expect(reducerFirst(initialState, action).loadingJSON).toBe(false);
      expect(reducerFirst(initialState, action).loadedData.success).toBe(true);
    });
  });
});