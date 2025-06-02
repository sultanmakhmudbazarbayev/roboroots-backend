const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AppError = require('./utils/errors/appError');
const apiRoutes = require('./routes')

const app = express();
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/healthcheck', (req, res) => {
  res.send('Server works well!');
});

// Serve index.html for the root
app.get("/landing", (req, res) => {
  console.log('__dirname', __dirname)
  res.sendFile(path.join(__dirname, "index.html"));
});

// Import routes
app.use('/api', apiRoutes);

/// For handling errors glabally
app.use(require('./middlewares/globalErrorHandler'));

// For every other routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 502));
});

module.exports = app;
