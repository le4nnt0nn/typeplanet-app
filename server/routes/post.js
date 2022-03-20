const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const PostController = require('../controllers/post');
const auth = require('../middleware/auth');

router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], PostController.createPost)
    .get('/', auth, PostController.getAllPosts)
    .get('/:id', auth, PostController.getPostById)
    .delete('/:id', auth, PostController.deletePost)
    .put('/like/:id', auth, PostController.putLike)
    .put('/unlike/:id', auth, PostController.removeLike)
    .post('/comments/:id', [auth, [check('text', 'Text is required').not().isEmpty()]], PostController.postComment)
    .delete('/comment/:id/:comment_id', auth, PostController.removeComment)

module.exports = router;