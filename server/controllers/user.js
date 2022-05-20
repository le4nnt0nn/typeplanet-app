const toonavatar = require('cartoon-avatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

/**
 * Register User
 * 
 * @route POST /api/users/register
 * @desc Register user
 * @access PUBLIC
 * 
 */

async function register(req, res) {
    // catch errors in const
    const errors = validationResult(req);
    // check if exists errors
    !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

    // catch values from body
    const { name, email, password, city, birth } = req.body;

    try {
        // check if user already exits by email
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'This user already exits' }] });
        }

        // get random avatar
        // random params for generate avatar
        const genders = ['male', 'female'];

        const genderRandom = Math.floor(Math.random() * genders.length);
        const id = Math.floor(Math.random() * 100) + 1;

        const avatar = toonavatar.generate_avatar({ 'gender': `${genders[genderRandom]}`, 'id': `${id}` });

        user = new User({
            name,
            email,
            password,
            avatar,
            city,
            birth
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user in db
        await user.save();

        // return token using payload
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'mysecrettoken:P', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500);
    }
}


/**
 * Get all Users
 * 
 * @route GET /api/users
 * @desc Get all users
 * @access PRIVATE
 * 
 */

async function getAllUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

/**
 * Get one user
 * 
 * @route GET /api/users/:id
 * @desc Get one user by id
 * @access PRIVATE
 * 
 */

async function getUserById(req, res) {
    const user = await User.findById(req.params.id);
    res.json(user);
}

/**
 * Update User
 * 
 * @route PUT /api/users/:id
 * @desc Update user by id
 * @access PUBLIC
 * 
 */

// TODO - PUT

/**
 * Follow
 * 
 * @route PUT /api/users/follow/:id
 * @desc Follow & following route
 * @access PRIVATE
 * 
 */

async function follow(req, res) {
    // get user
    const user = await User.findById(req.params.id);

    // get second user
    const secondUser = await User.findById(req.user.id);

    try {
        // check if the user has already been followed, filter by user
        if (user.followers.filter((follower) => follower.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'User already followed... ' });
        }

        // put user in the begining of following array
        user.followers.unshift({ user: req.user.id });

        // following user
        secondUser.following.unshift({ user: req.params.id });

        // save in db
        await user.save();
        await secondUser.save();

        res.json(user.followers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * Unfollow
 * 
 * @route PUT /api/users/unfollow/:id
 * @desc unfollow route
 * @access PRIVATE
 * 
 */
async function unfollow(req, res) {
    try {
        const user = await User.findById(req.params.id);

        // get second user
        const secondUser = await User.findById(req.user.id);

        // if user don't follow yet, then error 400 -> Bad Request
        if (user.followers.filter((follower) => follower.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'User has not been followed yet' });
        }

        // find the user followed in following array
        const rmIndex = user.followers.map((follower) => follower.user.toString()).indexOf(req.user.id);
        const rmIndexFollowing = secondUser.following.map((following) => following.user.toString()).indexOf(req.params.id);
        // remove selected index in likes
        user.followers.splice(rmIndex, 1);
        secondUser.following.splice(rmIndexFollowing, 1);
        await user.save();
        await secondUser.save();

        res.json(user.followers);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}


/**
 * Remove User
 * 
 * @route DELETE /api/users/:id
 * @desc Remove user by id
 * @access PUBLIC
 * 
 */

async function deleteUser(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ msg: `User has been removed: ${user}` });
}

module.exports = {
    register,
    getAllUsers,
    getUserById,
    follow,
    unfollow,
    deleteUser
}