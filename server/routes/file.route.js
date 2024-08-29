const express = require('express');
const router = express.Router();

const { createFile, getFile, getFileById } = require('../controllers/file.controllers');

router.get('/', getFile);
router.get('/:id', getFileById);
router.post('/', createFile);

module.exports = router;