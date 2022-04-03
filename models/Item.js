const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: [
         true,
         'Item with the same name already exists, find item and change its properties, ex: quantity or description or and feature to the name example: Milk add Sawer Milk to the name',
      ],
      minLength: [2, 'Items name should be more than 2 letters'],
   },
   description: {
      type: String,
      default: 'no description..',
   },
   quantity: { type: Number, default: 1 },
   importance: { type: Number, default: 1 },
   pricePerUnit: { type: Number, default: 1 },
   unit: { type: String, default: 'pce' },
   liks: {
      type: Number,
      default: 0,
   },
   date: {
      type: Date,
      default: Date.now,
   },
   user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   isDone: { type: Boolean, default: false },
   alert: { type: Boolean, default: false },
   category_id: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Category',
         required: true,
      },
   ],
   order: { type: Number },
   archived: { type: Boolean, default: false },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
