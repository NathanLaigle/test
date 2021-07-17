const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'nodecomplete', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = async (app, port = 3000) => {
  try {
    await sequelize.sync();
    app.listen(port);
  } catch (error) {
    console.log(e);
  }
};
