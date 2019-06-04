export default function selectedCopy (state = [], action) {
  switch (action.type) {
    case 'ADD_COPY':
      console.log('add one')
      return [
        ...(new Set(state).add(action.copy))
      ]
    case 'REMOVE_COPY':
      return state.filter(item => item._id !== action.copy._id)
    default:
      return state;
  }
}