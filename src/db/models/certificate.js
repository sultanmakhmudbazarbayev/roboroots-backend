const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Certificate = sequelize.define('Certificate', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    url_link: {
      allowNull: false,
      type: DataTypes.STRING
    },
    info: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    course_id: {
      type:        DataTypes.INTEGER
    },
}, {
    tableName: 'certificates',
    timestamps: true,
    paranoid: true
});

module.exports = Certificate;