const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/:id', genreController.genre_detail);

module.exports = router;