import React from 'react';
import {Link} from 'react-router-dom'
import Loading from './Loading/Loading.js'
const Book = function ({books, loading}) {
  return (
    <div>
      <h2>书籍列表</h2>
      {
        loading
        ? (<Loading/>)
        : (<ul>
            {
              books && books.length > 0 ? books.map(book => {
                return (
                  <li key={book._id}>
                    <Link to={`/book/${book._id}`}>{book.title}</Link>
                    <span>{book.author.name}</span>
                  </li>
                )
              }) : (
                <li>{'暂无任何书籍'}</li>
              )
            }
          </ul>
        )
      }
    </div>
  )
}

export default Book;