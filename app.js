require('dotenv').config();
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");



var indexRouter = require('./routes/index');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);

const mongoDB = "mongodb://localhost:27017/semesterproject_fall";
mongoose.connect(mongoDB)
    .catch((err)=>console.log(err));
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.listen(3000, () => {
    console.log("Server started at 3000");
});

module.exports = app;
