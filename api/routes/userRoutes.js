const { Router } = require('express');

const userController = require('../controllers/userController');
const validators = require('../utils/validators');

const router = Router();

/**
 * GET : /user
 */
router.get('', userController.get);

/**
 * POST : /user
 */
router.post('', validators.userPost, userController.post);

/**
 * DELETE : /user
 */
router.delete('', validators.userDelete, userController.delete);

module.exports = router;
