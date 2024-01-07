const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let reviewSchema = new Schema ({
    "product": String,
    "writerId": String,
    "writer": String,
    "allowContact": Boolean,
    "content": String,
    "rating": Number
});


module.exports = mongoose.model("review", reviewSchema);