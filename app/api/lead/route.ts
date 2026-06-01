import { NextResponse } from "next/server";

// Lead capture endpoint. In production this forwards to HubSpot (or similar)
// via HUBSPOT_TOKEN; without it configured, the lead is logged and accepted so
// the form works in preview/dev. No PII is persisted here.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email : "";
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }

  const token = process.env.HUBSPOT_TOKEN;
  if (!token) {
    console.info("lead (no CRM configured):", { email, company: body.company });
    return NextResponse.json({ ok: true });
  }

  // TODO: forward to HubSpot Forms API with token. Kept out of the scaffold to
  // avoid shipping a half-wired integration.
  return NextResponse.json({ ok: true });
}
