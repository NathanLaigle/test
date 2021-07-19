const { Router } = require('express');
const fileupload = require('express-fileupload');

const uploadFileController = require('../controllers/uploadFileController');
const validators = require('../utils/validators');

const router = Router();

/**
 * Set express-fileupload
 */
router.use(fileupload());

/**
 * GET : /upload
 */
router.get('', uploadFileController.get);

/**
 * POST : /upload
 */
router.post('', validators.fileUploadPost, uploadFileController.post);

module.exports = router;
