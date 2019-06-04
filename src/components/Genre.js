import React from 'react';
import {Link} from 'react-router-dom'
import Loading from './Loading/Loading.js'
const Genre = function ({genres, loading, title, name, other}) {
  return (
    <div>
      <h2>分类列表</h2>
      {
        loading
        ? (<Loading/>)
        : (<ul>
            {
              genres && genres.length > 0 ? genres.map(genre => {
                return (
                  <li key={genre._id}>
                    <Link to={`/genre/${genre._id}`}>{genre.name}</Link>
                  </li>
                )
              }) : (
                <li>{'暂无任何信息'}</li>
              )
            }
          </ul>
        )
      }
    </div>
  )
}

export default Genre;