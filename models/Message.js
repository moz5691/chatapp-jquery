const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from: { type: String, required: true },
  text: { type: String, required: true },
  time: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('messages', MessageSchema, 'messages');
