const { Sequelize } = require('sequelize');

console.log('process.env.PG_DATABASE', process.env.PG_DATABASE)
console.log('process.env.PG_USER', process.env.PG_USER)
console.log('process.env.PG_PASSWORD', process.env.PG_PASSWORD)
console.log('process.env.PG_HOST', process.env.PG_HOST)
console.log('process.env.PG_PORT', process.env.PG_PORT)

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5454,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false,
    },
    logging: true
  }
);

module.exports = sequelize;
