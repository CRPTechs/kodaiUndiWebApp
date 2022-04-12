const functions = require('firebase-functions');
// const Razorpay = require('razorpay');
const mailApi = require('./checkout');

// exports.checkout = functions.https.onRequest((request, response) => {
//   const instance = new Razorpay({key_id: 'rzp_live_jQ5jvvQyL9efRf',
//     key_secret: 'wzFY27Fb949quJyTXMGZ8OVo'});
//   instance.orders.create({
//     amount: request.body.totalAmount,
//     currency: request.body.currency,
//     receipt: request.body.receipt}).then((order) => {
//     response.send(order);
//     console.log(order);
//   }).catch((err) => {
//     console.log('error:' + JSON.stringify(err));
//   });
// });

exports.sendMail = functions.https.onRequest(mailApi);
