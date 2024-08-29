const express = require('express');
const router = express.Router();

const { createStudent, getStudent } = require('../controllers/user.controllers');

router.get('/', getStudent);
router.post('/', createStudent);

module.exports = router;

