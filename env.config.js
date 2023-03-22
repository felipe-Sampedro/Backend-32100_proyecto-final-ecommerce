require('dotenv').config();
// const dotenv = require('dotenv');

module.exports = {  
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DATASOURCE: process.env.DATASOURCE,
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  JWT_EXPIRE:process.env.JWT_EXPIRE || 6000,
  JWT_SECRET:process.env.JWT_SECRET || "top-secret-51",
  TEST_MAIL:process.env.TEST_MAIL,
  PASSWORD_MAIL:process.env.PASSWORD_MAIL,
  ADMIN_EMAIL:process.env.ADMIN_EMAIL
}