// Authinication middleware to viwe private contnet
const jwt = require('jsonwebtoken');
const uuid = require('uuid')

const auth = async (req, res, next) => {
   const token = req.header('X-Auth-Token');
   try {
      // validate token
      if (!token) throw Error('No token, authorization denied'); //res.status(401).json({ message: 'No token, authorization denied' });

      // Check for token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      // Add user from payload
      req.user = decoded;
      next();
   } catch (e) {
      res.status(401).json({
         success: false,
         msg: `Tocken Error: ${ e.message }`,
         id: uuid.v4(),
         status:401
      });
      console.error(`Tocken Error: ${e.message}`);
   }
};

module.exports = auth;
