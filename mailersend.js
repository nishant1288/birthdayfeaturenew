import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import dotenv from 'dotenv';

dotenv.config();

const mailersend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY
})

const sentFrom = new Sender('nishant@gili.pro', 'nishant krishna Ghadigaonkar');

const recipients = [
    new Recipient("nishant.gilipro@gmail.com", "Nishant Client"),
    new Recipient('ramkumar@gili.pro', 'Ramkumar Nadar')
];

const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('Subject for email')
    .setHtml('<h3>Hi This is a test mail for email</h3>')
    .setText('This is a text content')

mailersend.email
    .send(emailParams)
    .then((response) => console.log(response))
    .catch((error) => console.log(error))