export type PaymentMethod = "MOCK_INSTANT" | "STRIPE" | "RAZORPAY";

export interface CheckoutRequest {
  projectId: string;
  userId: string;
  amount: number;
  currency: string;
  couponCode?: string;
  paymentMethod: PaymentMethod;
}

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  transactionId?: string;
  error?: string;
}

export interface PaymentProvider {
  name: string;
  processPayment(req: CheckoutRequest): Promise<{ success: boolean; transactionId: string; error?: string }>;
}
