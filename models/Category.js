const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const CategorySchema = new Schema({
   
   name: {
      type: String,
      required: true,
      minlength: [2, 'Item Category Name should be more than 2 letters'],
   },
   discription: String,
   liks: { type: Number, default: 0 },
   user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
   }
}, {
   'toObject': { virtuals: true },
   'toJSON': { virtuals: true }
});

// CategorySchema.set('toObject', { virtuals: true });
// CategorySchema.set('toJSON', { virtuals: true });

CategorySchema.virtual('user', {
   ref: 'User',
   localField: 'user_id',
   foreignField: '_id',
   // justOne: false,
   // count: true,
});

// create model
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category