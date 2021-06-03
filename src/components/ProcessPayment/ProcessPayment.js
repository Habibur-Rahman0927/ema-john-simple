import React from 'react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitFormPayment from './SplitFormPayment';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IyCUVFxIV5eyENmL2f6JqqxKYDyHS7QBF4j0Q8IfHrkF4SQtSShnoLZhn7WP5l7hBwyN5rh4WgqW5Hi7DN78P9f003i6kZRCh');


const ProcessPayment = ({handlePaymentSuccess}) => {
    return (

        <Elements stripe={stripePromise}>
        {/*     <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            /> */}
            <SimpleCardForm handlePaymentSuccess={handlePaymentSuccess}></SimpleCardForm>
            {/* <SplitFormPayment></SplitFormPayment> */}
        </Elements>

    );
};

export default ProcessPayment;


