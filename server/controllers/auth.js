const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

/**
 * @route    GET api/auth
 * @desc     Testing get for auth
 * @access   PUBLIC
 *
 */

async function getUserByToken(req, res) {
    try {
        // no get password from user id
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        // 500 Server Error
        res.status(500);
    }
}

/**
 * @route    POST api/auth
 * @desc     Auth user and get token
 * @access   PUBLIC
 * Middleware auth
 */

async function authAndGetToken(req, res) {
    // store all errors
    const errors = validationResult(req);

    // check if exists errors
    // if errors const is not Empty & status code 400 (Bad Request)
    !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

    // get email & password from body
    const { email, password } = req.body;
    console.log(email)

    try {
        // find user by body email
        let user = await User.findOne({ email });

        // user not exists with this email
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials :(' }] });
        }

        // password from body is equal to user password
        const isEqual = await bcrypt.compare(password, user.password);

        // if passwords not equals => 400 (Bad Request)
        if (!isEqual) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials :(' }] })
        }

        // return jwt with payload
        const payload = {
            user: {
                id: user.id
            }
        };

        // check if works
        console.log('logged!');
        // sign with finded user by email
        jwt.sign(payload, 'mysecrettoken:P', { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                // if not errors, give token
                res.json({ token });
            })
    } catch (err) {
        // 500 Server Error & check if not works
        console.log('not logged');
        res.status(500);
    }
}

module.exports = {
    getUserByToken,
    authAndGetToken
};