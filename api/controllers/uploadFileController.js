const { validationResult } = require('express-validator');
const { fileExtensionValidation } = require('../utils/validators');
const App = require('../models/App');

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description Upload a file
 */
exports.post = (req, res, next) => {
  // data validation + file extension validation
  const error = validationResult(req);
  if (!error.isEmpty() || !fileExtensionValidation(req.files.app, 'apk')) {
    res.json({
      message: 'Invalid data',
      error: error.length > 0 ? error : 'Uploaded file must be a .apk file',
    });
  } else {
    // if data is valid
    const file = req.files.app;
    file.mv('./uploads/' + file.name, async (err) => {
      try {
        if (err) {
          res.json({
            message: 'File could not be uploaded',
            error: err,
          });
        } else {
          await App.create({
            id: file.name,
            name: req.body.name || null,
            comment: req.body.comment || null,
          });
          res.json({
            message: 'File uploaded',
          });
        }
      } catch (error) {
        res.json({
          message: 'something went wrong',
          error: error,
        });
      }
    });
  }
};
