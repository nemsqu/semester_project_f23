const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let productSchema = new Schema ({
    "product": String,
    "brand": String,
    "info1": String,
    "info2": String,
    "info3": String,
    "link": String,
    "views": Number,
    "ratings": Number,
    "totalRatings": Number,
    "avgRating": Number
});


module.exports = mongoose.model("product", productSchema);