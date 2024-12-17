const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));