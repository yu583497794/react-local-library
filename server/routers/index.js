const express= require('express');
const router = express.Router();
const bookRouter = require('./book');
const genreRouter = require('./genre');
const authorRouter = require('./author');
const copyRouter = require('./copy')
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const copyController = require('../controllers/copyController');

router.use('/book', bookRouter);
router.use('/genre', genreRouter);
router.use('/author', authorRouter);
router.use('/copy', copyRouter);

router.get('/books', bookController.book_list);
router.get('/authors', authorController.author_list);
router.get('/genres', genreController.genre_list);
router.get('/copys', copyController.copy_list);
router.post('/borrow', copyController.borrow);

module.exports = router;