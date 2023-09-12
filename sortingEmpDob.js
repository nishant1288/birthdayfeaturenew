// const empArr = ['nishant', 'ram', 'shubham', 'chaitanyua', 'ritik']

// for (let i = 0; i < empArr.length; i = i + 2) {
//     let j = i + 2;
//     let mailSendTo = empArr.slice(i, j)
//     console.log('mail Send to', mailSendTo)
// }

import pg from 'pg';
import dotenv from 'dotenv';


import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'; //import packages

dotenv.config()

const connectionUrl = 'postgres://fhkusyjn:gjzNNlfVQ2xnHMrKTVl7mPr6O5rYCGbE@lallah.db.elephantsql.com/fhkusyjn'; //elephant sql connection url

const mailersend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY //accessing api key of birthday feature from mailer send
})

const sentFrom = new Sender('nishant@gili.pro', 'nishant krishna Ghadigaonkar'); //email address and name of sender

let client = new pg.Client(connectionUrl); //creating connection

client.connect((error) => { //connecting with database
    if (error) {
        return console.error('Could not connect to POSTGRES', error)
    }
    client.query('Select * from EMPLOYEE', (err, result) => { //executing query
        if (err) {
            console.err('Error while executing query', err)
        }
        let empData = result.rows; //getting employee data 
        let todayDate = new Date().toString().slice(4, 10);

        for (let i = 0; i < empData.length; i = i + 2) {
            let j = i + 2;
            let mailSendTo = empData.slice(i, j)
            console.log('Sent')
            mailSendTo.map((emp) => {
                let empDob = emp.dob;
                let preciseEmpDob = empDob.toString().slice(4, 10)
                if (todayDate == preciseEmpDob) {
                    let emailParams = new EmailParams() //setting paramaeters
                        .setFrom(sentFrom)
                        .setTo([new Recipient(emp.email, emp.name)])
                        .setSubject('Subject for email')
                        .setHtml(`<h3>Hi, ${emp.name} Many many happy returns of the day</h3>
                        <a href='https://docs.google.com/forms/d/e/1FAIpQLSf83jecklDpkZmLGw7KZvfcCVga_z2a6gDUey-br0F7klYcEw/viewform'>Unsubscribe</a>`)
                        .setText('This is a text content')
                    mailersend.email //sending mail
                        .send(emailParams)
                        .then((response) => console.log(response.statusCode))
                        .catch((error) => console.log(error))
                }
            })
           
        }

        client.end()
        console.log('Finish Running')
    })

})