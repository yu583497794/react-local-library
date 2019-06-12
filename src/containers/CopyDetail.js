import React from 'react';
import fetch from 'cross-fetch';
import moment from 'moment';
import Loading from '../components/Loading/Loading';
import {Link} from 'react-router-dom';
import CartBtn from './CartBtn';

class CopyDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      copy: {},
      isLoading: true
    }
  }
  componentWillMount () {
    const {match} = this.props;
    fetch(`http://localhost:3030/copy/${match.params.id}`)
    .then((res) => res.json())
    .then(json => {
      this.setState({
        copy: json,
        isLoading: false
      })
    })
  }
  render () {
    let {isLoading, copy} = this.state
    return (
      <div>
        {
          isLoading ? (<Loading/>) : (
            copy && (<div>
              <p><strong>书名:</strong><Link to={`/book/${copy.book._id}`}>{copy.book.title}</Link></p>
              <p><strong>出版信息:</strong>{copy.imprint}</p>
              <p><strong>当前状态:</strong>{copy.status}</p>
              {copy.status === '已借出' && copy.due && (<p><strong>预计归还</strong>{copy.due &&moment(copy.due).format('MMMM Do, YYYY')}</p>)}
              {copy.status === '可供借阅' && <CartBtn copy={copy}/>}
            </div>)
          )
        }
      </div>
    )
  }
}

export default CopyDetail;