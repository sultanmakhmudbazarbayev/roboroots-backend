const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const LessonProgress = sequelize.define('LessonProgress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  lesson_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  completed: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  watched_seconds: {
    allowNull: true,
    type: DataTypes.INTEGER, // how much of the video they've watched
  },
  progress: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
}, {
  tableName: 'lesson_progress',
  timestamps: true,
  paranoid: true
});

module.exports = LessonProgress;
