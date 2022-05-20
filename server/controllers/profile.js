const { validationResult } = require('express-validator');
const fetch = require('cross-fetch');
const mongoose = require("mongoose");

const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

/**
 * @route    POST api/profile/me
 * @desc     Get current user's profile
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function getMyProfile(req, res) {
    try {
        // get user and get only name & avatar
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate('user', ['name', 'avatar', 'level', 'city']);
        if (!profile) return res.status(400).json({ msg: 'There is no profile for this user :(' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    POST api/profile
 * @desc     Create & update user profile
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function createProfile(req, res) {
    // store errors in const
    const errors = validationResult(req);
    // errors exists ?
    !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

    const {
        description,
        bio,
        topics,
        posts,
        githubuser
    } = req.body;

    // build profile
    const profileStored = {};
    profileStored.user = req.user.id;
    if (description) profileStored.description = description;
    if (bio) profileStored.bio = bio;
    // split topics by ,
    if (topics) {
        profileStored.topics = topics.toString().split(",").map((topic) => topic.trim());
    }
    if (posts) profileStored.posts = posts;
    if (githubuser) profileStored.githubuser = githubuser;

    try {
        // get profile by user id
        let profile = await Profile.findOne({ user: req.user.id });

        // if profile exists, update an set the profileStored fields & is new
        if (profile) {
            profile = await Profile.findByIdAndUpdate(
                { _id: profile._id },
                { $set: profileStored },
                { new: true }
            );

            return res.json(profile);
        }

        // create profile
        profile = new Profile(profileStored);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    GET api/profile
 * @desc     Get all profiles
 * @access   PUBLIC
 *
 */

async function getAllProfiles(req, res) {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar', 'level', 'city', 'followers', 'following']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    GET api/profile/user/:user_id
 * @desc     Get profile by user id
 * @access   PUBLIC
 *
 */

async function getProfileByUserId(req, res) {
    try {
        // get profile and populate by name & avatar from user
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate('user', ['name', 'avatar', 'level', 'city']);

        // if profile not found, send error with user id
        if (!profile)
            return res.status(400).json({
                msg: `Profile not found for this user: ${req.params.user_id}`,
            });
        res.json(profile);

    } catch (err) {
        // if error is about ObjectId then 400
        if (err.kind === 'ObjectId') return res.status(400).json({ msg: `Profile not found for the user: ${req.params.user_id}` })

        console.error(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    PUT api/profile/topics
 * @desc     Edit topics for profile
 * @access   PRIVATE
 * 
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function editTopics(req, res) {
    // store errors
    const errors = validationResult(req);
    // if errors exists, then 400
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // get new topics from body
    const { topics } = req.body;

    // try find current user and update topics, error -> 500 Server Error 
    try {
        const profile = await Profile.findOneAndUpdate(
            req.user.id, { topics: topics })

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

}

/**
 * @route    DELETE api/profile
 * @desc     Delete all profile, include user and posts
 * @access   PRIVATE
 * 
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function removeProfile(req, res) {
    try {
        // remove user posts
        await Post.deleteMany({ user: req.user.id });
        // remove all profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User has been deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    GET github/:username
 * @desc     Get user GitHub name
 * @access   PUBLIC
 * 
 */

async function getGithubRepos(req, res) {
    try {
        const githubOptions = {
            headers: { 'user-agent': 'node.js' },
            // get repos from username using GitHub API
            uri: `https://api.github.com/users/${req.params.username
                }/repos?per_page=5&
                  sort=created:asc`,
            method: "GET",
        };
        fetch(githubOptions, (error, response, body, next) => {

            if (error) console.error(error);

            // if status code from response is not 200
            if (response.statusCode !== 200) {
                return res.stats(400).json({ msg: 'No GitHub profile found :(' });
            }

            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


module.exports = {
    getAllProfiles,
    getMyProfile,
    getProfileByUserId,
    createProfile,
    editTopics,
    removeProfile,
    getGithubRepos
}
