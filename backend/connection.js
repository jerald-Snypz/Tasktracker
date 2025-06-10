// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://newuser:newuser@cluster0.lqswtxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));


const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://jeralds3698:jerald3698@cluster0.wgfvlyh.mongodb.net/TaskTracker?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));
