import React, {useEffect} from 'react';
import {useState} from "react";
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';
import axios from "axios";
import { useAuthContext } from '../../hooks/useAuthContext'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51MgsSNG4way0COrggs2JoOQ7uN8uLBXXNcpgMEJfgYluv6QuQxC4PmBe05wL2o0nca0CDBVbey8N0bbx7WZ89zRQ00jEfZW0Ie');

function App() {
    const [clientSecret, setClientSecret] = useState('');
    const {
        user,
        userData,
        dispatch,
    } = useAuthContext()
    const getOptions = async () => {
        const response = await axios.post('http://localhost:3002/api/payment/do-payment', {}, {
            headers: {'Authorization': `Bearer ${user.token}`},
        }).then((response) => {
            console.log(response.data)
            setClientSecret(response.data.clientSecret)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        getOptions();
    }, []);
    const options = {
        // passing the client secret obtained in step 3

        clientSecret: "pi_3O7a9rG4way0COrg1HIklbFS_secret_qJ1121f8a28P5AdVpdLUAUzjz",
        // Fully customizable with appearance API.
        appearance: {/*...*/},
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm/>
        </Elements>
    );
};

export default App;
