import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load your publishable key from Stripe dashboard
const stripePromise = loadStripe('pk_test_51PkvJW07FSGtwD9RQZzgAgipw4lpk4TtXuAbtU13BchLLpYUiXnus21IyiAKMojSmPiTuoK8EKiDYdEcQNiUZPQw00iH15hNU6');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
            console.error("Stripe.js has not yet loaded.");
            return;
        }
    
        setIsProcessing(true);
    
        const cardElement = elements.getElement(CardElement);
    
        try {
            const response = await fetch('/payment/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ amount: 1000 }),
            });
    
            const { clientSecret } = await response.json();
    
            console.log('Client Secret:', clientSecret); // Debugging
    
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });
    
            setIsProcessing(false);
    
            if (paymentResult.error) {
                console.error('Payment failed:', paymentResult.error.message);
                setPaymentStatus('Payment failed: ' + paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === 'succeeded') {
                setPaymentStatus('Payment succeeded!');
            }
        } catch (error) {
            console.error('Error during payment:', error);
            setPaymentStatus('Payment failed: ' + error.message);
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay'}
            </button>
            {paymentStatus && <p>{paymentStatus}</p>}
        </form>
    );
};

const Checkout = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;