const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         minLength: [2, 'Items name should be more than 2 letters'],
      },
      description: {
         type: String,
         default: '',
      },
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
      category_id: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
         },
      ],
   }
);



const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;