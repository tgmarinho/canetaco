import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.META_WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  // TODO: validar assinatura X-Hub-Signature-256 com META_WHATSAPP_APP_SECRET
  // TODO: processar status updates (delivered, read, failed) e respostas de mensagem
  const body = await req.json().catch(() => null);
  console.log("[whatsapp webhook]", JSON.stringify(body));
  return NextResponse.json({ ok: true });
}
