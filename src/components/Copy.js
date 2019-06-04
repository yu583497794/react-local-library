import React from 'react';
import Loading from './Loading/Loading';
import moment from 'moment';
import {Link} from 'react-router-dom'
export default function (props) {
  let {loading, copys, addCopy, removeCopy} = props
  return (
    <div>
      {
        loading
        ? <Loading/>
        : (<ul>
            {
              copys.length > 0 ? (
                copys.map(copy => (
                  <li key={copy._id}>
                    <Link to={`/copy/${copy._id}`}>{`${copy.book.title}: `}</Link>
                    <span>{copy.imprint}</span>
                    <span>{'-'}</span>
                    <span>{copy.status}</span>
                    {
                      copy.status === '已借出' && copy.due_back && (<span>{`(预计归还日期:${moment(copy.due_back).format('MMMM Do, YYYY')})`}</span>)
                    }
                    <input
                      type='checkbox'
                      value={copy}
                      onClick={(e) => {
                          if (e.target.checked)
                            addCopy(copy);
                          else
                            removeCopy(copy);
                        }
                      }
                      disabled={copy.status !== '可供借阅'}
                    />
                  </li>
                ))
              )
              : (
                <li>暂无藏本</li>
              )
            }
          </ul>
        )
      }
    </div>
  )
}