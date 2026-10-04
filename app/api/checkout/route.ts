import { NextResponse } from "next/server";
import { processOrderCheckout } from "@/lib/payment";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await processOrderCheckout({
      projectId: body.projectId,
      userId: body.userId || "demo-builder-id",
      amount: body.amount,
      currency: body.currency || "INR",
      couponCode: body.couponCode,
      paymentMethod: body.paymentMethod || "MOCK_INSTANT",
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Checkout failed" }, { status: 500 });
  }
}
