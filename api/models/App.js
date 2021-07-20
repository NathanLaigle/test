const Sequelize = require('sequelize');

const db = require('../utils/database');

module.exports = db.define('App', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'unverified',
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
