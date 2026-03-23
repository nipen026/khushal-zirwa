import Image from "next/image";

const bullets = [
  "Only healthy, disease-free sheep",
  "Proper age and weight compliance",
  "Ethically raised in clean farm environments",
  "No mixed or bulk slaughter practices",
];

function TickIcon() {
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
        <linearGradient id="tickGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF4B55" />
          <stop offset="100%" stopColor="#BA3139" />
        </linearGradient>
      </defs>

      <path
        d="M16 2.5l2.9 2.6 3.8-.9 1.4 3.6 3.6 1.4-.9 3.8 2.6 2.9-2.6 2.9.9 3.8-3.6 1.4-1.4 3.6-3.8-.9L16 29.5l-2.9-2.6-3.8.9-1.4-3.6-3.6-1.4.9-3.8L2.5 16l2.6-2.9-.9-3.8 3.6-1.4 1.4-3.6 3.8.9L16 2.5z"
        fill="url(#tickGrad)"
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

export default function AnimalQualitySection() {
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
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(32px,6vw,129px)",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              flex: "1 1 420px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
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
              Animal Quality & Farm Transparency
            </h2>

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(14px,1.3vw,20px)",
                lineHeight: "1.6",
                color: "#494949",
                margin: 0,
              }}
            >
              We maintain strict standards to ensure your Qurbani is valid,
              ethical, and dignified.
            </p>

            {/* BULLETS */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
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
                      fontSize: "clamp(15px,1.2vw,24px)",
                      lineHeight: "1.4",
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
                fontFamily: "'Inter', 'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(13px,1vw,16px)",
                lineHeight: "24px",
                textTransform: "uppercase",
                color: "#82131B",
                margin: 0,
              }}
            >
              We accept domestic and international payments
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div
            style={{
              flex: "1 1 420px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/goat.png"
              alt="Healthy sheep at farm"
              width={493}
              height={313}
              style={{
                width: "100%",
                maxWidth: "493px",
                height: "auto",
                borderRadius: "clamp(20px,2vw,36px)",
                border: "0.6px solid #BAB5B5",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}