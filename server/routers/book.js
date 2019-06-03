const express = require('express');
const router = express.Router();
const book_controller = require('../controllers/bookController');

router.get('/:id', book_controller.book_detail);

module.exports = router;