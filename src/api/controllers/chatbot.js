// const {openai} = require('../configs/chatbot')

// const chatHistory = [];

// const chat = async (req, res) => {
//   const userInput = req.body.input;

//   if (!userInput) {
//     return res.status(400).json({ error: 'Input is required' });
//   }

//   try {
//     const messages = chatHistory.map(([role, content]) => ({
//       role,
//       content,
//     }));

//     messages.push({ role: 'user', content: userInput });

//     const completion = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: messages,
//     });

//     const completionText = completion.data.choices[0].message.content;

//     chatHistory.push(['user', userInput]);
//     chatHistory.push(['assistant', completionText]);

//     res.json({ reply: completionText });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };

// module.exports = {
//     chat
// };
