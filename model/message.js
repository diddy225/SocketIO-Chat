const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let MessageSchema = new Schema({

    sender: {
      type: String,
      trim: true,
      required: true
    },

    message: {
      type: String,
      trim: true,
      required: true
    },

    date: {
      type: Date,
      default: Date.now
    }

});

let Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
