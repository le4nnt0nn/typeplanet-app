const express = require("express");
const app = express();

const User = require("./routes/user");
const Profile = require("./routes/profile");
const Post = require("./routes/post");

// routes
app.use("/api/users", User);
app.use("/api/profile", Profile);
app.use("/api/posts", Post);

module.exports = app;