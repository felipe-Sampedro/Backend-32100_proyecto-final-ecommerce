const twilio = require('twilio')
const envConfig = require('../env.config')

const twilioClient = twilio(envConfig.TWILIO_ACCOUNT_SID, envConfig.TWILIO_AUTH_TOKEN)

const sendSMS = async options => {
  try {
    await twilioClient.messages.create({
      body: 'hola, soy un SMS creado desde Node.js, profe tenga misericordia de mi ',
      from: envConfig.TWILIO_NUMBER,
      to: '+573017345220'
    })
  } catch (error) {
    console.log(error);
  }
}

export default sendSMS
