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
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'unverified',
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
