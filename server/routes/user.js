const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");

const UserController = require('../controllers/user');

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please insert a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
], UserController.register)
    .get('/', UserController.getAllUsers)
    .get('/:id', UserController.getUserById)
    //.put('/', UserController.**)
    .delete('/:id', UserController.deleteUser)

module.exports = router;