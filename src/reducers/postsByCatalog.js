import {
  INVALIDATE_CATALOG,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions';

function posts (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch(action.type) {
    case INVALIDATE_CATALOG:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
      console.log('receive', action.json)
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.json,
        lastUpdated: action.receiveAt
      });
    default:
      return state;
  }
}

export default function postsByCatalog (state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CATALOG:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.catalog]: posts(state[action.catalog], action)
      })
    default:
      return state;
  }
}