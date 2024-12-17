const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getWeather, getWeatherReport } = require('../controllers/weatherController');

router.post('/whether', getWeather);
router.get('/report',getWeatherReport);

module.exports = router;
    