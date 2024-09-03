import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutComponent.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const { cartItems } = location.state || {};
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0) * 100;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe.js has not yet loaded.");
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/payment/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ amount: calculateTotal() }),
            });

            const { clientSecret } = await response.json();

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            setIsProcessing(false);

            if (paymentResult.error) {
                setPaymentStatus('Payment failed: ' + paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === 'succeeded') {
                setPaymentStatus('Payment succeeded!');
                setTimeout(() => {
                    navigate('/dashboard', { state: { paymentSuccess: true } });
                }, 2000);
            }
        } catch (error) {
            console.error('Error during payment:', error);
            setPaymentStatus('Payment failed: ' + error.message);
            setIsProcessing(false);
        }
    };

    return (
        <form className='checkout-form' onSubmit={handleSubmit}>
            <h3>Order Summary</h3>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.item_name} - ${item.price}
                    </li>
                ))}
            </ul>
            <p>Total: ${(calculateTotal() / 100).toFixed(2)}</p>
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