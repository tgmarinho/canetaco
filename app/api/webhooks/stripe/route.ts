import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // TODO: verificar assinatura com STRIPE_WEBHOOK_SECRET
  // TODO: processar eventos: customer.subscription.created/updated/deleted, invoice.paid, etc
  const body = await req.text();
  console.log("[stripe webhook]", body.slice(0, 200));
  return NextResponse.json({ ok: true });
}
