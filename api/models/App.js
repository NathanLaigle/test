const Sequelize = require('sequelize');

const { database } = require('../utils/dbConnect');

module.exports = database.define('App', {
  id: {
    type: String,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: String,
    allowNull: true,
  },
  comment: {
    type: String,
    allowNull: true,
  },
});
