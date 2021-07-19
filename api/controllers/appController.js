const fs = require('fs');
const path = require('path');
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
exports.get = async (req, res, next) => {
  try {
    const apps = await App.findAll();
    res.json(apps);
  } catch (error) {
    next({ message: 'Could not find Apps', error: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description Upload a file
 */
exports.post = async (req, res, next) => {
  // data validation + file extension validation
  const error = validationResult(req);
  if (!error.isEmpty() || !fileExtensionValidation(req.files.app, 'apk')) {
    next({
      message: 'Invalid data',
      error: error.length > 0 ? error : 'Uploaded file must be a .apk file',
    });
  }
  try {
    // if data is valid
    const file = req.files.app;
    const hashedId = await bcrypt.hash(file.name, 10);
    // create file in "uploads" folder
    file.mv('./uploads/' + hashedId + '.apk', async (err) => {
      if (err) {
        next({
          message: 'File could not be uploaded',
          error: err,
        });
      }
      // If the file is successfully created, a new entry will be added to the database.
      const app = await App.create({
        id: hashedId,
        name: req.body.name || null,
        comment: req.body.comment || null,
        path: '/uploads/' + file.name,
      });
      res.json({
        message: 'File uploaded',
        app: app,
      });
    });
  } catch (error) {
    next({ error: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description Remove the app from the database and from the upload folder
 */
exports.delete = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      next({ error: error });
    }
    const app = await App.findByPk(req.body.id);
    fs.unlink(path.join(__dirname, '..', app.path), (err) => {
      if (err) {
        throw new Error(err);
      }
    });
    await App.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json({
      message: 'App deleted',
    });
  } catch (error) {
    next({ message: 'Could not find app', error: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description update app data in database
 */
exports.put = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      next({ error: error });
    }
    const app = await App.findByPk(req.body.id);
    const newName = req.body.name || app.name;
    const newComment = req.body.comment || app.comment;
    await App.update(
      {
        name: newName,
        comment: newComment,
      },
      { where: { id: req.body.id } }
    );
    res.json({ message: 'App updated' });
  } catch (error) {
    next({ error: error });
  }
};
