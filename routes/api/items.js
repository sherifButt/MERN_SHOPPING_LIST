const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item')

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', async (req, res) => {
   try {
      const items = await Item.find().sort({ date: -1 })
      res.json(items)
   } catch (err) {
      console.log(`Error geting data form DB`)
   }
})

// @route POST api/item
// @desc Create a Post object
// @access Public
router.post('/', async (req, res) => {
   try {
      const newItems = new Item({
         name: req.body.name
      })
      const savedItem = await newItems.save()
      res.json(savedItem)

   } catch (err) {
      console.log(`Error geting data form DB`)
   }
})


// @route DELETE api/item/id
// @desc Delete a Post object
// @access Public
router.delete('/:id', async (req, res) => {

   try {
      // find item in database
      const item = await Item.findById(req.params.id)

      if (item) {
         await item.remove()
         res.status(200).json({
            success: true,
            message: `Post #[${ req.params.id }] deleted successfully`
         })
      } else {
         res.status(404).json({
            success: false,
            message: `item #[${ req.params.id }] dosnot exist, nothing to delete`
         })
      }

      // const savedItem = await newItems.save()

   } catch (err) {
      console.log(`Error geting data form DB`)
   }
})

module.exports = router;