const stripe = require('../../../constants/stripe');
var express = require('express');
var router = express.Router();


const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

// const paymentApi = app => {
  router.get('/payment', (req, res) => {
    console.log('/payment', req);
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  });

  router.post('/payment', (req, res) => {
    console.log('/payment',req.body);
    stripe.charges.create(req.body, postStripeCharge(res));
  });

  // return app;
// };

module.exports = router;