const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', async (req, res) => {
   try {
      const items = await Item.find().sort({ date: -1 });
      res.status(200).json(items);
   } catch (e) {
      console.log(`Error geting data form DB! ${e}`);
      res.status(404).json({
         success: false,
         message: `Error geting data form DB! ${e}`,
      });
   }
});

// @route POST api/item
// @desc Create a Post object
// @access Public
router.post('/', async (req, res) => {
   try {
      const newItems = new Item({
         name: req.body.name,
      });
      const savedItem = await newItems.save();
      res.status(200).json(savedItem);
   } catch (e) {
      console.log(`Error geting data form DB ${e}`);
      res.status(400).json({
         success: false,
         message: `Error geting data form DB! ${e}`,
      });
   }
});

// @route DELETE api/item/id
// @desc Delete a Post object
// @access Public
router.delete('/:id', async (req, res) => {
   try {
      // find item in database
      const item = await Item.findById(req.params.id);
      if (!item) throw Error(`item #[${req.params.id}] dosnot exist, nothing to delete`);

      // Remove item
      await item.remove();
      res.status(200).json({
         success: true,
         message: `Post #[${req.params.id}] deleted successfully`,
      });

      // const savedItem = await newItems.save()
   } catch (err) {
      console.log(`Error geting data form DB`);
      res.status(400).json({
         success: false,
         message: `Error geting data form DB! ${e}`,
      });
   }
});

module.exports = router;