import React from 'react';
import fetch from 'cross-fetch';
import Loading from '../components/Loading/Loading';
import {Link} from 'react-router-dom'
/* import { createBrowserHistory } from 'history';
import { lift } from 'when'; */

class GenreDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      genre: {},
      books: [],
      isLoading: true
    }
  }
  componentWillMount() {
    let {match} = this.props;
    console.log('id', match.params.id)
    fetch(`http://localhost:3030/genre/${match.params.id}`)
      .then(response => response.json())
      .then(json => {
        this.setState(json)
        this.setState({
          isLoading: false
        })
      })
  }
  render () {
    let {isLoading, genre, books} = this.state;
    return (
      <div>
        {
          isLoading ? (<Loading/>) : (
            genre && <div>
              <h2>{'类别:' + genre.name}</h2>
              <h3>列表</h3>
              <ul>
                {books.map(book => (
                  <li key={book._id}>
                    <Link to={`/book/${book._id}`}>{book.title}</Link>
                    <p>{book.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      </div>
    )
  }
}

export default GenreDetail;