const express = require("express");
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// middleware
app.use(cors());

// general route
app.use('/api', routes);

// deploy to heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.use('/api', routes);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }); 
}

module.exports = app;