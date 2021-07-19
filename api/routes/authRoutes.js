const { Router } = require('express');

const authController = require('../controllers/authController');
const validators = require('../utils/validators');

const router = Router();

/**
 * POST : /login
 */
router.post('', validators.authPost, authController);

module.exports = router;
