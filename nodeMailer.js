import pg from 'pg';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()
console.log('Controller is running');
const connectionUrl = 'postgres://fhkusyjn:gjzNNlfVQ2xnHMrKTVl7mPr6O5rYCGbE@lallah.db.elephantsql.com/fhkusyjn';
// const connectionUrl = 'postgres://npskumhx:75rgRtxNWDqVWMAiK1GDJxAnbCD_lv8U@trumpet.db.elephantsql.com/npskumhx';

let client = new pg.Client(connectionUrl);

client.connect((error) => {
    if (error) {
        return console.error('Could not connect to POSTGRES', error)
    }
    client.query('Select * from employee', (err, result) => {
        if (err) {
            return console.err('Error while executing Query', err)
        }

        let todayDate = new Date();

        const transporter = nodemailer.createTransport({
            // host: 'smtp.gmail.com',
            host: 'smtpout.secureserver.net',
            secure: true,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
                ciphers: 'SSLv3'
            },
            requireTLS: true,
            // port: 587,
            port: 465,
            debug: true,
            auth: {
                user: process.env.NODEMAILER_USER,
                // pass: 'teahaymaydnddtkq'
                pass: process.env.NODEMAILER_PASS
            },
        });

        let empData = result.rows;
        console.log(empData)

        empData.map((data, index) => {
            // console.log(data.dob, todayDate);
            let empDob = data.dob.toString().slice(4, 10);
            let tdDate = todayDate.toString().slice(4, 10);
            if (empDob == tdDate) {
                const info = transporter.sendMail({
                    from: '"Gili Pro Priority" <care@gilipro.com>', // sender address
                    to: data.email, // list of receivers
                    subject: `Happy Birthday ${data.name}`, // Subject line
                    text: `Happy Birthday`, // plain text body
                    html: `<div style="text-align: center; background-color: #f2f2f2; padding: 20px;">
                        <h1>Happy Birthday, ${data.name}!</h1>
                        <p>On behalf of the entire GiliPro team, we want to extend our warmest birthday wishes to you today!</p>
                        <p>May your special day be filled with joy, laughter, and all the things that make you happiest. We hope you take some time today to relax, celebrate, and enjoy the company of your loved ones.</p>
                        <p>Once again, Happy Birthday,  ${data.name}! Here's to another year of success and happiness.</p>
                        <p>Warmest wishes,</p>
                        <p>www.gili.pro<br>www.gili.co.in<br></p><br>
                        <p>If you want to unsubscribe. <a href="/unsubscribe">Click here</a></p>
                    </div>`, // html body
                });
            }
        })

        client.end();
        console.log('Finish Running')
    })
})

