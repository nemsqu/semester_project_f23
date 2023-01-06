const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let emissionSchema = new Schema ({
    "fuel": String,
    "emissions": Number,  //co2 or co2e ?
    "unit": String, //string or enum?
});


module.exports = mongoose.model("emission", emissionSchema);