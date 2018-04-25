const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_PRODUCTION_KEY'
  : 'pk_test_MOweM0nfLzAlz2pMG6l2N2v6';

export default STRIPE_PUBLISHABLE;