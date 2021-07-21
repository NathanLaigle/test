const { Router } = require('express');

const commentController = require('../controllers/commentController');
const validators = require('../utils/validators');
const { isAuth } = require('../utils/auth');

const router = Router();

/**
 * GET : /comment
 */
router.get('', commentController.get);

/**
 * GET : /comment/:AppId
 */
router.get('/:AppId', commentController.getAppComments);

/**
 * POST : /comment
 */
router.post('', isAuth, validators.commentPost, commentController.post);

module.exports = router;
