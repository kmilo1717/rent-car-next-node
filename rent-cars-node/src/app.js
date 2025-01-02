const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const rentRoute = require('./routes/rentRoute');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/rent', rentRoute);

module.exports = app;
