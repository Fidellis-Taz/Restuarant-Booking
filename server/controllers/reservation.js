const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;

require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log
export const reservation = (req, res) => {
  Day.find({ date: req.body.date }, (err, days) => {
    if (!err) {
      if (days.length > 0) {
        let day = days[0];
        day.tables.forEach(table => {
          if (table._id == req.body.table) {
            // The correct table is table
            table.reservation = new Reservation({
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email
            });
            table.isAvailable = false;





            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
              // Generate test SMTP service account from ethereal.email
              // Only needed if you don't have a real mail account for testing
              let testAccount = await nodemailer.createTestAccount();

              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: process.env.EMAIL, // generated ethereal user
                  pass: process.env.PASSWORD, // generated ethereal password
                },
              });

              // send mail with defined transport object
              let info = await transporter.sendMail({
                from: process.env.EMAIL, // sender address
                to: `${req.body.email}`, // list of receivers
                subject: "Restaurant Booking Done", // Subject line
                text: `Thank you for Booking a table at Dango Restaurant , we are looking forward to meeting you at our restaurant at ${req.body.date} `, // plain text body
                html: `<b>Thank you for Booking a table at Dango Restaurant , we are looking forward to meeting you at our restaurant at ${req.body.date}</b>`, // html body
              });


            }


            main().then(() =>
              day.save(err => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Reserved");
                  res.status(200).send("Added Reservation");
                }
              })

            ).catch(console.error);



          }
        });
      } else {
        console.log("Day not found");
      }




    }
  });
}