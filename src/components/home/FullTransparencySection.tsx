import Image from "next/image";

const bullets = [
  "Animal reservation confirmation",
  "Slaughter completion update",
  "Distribution confirmation",
];

function TickIcon({onBookNow}: {onBookNow?: () => void}) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="tickGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF4B55" />
          <stop offset="100%" stopColor="#BA3139" />
        </linearGradient>
      </defs>

      <path
        d="M16 2.5l2.9 2.6 3.8-.9 1.4 3.6 3.6 1.4-.9 3.8 2.6 2.9-2.6 2.9.9 3.8-3.6 1.4-1.4 3.6-3.8-.9L16 29.5l-2.9-2.6-3.8.9-1.4-3.6-3.6-1.4.9-3.8L2.5 16l2.6-2.9-.9-3.8 3.6-1.4 1.4-3.6 3.8.9L16 2.5z"
        fill="url(#tickGrad2)"
      />

      <circle cx="16" cy="16" r="6" fill="white" opacity="0.25" />

      <path
        d="M11 16.5l3.5 3.5 6.5-7"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
interface HeroSectionProps {
  onBookNow: () => void;
}
export default function FullTransparencySection({ onBookNow }: HeroSectionProps) {
  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(40px,6vw,80px) clamp(16px,6vw,88px)",
      }}
    >
      <div
        style={{
          maxWidth: "1336px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "clamp(40px,6vw,87px)",
        }}
      >
        {/* LEFT IMAGE */}
        <div
          style={{
            flex: "1 1 380px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/location.png"
            alt="Qurbani tracking"
            width={448}
            height={448}
            style={{
              width: "100%",
              maxWidth: "448px",
              height: "auto",
              borderRadius: "clamp(20px,2vw,32px)",
              objectFit: "cover",
            }}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div
          style={{
            flex: "1 1 420px",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(24px,3vw,48px)",
          }}
        >
          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px,4vw,48px)",
              lineHeight: "1.2",
              letterSpacing: "-1px",
              color: "#82131B",
              margin: 0,
            }}
          >
            Full Transparency & Tracking
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(14px,1.2vw,20px)",
                lineHeight: "1.7",
                color: "#494949",
                margin: 0,
              }}
            >
              Each Qurbani is assigned a unique ID so you can stay informed
              throughout the process.
            </p>

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(14px,1.2vw,20px)",
                color: "#494949",
                margin: 0,
              }}
            >
              You receive:
            </p>

            {/* BULLETS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {bullets.map((text) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <TickIcon />

                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(15px,1.3vw,22px)",
                      color: "#000",
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(14px,1.2vw,20px)",
                lineHeight: "1.7",
                color: "#494949",
                margin: 0,
              }}
            >
              Proof is shared directly via our app or WhatsApp.
            </p>
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <button
              onClick={onBookNow}
              style={{
                padding: "clamp(8px,1vw,12px) clamp(26px,3vw,44px)",
                background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
                borderRadius: "34px",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontFamily: "'Fredoka', sans-serif",
                fontSize: "clamp(14px,1.2vw,18px)",
              }}
            >
              Book Now
            </button>

            <button
              style={{
                padding: "clamp(8px,1vw,12px) clamp(20px,2.5vw,36px)",
                background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
                borderRadius: "34px",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontFamily: "'Fredoka', sans-serif",
                fontSize: "clamp(14px,1.2vw,18px)",
              }}
            >
              Track My Qurbani
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}