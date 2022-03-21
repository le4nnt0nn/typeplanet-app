const express = require('express');
const app = express();
const router = express.Router();

const User = require('./user');
const Profile = require('./profile');
const Post = require('./post');
const Auth = require('./auth');

// routes
app.use("/users", User);
app.use("/profile", Profile);
app.use("/posts", Post);
// auth route
app.use("/auth", Auth);


module.exports = router;