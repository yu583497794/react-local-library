const Copy = require('../models/bookInstance.js');

exports.copy_list = function (req, res, next) {
  Copy.find({})
    .populate('book')
    .exec((err, results) => {
      if (err) next(err)
      else res.json(results)
    })
}

function findOne (copy) {
  return new Promise((resolve, reject) => {
    Copy.findById(copy._id, (err, result) => {
      if (err) resolve(null)
      else resolve(result)
    })
  })
}
async function borrowOne (copy) {
  let getCopy = findOne(copy);
  let res = await getCopy;
  console.log(res);
  if (res && res.status === '可供借阅') {
    let newCopy = new Copy(Object.assign({}, res, {
      status: '已借出',
      _id: copy._id
    }))
    let code = await new Promise((resolve, reject) => {
      Copy.findByIdAndUpdate(copy._id, newCopy, {}, (err, result) => {
        if (err) resolve('未知错误,借书失败');
        else {
          resolve('借书成功');
        }
      })
    })
    return code;
  } else {
    return '该藏书处于不可借状态'
  }
}
// async function borrowAll(list) {
//   return list.map(copy => ({
//     id: copy._id,
//     code: borrowOne (copy)
//   }))
// }
async function borrowAll(list) {
  return await Promise.all(list.map(async (copy) => {
    return {
      id: copy._id,
      title: copy.book.title,
      code: await borrowOne(copy)
    }
  }))
}
exports.borrow = function (req, res, next) {
  const list = req.body;
  borrowAll(list).then(response => {
    console.log(response)
    res.json(response)
  }).catch(err => next(err))
}

async function rendOne(copy) {
  let getCopy =  findOn(copy);
  let res = await getCopy;
  if (res.status === '已借出') {
    Copy.findByIdAndUpdate(copy._id, {
      _id: copy._id,
      status: '可供借阅'
    }, (err, result) => {
      if (err) resolve('归还失败');
      else resolve('归还成功');
    })
  } else {
    return '该藏书是未借出状态'
  }
}

exports.rend = function(req, res, next) {
  const copy = req.copy;
  rendOne(copy).then(response => {
    res.json(response)
  }).catch(err => next(err)); 
}

function findDetailOne (id) {
  return new Promise((resolve, reject) => {
    Copy.findById(id)
    .populate('book', 'title')
    .exec((err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

exports.copy_detail = function (req, res, next) {
  const id = req.params.id;
  findDetailOne(id)
  .then(response => {
    if (response === null) {
      const err = new Error('找不到该副本');
      err.status = 404;
      next(err);
    } else {
      res.json(response);
    }
  })
  .catch(err => next(err));
}