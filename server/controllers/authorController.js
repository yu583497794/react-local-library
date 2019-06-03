const Author = require('../models/author');

exports.author_list = function (req, res, next) {
    console.log(req.path)
    Author.find({}, (err, results) => {
        if (err) next(err)
        else {
            res.json(results)
        }
    })
}