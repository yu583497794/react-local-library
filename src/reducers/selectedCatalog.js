import {SELECT_CATALOG} from '../actions.js'

export default function (state = "", action) {
  switch(action.type) {
    case SELECT_CATALOG:
      return action.catalog;
    default :
      return state;
  }
}