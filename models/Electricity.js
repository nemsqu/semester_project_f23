const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let electricitySchema = new Schema ({
    "fuel": String,
    "emissions": Number,
    "unit": Number, //enum
});


module.exports = mongoose.model("electricity", electricitySchema);