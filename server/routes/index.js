const express = require('express');
const router = express.Router();

const User = require("./routes/user");
const Profile = require("./routes/profile");
const Post = require("./routes/post");

// routes
app.use("/users", User);
app.use("/profile", Profile);
app.use("/posts", Post);


module.exports = router;