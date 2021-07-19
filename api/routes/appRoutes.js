const { Router } = require('express');
const fileupload = require('express-fileupload');

const appController = require('../controllers/appController');
const validators = require('../utils/validators');

const router = Router();

/**
 * Set express-fileupload
 */
router.use(fileupload());

/**
 * GET : /upload
 */
router.get('', appController.get);

/**
 * POST : /upload
 */
router.post('', validators.fileUploadPost, appController.post);

/**
 * DELETE : /upload
 */
router.delete('', validators.fileUploadDelete, appController.delete);

module.exports = router;
