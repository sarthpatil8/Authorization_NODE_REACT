const express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const registerMiddleware = require('./registerMiddleware');
const loginMiddleware = require('./login_auth');
const logoutMiddleware = require('./logout_auth');
const db = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database


// Routes
app.post('/api/register', registerMiddleware);
app.post('/api/login', loginMiddleware);
app.post('/api/logout', logoutMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));