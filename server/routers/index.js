const express= require('express');
const router = express.Router();
const bookRouter = require('./book.js');
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const copyController = require('../controllers/copyController');

router.get('/books', bookController.book_list);
router.use('/book', bookRouter);
router.get('/authors', authorController.author_list);
router.get('/genres', genreController.genre_list);
router.get('/copys', copyController.copy_list);
router.post('/borrow', copyController.borrow);

module.exports = router;