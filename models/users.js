const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema
const UserSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   regester_date: {
      type: Date,
      default: Date.now
   }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
