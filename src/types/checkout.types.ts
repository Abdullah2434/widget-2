export type CheckoutPaymentIntentDetails = {
  paymentIntentClientSecret: string;
  ephemeralKeySecret: string;
  customerId: string;
};

export type CheckoutCart = {
  cartId: string;
  total: number;
  payment?: any;
};
