const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let fuelSchema = new Schema ({
    "fuel": String,
    "emissions": Number,
    "unit": Number, //enum
});


module.exports = mongoose.model("fuel", fuelSchema);