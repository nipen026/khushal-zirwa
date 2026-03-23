// Singleton OTP store — stored on the Node.js global so it survives
// Next.js hot-module replacement in development.
// In production, replace with Redis or a database.

declare const global: typeof globalThis & {
  _otpStore?: Map<string, { otp: string; expiresAt: number }>;
};

if (!global._otpStore) {
  global._otpStore = new Map<string, { otp: string; expiresAt: number }>();
}

export const otpStore = global._otpStore;
export const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
