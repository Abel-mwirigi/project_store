const express = require('express');
const router = express.Router();

const { createField, getField } = require('../controllers/field.controllers');

router.get('/', getField);
router.post('/', createField);

module.exports = router;