const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    tableName: 'answers',
    timestamps: true,
    paranoid: true
  });
  
  
  module.exports = Answer;