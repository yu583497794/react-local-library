const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/:id', authorController.author_detail)

module.exports = router;