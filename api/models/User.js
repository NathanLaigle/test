const Sequelize = require('sequelize');

const db = require('../utils/database');

module.exports = db.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
