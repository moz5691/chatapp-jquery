const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  messages: {
    type: Schema.Types.ObjectId,
    ref: 'messages'
  },
  userNames: { type: Array, default: [] }
});

mongoose.model('chats', ChatSchema, 'chats');
