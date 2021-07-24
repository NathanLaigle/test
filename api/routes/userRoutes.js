const { Router } = require('express');

const userController = require('../controllers/userController');
const validators = require('../utils/validators');
const { isAuth, isAllowedPost, isAllowedGet } = require('../utils/auth');

const router = Router();

/**
 * GET : /user
 */
router.get('', userController.get);

/**
 * GET : /user
 */
router.get('/:email', isAuth, isAllowedGet, userController.getOne);

/**
 * POST : /user
 */
router.post('', validators.userPost, userController.post);

/**
 * DELETE : /user
 */
router.delete(
  '',
  isAuth,
  isAllowedPost,
  validators.userDelete,
  userController.delete
);

module.exports = router;
