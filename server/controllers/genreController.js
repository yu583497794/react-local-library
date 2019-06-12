const Genre = require('../models/genre');
const Book = require('../models/book');
exports.genre_list = function (req, res, next) {
  Genre.find({}, 'name', (err, results) => {
    if (err) next(err)
    else res.json(results)
  })
}

function findOne(id) {
  return new Promise((resolve, reject) => {
    Genre.findById(id)
      .populate('book')
      .exec((err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
  }) 
}

function findBooks (id) {
  return new Promise((resolve, reject) => {
      Book.find({
      'genre': id
    }, (err, res) => {
      if(err) reject(err)
      else  resolve(res)
    })
  })
}

exports.genre_detail = function (req, res, next) {
  const id = req.params.id;
  async function findGenreBooks () {
    let genre = findOne(id);
    let books = findBooks(id);
    return {
      genre: await genre,
      books: await books
    }
  }
  findGenreBooks()
    .then(response => {
      if (response.genre == null) {
        let err = new Error('未知分类');
        err.status = 404;
        next(err);
      } else res.json(response);
    })
    .catch(err => next(err))
}