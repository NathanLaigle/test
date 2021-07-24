const path = require('path');

exports.getImage = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, '..', './uploads/appImages/' + req.params.image)
  );
};

exports.getApp = (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', './uploads/' + req.params.app));
};
