import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #E5E5E5 0%, #C67C7C 100%)",
        padding: "clamp(24px,4vw,40px) clamp(16px,5vw,60px)",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1488px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Top */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "40px",
            width: "100%",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: "1 1 220px",
              maxWidth: "300px",
            }}
          >
            <Image
              src="/images/Zirwa.png"
              alt="Zirwa Qurbani Service"
              width={180}
              height={80}
              style={{ width: "160px", height: "auto" }}
            />

            <div style={{ position: "relative", width: "200px" }}>
              <Image
                src="/images/DOWNLAOD THE APP GRP.png"
                alt="Download App"
                width={200}
                height={42}
                style={{ width: "100%", height: "auto" }}
              />

              <a
                href="#"
                aria-label="Download on App Store"
                style={{
                  position: "absolute",
                  top: 0,
                  right: "54px",
                  width: "52px",
                  height: "100%",
                }}
              />

              <a
                href="#"
                aria-label="Get it on Google Play"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "52px",
                  height: "100%",
                }}
              />
            </div>
          </div>

          {/* Legal */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: "1 1 180px",
              minWidth: "160px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#670004",
                margin: 0,
              }}
            >
              Legal
            </h3>

            {["Terms of Use", "Privacy Policy", "FAQs"].map((item) => (
              <a
                key={item}
                href={
                  item === "Terms of Use"
                    ? "/terms"
                    : item === "Privacy Policy"
                    ? "/privacy-policy"
                    : "/faq"
                }
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: "15px",
                  color: "#000",
                  textDecoration: "none",
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: "1 1 260px",
              minWidth: "220px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#670004",
                margin: 0,
              }}
            >
              Contact
            </h3>

            {/* Phone */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontFamily: "Fredoka" }}>
                +91 7829916082
              </span>
            </div>

            {/* Email */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontFamily: "Fredoka" }}>
                mdkaleem@zirwafoods.com
              </span>
            </div>

            {/* Address */}
            <div style={{ display: "flex", gap: "12px" }}>
              <span style={{ fontFamily: "Fredoka", lineHeight: "20px" }}>
                #17, 2nd floor II stage, Indiranagar, Bengaluru, Karnataka -
                560038.
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            borderTop: "1px solid #82131B",
          }}
        />

        {/* Copyright */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: "13px",
            color: "#670004",
            textAlign: "center",
            margin: 0,
          }}
        >
          © Copyright 2026 Zirwa Qurbani Service | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}