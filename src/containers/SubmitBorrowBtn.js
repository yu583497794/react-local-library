import React from 'react';
import {submitBorrowList} from '../actions';
import {connect} from 'react-redux';

class SubmitBorrowBtn extends React.Component {
  constructor (props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit () {
    let {borrowList:list, dispatch} = this.props;
    dispatch(submitBorrowList(list))
  }
  render () {
    let {borrowList} = this.props;
    return (
      <div>
        <button onClick={this.submit} disabled={borrowList.length === 0}>提交借阅表</button>
        <span style={{color: 'red'}}>{borrowList.length || ''}</span>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    borrowList: state.selectedCopys
  }
}

// function mapDispatchToProps (dispatch, ownProps) {
//   return {
//     submit: () => {
//       const list = ownProps.borrowList;
//       console.log('list')
//       console.log(list)
//       dispatch(submitBorrowList(list));
//     }
//   }
// }

SubmitBorrowBtn = connect(
  mapStateToProps
  // ,
  // mapDispatchToProps
)(SubmitBorrowBtn);

export default SubmitBorrowBtn;