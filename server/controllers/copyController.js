const Copy = require('../models/bookInstance.js');

exports.copy_list = function (req, res, next) {
  Copy.find({})
    .populate('book')
    .exec((err, results) => {
      if (err) next(err)
      else res.json(results)
    })
}

async function borrowOne (copy) {
  let res = await new Promise((resolve, reject) => {
    Copy.findById(copy._id, (err, result) => {
      if (err) resolve(null)
      else resolve(result)
    })
  })
  console.log(res);
  if (res && res.status === '可供借阅') {
    let newCopy = new Copy(Object.assign({}, res, {
      status: '已借出',
      _id: copy._id
    }))
    let code = await new Promise((resolve, reject) => {
      Copy.findByIdAndUpdate(copy._id, newCopy, {}, (err, result) => {
        if (err) resolve('Failure');
        else {
          console.log('success')
          resolve('Success');
        }
      })
    })
    return code;
  } else {
    return 'Failure'
  }
}
// async function borrowAll(list) {
//   return list.map(copy => ({
//     id: copy._id,
//     code: borrowOne (copy)
//   }))
// }
async function borrowAll(list) {
  return list.map(async (copy) => {
    return {
      id: copy._id,
      code: await borrowOne(copy)
    }
  })
}
exports.borrow = function (req, res, next) {
  const list = req.body;
  borrowAll(list).then(response => {
    console.log(response)
    res.json(response)
  }).catch(err => next(err)) 
}

// function rendOne(copy) {
//   Copy.find
// }
// exports.rend = function(req, res, next) {
//   const copy = req.copy;
//   rendOne(copy).then()
// }