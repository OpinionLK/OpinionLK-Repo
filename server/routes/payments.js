import express, { application } from 'express';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
const router = express.Router();



router.post('/create-checkout-session', async (req, res) => {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/apikeys
  // verify token

  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  if (!token) {
    console.log('no token');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { id, email } = jwt.verify(token, 'test');

  // verify token

  const stripe = new Stripe('sk_test_51MgsSNG4way0COrgMgTXf6vLRTWjpv268ocCKpt6oN9FEBultO9XCYycHA25UpGNsIrW3GXH8LIXeNs2Cht08nGg00DC6i0sX0');

  // console.log(customer);
  const session = await stripe.checkout.sessions.create({

    payment_method_types: ['card'],
    mode: 'setup',

    client_reference_id: id,
    customer_email: email,
    success_url: 'http://localhost:3000/organisation/paymentbilling/success/{CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancel',
  });
  // 303 redirect to session.url
  return res.json({ url: session.url });
})

router.get('/success', async (req, res) => {
  console.log(req.query.session_id);
  const stripe = new Stripe('sk_test_51MgsSNG4way0COrgMgTXf6vLRTWjpv268ocCKpt6oN9FEBultO9XCYycHA25UpGNsIrW3GXH8LIXeNs2Cht08nGg00DC6i0sX0');
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log(session);
  // const customer = await stripe.customers.retrieve(
  //   session.customer
  // );
  // console.log(customer);
  const setupIntent = await stripe.setupIntents.retrieve(
    session.setup_intent
  );
  console.log(setupIntent);
  // // 303 redirect to session.url
  return res.json({ session, setupIntent });
}
)

router.post('/retrieve-checkout-session', async (req, res) => {
  const stripe = new Stripe('sk_test_51MgsSNG4way0COrgMgTXf6vLRTWjpv268ocCKpt6oN9FEBultO9XCYycHA25UpGNsIrW3GXH8LIXeNs2Cht08nGg00DC6i0sX0');
  const session = await stripe.checkout.sessions.retrieve('cs_test_c1zFGtLuPxLwqF8DD0bxjTRdu6NtXSV2myIkmwZ5WSAltPx9S4WpXOY0Si');

  const setupIntent = await stripe.setupIntents.retrieve(
    session.setup_intent
  );

  stripe.paymentMethods.list({
    customer: session.customer,
    type: 'card',
  }).then(function (result) {
    // handle result.error or result.paymentMethods
    console.log(JSON.stringify(result, null, 2));
  });

  res.json({ session, setupIntent });
})




export default router;