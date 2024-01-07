const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageChainSchema = new Schema ({
    "sender": String,
    "receiver": String,
    "senderName": String,
    "receiverName": String
});


module.exports = mongoose.model("messageChain", messageChainSchema);