const express = require('express');
const authentication = require('../../middleware/auth'); 
const Category = require('../../models/Category');
const router = express.Router();
/**
* @route GET api/categories
* @desc Get all categories
* @access Public
*/
router.get('/', async (req, res) => {
   try
   {
      /*
      To change names and order
      const category = await Category.aggregate([
         {
            $project: {
               id: '$_id',
               name: "$name",
               user:'$user_id'
            },
         },
      ])
      */
      const category = await Category.find()
      .populate({
      path: 'user_id',
      select: '-password',
      })
      //  .populate({path:'user',select:'-password'})

      res.status(200).json( category );
   } catch (e) {
      console.log(`Error posting to /api/categories: ${e.message}`);
      res.status(e.status ? e.status : 400).json({
         success: false,
         msg: e.message,
         status: e.status ? e.status : 400,
         id: e.id ? e.id : null,
      });
   }
});

/**
* @route POST api/categories
* @desc Create a category
* @access Private
*/
router.post('/', authentication, async (req, res) => {
   const { name, description, user_id } = req.body;
   try {
      // validate entries
      if (!name || !user_id)
         throw {
            message: `Required fields are missing,${!name ? ' #name' : ''}${
               !user_id ? ' #user_id' : ''
            } field is missing.`,
            status: 400,
            id: 'USER_ERROR',
         };
      // check if category exits
      const existingCategory = await Category.findOne({ name });
      if (existingCategory)
         throw {
            message: `Category with name [${name}] already exists! chose a different name.`,
            status: 401,
            id: 'DB_ERROR',
         };

      const newCategory = new Category({ name, description, user_id });
      const savedCategory = await newCategory.save();

      res.status(200).json({
         success: true,
         msg: `category ${name} has created successfully.`,
         status: 200,
         category: savedCategory,
      });
   } catch (e) {
      console.log(`Error posting to /api/categories: ${e.message}`);
      res.status(e.status ? e.status : 400).json({
         success: false,
         msg: e.message,
         status: e.status ? e.status : 400,
         id: e.id ? e.id : null,
      });
   }
} );

/**
* @route GET api/categories
* @desc get single category
* @access Public
*/
router.get('/:id', async (req, res) => {
   try {
      const category = await Category.findById(req.params.id).populate('user_id');
      if (!category)
         throw {
            message: `Category with [${req.params.id}] doesnt exists!`,
            status: 401,
            id: 'DB_ERROR',
         };
      res.status(200).json({
         success: true,
         msg: `category ${category.name} is in database.`,
         status: 200,
         category,
      });
   } catch (e) {
      console.log(`Error getting data form DB`);
      res.status(400).json({
         success: false,
         msg: e.message,
         status: e.status ? e.status : 400,
         id: e.id ? e.id : null,
      });
   }
} );

/**
* @route DELETE api/categories/id
* @desc Delete a category
* @access private
*/
router.delete('/:id', authentication, async (req, res) => {
   try {
      // find item in database
      const category = await Category.findById(req.params.id);
      if (!category)
         throw {
            message: `Category with [${req.params.id}] doesn't exist!`,
            status: 401,
            id: 'DB_ERROR',
         };
      // Remove item
      await category.remove();
      res.status(200).json({
         success: true,
         msg: `Category #[${req.params.id}] deleted successfully`,
         status: 200,
      });

      // const savedItem = await newItems.save()
   } catch (e) {
      console.log(`Error getting data form DB: ${e.message}`);
      res.status(e.status ? e.status : 400).json({
         success: false,
         message: `Error getting data form DB! ${e.message}`,
         status: e.status ? e.status : 400,
         id: e.id ? e.id : null,
      });
   }
});

module.exports = router;
