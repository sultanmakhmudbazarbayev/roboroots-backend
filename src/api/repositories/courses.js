const AppError = require('../utils/errors/appError');
const { Course, Lesson, Quiz, Question, Answer, Enrollment } = require('../../db/models');

exports.getAllCourses = async () => {
  const data = await Course.findAll();

  if (!data) {
    throw new AppError('Error when retrieving all courses', 500);
  }

  return data;
};

exports.getCourseById = async (id) => {
    const course = await Course.findByPk(id, {
      include: [
        {
          model: Lesson,
          include: [
            {
              model: Quiz,
              include: [
                {
                  model: Question,
                  include: [
                    {
                      model: Answer
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      order: [
        [{ model: Lesson }, 'id', 'ASC'],
        [{ model: Lesson }, Quiz, Question, 'id', 'ASC'],
        [{ model: Lesson }, Quiz, Question, Answer, 'id', 'ASC']
      ]
    });
  
    if (!course) {
      throw new AppError('Error when retrieving course by id', 404);
    }
  
    return course;
};

exports.enrollUserToCourse = async (userId, courseId) => {

    const [enrollment, created] = await Enrollment.findOrCreate({
        where: { user_id: userId, course_id: courseId }
      });
  
    return { enrolled: true, alreadyEnrolled: !created };
  };
