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
      res.json({ items })
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
      res.json({ savedItem })
      
   } catch (err) {
      console.log(`Error geting data form DB`)
   }
})

module.exports = router;