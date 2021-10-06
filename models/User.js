const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemsSchema = require('./Item').ItemSchema;

// console.log(ItemsSchema);
// create user schema
const UserSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Please type item name'],
      minLength: [2, 'User name should be more than 2 letters'],
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: { type: String, required: true },
   regester_date: { type: Date, default: Date.now },
   liks: { type: Number, default: 0 },
   item_count: { type: Number, default: 0 },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
