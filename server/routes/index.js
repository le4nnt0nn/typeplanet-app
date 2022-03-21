const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

const User = require('./user');
const Profile = require('./profile');
const Post = require('./post');
const Auth = require('./auth');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
router.use('/users', User);
router.use('/profile', Profile);
router.use('/posts', Post);
// auth route
router.use('/auth', Auth);


module.exports = router;