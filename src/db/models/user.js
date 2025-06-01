const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password_hash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    full_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
    level: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    balance: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },
    projects_completed_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    certificates_earned_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    strike_days_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    followers_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    followings_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    last_active_date: {
      allowNull: true,
      type: DataTypes.DATEONLY
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true
});

module.exports = User;