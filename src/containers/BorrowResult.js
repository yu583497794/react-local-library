import React from 'react';
import {connect} from 'react-redux';

function BorrowResult (props) {
  let {borrowResult} = props;
  return (
    <div>
      <h2>借阅结果</h2>
      {
        (!borrowResult || !borrowResult.length) ? (
          <p>未借阅任何书籍</p>
        ) : (
          <ul>
            {
              borrowResult.map(result => {
                return  (
                  <li key ={result.id}>
                    <section>
                      <span>{result.title}:</span>
                      <span>{result.code}</span>
                    </section>
                    <section>
                      <span>id:</span>
                      <span>{result.id}</span>
                    </section>
                  </li>
                )
              })
            }
          </ul>
        )
      }
    </div>
  )
}

function mapStateToProps (state) {
  return {
    borrowResult: state.borrowResult
  }
}

export default connect(mapStateToProps)(BorrowResult);