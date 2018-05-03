import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../../constants/stripe';
import PAYMENT_SERVER_URL from '../../constants/server';

console.log(PAYMENT_SERVER_URL);
console.log(STRIPE_PUBLISHABLE );
const CURRENCY = 'USD';

const fromDollarToPenny = amount => amount * 100;

const successPayment = data => {
	alert('Payment successful');
}

const errorPayment = data => {
	alert('Payment Error....data', data);
}

const onToken = (amount, description) => token =>
	axios.post('/api/auth/payment',
	{
		description,
		source: token.id,
		currency: CURRENCY,
		amount: fromDollarToPenny(amount)
	})
	.then(successPayment)
	.catch(errorPayment)

const Checkout = ({ name, description, amount}) =>
	<StripeCheckout
		name={name}
		description={description}
		amount={fromDollarToPenny(amount)}
		token={onToken(amount, description)}
		currency={CURRENCY}
		stripeKey={STRIPE_PUBLISHABLE}
	/>

export default Checkout;	