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
 * @desc Auth user
 * @access Public
 */
route.post('/', async (req, res) => {
   // destructuring body
   const { email, password } = req.body;
   // simple validation
   if (!email || !password)
      return res.status(404).json({
         success: false,
         message: `Required fields are missing,${!email ? ' #email' : ''}${
            !password ? ' #password' : ''
         } field is missing.`,
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
         token,
         user: { id: user.id, name: user.name, email: user.email },
         message: `User [${user.email}] has logged in succefuly.`,
      });
   } catch (e) {
      console.log(`Error while Authenticating user! ${e.message}`);
      res.status(400).json({
         success: false,
         message: `Error while Authenticating user! ${e.message}`,
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
      const id = req.user.id;
      const user = await User.findById(id).select('-password');
      if (!user) throw Error('User not found')
      
      res.status(200).json({ user });
   } catch (e) {
      console.log(`Error while Authenticating user! ${e.message}`);
      res.status(400).json({
         success: false,
         message: `Error while Authenticating user! ${e.message}`,
      });
   }
});

module.exports = route;
