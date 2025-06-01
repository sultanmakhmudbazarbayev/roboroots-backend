const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const QuizResult = sequelize.define('QuizResult', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  passed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  tableName: 'quiz_results',
  timestamps: true,
  paranoid: true,
});

module.exports = QuizResult;
