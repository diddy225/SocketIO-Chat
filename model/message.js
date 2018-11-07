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
});

let Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
