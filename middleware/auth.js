// Authinication middleware to viwe private contnet
const jwt = require('jsonwebtoken');

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
      res.status(400).json({ message: `Tocken Error: ${e.message}` });
      console.error(`Tocken Error: ${e.message}`);
   }
};

module.exports = auth;
