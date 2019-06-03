import React from 'react';
import {Link} from 'react-router-dom';
const Sidebar = (props) => {
  return (
    <ul>
      <li>
        <Link to='/'>主页</Link>
      </li>
      <li>
        <Link to='/books'>所有书籍</Link>
      </li>
      <li>
        <Link to='/authors'>所有作者</Link>
      </li>
      <li>
        <Link to='/genres'>所有分类</Link>
      </li>
      <li>
        <Link to='/copys'>所有藏本</Link>
      </li>
    </ul>
  )
}

export default Sidebar;