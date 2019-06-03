import React from 'react';
import {connect} from 'react-redux';
import Author from '../components/Author.js';
import {fetchPostsIfNeeded} from '../actions';

class AuthorList extends React.Component {
  componentDidMount () {
    const {dispatch} = this.props;
    dispatch(fetchPostsIfNeeded('author'))
  }
  render () {
    return (
      <Author authors= {this.props.authors}></Author>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const {postsByCatalog} = state;
  const {
    items,
    isFetching,
    lastUpdated
  } = postsByCatalog["author"] ||  {
    items: [],
    isFetching: true
  }
  return {
    authors: items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AuthorList);