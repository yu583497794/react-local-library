export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_CATALOG = 'SELECT_CATALOG';
export const INVALIDATE_CATALOG = 'INVALIDATE_CATALOG';

import fetch from 'cross-fetch';

export function selectCatalog (catalog) {
  return {
    type: SELECT_CATALOG,
    catalog
  }
}

export function invalidateCatalog (catalog) {
  return {
    type: INVALIDATE_CATALOG,
    catelog
  }
}

export function requestPosts (catalog) {
  return {
    type: REQUEST_POSTS,
    catalog
  }
}

export function receivePosts (catalog, json) {
  return {
    type: RECEIVE_POSTS,
    catalog,
    json,
    receiveAt: Date.now()
  }
}

function shouldFetchPosts(states, catalog) {
  const posts = states.postsByCatalog[catalog];
  if (!posts) return true
  if (posts.isFetching) return false;
  return posts.didInvalidate;
}

export function fetchPosts (catalog) {
  return (dispatch, getState) => {
    dispatch(requestPosts(catalog))
    return fetch(`http://localhost:3030/${catalog}s`)
      .then(response => response.json())
      .then(json => {
        // 不是 return receivePosts(catalog, json)
        return dispatch(receivePosts(catalog, json))
      })
  }
}

export function fetchPostsIfNeeded(catalog) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), catalog)) {
      return dispatch(fetchPosts(catalog))
    }
  }
}

export function addCopyIfNeeded(copy) {
  return (dispatch, getState) => {
    if (copy.status === '可供借阅') {
      return dispatch(addCopy(copy));
    }
  }
}

export function addCopy (copy) {
  return {
    type: 'ADD_COPY',
    copy
  }
}
export function removeCopy (copy) {
  return {
    type: 'REMOVE_COPY',
    copy
  }
}

export function submitBorrowList (list) {
  // let formData = new FormData();
  // formData.append('borrowList', list);
  // console.log(formData)
  console.log(list)
  let json = JSON.stringify(list)
  console.log(json)
  return (dispatch, getState) => {
    fetch('http://localhost:3030/borrow', {
      method: 'POST',
      body: json,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      mode: 'cors'
    })
    .then(response => response.json())
    .then(json => console.log(json))
  }
}

export function updateCopy() {
  return (dispatch, getState) => {
    return dispatch(fetchPosts('copy'));
  }
}