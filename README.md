# 概述

这是一个使用React, Redux, React-Router, Mongoose等技术实现的本地图书馆

# [React-Router](http://react-guide.github.io/react-router-cn/)

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