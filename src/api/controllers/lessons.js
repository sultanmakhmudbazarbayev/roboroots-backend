// src/controllers/lessons.js
const { tryCatch } = require('../utils/errors/tryCatch');
const { LessonProgress, Quiz, QuizResult } = require('../../db/models/index');

exports.saveLessonProgress = tryCatch(async (req, res) => {
  const userId   = req.user.id;
  const lessonId = parseInt(req.params.lessonId, 10);
  const { progress } = req.body;            // e.g. 0.5 for 50%

  if (progress == null || progress < 0 || progress > 1) {
    return res.status(400).json({ message: 'Invalid progress value' });
  }

  // See if we already have a record
  let record = await LessonProgress.findOne({
    where: { user_id: userId, lesson_id: lessonId }
  });

  if (record) {
    // Only update if new progress is greater
    if (progress > record.progress) {
      record.progress = progress;
      // mark completed if >90%
      if (progress > 0.9) record.completed = true;
      await record.save();
    }
  } else {
    // no record yet, create it
    record = await LessonProgress.create({
      user_id:   userId,
      lesson_id: lessonId,
      progress,
      completed: progress > 0.9
    });
  }

  return res.json({
    message: 'Progress saved',
    data: { progress: record.progress, completed: record.completed }
  });
});

exports.submitQuizResult = tryCatch(async (req, res) => {
  const userId   = req.user.id;
  const lessonId = parseInt(req.params.lessonId, 10);
  const { score } = req.body;               // integer score

  // Find the quiz for this lesson
  const quiz = await Quiz.findOne({ where: { lesson_id: lessonId } });
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found for lesson' });
  }

  // Look for existing result
  let result = await QuizResult.findOne({
    where: { user_id: userId, lesson_id: lessonId }
  });

  if (result) {
    // Only overwrite if new score is higher
    if (score > result.score) {
      result.score = score;
      await result.save();
    }
  } else {
    // create first record
    result = await QuizResult.create({
      user_id:   userId,
      lesson_id: lessonId,
      quiz_id:   quiz.id,
      score
    });
  }

  return res.status(200).json({
    message: 'OK',
    data: { quizResult: result }
  });
});
