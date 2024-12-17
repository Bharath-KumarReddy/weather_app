const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {

    
    await new Promise((resolve, reject) => {
      User.createUser(username, email, hashedPassword, (err, result) => {
        if (err) return reject('User already exists');
        resolve();
      });
    });

    res.status(201).json({ message: 'User registered successfully', username, email });
  } catch (error) {
    res.status(400).json({ message: error || 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await new Promise((resolve, reject) => {
      User.findByEmail(email, (err, results) => {
        if (err || results.length === 0) return reject('Invalid email or password');
        resolve(results[0]);
      });
    });

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, email: user.email, name: user.username });
  } catch (error) {
    res.status(401).json({ message: error || 'Login failed' });
  }
};
