const db = require('./db');

const User = {
  createUser: (username, email, password, callback) => {
    const query = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], callback);
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM signup WHERE email = ?';
    db.query(query, [email], callback);
  },
};

module.exports = User;
