const { body } = require('express-validator');

/**
 *
 * @param {*} file
 * @param {string} extension
 *
 * @description check the extension of a given file
 */
exports.fileExtensionValidation = (file, extension) => {
  let appName = file.name.split('.');
  appName = appName[appName.length - 1];
  return appName == extension;
};

exports.appPost = [
  body('name').isString().optional(),
  body('description').isString().optional(),
];

exports.appDelete = [body('id').isString()];

exports.appPut = [
  body('id').isString(),
  body('name').isString().optional(),
  body('description').isString().optional(),
];

exports.userPost = [
  body('email').isEmail(),
  body('pseudo').isString(),
  body('password').isString(),
];

exports.userDelete = [body('email').isEmail()];

exports.authPost = [body('email').isEmail(), body('password').isString()];

exports.commentPost = [
  body('rating').custom((value) => value >= 0 && value <= 5),
  body('title').isString().optional(),
  body('content').isString().optional(),
  body('AppId').isString(),
];
