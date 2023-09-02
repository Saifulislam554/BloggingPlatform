const express = require('express');
const Post = require('../models/Post'); // Use Post.js
const User = require('../models/User'); // Use User.js
const isLoggedIn = require('../middleware/isLoggedIn'); // Use IsLoggedIn.js

// ...
 // This line is important

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author');
  res.render('home', { posts });
});

router.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author')
    .populate('comments');
  res.render('post', { post });
});

router.get('/new', isLoggedIn, (req, res) => {
    res.render('new');
  });

router.post('/new', isLoggedIn, async (req, res) => {
  const { title, content } = req.body;
  const author = req.user._id;
  const post = new Post({ title, content, author });
  await post.save();
  res.redirect('/');
});

module.exports = router;
