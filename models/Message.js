const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageSchema = new Schema ({
    "message": String,
    "sender": String, 
    "senderName": String,
    "receiver": String,
    "receiverName": String,
    "read": Boolean,
    "chainId": String
});


module.exports = mongoose.model("message", messageSchema);