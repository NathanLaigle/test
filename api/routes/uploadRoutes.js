const { Router } = require('express');

const uploadController = require('../controllers/uploadController');

const router = Router();

/**
 * GET : /uploads/:images
 */
router.get('/appImages/:image', uploadController.getImage);

/**
 * GET : /uploads/:app
 */
router.get('/:app', uploadController.getApp);

module.exports = router;
