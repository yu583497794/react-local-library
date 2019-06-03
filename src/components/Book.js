import React from 'react';
import {Link} from 'react-router-dom'
const Book = function ({books}) {
  return (
    <div>
      <h2>书籍列表</h2>
      <ul>
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
    </div>
  )
}

export default Book;