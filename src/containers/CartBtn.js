import React from 'react';
import {connect} from 'react-redux';
import {addCopy, removeCopy} from '../actions';
// ownProps 包括 copy
class CartBtn extends React.Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }
  toggle (e) {
    const {dispatch, copy} = this.props;
    console.log('toggle')
    if (!e.target.checked) {
      console.log('remove')
      dispatch(removeCopy(copy));
    } else {
      console.log('add')
      dispatch(addCopy(copy));
    }
  }
  render () {
    const {selected} = this.props;
    return (
      <div>
        <input type='checkbox' defaultChecked={selected} onClick={this.toggle}/>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    selected: state.selectedCopys.some(copy => copy._id === ownProps.copy._id)
  }
}

export default connect(mapStateToProps)(CartBtn);