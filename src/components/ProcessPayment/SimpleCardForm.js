import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';





const SimpleCardForm = ({handlePaymentSuccess}) => {
    const [pymentError, setPymentError] = useState(null);
    const [pymentSuccess, setPymentSuccess] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event) => {
        
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPymentError(error.message);
            setPymentSuccess(null);
        } else {
            setPymentSuccess(paymentMethod.id);
            setPymentError(null);
            handlePaymentSuccess(paymentMethod.id);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {
                pymentError && <p style={{color:"red"}}>{pymentError}</p>
            }
            {
                pymentSuccess && <p style={{color:'green'}}>Your payment successFully</p>
            }
        </div>
    );
};

export default SimpleCardForm;