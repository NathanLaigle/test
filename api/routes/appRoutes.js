const { Router } = require('express');
const fileupload = require('express-fileupload');

const appController = require('../controllers/appController');
const validators = require('../utils/validators');
const { isAuth } = require('../utils/auth');

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
router.post('', isAuth, validators.appPost, appController.post);

/**
 * DELETE : /app
 */
router.delete('', isAuth, validators.appDelete, appController.delete);

/**
 * PUT : /app
 */
router.put('', isAuth, validators.appPut, appController.put);

module.exports = router;
