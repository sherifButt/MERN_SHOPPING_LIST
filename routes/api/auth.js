// Authinication routs

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

const route = express.Router();

// Authentication routes
// RISK
/**
 * @route POST api/auth
 * @desc Authenticate user
 * @access Public
 */
route.post('/', async (req, res) => {
   // destructuring body
   const { email, password } = req.body;
   // simple validation
   if (!email || !password)
      return res.status(404).json({
         success: false,
         msg: `Required fields are missing,${!email ? ' #email' : ''}${
            !password ? ' #password' : ''
         } field is missing.`,
         status: 401,
      });

   try {
      // check for existing user
      // check if email already exists
      // get email form data based
      const user = await User.findOne({ email });
      // compare body email with database
      // if email already exists retrun message user alredy esist please regster another email
      if (!user) throw Error(`User [${email}] doesnot exists.`);

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error(`Invalid credentials`);

      // create token
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error(`Somthing went wrong whilde generating token`);

      res.status(200).json({
         success: true,
         status: 200,
         token,
       user: { _id: user.id, name: user.name, email: user.email },
         
         msg: `User [${user.email}] has logged in succefuly.`,
      });
   } catch (e) {
      console.log(`Error while Authenticating user! ${e.message}`);
      res.status(400).json({
         success: false,
         msg: `Error while Authenticating user! ${e.message}`,
         status: 400,
      });
   }
});

/**
 * @route GET api/auth/user
 * @desc Get user information
 * @acess Private
 */
route.get('/user', auth, async (req, res) => {
   try {
      // get id from user object stored in request comming from auth middleware.
      const id = req.user.id;
      if (!id) throw Error(`No id provided in req.user Object.`);

      // get user data from database
      const user = await User.findById(id).select('-password');
      if (!user) throw Error('User not found');

      // send user object as json to client
      res.status(200).json({ user });
   } catch (e) {
      console.log(`Error while Authenticating user! ${e.message}`);
      res.status(400).json({
         success: false,
         msg: `Error while Authenticating user! ${e.message}`,
         status: 400,
      });
   }
});

module.exports = route;
