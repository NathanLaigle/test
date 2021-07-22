const sequelize = require('./database');
const App = require('../models/App');
const relations = require('./dbRelations');
const io = require('./socketIoConnection');

/**
 *
 * @param {*} app | express app
 * @param {number} port | default 3000
 *
 * @description Create a database connexion with sequelize package
 */
module.exports = async (app, port = 3000) => {
  try {
    relations();
    await sequelize.sync();
    console.log('Database connection established');
    const httpServer = app.listen(port);
    io.init(httpServer);
    io.getIo().on('connection', (socket) => {
      console.log('client connected');
    });
  } catch (e) {
    console.log(e);
  }
};
