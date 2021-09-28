const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route GET api/users
// @desc Get all users
// @access Public
router.get('/', async (req, res) => {
   try {
      const users = await User.find().sort({ date: -1 });
      res.status(200).json(users);
   } catch (err) {
      console.log(`Error geting data form DB`);
      res.status(404).json({
         success: false,
         msg: `Error geting data form DB, ${err}`,
         status: 404,
      });
   }
});

// @route GET api/user
// @desc get single user
// @access Public
router.get('/:id', async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
   } catch (err) {
      console.log(`Error geting data form DB`);
      res.status(404).json({
         success: false,
         msg: `Error geting data form DB, ${err}`,
         status: 404,
      });
   }
});

// @route POST api/user
// @desc regester new user
// @access Public
router.post('/', async (req, res) => {
   const { name, email, password } = req.body;
   try {
      // simple validation
      if (!name || !email || !password)
         throw Error(
            `Required fields are missing,${!email ? ' #email' : ''}${
               !password ? ' #password' : ''
            }${!name ? ' #name' : ''} field is missing.`
         );

      // check for existing user
      // check if email already exists
      // get email form data based
      const user = await User.findOne({ email });
      // compare body email with database
      // if email already exists retrun message user alredy esist please regster another email
      if (user) throw Error(`User [${user.email}] already exists.`);

      // HASH PASSWORD
      // Create salt & hash for new user
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error(`Somthing went Wrong with bcrypt.`);

      // Hash the password
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error(`Somthing went wrong with hashing [${hash}] password.`);

      // Save new user
      // create mongoose user object
      const newUser = new User({
         name,
         email,
         password: hash,
      });

      // save new user to db
      const savedUser = await newUser.save();
      // send responce to client

      // JWT token
      const token = await jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, {
         expiresIn: 3600,
      });
      if (!token) throw Error(`Somthing went Wrong with token.`);

      res.status(200).json({
         token,
         user: {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
         },
         success: true,
         message: `user ${savedUser.email} saved successfully`,
      });
   } catch (e) {
      console.log(`Error while regestring user! ${e.message}`);
      res.status(404).json({
         success: false,
         msg: `Error while regestring user! ${e.message}`,
         status: 404,
      });
   }
});

// @route DELETE api/user/id
// @desc Delete a Post object
// @access Public
router.delete('/:id', async (req, res) => {
   try {
      // find user in database
      const user = await User.findById(req.params.id);

      if (user) {
         await user.remove();
         res.status(200).json({
            success: true,
            msg: `Post #[${ req.params.id }] deleted successfully`,
            status:200
         });
      } else {
         res.status(404).json({
            success: false,
            msg: `user #[${req.params.id}] dosnot exist, nothing to delete`,
            status: 404,
         });
      }

      // const savedUser = await newUser.save()
   } catch (err) {
      console.log(`Error geting data form DB`);
      res.status(404).json({
         success: false,
         msg: `user #[${req.params.id}] dosnot exist, nothing to delete`,
         status: 404,
      });
   }
});

module.exports = router;
