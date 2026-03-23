import Image from "next/image";
import Link from "next/link";

function AppleStoreBadge() {
  return (
    <a
      href="https://apps.apple.com/in/app/chop-chicks/id6755097602"
      target="_blank"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "170px",
        height: "56px",
        background: "#000",
        borderRadius: "12px",
        textDecoration: "none",
        gap: "10px",
        flexShrink: 0,
      }}
    >
      <svg width="24" height="30" viewBox="0 0 36 44" fill="none">
        <path
          d="M29.9 23.3c0-5.3 4.3-7.8 4.5-7.9-2.4-3.6-6.2-4-7.6-4.1-3.2-.3-6.3 1.9-7.9 1.9-1.6 0-4.1-1.9-6.8-1.8-3.5.1-6.7 2-8.5 5.1C-.6 22.8 1.6 32 5.2 37.1c1.8 2.6 3.9 5.4 6.7 5.3 2.7-.1 3.7-1.7 7-1.7 3.2 0 4.1 1.7 6.9 1.6 2.9-.1 4.7-2.6 6.5-5.2 2-2.9 2.9-5.8 2.9-5.9-.1-.1-5.3-2-5.3-8z"
          fill="#fff"
        />
        <path
          d="M25 8.3C26.5 6.5 27.5 4 27.2 1.5c-2.2.1-4.9 1.5-6.4 3.3-1.4 1.6-2.6 4.2-2.3 6.6 2.5.2 5-1.3 6.5-3.1z"
          fill="#fff"
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "9px",
            color: "#fff",
            opacity: 0.8,
          }}
        >
          Download on the
        </span>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            color: "#fff",
            lineHeight: "18px",
          }}
        >
          App Store
        </span>
      </div>
    </a>
  );
}

function PlayStoreBadge() {
  return (
    <a
      target="_blank"
      href="https://play.google.com/store/apps/details?id=com.chopandchicks.consumer&hl=en_IN"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "180px",
        height: "56px",
        background: "#000",
        borderRadius: "12px",
        textDecoration: "none",
        gap: "10px",
        flexShrink: 0,
      }}
    >
      <svg width="24" height="28" viewBox="0 0 36 40" fill="none">
        <path d="M1 1.5L20.5 21 1 40.5V1.5z" fill="#32BBFF" />
        <path d="M1 1.5l26 13.2L20.5 21 1 1.5z" fill="#32BBFF" />
        <path d="M27 14.7L1 1.5l19.5 19.5L27 14.7z" fill="#32BBFF" opacity="0.7" />
        <path d="M1 40.5l19.5-19.5 6.5 6.3L1 40.5z" fill="#32BBFF" opacity="0.7" />
        <path d="M27 25.3L20.5 21l6.5-6.3 5.5 3.1a3 3 0 0 1 0 5.4L27 25.3z" fill="#FFBC00" />
        <path d="M1 40.5l25-12.3-5.5-7.2L1 40.5z" fill="#FF3333" />
        <path d="M1 1.5l25 12.3-5.5 7.2L1 1.5z" fill="#00EE76" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "9px",
            color: "#fff",
            opacity: 0.8,
          }}
        >
          Get it on
        </span>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            color: "#fff",
            lineHeight: "18px",
          }}
        >
          Google Play
        </span>
      </div>
    </a>
  );
}

export default function DownloadAppSection() {
  return (
    <section className="bg-white px-4 py-10 sm:px-8 md:px-16 lg:px-[88px] md:py-20">
      <div className="max-w-[1336px] mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-10 lg:gap-16 xl:gap-[100px]">
        {/* Left — text + badges */}
        <div className="flex flex-col items-start gap-8 lg:gap-10 w-full lg:max-w-[624px] flex-shrink-0">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.5vw, 64px)",
              lineHeight: "1.5",
              color: "#000000",
              margin: 0,
              alignSelf: "stretch",
            }}
          >
            Download the App
          </h2>

          <p
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(16px, 1.7vw, 24px)",
              lineHeight: "1.3",
              color: "#828282",
              margin: 0,
              maxWidth: "566px",
            }}
          >
            Fresh meat delivered safely to your doorstep with easy ordering and
            real-time tracking. Enjoy premium quality cuts, carefully packed for
            the smartest and fastest meat shopping experience.
          </p>

          <div className="flex flex-row flex-wrap items-center gap-4">
            <AppleStoreBadge />
            <Link href="https://apps.apple.com/in/app/chop-chicks/id6755097602" target="_blank" passHref>
              <PlayStoreBadge />
            </Link>
          </div>
        </div>

        {/* Right — app mockup image */}
        <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
          <Image
            src="/images/mobile.png"
            alt="Zirwa app preview"
            width={530}
            height={497}
            className="w-full max-w-[400px] lg:max-w-[530px] h-auto"
            style={{ display: "block" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
