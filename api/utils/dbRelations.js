const User = require('../models/User');
const App = require('../models/App');
const Comment = require('../models/Comment');

module.exports = () => {
  // USER - APP
  User.hasMany(App);
  App.belongsTo(User);
  // USER - COMMENT
  User.hasMany(Comment);
  Comment.belongsTo(User);
  // APP - COMMENT
  App.hasMany(Comment);
  Comment.belongsTo(App);
};
