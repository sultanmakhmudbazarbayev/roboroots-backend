const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  course_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  completed: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'enrollments',
  timestamps: true,
  paranoid: true
});

module.exports = Enrollment;
