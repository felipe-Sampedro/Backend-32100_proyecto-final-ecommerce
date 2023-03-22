// const envConfig = require('../config');
const envConfig = require('../env.config');

module.exports = { 
  mongodb: {
    connectTo: (database) => `mongodb+srv://coderhouse:${envConfig.DB_PASSWORD}@cluster0.zhv02a9.mongodb.net/${database}?retryWrites=true&w=majority`
  }  
  // Change here for your mongo atlas account's URI
}