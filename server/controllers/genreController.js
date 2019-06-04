const Genre = require('../models/genre');

exports.genre_list = function (req, res, next) {
  Genre.find({}, 'name', (err, results) => {
    if (err) next(err)
    else res.json(results)
  })
}