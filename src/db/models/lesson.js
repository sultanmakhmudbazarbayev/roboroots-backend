const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Lesson = sequelize.define('Lesson', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    video_url: {
        allowNull: false,
        unique: false,
        type: DataTypes.STRING
    },
    course_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING
    },
}, {
    tableName: 'lessons',
    timestamps: true,
    paranoid: true
});

module.exports = Lesson;