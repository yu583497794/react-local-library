const Author = require('../models/author');
const Book = require('../models/book');
exports.author_list = function (req, res, next) {
    Author.find({}, (err, results) => {
        if (err) next(err)
        else {
            res.json(results)
        }
    })
}

function findOne (id) {
    return new Promise((resolve, reject) => {
        Author.findById(id, (err, result) => {
            if(err) reject(err)
            else resolve(result)
        })
    })
}
function findBooks (id) {
    return new Promise((resolve, reject) => {
        Book.find({author: id}, 'title summary', (err, results) => {
            if(err) reject(err)
            else resolve(results)
        })
    })
}
exports.author_detail = function (req, res, next) {
    const id = req.params.id;
    async function findAuthorBooks () {
        let author = findOne(id);
        let books = findBooks(id);
        return {
            author: await author,
            books: await books
        }
    }
    findAuthorBooks()
        .then(response => {
            if (response.author == null) {
                let err =  new Error('未知书籍');
                err.status = 404;
                next(err);
            } else {
                console.log(response)
                res.json(response);
            }
        }).catch(err => next(err))
}