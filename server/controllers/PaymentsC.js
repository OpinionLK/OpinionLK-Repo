// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// const stripe = require('stripe')('sk_test_26PHem9AhJZvU623DfE1x4sd');
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51MgsSNG4way0COrgMgTXf6vLRTWjpv268ocCKpt6oN9FEBultO9XCYycHA25UpGNsIrW3GXH8LIXeNs2Cht08nGg00DC6i0sX0");
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'setup',
  customer: '{{CUSTOMER_ID}}',
  success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://example.com/cancel',
});

// 303 redirect to session.url
// 303 redirect to session.url