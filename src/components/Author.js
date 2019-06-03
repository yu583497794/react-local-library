import React from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment';
const Author = function ({authors}) {
  return (
    <div>
      <h2>作者列表</h2>
      <ul>
        {
          authors && authors.length > 0 ? authors.map(author => {
            return (
              <li key={author._id}>
                <Link to={`/author/${author._id}`}>{`${author.family_name} ${author.first_name}`}</Link>
                <span>{'('}{`${(author.date_of_birth && moment(author.date_of_birth).format('MMMM Do, YYYY')) || ' '} ~ ${(author.date_of_death && moment(author.date_of_death).format('MMMM Do, YYYY')) || ' '}`}{')'}</span>
              </li>
            )
          }) : (
            <li>{'暂无任何作者'}</li>
          )
        }
      </ul>
    </div>
  )
}

export default Author;