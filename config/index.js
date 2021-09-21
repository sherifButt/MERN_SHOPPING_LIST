require('dotenv').config();

module.exports.config =  {
   PRODUCTION: process.env.PRODUCTION,
   PORT: process.env.PORT,
   MONGO_URI: process.env.MONGO_URI,
   MONGO_DB_NAME: process.env.MONGO_DB_NAME,
};