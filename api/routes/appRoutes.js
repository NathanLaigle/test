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
 * GET : /app
 */
router.get('', appController.get);

/**
 * POST : /app
 */
router.post('', validators.appPost, appController.post);

/**
 * DELETE : /app
 */
router.delete('', validators.appDelete, appController.delete);

/**
 * PUT : /app
 */
router.put('', validators.appPut, appController.put);

module.exports = router;
