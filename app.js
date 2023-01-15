require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
const passport = require('passport');
const dataInit = require('./inputData');


var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api', indexRouter);

const mongoDB = "mongodb://127.0.0.1/semesterproject_1";
mongoose.connect(mongoDB)
    .then(()=>dataInit.inputData())
    .catch((err)=>console.log(err));
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.listen(3000, () => {
    console.log("Server started at 3000");
});

module.exports = app;
