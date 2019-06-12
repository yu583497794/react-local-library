import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/Sidebar';
import {Provider} from 'react-redux';
import {
  Router,
  Route,
  Switch
} from 'react-router';

import {
  HashRouter,
  Link
} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import reducer from './reducers/index'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {createLogger} from 'redux-logger';
// 4.X 不再有browserHistory
// import {browserHistory}  from 'react-router';
import Home  from './containers/Home';
import BorrowResult from './containers/BorrowResult';
import BookList from './containers/BookList';
import AuthorList from './containers/AuthorList';
import GenreList from './containers/GenreList';
import CopyList from './containers/CopyList';

import BookDetail from './containers/BookDetail';
import AuthorDetail from './containers/AuthorDetail'
import GenreDetail from './containers/GenreDetail';
import CopyDetail from './containers/CopyDetail';
const customHistory = createBrowserHistory();
const middleware = routerMiddleware(customHistory);
// const rootReducer = combineReducers({
//   ...reducer,
//   routing: routerReducer
// })
const store = createStore(reducer,
  applyMiddleware(createLogger(), middleware, thunkMiddleware));

// class App extends React.Component {
//   render() {
//     return (
//       <Provider store ={store}>
//         <Sidebar></Sidebar>
//         <HashRouter>
//           <Route path='/books' component={BookList}></Route>
//           <Route path='/authors' component={AuthorList}></Route>
//           <Route path='/genres' component={GenreList}></Route>
//           <Route path='/copys' component={CopyList}></Route>
//           <Route path='/book/:id' component={BookDetail}>
//             {/* <Route path=':id' component={BookDetail}></Route> */}
//           </Route>
//         </HashRouter>
//         {/* {this.props.children || "Welcome to local library"} */}
//       </Provider>
//     )
//   }
// }

// ReactDOM.render((
//   <HashRouter >
//     <Route path='/' component={App}>
//       {/* <IndexRoute component={Home}/> */}
//     </Route>
//     {/* <Route path='/books' component={BookList}></Route>
//     <Route path='/authors' component={AuthorList}></Route>
//     <Route path='/genres' component={GenreList}></Route>
//     <Route path='/copys' component={CopyList}></Route> */}
//     {/* <Redirect from='/' to='/books'></Redirect> */}
//   </HashRouter>
// ), document.getElementById('root'));
const history = syncHistoryWithStore(customHistory, store)
class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Sidebar></Sidebar>
          <Route exact path='/' component={Home}></Route>
          <Route path='/books' component={BookList}></Route>
          <Route path='/book/:id' component={BookDetail}></Route>
          <Route path='/authors' component={AuthorList}></Route>
          <Route path='/author/:id' component={AuthorDetail}></Route>
          <Route path='/genres' component={GenreList}></Route>
          <Route path='/genre/:id' component={GenreDetail}></Route>
          <Route path='/copys' component={CopyList}></Route>
          <Route path='/copy/:id' component={CopyDetail}></Route>
          <Route path='/borrow' component={BorrowResult}></Route>
      </Router>
      </Provider>
    )
  }
}

ReactDOM.render((
  <App />
), document.getElementById('root'))