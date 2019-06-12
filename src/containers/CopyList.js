import React from 'react';
import {connect} from 'react-redux';
import Copy from '../components/Copy';
import {fetchPostsIfNeeded, addCopyIfNeeded, removeCopy} from '../actions';
import SubmitBorrowBtn from './SubmitBorrowBtn';

class CopyList extends React.Component  {
  constructor (props) {
    super(props);
    this.addCopy = this.addCopy.bind(this);
    this.removeCopy = this.removeCopy.bind(this);
  }
  componentDidMount () {
    const  {dispatch} = this.props;
    dispatch(fetchPostsIfNeeded('copy'))
  }
  addCopy (copy) {
    const {dispatch} = this.props;
    dispatch(addCopyIfNeeded(copy))
  }
  removeCopy (copy) {
    const {dispatch} = this.props;
    dispatch(removeCopy(copy))
  }
  render () {
    let {copys, isFetching, selectedCopys} = this.props 
    return (
      <div>
        <h2>藏书列表</h2>
        <Copy
          copys={copys}
          loading={isFetching}
          addCopy = {this.addCopy}
          removeCopy = {this.removeCopy}
          selectedCopys = {selectedCopys}
        />
        <SubmitBorrowBtn></SubmitBorrowBtn>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  let {
    items,
    isFetching
  } = state.postsByCatalog.copy || {
    items: [],
    isFetching: true
  }
  let {selectedCopys} = state;
  return {
    copys: items,
    isFetching,
    selectedCopys
  }
}

export default connect(mapStateToProps)(CopyList);