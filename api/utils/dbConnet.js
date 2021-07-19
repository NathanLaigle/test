const Sequelize = require('sequelize');

const sequelize = new Sequelize('test-pradeo', 'root', 'root', {
  dialect: 'mysql',
  dialectOptions: {
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  },
  host: 'localhost',
});

exports.database = sequelize;

/**
 *
 * @param {*} app | express app
 * @param {number} port | default 3000
 *
 * @description Create a database connexion with sequelize package
 */
exports.dbConnect = async (app, port = 3000) => {
  try {
    await sequelize.sync();
    console.log('Database connection established');
    app.listen(port);
  } catch (e) {
    console.log(e);
  }
};
