const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let photoSchema = new Schema ({
    "user": String,
    "encoding": String,
    "mimetype": String,
    "buffer": Buffer
});


module.exports = mongoose.model("photo", photoSchema);