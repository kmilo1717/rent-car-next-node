const express = require('express');
const router = express.Router();
const rentController = require('../controllers/rentController');


router.get('/', rentController.getRents);
router.get('/metrics/:date', rentController.getMetrics);

module.exports = router;
