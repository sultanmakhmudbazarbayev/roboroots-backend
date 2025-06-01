// controllers/quizResults.js
const { Quiz, QuizResult } = require('../db/models');
const tryCatch = require('../utils/tryCatch');

exports.submitQuizResult = tryCatch(async (req, res) => {
  const userId = req.user.id;
  const { lessonId } = req.params;
  const { score } = req.body;

  // Look up which quiz belongs to that lesson
  const quiz = await Quiz.findOne({ where: { lesson_id: lessonId } });
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found for lesson' });
  }

  // Upsert: create or update the user's result
  const [result, created] = await QuizResult.upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      quiz_id: quiz.id,
      score,
    },
    { returning: true }
  );

  res.status(200).json({
    message: 'OK',
    data: { quizResult: result }
  });
});
