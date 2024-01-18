const express = require('express');
const bodyParser = require('body-parser').json;
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('../db');

dotenv.config();

const app = express();

app.use(bodyParser());
app.use(cors());
app.use(morgan('dev'));

// const routes = require('./src/routes');
// app.use('/api', routes);


// app.use('/createUser', async (req, res) => {
//     try {
//       // Extract user details from request body
//       const { email, user_name } = req.body;
  
//       // Create a new user
//       const newUser = await User.create({
//         email,
//         user_name,
//       });
  
//       res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({ error: 'Failed to create user' });
//     }
//   });

module.exports = app;

