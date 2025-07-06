require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/posts'); 
const Comment = require('../models/comments'); 

async function clearCommunity() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Post.deleteMany({});
    await Comment.deleteMany({});

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding gear data:', error);
    mongoose.connection.close();
  }
}

clearCommunity();