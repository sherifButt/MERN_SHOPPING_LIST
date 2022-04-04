const { query } = require('express');
const express = require('express');
const i = require('../../client/src/helpers/items');
const { CountObjects } = require('count-objects');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', async (req, res) => {
   try {
      const items = await Item.find()
         .sort({ date: -1 })
         .populate({
            path: 'user_id',
            select: '-password -email -_id',
         })
         .populate({
            path: 'category_id',
            populate: {
               path: 'user_id',
               select: '-password -email',
            },
         });
      //console.log(items)
      const items_ = JSON.parse(JSON.stringify(items))
       const co =  new CountObjects(items_);

      res.status(200).json({
         success: true,
         msg: `items loaded successfully`,
         status: 200,
         items,
         count: co.count(),
      });
   } catch (e) {
      console.log(`Error getting data form DB! ${e}`);
      res.status(404).json({
         success: false,
         msg: `Error getting data form DB! ${e}`,
         status: 404,
      });
   }
});

// @route POST api/item
// @desc Create an Item object
// @access Private
router.post('/', auth, async (req, res) => {
   try {
      const newItems = new Item({
         name: req.body.name,
         description: req.body.description,
         liks: req.body.liks,
         user_id: req.body.user_id,
         category_id: req.body.category_id,
         quantity: req.body.quantity,
         importance: req.body.importance,
         pricePerUnit: req.body.pricePerUnit,
         unit: req.body.unit,
         order: req.body.order,
      });

      const savedItem = await newItems.save();
      if (!savedItem)
         throw {
            message: `cannot save item [${name}] `,
            status: 401,
            id: 'DB_ERROR',
         };
      const retrievedItem = await Item.findById(savedItem.id)
         .populate({ path: 'user_id', select: '-password' })
         .populate({ path: 'category_id' });
      res.status(200).json(retrievedItem);
   } catch (e) {
      console.log(`Error getting data form DB ${e}`);
      res.status(e.status ? e.status : 400).json({
         success: false,
         msg: e.message,
         status: e.status ? e.status : 400,
         id: e.id ? e.id : null,
      });
   }
});

// @route DELETE api/item/id
// @desc Delete a Post object
// @access Private
router.delete('/:id', auth, async (req, res) => {
   try {
      // find item in database
      const item = await Item.findById(req.params.id);
      if (!item) throw Error(`item #[${req.params.id}] doesn't exist, nothing to delete`);

      // Remove item
      await item.remove();
      res.status(200).json({
         success: true,
         msg: `Post #[${req.params.id}] deleted successfully`,
         status: 200,
      });

      // const savedItem = await newItems.save()
   } catch (e) {
      console.log(`Error geting data form DB`);
      res.status(400).json({
         success: false,
         message: `Error getting data form DB! ${e}`,
         status: 400,
      });
   }
});

router.put('/dndreorder/:id', async (req, res) => {
   try {
      // update item in database
      console.log(req.params.id, req.query.desI);
      const item = await Item.updateOne({ _id: req.params.id }, { order: req.query.desI });
      if (!item) throw Error(`item #[${req.params.id}] dosnot exist, nothing to delete`);

      console.log(`updated ${req.params.id}`);

      res.status(200).json({
         success: true,
         msg: `item #[${req.params.id}] order  updated successfully -> #${req.query.desI}`,
         status: 200,
      });

      // const savedItem = await newItems.save()
   } catch (e) {
      console.log(`Error geting data form DB`);
      res.status(400).json({
         success: false,
         message: `Error geting data form DB! ${e}`,
         status: 400,
      });
   }
});

module.exports = router;
