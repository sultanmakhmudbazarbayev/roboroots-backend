const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Follow = sequelize.define('Follow', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    follower_id: { type: DataTypes.INTEGER, allowNull: false },
    followed_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'follows',
    timestamps: true,
  });

module.exports = Follow;