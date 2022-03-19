const express = require("express");
const app = express();
const routes = require('./routes')

// general route
app.use('/api', routes);

module.exports = app;