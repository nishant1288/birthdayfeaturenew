import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client({
    user: process.env.UAT_USER,
    host: process.env.UAT_HOST,
    database: process.env.UAT_DATABASE,
    password: process.env.UAT_PASSWORD,
    port: process.env.UAT_PORT
})

client.connect(function (err) {
    if (err) {
        console.log('Error while connecting', err);
    }
    else {
        console.log('Connected')
    }

    let todayDate = new Date();
    let preciseDate = todayDate.toString().slice(4,10)

    client.query('Select employeeid, ename, epemailid, dob, empcode, relation from tblcemployeedetails LIMIT 1162', (err, result) => {
        if (err) {
            console.log('Error while executing Query', err)
        }

        let empData = result.rows;
        empData.forEach((employee) => {
            let empNmae = employee.ename;
            let employeeBirthday = employee.dob;
            // let preciseBday = employeeBirthday.toString().slice(4, 10);

            let empBdate = employeeBirthday.toString().slice(4,10)
            let tDate = todayDate.toString().slice(4, 10);

            if (empBdate === tDate) {
                console.log(empNmae,'Birthday')
            }
            else {
                console.log('No Birthday Today')
            }
            // console.log(employeeBirthday.toString().slice(4,10), todayDate.toDateString().slice(4,10))
            // console.log(preciseBday, preciseDate)

        })

        client.end()
    })
});

