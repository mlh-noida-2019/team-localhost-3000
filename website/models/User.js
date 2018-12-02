const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  college:{
    type: String
  },
  interest: {
    type: String
  }
});

module.exports = User = mongoose.model('User', UserSchema);
