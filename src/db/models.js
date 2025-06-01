const User = require('./models/user')
const Course = require('./models/course')
const Lesson = require('./models/lesson')
const Enrollment = require('./models/enrollment')
const LessonProgress = require('./models/lessonProgress')

const Quiz = require('./models/quiz');
const Question = require('./models/question');
const Answer = require('./models/answer');
const QuizResult = require('./models/quizResult')
const Follow = require('./models/follow');
const Certificate = require('./models/certificate');
const Project = require('./models/project');
const Notification = require('./models/notification');


module.exports = {
    User, 
    Course, 
    Lesson, 
    Enrollment,
    LessonProgress, Quiz, Question, Answer, QuizResult, Follow, Certificate, Project, Notification
}