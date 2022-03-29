const express = require("express");
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// middleware
app.use(cors());

// general route
app.use('/api', routes);

module.exports = app;