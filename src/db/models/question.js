const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    tableName: 'questions',
    timestamps: true,
    paranoid: true
  });
  
  module.exports = Question;