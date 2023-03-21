require('dotenv').config();
// const dotenv = require('dotenv');

module.exports = {  
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  JWT_EXPIRE:process.env.JWT_EXPIRE || 6000,
  JWT_SECRET:process.env.JWT_SECRET || "top-secret-51"

}