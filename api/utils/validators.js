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

exports.fileUploadPost = [
  body('name').isString().optional(),
  body('comment').isString().optional(),
];
