const steps = [
  {
    step: "STEP-1",
    badgeWidth: 94,
    title: "Sheep Selection",
    desc: "Healthy, age-verified sheep sourced from trusted farms and raised in clean environments.",
  },
  {
    step: "STEP-2",
    badgeWidth: 94,
    title: "Intention & Allocation",
    desc: "Your Qurbani is uniquely assigned in your name to ensure proper niyyah and individual accountability.",
  },
  {
    step: "STEP-3",
    badgeWidth: 95,
    title: "Shariah Slaughter",
    desc: "Performed strictly according to Islamic guidelines by trained professionals.",
  },
  {
    step: "STEP-4",
    badgeWidth: 96,
    title: "Verified Documentation",
    desc: "You receive photo/video proof along with real-time status updates.",
  },
  {
    step: "STEP-5",
    badgeWidth: 96,
    title: "Distribution to the Needy",
    desc: "Meat is distributed respectfully to verified underprivileged families.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(32px,5vw,64px) clamp(16px,5vw,60px)",
      }}
    >
      <div
        style={{
          maxWidth: "1392px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
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
          How Your Qurbani is Performed – Step by Step
        </h2>

        {/* Subheading */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(16px,2vw,24px)",
            lineHeight: "1.6",
            color: "#585858",
            margin: 0,
            maxWidth: "900px",
          }}
        >
          Your Qurbani is handled with strict Shariah compliance, verified
          processes, and transparent distribution to ensure dignity, accuracy,
          and complete peace of mind.
        </p>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            width: "100%",
          }}
        >
          {steps.map((s) => (
            <div
              key={s.step}
              style={{
                flex: "1 1 260px",
                maxWidth: "264px",
                minHeight: "280px",
                display: "flex",
                flexDirection: "column",
                padding: "20px 24px",
                gap: "12px",
                background: "#FFF0F1",
                border: "1px solid #8D0404",
                borderRadius: "20px",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 12px",
                    width: `${s.badgeWidth}px`,
                    height: "32px",
                    background: "#fff",
                    border: "1px solid #8D0404",
                    borderRadius: "30px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(12px,1.2vw,16px)",
                      color: "#ED0213",
                    }}
                  >
                    {s.step}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(20px,2vw,28px)",
                  lineHeight: "1.2",
                  color: "#8C1A1A",
                  margin: 0,
                }}
              >
                {s.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px,1.2vw,18px)",
                  lineHeight: "1.5",
                  color: "#971919",
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}