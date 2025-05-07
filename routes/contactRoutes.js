const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/contact-submissions', contactController.submitForm);
router.get('/metrics/daily-submissions', contactController.getDailyMetrics);

module.exports = router;