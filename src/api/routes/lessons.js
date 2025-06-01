// src/routes/lessons.js
const express = require('express');
const router  = express.Router();
const controller = require('../controllers/lessons');

// record progress
router.post('/:lessonId/progress', controller.saveLessonProgress);

router.post('/:lessonId/result', controller.submitQuizResult);


module.exports = router;
