import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = { title: "Privacy Policy | Zirwa Qurbani" };

const S: Record<string, React.CSSProperties> = {
  section: {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "28px",
    textAlign: "justify",
    color: "#82131B",
    alignSelf: "stretch",
    margin: 0,
  },
  body: {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "24px",
    textAlign: "justify",
    color: "#585858",
    alignSelf: "stretch",
    margin: 0,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff" }}>
        <Navbar />
      </div>

      <main style={{ background: "#F7FBFF", paddingBottom: "80px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0px",
            gap: "32px",
            maxWidth: "900px",
            width: "100%",
            margin: "0 auto",
            paddingTop: "40px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "21px",
              width: "100%",
            }}
          >
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "36px",
                lineHeight: "44px",
                textAlign: "center",
                color: "#000000",
                margin: 0,
              }}
            >
              Privacy Policy
            </h1>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "22px",
                textAlign: "center",
                color: "#212325",
                margin: 0,
              }}
            >
              Your privacy and data security are our top priorities
            </p>
          </div>

          {/* Body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "32px",
              width: "100%",
            }}
          >
            {/* Meta info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              {[
                { label: "Last updated", value: "03-03-2026" },
                { label: "Company Name", value: "Zirwa Foods" },
                { label: "Contact Email", value: "mdkaleem@zirwafoods.com" },
                { label: "WhatsApp Support", value: "+91 7829916082" },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#585858",
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#585858",
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#585858",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Sections */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                width: "100%",
              }}
            >
              {/* Section 1 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>1. Introduction</p>
                <p style={S.body}>
                  Zirwa Foods (&ldquo;Company&rdquo;, &ldquo;We&rdquo;, &ldquo;Our&rdquo;,
                  &ldquo;Us&rdquo;) is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you
                  use our website, mobile application, and Bakrid Home Delivery Qurbani services.
                </p>
                <p style={S.body}>
                  By using our services, you consent to the data practices described in this policy.
                </p>
              </div>

              {/* Section 2 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>2. Information We Collect</p>
                <p style={S.body}>We may collect the following information:</p>

                <p style={{ ...S.body, fontWeight: 700 }}>2.1 Personal Information</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Full Name</li>
                  <li>Mobile Number (with OTP verification)</li>
                  <li>Alternate Mobile Number</li>
                  <li>Email Address</li>
                  <li>Delivery Address (Flat/House No, Street, Landmark, Pincode, City)</li>
                  <li>Google Map Location (if shared)</li>
                  <li>Names provided for Qurbani</li>
                </ul>

                <p style={{ ...S.body, fontWeight: 700 }}>2.2 Payment Information</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Payment method details (UPI / Debit Card / Credit Card / Net Banking)</li>
                  <li>Transaction reference ID</li>
                </ul>
                <p style={S.body}>
                  &#9888; We do NOT store card details. All payments are processed through secure,
                  encrypted payment gateways.
                </p>

                <p style={{ ...S.body, fontWeight: 700 }}>2.3 International Orders</p>
                <p style={S.body}>
                  For overseas customers (UK, USA, Canada, Australia, etc.), we may collect:
                </p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Country of booking</li>
                  <li>Currency information</li>
                  <li>International contact details</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>3. How We Use Your Information</p>
                <p style={S.body}>Your data is used to:</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Process Qurbani bookings</li>
                  <li>Perform Islamic slaughter with correct name announcement</li>
                  <li>Schedule slot-based delivery</li>
                  <li>Send order confirmations</li>
                  <li>Provide live streaming access (without showing blood)</li>
                  <li>Send WhatsApp delivery updates</li>
                  <li>Provide video proof and distribution proof (where applicable)</li>
                  <li>Improve service operations</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>4. Data Protection &amp; Security</p>
                <p style={S.body}>
                  We implement industry-standard security measures to protect your personal
                  information.
                </p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>All payment transactions are encrypted</li>
                  <li>OTP verification ensures secure bookings</li>
                  <li>Access to customer data is restricted to authorized staff only</li>
                </ul>
                <p style={S.body}>
                  However, no system is 100% secure. By using our platform, you acknowledge this
                  risk.
                </p>
              </div>

              {/* Section 5 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>5. Live Streaming &amp; Video Proof</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Live streaming is provided without showing blood.</li>
                  <li>Video proof is shared for transparency.</li>
                  <li>
                    Videos are for personal reference only and must not be misused or publicly
                    distributed without consent.
                  </li>
                </ul>
              </div>

              {/* Section 6 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>6. International Orders</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Qurbani is performed in India under Islamic supervision.</li>
                  <li>
                    Meat is distributed to madrasa students and poor families (if selected).
                  </li>
                  <li>
                    Customers may receive confirmation within 24 hours after completion.
                  </li>
                  <li>Currency charged depends on customer&apos;s location.</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>7. Data Sharing</p>
                <p style={S.body}>We do NOT sell or rent customer data.</p>
                <p style={S.body}>Information may be shared only with:</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Payment gateway partners</li>
                  <li>Delivery partners</li>
                  <li>Islamic supervisors for Qurbani execution</li>
                  <li>Legal authorities if required</li>
                </ul>
              </div>
            </div>

            {/* Section 8 — Contact Us */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "12px",
                width: "100%",
              }}
            >
              <p style={S.section}>8. Contact Us</p>
              <p style={S.body}>For privacy-related concerns, contact:</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "16px",
                  width: "454px",
                }}
              >
                {/* WhatsApp row */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                    height: "40px",
                  }}
                >
                  <Image
                    src="/images/ic_outline-whatsapp.png"
                    alt="WhatsApp"
                    width={40}
                    height={40}
                  />
                  <a
                    href="https://wa.me/917829916082"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "18px",
                      lineHeight: "38px",
                      color: "#585858",
                      textDecoration: "none",
                    }}
                  >
                    WhatsApp: +91 7829916082
                  </a>
                </div>

                {/* Email row */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                    height: "40px",
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <rect
                      x="5"
                      y="8.333"
                      width="30"
                      height="23.333"
                      rx="2"
                      stroke="#82131B"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <path
                      d="M5 13.333l15 10 15-10"
                      stroke="#82131B"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                  <a
                    href="mailto:mdkaleem@zirwafoods.com"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "18px",
                      lineHeight: "38px",
                      color: "#585858",
                      textDecoration: "none",
                    }}
                  >
                    mdkaleem@zirwafoods.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
