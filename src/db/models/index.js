// src/db/models/index.js
const sequelize = require('../sequalize');
const User = require('./user');
const Course = require('./course');
const Lesson = require('./lesson');
const Enrollment = require('./enrollment');
const LessonProgress = require('./lessonProgress');
const Quiz = require('./quiz');
const Question = require('./question');
const Answer = require('./answer');
const QuizResult = require('./quizResult')
const Follow = require('./follow');
const Certificate = require('./certificate');
const Project = require('./project');
const Notification = require('./notification');

// Courses and Lessons
Course.hasMany(Lesson, { foreignKey: 'course_id' });
Lesson.belongsTo(Course, { foreignKey: 'course_id' });

// Enrollment
User.belongsToMany(Course, { through: Enrollment, foreignKey: 'user_id' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'course_id' });

// Lesson Progress
User.belongsToMany(Lesson, { through: LessonProgress, foreignKey: 'user_id' });
Lesson.belongsToMany(User, { through: LessonProgress, foreignKey: 'lesson_id' });

LessonProgress.belongsTo(Lesson, { foreignKey: 'lesson_id' });
Lesson.hasMany(LessonProgress, { foreignKey: 'lesson_id' });

Lesson.hasOne(Quiz, { foreignKey: 'lesson_id' });
Quiz.belongsTo(Lesson, { foreignKey: 'lesson_id' });

Quiz.hasMany(Question, { foreignKey: 'quiz_id' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Question.hasMany(Answer, { foreignKey: 'question_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });

// A user can have many quiz results
User.hasMany(QuizResult, { foreignKey: 'user_id' });
QuizResult.belongsTo(User, { foreignKey: 'user_id' });

// A lesson can have many quiz results
Lesson.hasMany(QuizResult, { foreignKey: 'lesson_id' });
QuizResult.belongsTo(Lesson, { foreignKey: 'lesson_id' });

User.belongsToMany(User, {
  through: Follow,
  as: 'following', // users I follow
  foreignKey: 'follower_id',
});

User.belongsToMany(User, {
  through: Follow,
  as: 'followers', // users who follow me
  foreignKey: 'followed_id',
});

User.hasMany(Certificate, { foreignKey: 'user_id' });
Certificate.belongsTo(User, { foreignKey: 'user_id' });

Certificate.belongsTo(Course,  { foreignKey: 'course_id' });
Course.hasMany(Certificate,      { foreignKey: 'course_id' });

User.hasMany(Project, { foreignKey: 'user_id' });
Project.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Course,
  Lesson,
  Enrollment,
  LessonProgress,
  Quiz, Question, Answer, QuizResult,
  Follow, Certificate, Project, Notification
};
