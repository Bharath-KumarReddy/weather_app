const axios = require('axios');
const Weather = require('../models/Whether');

exports.getWeather = async (req, res) => {
  const { city, email } = req.body;

  try {
    const response = await axios.get(
      `https://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${city}`
    );
    const weatherInfo = response.data.current;

    await new Promise((resolve, reject) => {
      Weather.saveSearch(email, city, JSON.stringify(weatherInfo), (err) => {
        if (err) return reject('Failed to save weather data');
        resolve();
      });
    });

    res.json({ city, weather: weatherInfo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || 'Weather API error' });
  }
};

exports.getWeatherReport = async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      Weather.getSearchReport((err, results) => {
        if (err) return reject('Failed to fetch report');
        resolve(results);
      });
    });

    const formattedResults = results.map((row) => ({
      username: row.username,
      city: row.city,
      weather: JSON.parse(row.weather_info),
    }));

    res.json(formattedResults);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || 'Error fetching report' });
  }
};
