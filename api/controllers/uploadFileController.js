const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { fileExtensionValidation } = require('../utils/validators');
const App = require('../models/App');

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description get all apps form the database
 */
exports.get = async (req, res) => {
  try {
    const apps = await App.findAll();
    res.json(apps);
  } catch (error) {
    res.json({
      message: 'something went wrong',
      error: error,
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description Upload a file
 */
exports.post = (req, res) => {
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
    file.name = file.name.replace(/\s+/g, '-').toLowerCase();
    // create file in "uploads" folder
    try {
      file.mv('./uploads/' + file.name, async (err) => {
        if (err) {
          res.json({
            message: 'File could not be uploaded',
            error: err,
          });
        } else {
          // If the file is successfully created, a new entry will be added to the database.
          const hashedId = await bcrypt.hash(file.name, 10);
          await App.create({
            id: hashedId,
            name: req.body.name || null,
            comment: req.body.comment || null,
            path: '/uploads/' + file.name,
          });
          res.json({
            message: 'File uploaded',
          });
        }
      });
    } catch (error) {
      res.json({
        message: 'something went wrong',
        error: error,
      });
    }
  }
};
