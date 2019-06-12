const express = require('express');
const router = express.Router();
const copyController = require('../controllers/copyController');

router.get('/:id', copyController.copy_detail);

module.exports = router;