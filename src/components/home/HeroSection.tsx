"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const slides = [

  {
    image: "/images/hero-bg-2.png",
    title: "Fulfill Your Qurbani with Trust & Integrity",
    subtitle: "We ensure proper sacrifice and fair distribution.",
  },
  {
    image: "/images/hero-bg-3.png",
    title: "Serve Humanity This Eid",
    subtitle: "Your Qurbani reaches those who need it most.",
  },
  {
    image: "/images/hero-bg-4.png",
    title: "Serve Humanity This Eid",
    subtitle: "Your Qurbani reaches those who need it most.",
  },
  {
    image: "/images/hero-bg-5.png",
    title: "Serve Humanity This Eid",
    subtitle: "Your Qurbani reaches those who need it most.",
  },
    {
    image: "/images/bg-hero-6.png",
    // title: "Give Your Qurbani Where It’s Needed Most",
    // subtitle: "Done with care, transparency and Shariah compliance.",
  },
];

interface HeroSectionProps {
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-0" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <Navbar />
      </div>

      {/* WhatsApp */}
      <WhatsAppButton />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-white font-semibold text-3xl md:text-5xl max-w-3xl leading-tight">
          {slides[current].title}
        </h1>

        <p className="text-white mt-4 text-base md:text-lg max-w-xl">
          {slides[current].subtitle}
        </p>

        {/* CTA Button */}
        {slides[current].title && (
          <button
            onClick={onBookNow}
            className="mt-8 flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Book Qurbani Now
          <span className="bg-black text-white p-2 rounded-full">
              <FaAngleRight />
          </span>
        </button>
        )}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full"
      >
        <FaAngleLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full"
      >
        <FaAngleRight />
      </button>

      {/* Gold CTA — bottom-right on last slide */}
      {current === 4 && (
        <button
          onClick={onBookNow}
          className="absolute bottom-20 right-6 sm:right-12 z-30 flex items-center gap-3 px-7 py-3.5 rounded-full shadow-lg hover:scale-105 transition"
          style={{
            background: "linear-gradient(135deg, #D4A843 0%, #F5D77A 40%, #C8952E 100%)",
            color: "#FFFFFF",
            fontFamily: "Fredoka, sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            letterSpacing: "0.3px",
            boxShadow: "0 4px 20px rgba(196, 155, 50, 0.5)",
          }}
        >
          Book Qurbani Now
          <span className="bg-white/20 p-2 rounded-full">
            <FaAngleRight />
          </span>
        </button>
      )}

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}