const express = require('express');
const router = express.Router();

const { createProject, getProject, getProjectById, updateProject } = require('../controllers/project.controllers');

router.get('/', getProject);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.post('/', createProject);

module.exports = router;