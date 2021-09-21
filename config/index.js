require('dotenv').config();

module.exports.config = {
   NODE_ENV: process.env.NODE_ENV,
   PORT: process.env.PORT,
   MONGO_URI: process.env.MONGO_URI,
   MONGO_DB_NAME: process.env.MONGO_DB_NAME,
};