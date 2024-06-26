const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const Post = require('../../model/Post');

const checkObjectId = require('../../middleware/checkObjectId');

// @route       POST  api/posts
// @desc        Create a Post
// @access     Private
router.post(
    '/',
    [auth, [check('text', 'Text is required').notEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            });
            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send(
                'Server Error – This Time(500), We fuck It Up! '
            );
        }
    }
);

// @route           GET  api/posts
// @desc            Get all Posts (profiles are Public but Post are Private)
// @access        Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error – This Time(500), We fuck It Up! ');
    }
});

// @route           GET  api/posts/:id
// @desc            Get post by Id
// @access        Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
    // router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error – This Time(500), We fuck It Up! ');
    }
});

// @route           DELETE  api/posts/:id
// @desc            Delete a post
// @access        Private
router.delete('/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found with this ID' });
        }

        // Check User (is the user the same user from the post?)
        if (post.user.toString() !== req.user.id) {
            console.log(
                `The comparation don't match ${post.user.toString()} ≠ ${
                    req.user.id
                }`
            );
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Delete Post
        // await post.remove();
        await Post.findOneAndDelete({ _id: req.params.id });

        res.json({ msg: 'Post was removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error – This Time(500), We fuck It Up! ');
    }
});

// @route          PUT api/posts/like/:id
// @desc           Like a post
// @access        Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the Post has been liked already
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({ msg: 'Post was already liked' });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sewrver Error');
    }
});

// @route          PUT api/posts/unlike/:id
// @desc           Unlike a post
// @access       Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the Post has been liked already
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: 'Post has not been liked yet' });
        }

        // Get remove index
        const removeIndex = post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();

        return res.status(200).json({ msg: 'The like was removed' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Sewrver Error');
    }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
    '/comment/:id',
    auth,
    checkObjectId('id'),
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            };

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
        );

        await post.save();

        return res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
