const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post'); // Use Post.js
const isLoggedIn = require('../middleware/isLoggedIn');

// ...


const router = express.Router();

router.post('/post/:id/comment', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const { text } = req.body;
  const author = req.user._id;
  const comment = new Comment({ text, author, post });
  await comment.save();
  post.comments.push(comment);
  await post.save();
  res.redirect(`/post/${post._id}`);
});

module.exports = router;
