const sequelize = require('../sequalize');
const { DataTypes } = require('sequelize');

const Notification = sequelize.define('Notification', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  body: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  is_read: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  user_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  sent_at: {
    allowNull: true,
    type: DataTypes.DATE
  }
}, {
  tableName: 'notifications',
  timestamps: true,
  paranoid: true
});

module.exports = Notification;
