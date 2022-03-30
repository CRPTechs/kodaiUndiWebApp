const functions = require("firebase-functions");
const Razorpay = require("razorpay");


// const cors = corsModule( options: {origin:true})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });

exports.checkout = functions.https.onRequest((request, response) => {
  const instance = new Razorpay({
    key_id: "rzp_live_jQ5jvvQyL9efRf",
    key_secret: "wzFY27Fb949quJyTXMGZ8OVo",
  });
  let requestData = {};
  ({requestData} = request.body);
  // const requestData = {
  //   amount: request.body.amount,
  //   currency: request.body.currency,
  //   receipt: request.body.receipt,
  // };
  console.log("Resquest:" + JSON.stringify(requestData));
  const options = {
    amount: requestData.amount * 100,
    currency: "INR",
    receipt: requestData.receipt,
  };
  console.log("27", options);
  instance.orders.create(options, function(err, order) {
    console.log("order response:" + JSON.stringify(order));
    console.log("error:" + JSON.stringify(err));
    response.send(order);
  });
});
