import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("phone" in body) ||
    !("otp" in body)
  ) {
    return NextResponse.json({ error: "phone and otp are required." }, { status: 400 });
  }

  const rec = body as Record<string, unknown>;
  const phone = typeof rec.phone === "string" ? rec.phone.trim().replace(/\s|-/g, "") : "";
  const otp = typeof rec.otp === "string" ? rec.otp.trim() : "";

  const entry = otpStore.get(phone);

  if (!entry) {
    return NextResponse.json({ error: "No OTP was sent to this number." }, { status: 400 });
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(phone);
    return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
  }

  if (entry.otp !== otp) {
    return NextResponse.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
  }

  otpStore.delete(phone);
  return NextResponse.json({ success: true });
}
