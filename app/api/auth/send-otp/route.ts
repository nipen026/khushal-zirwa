import { NextRequest, NextResponse } from "next/server";
import { otpStore, OTP_TTL_MS } from "@/lib/otpStore";

// Indian mobile number: 10 digits starting with 6-9, or +91 followed by 10 digits
const PHONE_REGEX = /^(\+91[6-9][0-9]{9}|[6-9][0-9]{9})$/;

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
    typeof (body as Record<string, unknown>).phone !== "string"
  ) {
    return NextResponse.json({ error: "phone is required." }, { status: 400 });
  }

  const phone = ((body as Record<string, unknown>).phone as string).trim().replace(/\s|-/g, "");

  if (!PHONE_REGEX.test(phone)) {
    return NextResponse.json(
      { error: "Enter a valid Indian mobile number (e.g. 9876543210 or +919876543210)." },
      { status: 422 }
    );
  }

  // Generate a cryptographically random 6-digit OTP
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  otpStore.set(phone, { otp, expiresAt: Date.now() + OTP_TTL_MS });

  // TODO: integrate an SMS gateway (e.g. Twilio, Jazz SMSAPI) here and send `otp` to `phone`.
  // For development, the OTP is returned in the response so you can test without an SMS provider.
  if (process.env.NODE_ENV !== "production") {
    console.log(`[DEV] OTP for ${phone}: ${otp}`);
    return NextResponse.json({ success: true, devOtp: otp });
  }

  return NextResponse.json({ success: true });
}
