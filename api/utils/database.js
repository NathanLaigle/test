const Sequelize = require('sequelize');

/**
 * Database instance
 */
const sequelize = new Sequelize('test-pradeo', 'root', 'root', {
  logging: false,
  dialect: 'mysql',
  dialectOptions: {
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  },
  host: 'localhost',
});

module.exports = sequelize;
