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
import rootReducer from './reducers/index'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import Home  from './containers/Home';
import BookList from './containers/BookList';
import AuthorList from './containers/AuthorList';
import GenreList from './containers/GenreList';
import CopyList from './containers/CopyList';

import BookDetail from './containers/BookDetail.js'

const store = createStore(rootReducer,
  applyMiddleware(thunkMiddleware));

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


const customHistory = createBrowserHistory();
class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <HashRouter history={customHistory}>
          <Sidebar></Sidebar>
          <Route exact path='/' component={Home}></Route>
          <Route path='/books' component={BookList}></Route>
          <Route path='/book/:id' component={BookDetail}></Route>
          <Route path='/authors' component={AuthorList}></Route>
          <Route path='/genres' component={GenreList}></Route>
          <Route path='/copys' component={CopyList}></Route>
        </HashRouter>
      </Provider>
    )
  }
}

ReactDOM.render((
  <App />
), document.getElementById('root'))