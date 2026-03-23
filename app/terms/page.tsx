import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Terms & Conditions | Zirwa Qurbani",
};

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

export default function TermsPage() {
  return (
    <>
      {/* Sticky navbar at top */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff" }}>
        <Navbar />
      </div>

      <main style={{ background: "#FFFFFF", paddingBottom: "80px" }}>
        {/* Outer container — matches Figma: width 1320px, top 232px */}
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
          }}
        >
          {/* Heading row — Frame 1410102218 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",
              gap: "21.09px",
              width: "650px",
              alignSelf: "flex-start",
            }}
          >
            <h1
              style={{
                width: "650px",
                height: "68px",
                fontFamily: "'Poppins', sans-serif",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "36px",
                lineHeight: "44px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.01em",
                textTransform: "capitalize",
                color: "#2D2E2F",
                margin: 0,
              }}
            >
              Terms &amp; Conditions
            </h1>
          </div>

          {/* Frame 106 — body container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px",
              gap: "32px",
              width: "100%",
            }}
          >
            {/* Intro paragraph */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#585858",
                  margin: 0,
                }}
              >
                Last updated: 03-03-2026
              </p>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: "24px",
                  textAlign: "justify",
                  color: "#585858",
                  margin: 0,
                }}
              >
                These Terms &amp; Conditions apply to all driving tuition
                services offered by Zirwa Qurbani Service. By booking Qurbani through our website or
                app, you agree to the following Terms &amp; Conditions.
              </p>
            </div>

            {/* Sections — Frame 1984077645 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "24px",
                width: "100%",
                alignSelf: "stretch",
              }}
            >
              {/* Section 1 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>1. Service Overview</p>
                <p style={S.body}>
                  We provide Bakrid Home Delivery &ndash; End-to-End Qurbani Service, which includes:
                </p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Islamic Shariah-compliant slaughter</li>
                  <li>Hygienic cutting &amp; packing</li>
                  <li>Slot-based home delivery</li>
                  <li>Optional distribution to Madrasa or Poor &amp; Needy</li>
                </ul>
                <p style={S.body}>All sheep:</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Carefully selected</li>
                  <li>Healthy</li>
                  <li>Shariah-compliant</li>
                  <li>Within specified live weight category (30&ndash;35 kg approx depending on service selected)</li>
                  <li>Inspected before slaughter</li>
                </ul>
                <p style={S.body}>Customers cannot choose specific animals.</p>
              </div>

              {/* Section 2 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>2. Shariah Compliance</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Qurbani is performed strictly according to Islamic principles.</li>
                  <li>The name provided will be called before slaughter.</li>
                  <li>The customer confirms correct Niyyah at time of booking.</li>
                </ul>
                <p style={S.body}>
                  &#9745; By selecting the Niyyah confirmation checkbox, the customer declares
                  Qurbani intention is valid.
                </p>
              </div>

              {/* Section 3 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>3. Slot Booking &amp; Delivery</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Slots are limited and allocated on a first-come-first-serve basis.</li>
                  <li>Full payment is required to confirm booking.</li>
                  <li>Delivery is done slot-wise during the 3 days of Eid al-Adha.</li>
                  <li>Real-time updates are provided via WhatsApp.</li>
                </ul>
                <p style={S.body}>Delays may occur due to:</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Traffic</li>
                  <li>Weather conditions</li>
                  <li>Local restrictions</li>
                  <li>Operational load</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>4. Pricing &amp; Payment</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Online payment only (UPI / Debit Card / Credit Card / Net Banking).</li>
                  <li>International payments via cards accepted.</li>
                  <li>Currency charged as per user&apos;s location.</li>
                  <li>Invoice available for download.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>5. Cancellation &amp; Refund Policy</p>

                <p style={{ ...S.body, fontWeight: 700 }}>5.1 Final Booking</p>
                <p style={S.body}>
                  Once an order is placed and confirmed, the same shall be treated as final and
                  binding. No cancellation shall be permitted thereafter.
                </p>

                <p style={{ ...S.body, fontWeight: 700 }}>5.2 Force Majeure</p>
                <p style={S.body}>
                  The Company shall not be responsible or liable to provide any refund in cases of
                  delay, non-delivery, or deficiency arising due to reasons beyond its reasonable
                  control, including but not limited to:
                </p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Natural calamities</li>
                  <li>Government restrictions</li>
                  <li>Market conditions</li>
                  <li>Supply constraints</li>
                  <li>Operational disruptions</li>
                  <li>Any force majeure event</li>
                </ul>

                <p style={{ ...S.body, fontWeight: 700 }}>5.3 Exceptional Circumstances</p>
                <p style={S.body}>
                  Any request for cancellation or refund, if made under exceptional or unavoidable
                  circumstances, shall be examined strictly on a case-to-case basis and shall be
                  subject to the sole and absolute discretion of the Company. Any refund, if approved:
                </p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>May be subject to deductions</li>
                  <li>Processing charges may apply</li>
                  <li>Company decision shall be final and binding</li>
                  <li>No claim shall lie against the Company</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>6. Contingency Buffer Clause</p>
                <p style={S.body}>
                  A contingency buffer of 10&ndash;20% is maintained to manage unforeseen events
                  including animal unavailability or operational disruptions. This does not affect
                  the validity of Qurbani and will be handled as per Islamic principles.
                </p>
              </div>

              {/* Section 7 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>7. Distribution Services</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Qurbani for Madrasa &mdash; Meat will be distributed to madrasa students in
                  accordance with Islamic guidelines.</li>
                  <li>Qurbani for Poor &amp; Needy &mdash; Meat will be distributed among
                  underprivileged families as per Shariah.</li>
                  <li>Distribution proof may be provided for transparency.</li>
                </ul>
              </div>

              {/* Section 8 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>8. Limitation of Liability</p>
                <p style={S.body}>The Company shall not be liable for:</p>
                <ul style={{ ...S.body, paddingLeft: "24px", listStyleType: "disc" }}>
                  <li>Indirect or incidental damages</li>
                  <li>Religious interpretation disputes</li>
                  <li>Delays beyond operational control</li>
                  <li>Minor variations in weight range</li>
                </ul>
              </div>

              {/* Section 9 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>9. Order Tracking</p>
                <p style={S.body}>
                  Customers may track order status: Order Confirmed &rarr; Qurbani in Progress
                  &rarr; Packing &amp; Dispatch &rarr; Out for Delivery &rarr; Delivered
                </p>
              </div>

              {/* Section 10 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={S.section}>10. Governing Law</p>
                <p style={S.body}>
                  These Terms shall be governed by the laws of India. Any disputes shall fall under
                  the jurisdiction of Indian courts.
                </p>
              </div>
            </div>

            {/* Contact — Frame 1984077644 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "0px",
                gap: "12px",
                width: "100%",
              }}
            >
              <p style={S.section}>11. Contact Information</p>
              <p style={S.body}>For support:</p>

              {/* Frame 87 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "0px",
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
                    padding: "0px",
                    gap: "8px",
                    width: "438px",
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
                      width: "390px",
                      height: "38px",
                      fontFamily: "'Poppins', sans-serif",
                      fontStyle: "normal",
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
                    padding: "0px",
                    gap: "8px",
                    width: "454px",
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
                      width: "406px",
                      height: "38px",
                      fontFamily: "'Poppins', sans-serif",
                      fontStyle: "normal",
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
