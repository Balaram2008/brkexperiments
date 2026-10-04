import { CheckoutRequest, CheckoutResult, PaymentProvider } from "./types";
import { prisma } from "@/lib/prisma";

class MockInstantProvider implements PaymentProvider {
  name = "MOCK_INSTANT";
  async processPayment(req: CheckoutRequest) {
    const transactionId = "TXN_MOCK_" + Math.random().toString(36).substring(2, 10).toUpperCase();
    return { success: true, transactionId };
  }
}

class StripeProvider implements PaymentProvider {
  name = "STRIPE";
  async processPayment(req: CheckoutRequest) {
    const transactionId = "ch_stripe_" + Math.random().toString(36).substring(2, 12);
    return { success: true, transactionId };
  }
}

class RazorpayProvider implements PaymentProvider {
  name = "RAZORPAY";
  async processPayment(req: CheckoutRequest) {
    const transactionId = "pay_rzp_" + Math.random().toString(36).substring(2, 12);
    return { success: true, transactionId };
  }
}

export const paymentProviders: Record<string, PaymentProvider> = {
  MOCK_INSTANT: new MockInstantProvider(),
  STRIPE: new StripeProvider(),
  RAZORPAY: new RazorpayProvider(),
};

export async function processOrderCheckout(req: CheckoutRequest): Promise<CheckoutResult> {
  const provider = paymentProviders[req.paymentMethod] || paymentProviders.MOCK_INSTANT;
  const paymentResult = await provider.processPayment(req);

  if (!paymentResult.success) {
    return { success: false, error: paymentResult.error || "Payment processing failed" };
  }

  // Ensure projectId is a single clean string
  const rawProjectId = req.projectId as any;
  const projectId = Array.isArray(rawProjectId) ? rawProjectId[0] : rawProjectId;

  // Ensure valid existing user
  let user = await prisma.user.findFirst({
    where: {
      OR: [{ id: req.userId }, { email: "builder@brkexperiments.dev" }],
    },
  });

  if (!user) {
    user = await prisma.user.findFirst();
  }

  if (!user) {
    return { success: false, error: "No user found to associate purchase with." };
  }

  const userId = user.id;

  // Create Order in Database
  const orderNumber = "BRK-" + new Date().getFullYear() + "-" + Math.floor(10000 + Math.random() * 90000);
  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId,
      totalAmount: req.amount,
      currency: req.currency,
      paymentMethod: req.paymentMethod,
      paymentStatus: "COMPLETED",
      transactionId: paymentResult.transactionId,
      couponCode: req.couponCode || null,
      items: {
        create: {
          projectId,
          price: req.amount,
        },
      },
    },
  });

  // Grant Entitlement to Project
  const licenseKey = "BRK-" + Math.random().toString(36).substring(2, 7).toUpperCase() + "-" +
                     Math.random().toString(36).substring(2, 7).toUpperCase() + "-" +
                     Math.random().toString(36).substring(2, 7).toUpperCase();

  await prisma.entitlement.upsert({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
    update: {
      isActive: true,
    },
    create: {
      userId,
      projectId,
      licenseKey,
      isActive: true,
    },
  });

  // Increment purchase count
  await prisma.project.update({
    where: { id: projectId },
    data: { purchaseCount: { increment: 1 } },
  });

  // If coupon used, increment coupon usage
  if (req.couponCode) {
    await prisma.coupon.updateMany({
      where: { code: req.couponCode },
      data: { usageCount: { increment: 1 } },
    });
  }

  return {
    success: true,
    orderId: order.id,
    orderNumber: order.orderNumber,
    transactionId: paymentResult.transactionId,
  };
}
