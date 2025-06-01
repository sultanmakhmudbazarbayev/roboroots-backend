const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Project = sequelize.define('Project', {
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
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status: {
      allowNull: true,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
}, {
    tableName: 'projects',
    timestamps: true,
    paranoid: true
});

module.exports = Project;