const twilio = require('twilio')
const envConfig = require('../env.config')

const twilioClient = twilio(envConfig.TWILIO_ACCOUNT_SID, envConfig.TWILIO_AUTH_TOKEN)

const sendWhatsapp = async options => {
  try {
    await twilioClient.messages.create({
      body: 'Entrega final comision 32100',
      from: envConfig.TWILIO_WHATSAPP,
      to: envConfig.ADMIN_WHATSAPP
    })
  } catch (error) {
    console.log(error);
  }
}

export default sendWhatsapp
