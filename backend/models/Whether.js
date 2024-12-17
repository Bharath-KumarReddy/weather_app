const db = require('./db');

const Weather = {
  saveSearch: (email, city, weatherInfo, callback) => {
    const query = `INSERT INTO weather_searches (email, city, weather_info) VALUES (?, ?, ?)`;
    db.query(query, [email, city, weatherInfo], callback);
  },

  getSearchReport: (callback) => {
    const query = `
      SELECT s.username, ws.city, ws.weather_info
      FROM weather_searches ws
      INNER JOIN signup s ON ws.email = s.email
    `;
    db.query(query, callback);
  },
};

module.exports = Weather;
