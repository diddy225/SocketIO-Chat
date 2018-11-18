const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ChatSchema = new Schema({

    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }],

    userName: [{
      type: Object,
      user1: String,
      user2: String
    }]
});

let Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;