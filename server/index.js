const express = require("express");
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// general route
app.use('/api', routes);

module.exports = app;