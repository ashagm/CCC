const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_live_MY_SECRET_KEY'
    : 'sk_test_AyXhB8zari50LMnHPHS57a23';

//sk_test_AyXhB8zari50LMnHPHS57a23
const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;