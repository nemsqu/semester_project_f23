const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let productionSchema = new Schema ({
    "fuel": String,
    "emissions": Number,
    "unit": Number, //enum
});


module.exports = mongoose.model("production", productionSchema);