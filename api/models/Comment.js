const Sequelize = require('sequelize');

const db = require('../utils/database');

module.exports = db.define('Comment', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
