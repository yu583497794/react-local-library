const express = require('express');
const router = require('./routers/index.js');
const app = express();
var http = require('http');
const bodyParser = require('body-parser')
const port = 3030;
// 建立连接
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://ybq:qing9627@cluster0-u9usk.mongodb.net/test?retryWrites=true'
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接失误'));

const book_controller = require('./controllers/bookController.js');
const bookRouter = require('./routers/book')
app.all('*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Origin, Accept, X-Requested-With');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
  next();
})
// 使用中间件解析请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);
// app.get('/books', book_controller.book_list);

// app.set('port', port);

// var server = http.createServer(app);
app.listen(port);
