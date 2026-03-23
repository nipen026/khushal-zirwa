"use client";

import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

interface HeroSectionProps {
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
     style={{
  minHeight: "100vh",
  backgroundImage: "url('/images/hero-bg-1.jpg')",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#2d0a0a",
}}
    >
      {/* Navbar sits inside hero — scrolls away with page */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* WhatsApp button — fixed to viewport, only in hero section context */}
      <WhatsAppButton />
      {/* Radial red glow — centered, matches Figma Ellipse 1233 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{
            width: "min(854px, 56.5vw)",
            height: "min(407px, 27vw)",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(237,2,19,0.4) 0%, rgba(237,2,19,0) 100%)",
          }}
        />
      </div>

      {/* <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{
          gap: "clamp(40px, 4vw, 56px)",
          width: "min(1008px, 90vw)",
          padding: "0 16px",
        }}
      > */}
      
        {/* <div
          className="flex flex-col items-center w-full"
          style={{ gap: "14px" }}
        >
         
          <h1
            className="text-white font-semibold m-0"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(1.8rem, 4.23vw, 63.91px)",
              lineHeight: "clamp(2.5rem, 4.5vw, 1.25)",
            }}
          >
            Outsource Your Qurbani with Complete Shariah Compliance &amp; Full
            Transparency
          </h1>

    
          <p
            className="text-white m-0"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 1.47vw, 22.22px)",
              lineHeight: "1.5",
              maxWidth: "min(900px, 93vw)",
            }}
          >
            From animal selection to sacrifice and distribution among the needy
            &mdash; we handle your Qurbani with dignity, accountability, and
            strict adherence to Islamic principles.
          </p>
        </div> */}

        
  {/* <button
  type="button"
  onClick={onBookNow}
  className="absolute bottom-6 right-6 md:bottom-8 md:right-8 inline-flex items-center bg-white rounded-full 
  px-4 pr-2 py-1 gap-4 md:gap-6 h-12 md:h-14 cursor-pointer"
>
          <span
            className="font-medium text-black whitespace-nowrap"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(14px,1.3vw,20px)",
              lineHeight: "1.2",
            }}
          >
            Book Qurbani Now
          </span>

          <span
            className="flex items-center justify-center rounded-full bg-black flex-shrink-0"
            style={{
              width: "clamp(36px,3.5vw,46px)",
              height: "clamp(36px,3.5vw,46px)",
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3.5 13.5L13.5 3.5M13.5 3.5H6.5M13.5 3.5V10.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button> */}
    {/* <button
  onClick={onBookNow}
  className="absolute bottom-6 right-6 
  flex items-center gap-4
  h-[60px] px-10
  rounded-full
  bg-gradient-to-r from-[#FFE8A3] via-[#F6C86A] to-[#E3A93D]
  text-[#6B0F0F] font-semibold text-xl
  shadow-lg hover:scale-105 transition"
>
  Book Now

  <svg
    className="w-5 h-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7 5l5 5-5 5"
      clipRule="evenodd"
    />
  </svg>
</button> */}
      {/* </div> */}

    </section>
  );
}
