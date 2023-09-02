const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose'); // Make sure you have this module installed

const app = express();

// Connect to MongoDB
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost'; // Replace with your MongoDB URL

// Database Name
const dbName = 'mydatabase'; // Replace with your database name

// Create a new MongoClient
const client = new MongoClient(url);

// Define your MongoDB collection variable
let collection;

// Connect to MongoDB and set up the collection
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  // Get a reference to the database
  const db = client.mydatabase(dbName);

  // Set up your MongoDB collection (replace 'mycollection' with your actual collection name)
  collection = db.collection('mycollection');

  // You can perform database operations here as needed
  // Example: Insert a document
  const document = { name: 'John', age: 30 };
  collection.insertOne(document, (err, result) => {
    if (err) {
      console.error('Error inserting document:', err);
      return;
    }
    console.log('Inserted document:', result.ops[0]);
  });
});

// Set up your view engine and middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Define your routes

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Require models
const User = require('./models/User'); // Check the file extension (Users.js)
const Post = require('./models/Post'); // Check the file extension (Post.js)

// Define your routes

const authRoutes = require('./routes/auth'); // Check the extension, e.g., auth.js
const postRoutes = require('./routes/posts'); // Check the extension, e.g., posts.js
const commentRoutes = require('./routes/comments'); // Check the file extension (comments.js)

// Use your routes
app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
