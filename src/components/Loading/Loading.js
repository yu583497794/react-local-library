import React from 'react'
import './loading.styl';
export default  function (props) {
    return (
        <div className='loading'>
            Loading <span className='dot'>...</span>
        </div>
    )
}