const User = require('../models/User');
const App = require('../models/App');

module.exports = () => {
  User.hasMany(App);
  App.belongsTo(User);
};
