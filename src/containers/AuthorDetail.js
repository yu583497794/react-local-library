import React from  'react';
import {Link} from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import fecth from  'cross-fetch';
import moment from 'moment';
class AuthorDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      books: [],
      author: {},
      isLoading: true
    }
    this.getAuthorDate = this.getAuthorDate.bind(this);
  }
  componentWillMount () {
    const {match} = this.props;
    fetch(`http://localhost:3030/author/${match.params.id}`)
    .then(res => res.json())
    .then(json => {
      this.setState(json);
      this.setState({
        isLoading: false
      })
    })
  }
  getAuthorDate () {
    const {date_of_birth: birth, date_of_death: death} = this.state.author
    if(!birth && !death) return '';
    return (birth && moment(birth).format('MMMM Do,YYYY') || '') + '~' + ((death && moment(death).format('MMMM Do,YYYY')) || '');
  }
  render () {
    let {isLoading, author, books} = this.state;
    return (
      <div>
        {
          isLoading ? (<Loading/>) : (
            author && (<div>
              <h2>作者: {author.family_name + ',' + author.first_name}</h2>
              <p>{this.getAuthorDate()}</p>
              <h3>作品列表</h3>
              <ul>
                {books.length === 0 ? (<li>暂无任何作品</li>) :
                  books.map(book => {
                    return (
                      <li key={book._id}>
                        <Link to={`/book/${book._id}`}>{book.title}</Link>
                        <p>{book.summary}</p>
                      </li>
                    )
                  })
                }
              </ul>
            </div>)
          )
        }
      </div>
    )
  }
}

export default AuthorDetail;
