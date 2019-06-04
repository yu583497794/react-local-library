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
  }
  // componentWillReceiveProops(nextState) {
  // }
  render () {
    let {books, isFetching} = this.props;
    return (
      <Book books={books} loading={isFetching}></Book>
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