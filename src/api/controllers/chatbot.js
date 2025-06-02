const { openai } = require('../configs/chatbot');

// In-memory per-user chat history.
// In production, use a DB or Redis!
const chatHistories = {};

const MAX_HISTORY = 20; // Limit number of messages (avoid OpenAI token overflow)

const chat = async (req, res) => {
  const userId = req.user.id;
  const { input } = req.body;
  if (!input || !userId) {
    return res.status(400).json({ error: 'input and userId are required' });
  }

  // Initialize user history if not exists
  if (!chatHistories[userId]) chatHistories[userId] = [];

  // Prepare messages for OpenAI
  const userHistory = chatHistories[userId];
  const messages = userHistory.map(([role, content]) => ({ role, content }));
  messages.push({ role: 'user', content: input });

  // Limit history (last MAX_HISTORY exchanges)
  const limitedMessages = messages.slice(-MAX_HISTORY);

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: limitedMessages,
    });

    const completionText = completion.data.choices[0].message.content;

    // Update user history
    userHistory.push(['user', input]);
    userHistory.push(['assistant', completionText]);
    // Keep only recent history
    if (userHistory.length > MAX_HISTORY) {
      userHistory.splice(0, userHistory.length - MAX_HISTORY);
    }

    res.json({ reply: completionText });
  } catch (error) {
    console.error(
      error?.response?.data || error.message || error
    );
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { chat };
