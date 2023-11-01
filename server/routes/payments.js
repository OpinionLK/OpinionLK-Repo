import express, { application } from 'express';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import { Clients }
    from '../models/Client.js';
import Surveys from '../models/Surveys.js';
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
    // get customer id from db
    const customerid = await Clients.find({ _id: id }, { stripeCustomerId: 1, _id: 0 });
    console.log(customerid[0].stripeCustomerId);
    const session = await stripe.checkout.sessions.create({

        payment_method_types: ['card'],
        mode: 'setup',
        customer: customerid[0].stripeCustomerId,
        success_url: 'http://localhost:3000/organisation/paymentbilling/',
        cancel_url: 'https://localhost:3000/organisation/paymentbilling',
    });
    // 303 redirect to session.url
    return res.json({ url: session.url });
})


router.post('/retrieve-payment', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
        console.log('no token');
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { id, email } = jwt.verify(token, 'test');
    const customerid = await Clients.find({ _id: id }, { stripeCustomerId: 1, _id: 0 });
    console.log(customerid[0].stripeCustomerId);
    const stripe = new Stripe('sk_test_51MgsSNG4way0COrgMgTXf6vLRTWjpv268ocCKpt6oN9FEBultO9XCYycHA25UpGNsIrW3GXH8LIXeNs2Cht08nGg00DC6i0sX0');

    const paymentMethods = await stripe.customers.listPaymentMethods(
        customerid[0].stripeCustomerId,
        { type: 'card' }
    );


    console.log(paymentMethods.data);
    return res.json({ paymentMethods: paymentMethods.data });

})

router.post('/do-payment', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
        console.log('no token');
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { id } = jwt.verify(token, 'test');
    const { surveyid } = req.body;
    console.log("fewf");
    console.log(surveyid);
    // get cost from db
    const survey = await Surveys.find({ surveyID: surveyid });
    console.log(survey[0].cost)
    const stripe = new Stripe('sk_test_51MgsSNG4way0COrgMgTXf6vLRTWjpv268ocCKpt6oN9FEBultO9XCYycHA25UpGNsIrW3GXH8LIXeNs2Cht08nGg00DC6i0sX0');
    const customerid = await Clients.find({ _id: id }, { stripeCustomerId: 1, _id: 0 });
    // get payment method id from stripe
    console.log(customerid[0].stripeCustomerId);
    try {
        const paymentMethods = await stripe.customers.listPaymentMethods(
            customerid[0].stripeCustomerId,
            { type: 'card' }
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: survey[0].cost * 100,
            description: 'Survey Payment- ' + surveyid,
            currency: 'lkr',
            customer: customerid[0].stripeCustomerId,
            payment_method: paymentMethods.data[0].id,
            payment_method_types: ['card'],
            // receipt_email: 'You have successfully paid for the survey, ' + surveyid,

        });
        console.log(paymentIntent);

        const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id,
            {
                payment_method: 'pm_card_visa',
            });

        if (confirmedPaymentIntent.status === 'succeeded') {
            console.log('payment success');
            // update survey status to paid
            await Surveys.updateOne({ surveyID: surveyid }, { $set: { approvalStatus: 'active' } });
            return res.json({ status: 'success' });
        } else {
            console.log('payment failed');
            return res.json({ status: 'failed' });
        }
    } catch (error) {
        console.log(error);
    }


})

router.get('/get-payment-history', async (req, res) => {
    try {


        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (!token) {
            console.log('no token');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id } = jwt.verify(token, 'test');
        const customerid = await Clients.find({ _id: id }, { stripeCustomerId: 1, _id: 0 });
        console.log(customerid[0].stripeCustomerId);
        const stripe = new Stripe('sk_test_51MgsSNG4way0COrgMgTXf6vLRTWjpv268ocCKpt6oN9FEBultO9XCYycHA25UpGNsIrW3GXH8LIXeNs2Cht08nGg00DC6i0sX0');


        const paymentIntents = await stripe.paymentIntents.list({
            customer: customerid[0].stripeCustomerId,
            limit: 100, // Adjust this number based on your needs
        });


        // return only the required fields

        const paymentHistory = paymentIntents.data.map((paymentIntent) => {
            return {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                description: paymentIntent.description,
                status: paymentIntent.status,
            }
        })
        return res.json({ paymentHistory: paymentHistory }); 
    }
    catch (error) {
        console.log(error);
    }



})


export default router;