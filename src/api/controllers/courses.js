
const { tryCatch } = require('../utils/errors/tryCatch');
const courseService = require('../services/courses');
const { createCertificate } = require('../services/certificateService');
const { Course, Lesson, LessonProgress, Quiz, Question, Answer, QuizResult, User } = require('../../db/models/index');

exports.createCourse = tryCatch(async (req, res) => {
  const {
    category,
    name,
    author,
    description,
    image,
    price,
    lessons
  } = req.body;

  // Basic validation
  if (!category || !name || !author || !Array.isArray(lessons) || lessons.length < 1) {
    return res.status(400).json({ message: 'Missing required fields or no lessons provided' });
  }

  // All‐or‐nothing: wrap in a transaction
  const createdCourse = await Course.sequelize.transaction(async (t) => {
    // Create Course and nested Lessons/Quizzes/Questions/Answers in one go
    const newCourse = await Course.create(
      {
        category,
        name,
        author,
        description: description || null,
        image: image || null,
        price,

        // Create each lesson (no IDs in request)
        Lessons: lessons.map((lesson) => {
          return {
            name: lesson.title,
            description: lesson.description || null,
            video_url: lesson.video_url || null,

            // Exactly one Quiz per lesson
            Quiz: {
              title: lesson.quiz.title,
              Questions: lesson.quiz.questions.map((q) => {
                return {
                  text: q.question,
                  Answers: q.answers.map((a) => {
                    return {
                      text: a.text,
                      is_correct: a.is_correct === true
                    };
                  })
                };
              })
            }
          };
        })
      },
      {
        include: [
          {
            model: Lesson,
            include: [
              {
                model: Quiz,
                include: [
                  {
                    model: Question,
                    include: [Answer]
                  }
                ]
              }
            ]
          }
        ],
        transaction: t
      }
    );

    return newCourse;
  });

  return res.status(201).json({
    message: 'Course created successfully',
    data: { data: createdCourse }
  });
});


exports.getAllCourses = tryCatch(async (req, res) => {

  const courses = await courseService.getAllCourses();

  return res.status(200).send({
    message: "OK",
    data: {
      data: courses,
    }
  });
});


exports.enrollToCourse = tryCatch(async (req, res) => {

    const courseId = req.params.id;
    const userId = req.user.id;

    const enrollment = await courseService.enrollUserToCourse(userId, courseId)
  
    return res.status(200).send({
      message: "OK",
      data: {
        data: enrollment,
      }
    });
});


exports.getCourseById = tryCatch(async (req, res) => {

    const {id} = req.params;

    const course = await courseService.getCourseById(id);
  
    return res.status(200).send({
      message: "OK",
      data: {
        data: course,
      }
    });
  });

exports.getUserEnrolledCourses = tryCatch(async (req, res) => {
  const userId = req.user.id;

  const courses = await Course.findAll({
    include: [
      {
        model: User,
        where: { id: userId },
        through: { attributes: [] },
        attributes: [],
      },
      {
        model: Lesson,
        include: [
          {
            model: Quiz,
            include: [
              {
                model: Question,
                include: [Answer],
              },
            ],
          },
          {
            model: LessonProgress,
            where: { user_id: userId },
            required: false,
          },
        ],
      },
    ],
    order: [
      ['id', 'ASC'],
      [{ model: Lesson }, 'id', 'ASC'],
    ],
  });

  // Fetch all quiz results for the user
  const results = await QuizResult.findAll({
    where: { user_id: userId },
    attributes: ['lesson_id', 'score', 'createdAt'],
    raw: true,
  });

  // Group quiz results by lesson_id
  const resultMap = {};
  for (const result of results) {
    resultMap[result.lesson_id] = {
      score: result.score,
      date: result.createdAt,
    };
  }

  // Attach quizResult under each lesson
  for (const course of courses) {
    if (course.Lessons) {
      course.Lessons.forEach(lesson => {
        const quizResult = resultMap[lesson.id] || null;
        lesson.setDataValue('quizResult', quizResult);
      });
    }
  }

  return res.status(200).json({
    message: 'OK',
    data: {
      data: courses,
    },
  });
});

exports.getUserEnrolledCourseById = tryCatch(async (req, res) => {
    const userId = req.user.id;
    const enrolledCourseId = req.params.id;
  
    const course = await Course.findByPk(enrolledCourseId, {
      include: [
        {
          model: User,
          where: { id: userId },
          through: { attributes: [] },
          attributes: [],
        },
        {
          model: Lesson,
          include: [
            {
              model: Quiz,
              include: [
                {
                  model: Question,
                  include: [Answer],
                },
              ],
            },
            {
              model: LessonProgress,
              where: { user_id: userId },
              required: false,
            },
          ],
        },
      ],
      order: [
        ['id', 'ASC'],
        [{ model: Lesson }, 'id', 'ASC'],
        [{ model: Lesson }, Quiz, Question, 'id', 'ASC'],    // if you also want to order questions
        [{ model: Lesson }, Quiz, Question, Answer, 'id', 'ASC'], // and answers
      ],
    });
  
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
  
    // Fetch all quiz results for the user
    const results = await QuizResult.findAll({
      where: { user_id: userId },
      attributes: ['lesson_id', 'score', 'createdAt'],
      raw: true,
    });
  
    // Group quiz results by lesson_id
    const resultMap = {};
    for (const r of results) {
      resultMap[r.lesson_id] = { score: r.score, date: r.createdAt };
    }
  
    // Attach quizResult under each lesson
    if (course.Lessons) {
      course.Lessons.forEach(lesson => {
        const vid = lesson.video_url || '';
        const full = `/videos/${vid}`;
        lesson.setDataValue('video_url', full);
        lesson.setDataValue('quizResult', resultMap[lesson.id] || null);
      });
    }

    return res.status(200).json({
      message: 'OK',
      data: {
        data: course,
      },
    });
});

  


exports.completeCourse = tryCatch(async (req, res) => {
    const userId   = req.user.id;
    const courseId = parseInt(req.params.id, 10);
  
    // mark course complete on the enrollment row
    const enrollment = await courseService.markCourseComplete(userId, courseId);
  
    // generate & store certificate
    const cert = await createCertificate(userId, courseId);
  
    return res.status(200).json({
      message: 'Course completed and certificate issued',
      data: {
        enrollment,
        certificate: cert
      }
    });
  });