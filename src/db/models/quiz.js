const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Quiz = sequelize.define('Quiz', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, 
  {
    tableName: 'quizzes',
    timestamps: true,
    paranoid: true
  }
);
  
  module.exports = Quiz;