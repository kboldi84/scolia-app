const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');


// database connection
const dbURI = 'mongodb://krisz:12345@192.168.23.154:28017/scolia';
//const dbURI = 'mongodb://krisz:12345@164.92.145.108:27017/scolia';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));



// routes
app.get('*',checkUser);
app.get('/', requireAuth, (req, res) => res.render('home'));
app.use(authRoutes)