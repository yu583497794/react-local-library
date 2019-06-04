import React from 'react';
import {connect} from 'react-redux';
import Genre  from '../components/Genre';
import {fetchPostsIfNeeded} from '../actions';

class GenreList extends React.Component {
  componentDidMount () {
    const {dispatch} = this.props;
    dispatch(fetchPostsIfNeeded('genre'))
  }
  render () {
    let {genres, isFetching} = this.props
    return (
      <Genre
        genres={genres}
        loading={isFetching}
      />
    )
  }
}

function mapStateToProps (state, ownProps) {
  let {
    items,
    isFetching
  } = state.postsByCatalog.genre || {
    items: [],
    isFetching: true
  }; 
  return {
    genres: items,
    isFetching
  }
}

export default connect(mapStateToProps)(GenreList);