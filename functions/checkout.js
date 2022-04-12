// const Razorpay = require('razorpay');
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.json());

// app.post('/checkout', (request, response) => {
//   const instance = new Razorpay({key_id: 'rzp_live_jQ5jvvQyL9efRf',
//     key_secret: 'wzFY27Fb949quJyTXMGZ8OVo'});
//   console.log('Request:' + JSON.stringify(request.body));
//   const options = {
//     amount: request.body.amount * 100,
//     currency: 'INR',
//     receipt: request.body.receipt,
//   };
//   console.log('order details:' + JSON.stringify(options));
//   instance.orders.create(options, function(err, order) {
//     console.log('order response:' + JSON.stringify(order));
//     console.log('error:' + JSON.stringify(err));
//     response.send(order);
//   });
// });

const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.post('/sendMail', (req, res) => {
  const {text} = req.body;
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  transport.sendMail({
    from: process.env.MAIL_FROM,
    to: 'test@test.com',
    subject: 'test mail',
    html: `<div className='email' style=
    "border: 1px solid black;
    padding: 20px;
    // font-family: sans-serif;
    line-height: 2;
    font-size: 20px;">
    <h2>Here is your mail!</h2>
    <p>${text}</p>
    <p>All the best!</p>
    </div>`,
  });
});
