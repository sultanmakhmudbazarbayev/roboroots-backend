const express = require('express');
const router = express.Router();

const controller = require('../controllers/courses');


router.post('/', controller.createCourse);

router.get('/', controller.getAllCourses);

router.get('/enrolled', controller.getUserEnrolledCourses);

router.get('/enrolled/:id', controller.getUserEnrolledCourseById);

router.get('/:id', controller.getCourseById);

router.post('/:id/enroll', controller.enrollToCourse);

router.post('/:id/complete', controller.completeCourse);


module.exports = router;
