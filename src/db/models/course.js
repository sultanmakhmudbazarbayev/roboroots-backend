const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Course = sequelize.define('Course', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    category: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT
    }
}, {
    tableName: 'courses',
    timestamps: true,
    paranoid: true
});

module.exports = Course;