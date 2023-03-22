const nodemailer = require('nodemailer')
const envConfig = require('../env.config')


const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: envConfig.TEST_MAIL,
      pass: envConfig.PASSWORD_MAIL
  }
});

const sendmail = async (email, usuario) => {
  try {
      const mailPayload = {
          from: 'Proyecto Final Ecommerce Coder House',
          to: envConfig.TEST_MAIL,
          subject: 'Usuario nuevo registrado',
          html: `<p>Usuario ${usuario} se registro correctamente</p>`
      };

      const mailResponse = await transporter.sendMail(mailPayload);
      console.log(mailResponse);
  } catch (error) {
      console.log(error.message); 
      return error.message;       
  }
}

module.exports ={
  sendmail
} 
