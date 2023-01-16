const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let emissionSchema = new Schema ({
    "method": String,
    "emissions": Number,  //co2 or co2e ?
    "passengers": Number, //if 1 then emissions = co2/pkm, otherwise pkm = emissions/passengers
    "fuel": String, //probably needs to be specified separately
    "fuelConsumption": Number,
    "unit": Number //unit for consumption (enum)
});


module.exports = mongoose.model("emission", emissionSchema);