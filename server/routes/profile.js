const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const ProfileController = require('../controllers/profile');
const auth = require('../middleware/auth');

router.get('/me', auth, ProfileController.getMyProfile)
    .post('/', auth, [check('description', 'Description is required').not().isEmpty(),
                    check('topics', 'At least ONE topic is required').not().isEmpty()], ProfileController.createProfile)
    .get('/', ProfileController.getAllProfiles)
    .get('/user/:user_id', auth, ProfileController.getProfileByUserId)
    .delete('/', auth, ProfileController.removeProfile)
    .get('/github/:username', auth, ProfileController.getGithubRepos)
module.exports = router;