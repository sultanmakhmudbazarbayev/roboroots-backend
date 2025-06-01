const { Course, Enrollment } = require('../../db/models');
const repo = require('../repositories/courses');
const AppError = require('../utils/errors/appError');
const notificationService = require('../services/notification')

exports.getAllCourses = async () => {
  
    const data = await repo.getAllCourses();

    // Rewrite image and video paths
    const baseCourseImagePath = '/images/course-images/';
  
    const updatedCourses = data.map((course) => {
      const courseJSON = course.toJSON();
  
      if (courseJSON.image) {
        courseJSON.image = `${baseCourseImagePath}${courseJSON.image}`;
      }

      return courseJSON;
    });
  
    return updatedCourses;

};


exports.getCourseById = async (id) => {
  
    const data = await repo.getCourseById(id);

    // Rewrite image and video paths
    const baseCourseImagePath = '/images/course-images/';
    const baseLessonVideoPath = '/videos/';
  
    const courseJSON = data.toJSON();

    if (courseJSON.image) {
    courseJSON.image = `${baseCourseImagePath}${courseJSON.image}`;
    }

    courseJSON.Lessons = courseJSON.Lessons.map((lesson) => {
    if (lesson.video_url) {
        lesson.video_url = `${baseLessonVideoPath}${lesson.video_url}`;
    }
        return lesson;
    });

    return courseJSON;
  

};

exports.enrollUserToCourse = async (userId, courseId) => {
  // Enroll the user
  const enrollment = await repo.enrollUserToCourse(userId, courseId);

  // Fetch course info (if repo doesn't already include it)
  const course = await Course.findByPk(courseId);
  if (!course) throw new AppError('Course not found', 404);

  // ✅ Send notification
  await notificationService.addNotification({
    title: '✅ Course Enrollment',
    body: `You have successfully enrolled in "${course.name}"! Good luck!`,
    userId: userId
  });

  return enrollment;
};


exports.markCourseComplete = async (userId, courseId) => {
    // make sure the course exists (optional)
    const course = await Course.findByPk(courseId);
    if (!course) throw new Error('Course not found');

    // fetch the enrollment row
    const enrollment = await Enrollment.findOne({
      where: { user_id: userId, course_id: courseId },
    });
    if (!enrollment) {
      throw new Error('User is not enrolled in this course');
    }

    // set completed flag and save
    enrollment.completed = true;
    await enrollment.save();

      // ✅ Add notification
    await notificationService.addNotification({
      title: '🎉 Course Completed!',
      body: `You’ve successfully completed "${course.name}". Well done! You have a new Certificate for the course "${course.name}"!`,
      userId: userId
    });

    return enrollment;
}