const { validationResult } = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

/**
 * @route    POST api/posts
 * @desc     Create new post
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function createPost(req, res) {
    // store errors in const
    const errors = validationResult(req);

    // if errors is not empty then send errors and 400
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // store user in const (find by id)
        let user = await User.findById(req.user.id).select('-password');

        // create Post with user info
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();
        // user gain level creating post
        user.update({ level: user.level + 0.3 }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    GET api/posts
 * @desc     Get all posts
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function getAllPosts(req, res) {
    try {
        // get all posts sorted by the most recent first
        const posts = await Post.find().sort({ data: -1 });
        res.json(posts);
    } catch (err) {
        // 500 -> Server Error
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    GET api/posts/:id
 * @desc     Get post by id
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'This post not exists :(' });
        res.json(post);
    } catch (err) {
        // 500 -> Server Error
        console.error(err.message);

        // if error is about the ObjectId, then send 404 -> Not Found
        if (err.kind() === 'ObjectId') return res.status(404).json({ msg: 'This post not exists :(' });

        res.status(500).send('Server error');
    }
}

/**
 * @route    DELETE api/posts/:id
 * @desc     Delete post by id
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: 'This post not exists :(' });

        // if the user id stored in the post is not equals to the user id, then error 401 -> Unauthorized
        if (post.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized to complete this action' });

        await post.remove();

        res.json({ msg: 'Post hass been removed :)' });

    } catch (err) {
        // 500 -> Server Error
        console.error(err.message);

        // if error is about the ObjectId, then send 404 -> Not Found
        if (err.kind() === 'ObjectId') return res.status(404).json({ msg: 'This post not exists :(' });

        // then send 500 -> Server Error
        res.status(500).send('Server error');
    }
}

/**
 * @route    PUT api/posts/like/:id
 * @desc     Put like on post
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function putLike(req, res) {
    try {
        // get post
        const post = await Post.findById(req.params.id);

        // check if the post has already been liked, filter by user
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {

            return res.status(400).json({ msg: 'Post already liked... ' });
        }
        // put user in the begining of likes array
        post.likes.unshift({ user: req.user.id });
        // save in db
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    PUT api/posts/unlike/:id
 * @desc     Unlike post
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function removeLike(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        // if post no has likes, then error 400 -> Bad Request
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not been liked yet' });
        }

        // find the user like in likes array
        const rmIndex = post.likes.map((like) => like.user.toString().indexOf(req.user.id));
        // remove selected index in likes
        post.likes.splice(rmIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    POST api/posts/comment/:id
 * @desc     Comment on post
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function postComment(req, res) {
    // store errors in const
    const errors = validationResult(req);
    // if exists errors, then 400 -> Bad Request
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

    try {
        // get user passsword and post by id
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        // create the new comment with data
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        // puts the new comment first in the comments array
        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

/**
 * @route    DELETE api/posts/comment/:id/:comment_id
 * @desc     Delete comment on post
 * @access   PRIVATE
 *
 * Private -> you must be logged in to use it
 * Middleware auth
 */

async function removeComment(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        // get comment
        const comment = post.comments.find((comment) => comment.id === req.params.comment_id);

        // if comment not exists -> 404 Not Found
        if (!comment) return res.status(404).json({ msg: 'Comment not exists' });

        // check user by id from comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // get Index for remove
        const rmIndex = post.comments.map((comment) => comment.user.toString().indexOf(req.user.id));
        // remove comment from comments array
        post.comments.splice(rmIndex, 1);
        await post.save();
        res.json(post.comments)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    putLike,
    removeLike,
    postComment,
    removeComment
}
