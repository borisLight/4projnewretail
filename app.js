var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
const csrf=require('csurf');
var session = require("express-session");
var logger = require('morgan');
var mongoose = require("mongoose");

const crsfMiddleware=csrf({cookie:true});

const firebase = require("firebase");
const admin= require('firebase-admin');
const serviceAccount=require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://phygital-production.firebaseio.com",
});

const db=admin.firestore();
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyDdvYvW0DAYoyU23_Q-BvPaBVZIoOpbQ54",
  authDomain: "phygital-production.firebaseapp.com",
  databaseURL: "https://phygital-production.firebaseio.com",
  projectId: "phygital-production",
  storageBucket: "phygital-production.appspot.com",
  messagingSenderId: "326568288918",
  appId: "1:326568288918:web:224b34e4cf803077c058b7",
  measurementId: "G-KMLWNRT9DH"
};
// // Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//   apiKey: 'AIzaSyC_WybMaSXS40fyx9-aYrkKn5NJ5NszojI',
//   authDomain: 'phygital-282816.firebaseapp.com',
//   projectId: 'phygital-282816'
// });

// var db = firebase.firestore();

// //CONNECT TO DATABASE
// mongoose.connect('mongodb://localhost:27017/4proj');
// //GET CONNECTION OBJECT
// var db = mongoose.connection;
// db.on("open", function(){
//     console.log("Connection is now open with Database");
// });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(crsfMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.all('*',(req,res,next)=>{
  res.cookie("XSRF-TOKEN",req.crsfToken());
  next();
});

app.post("/sessionLogin",(req,res)=>{
  const idToken=req.body.idToken.toString();
  const expireIn=60*60*24*5*1000;
  admin.auth()
  .createSessionCookie(idToken,{expiresIn})
  .then(
    (sessionCookie)=>{
      const options={maxAge:expireIn,httpOnly:true};
      res.cookie("session",sessionCookie,options);
      res.end(JSON.stringify({status:"success"}));
    },
    (error)=>{
      res.status(401).send("AUTHORIZED REQUEST");
    }
  )
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
