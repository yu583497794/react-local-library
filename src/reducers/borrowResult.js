export default function borrowResult (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_BORROW_RESULT' :
      console.log(action.list)
      return action.list;
    default:
      return state;
  }
}