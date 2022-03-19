const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const AuthController = require('../controllers/auth');
const auth = require('../middleware/auth');

router.post('/', [
    check('email', 'Please insert a valid email').isEmail(),
    check('password', 'Password is required').exists()
], AuthController.authAndGetToken)
    .get('/', auth, AuthController.getPassword)

module.exports = router;