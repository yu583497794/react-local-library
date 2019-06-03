const express= require('express');
const router = express.Router();
const bookRouter = require('./book.js');
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
router.get('/books', bookController.book_list);
router.use('/book', bookRouter);
router.get('/authors', authorController.author_list);
module.exports = router;