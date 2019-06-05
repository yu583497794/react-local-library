# 概述

这是一个使用React, Redux, React-Router, Mongoose等技术实现的本地图书馆

# [React-Router](http://react-guide.github.io/react-router-cn/)

# [cross-fetch](https://github.github.io/fetch/)

1. 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise __不会被标记为 reject__， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。

2. 默认情况下，fetch __不会从服务端发送或接收任何 cookies__, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。

# 难点

## 异步并发请求

```js
async function queryAll (queryList) {
  // 生成所有请求的promise列表
  let queryPromises = queryList.map(async query => {
    return {
      code: await sendQuery(query),
      id: query.id
    }
  })
  return Promise.all(queryPromises)
}
```

## action: borrow

### 页面跳转

[react-router-redux](https://github.com/reactjs/react-router-redux)

```
$ cnpm i react-router-redux -S
```

该库enhance了history实例，允许它将接收到的任何更改同步到应用程序状态。

> history + store (redux) → __react-router-redux__ → enhanced history → react-router

```js
import {createBrowserHistory} from 'history';
// 提供新的reducer, 通过combineReducers加入到state树的routing中
import {routerReducer, syncHistoryWithStore} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

const browserHistory = createBrowserHistory();
const middleware = routerMiddleware(browserHistory);

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers, // 应该是以对象传入的reducers, 而不是已经combine的reducer
    routing: routerReducer
  }), applyMiddleware(middleware, thunkMiddleware)
)

const history = syncHistoryWithStore(browserHistory, store);

// 之后还需要将 store 和 history 分别加入到 Provider 和 Router中
```

> You must install routerMiddleware for these action creators to work.

#### routerMiddle(history)

A middleware you can apply to your Redux store to capture dispatched actions created by the action creators. It will redirect those actions to the provided history instance.

#### 访问router state的方法

通过connect

```js
  mapStateToProps(state, ownProps) {
    return {
      id: ownProps.params.id,
      filter: ownProps.location.query.filter
    }
  }
```

# 问题

## 跨域

在服务器端设置响应头,添加下方属性

```
app.all('*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Origin, Accept, X-Requested-With');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
  next();
})
```

## POST方法

设置请求头

```
headers: {
  'Content-Type': 'application/json'
}
```

需要使用[body-parser](https://www.npmjs.com/package/body-parser)中间件解析请求体, 否则无法通过req.body取得请求体

```
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.encode);
```

### bodyParser.json([options])

__Returns middleware__ that only __parses json__ and only looks at requests where the __Content-Type header matches the type option__. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.

A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).

### bodyParser.raw([options])

Returns middleware that parses all bodies as a __Buffer__ and only looks at requests where the Content-Type header matches the type option. This parser supports automatic inflation of gzip and deflate encodings.

A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This will be a Buffer object of the body.

### bodyParser.text([options])

Returns middleware that __parses all bodies as a string__ and only looks at requests where the Content-Type header matches the type option. This parser supports automatic inflation of gzip and deflate encodings. 

text/plain

A new body string containing the parsed data is populated on the request object after the middleware (i.e. req.body). This will be a string of the body.

### bodyParser.urlencoded([options])

Returns middleware that only parses __urlencoded bodies__ and only looks at requests where the Content-Type header matches the type option. This parser accepts __only UTF-8 encoding of the body__ and supports __automatic inflation of gzip and deflate encodings__.

A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain __key-value pairs__, where the value can be a string or array (when extended is false), or any type (when extended is true).

#### Options

##### extends

使用什么库来解析URL编码的数据?\
true: querystring 库\
false: qs库

“扩展”语法允许将丰富的对象和数组编码为URL编码格式，允许使用URL编码的类似JSON的体验。