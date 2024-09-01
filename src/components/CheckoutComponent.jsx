import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutComponent.css';

const stripePromise = loadStripe('pk_test_51PkvJW07FSGtwD9RQZzgAgipw4lpk4TtXuAbtU13BchLLpYUiXnus21IyiAKMojSmPiTuoK8EKiDYdEcQNiUZPQw00iH15hNU6');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const { cartItems } = location.state || {}; // Get cartItems passed from the dashboard

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0) * 100; // Convert to cents
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
            const response = await fetch('/payment/create-payment-intent', {
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
                }, 2000); // Redirect to dashboard after 2 seconds
            }
        } catch (error) {
            console.error('Error during payment:', error);
            setPaymentStatus('Payment failed: ' + error.message);
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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