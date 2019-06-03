import React from 'react';
import {connect} from 'react-redux';
import {fetchPostsIfNeeded} from '../actions';
import Book from '../components/Book';

function mapStateToProps (state, ownProps) {
  const {postsByCatalog} = state;
  const {
    isFetching,
    lastUpdated,
    items
  } = postsByCatalog["book"] || {
    isFetching: true,
    items: []
  }
  console.log(state.postsByCatalog["book"])
  return {
    books: items,
    isFetching,
    lastUpdated
  }
}

class BookList extends React.Component {
  componentDidMount () {
    const {dispatch} = this.props;
    dispatch(fetchPostsIfNeeded("book"))
    console.log('query')
  }
  // componentWillReceiveProops(nextState) {
  // }
  render () {
    return (
      <Book books={this.props.books}></Book>
    )
  }
}
// function mapDispatchToProps(dispatch, ownProps) {
//   return {
//     items: dispatch(fetchPostsIfNeeded("books"))
//   }
// }

BookList = connect(mapStateToProps)(BookList);

export default BookList;