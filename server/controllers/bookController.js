const Book = require('../models/book.js');
const Author = require('../models/author.js');
const Genre = require('../models/genre.js');
const BookInstance = require('../models/bookInstance.js');

const {body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

function findBookPromise (id) {
  return new Promise ((resolve, reject) => {
    Book.findById(id)
      .populate('author')
      .populate('genre')
      .exec((err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
  })
}

function findCopysPromise (id) {
  return new Promise((resolve, reject) => {
    BookInstance.find({book: id}, (err, results) => {
      if (err) reject(err);
      else {
        resolve(results);
      }
    })
  })
}

exports.book_list = (req, res, next) => {
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, books) => {
      res.send(books);
    })
}

exports.book_detail = (req, res, next) => {
  async function findBookDetail () {
    return {
      book: await findBookPromise(req.params.id),
      copys: await findCopysPromise(req.params.id)
    }
  }
  findBookDetail().then(result => {
    if (result.book === null) {
      let err = new Error('找不到该书籍');
      err.status = 404;
      return next(err)
    }
    res.json(result);
  }).catch(err => next (err));
}
