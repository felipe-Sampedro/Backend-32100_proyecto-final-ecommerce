const nodemailer = require('nodemailer')
const envConfig = require('../env.config')


const sendEmail = async options => {
  nodemailer.createTestAccount(async (err, account) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        // user: account.user,
        user: 'myrtie.beer@ethereal.email',
        pass: 'e6jeHkcn3TeVcsKrMe'
      }
    })

    const mailOptions = {
      from: `"CHBP Server" ${account.user}`,
      to: envConfig.ADMIN_EMAIL,
      subject: 'Proyecto Final BackEnd CH 32100',
      html: '<h1>Cuerpo del mensaje</h1>'
    }

    try {
      const info = await transporter.sendMail(mailOptions)

      console.log((`Email sended! Preview URL: ${nodemailer.getTestMessageUrl(info)}`));
    } catch (error) {
      console.log(error)
    }
  })
}

export default sendEmail
