import nodemailer from 'nodemailer'
import { env } from '~/config/environment.config'

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.email.account,
    pass: env.email.password
  }
})

class EmailService {
  async sendMail(toEmail: string, subject: string, content: string) {
    const mailOptions = {
      from: env.email.name,
      to: toEmail,
      subject: subject,
      html: content
    }

    return await transporter.sendMail(mailOptions)
  }
}

const emailService = new EmailService()

export default emailService
