const express = require('express');
const bodyParser = require('body-parser').json;
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser());
app.use(cors());
app.use(morgan('dev'));

module.exports = app;

