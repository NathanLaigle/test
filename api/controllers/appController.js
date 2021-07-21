const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const slugify = require('slugify');

const { fileExtensionValidation } = require('../utils/validators');
const fileHash = require('../utils/fileHash');
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
  try {
    const error = validationResult(req);
    if (!error.isEmpty() || !fileExtensionValidation(req.files.app, 'apk')) {
      return next({
        message: 'Invalid data',
        error: error.length > 0 ? error : 'Uploaded file must be a .apk file',
      });
    }
    // check if the app name is unique
    const appNameTest = await App.findAll({ where: { name: req.body.name } });
    if (appNameTest.length > 0) {
      return next({
        message: 'App could not be uploaded',
        error: 'The name of the application is already taken',
      });
    }
    // if data is valid
    const file = req.files.app;
    const hash = await fileHash(file);
    const fileName = slugify(req.body.name) + '.apk';
    // create file in "uploads" folder
    file.mv('./uploads/' + fileName, async (err) => {
      if (err) {
        return next({
          message: 'File could not be uploaded',
          error: err,
        });
      }
      // If the file is successfully created, a new entry will be added to the database.
      const app = await App.create({
        id: hash,
        name: req.body.name,
        description: req.body.description || null,
        path: '/uploads/' + fileName,
        UserEmail: req.userEmail,
      });
      res.json({
        message: 'File uploaded',
        app: app,
      });
    });
  } catch (error) {
    next({ message: 'the app could not be uploaded', error: error });
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
    const newDescription = req.body.description || app.description;
    await App.update(
      {
        name: newName,
        description: newDescription,
      },
      { where: { id: req.body.id } }
    );
    res.json({ message: 'App updated' });
  } catch (error) {
    next({ error: error });
  }
};
