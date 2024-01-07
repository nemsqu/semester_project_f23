const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    "name": String,
    "email": String,
    "password": String,
    "photo": String
});


module.exports = mongoose.model("user", userSchema);