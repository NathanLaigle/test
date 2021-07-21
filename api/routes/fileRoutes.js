const { Router } = require('express');

const fileController = require('../controllers/fileController');

const router = Router();

router.get('/:name', fileController);

module.exports = router;
