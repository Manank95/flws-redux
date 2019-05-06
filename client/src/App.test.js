
import expect from 'expect' 
import itemsReducer from '../src/reducers/itemsReducer';
import * as types from '../src/actions/itemsAction';

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(itemsReducer(undefined, {})).toEqual(
      {
        error: null,
        items: [],
        loading: false
      }
    )
  });

  it('should handle FETCH_ITEMS_BEGIN', () => {
    expect(
      itemsReducer([], {
        type: types.FETCH_ITEMS_BEGIN,
        text: 'Run the tests'
      })
    ).toEqual(
      {
        error: null,
        loading: true
      }
    );
  });

  it('should handle FETCH_ITEMS_SUCCESS', () => {
    expect(
      itemsReducer([], {
        type: types.FETCH_ITEMS_SUCCESS,
        payload: {
          data: [{id: 1, title: 'first post'}]
        }
      })
    ).toEqual(
      {
        items: [{id: 1, title: 'first post'}],
        loading: false
      }
    );
  });

  it('should handle FETCH_ITEMS_FAILURE', () => {
    expect(
      itemsReducer([], {
        type: types.FETCH_ITEMS_FAILURE,
        payload: {
          error: 'got an error'
        }
      })
    ).toEqual(
      {
        items: [],
        loading: false,
        error: 'got an error'
      }
    );
  });

  it('should handle ADD', () => {
    expect(
      itemsReducer({
        items: [{id: 1, title: 'hi', body: 'hello'}],
        loading: false,
        error: null
      }, {
        type: 'ADD',
        data: {
          newTitle: 'hh',
          newBody: 'mm'
        }
      })
    ).toEqual(
      {
        items: [{id: 1, title: 'hi', body: 'hello'}, {id: 2, title: 'hh', body: 'mm', userId: 1}],
        loading: false,
        error: null
      }
    );
  });

  it('should handle UPDATE', () => {
    expect(
      itemsReducer({
        items: [{id: 1, title: 'hi', body: 'hello'}],
        loading: false,
        error: null
      }, {
        type: 'UPDATE',
        id: 1,
        data: {
          newTitle: 'hh',
          newBody: 'mm'
        }
      })
    ).toEqual(
      {
        items: [{id: 1, title: 'hh', body: 'mm'}],
        loading: false,
        error: null
      }
    );
  });

  it('should handle DELETE', () => {
    expect(
      itemsReducer({
        items: [{id: 1, title: 'hi', body: 'hello'}],
        loading: false,
        error: null
      }, {
        type: 'DELETE',
        id: 1
      })
    ).toEqual(
      {
        items: [],
        loading: false,
        error: null
      }
    );
  });
})