"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import OrderDetail from "@/components/orders/OrderDetail";

const packageFeatures = ["30 - 35 kg", "Hygienic", "100 % Shariah"];

const deliveryDays = [
  { id: "day1", title: "Bakrid - Day 1", date: "May 24, 2025" },
  { id: "day2", title: "Bakrid - Day 2", date: "May 25, 2025", tag: "POPULAR" },
  { id: "day3", title: "Bakrid - Day 3", date: "May 26, 2025" },
];

const timeSlots = [
  "7:00 AM - 9:00 AM",
  "9:00 AM - 12:00 PM",
  "12:00 PM - 4:00 PM",
  "4:00 PM - 8:00 PM",
];

const preferenceOptions = ["Self / Family", "Madrasa / Needy"];

export default function OrderPage() {
  const [quantity, setQuantity] = useState(2);
  const [selectedDay, setSelectedDay] = useState(deliveryDays[0].id);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]);
  const [preference, setPreference] = useState(preferenceOptions[1]);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const totalPrice = useMemo(() => quantity * 36000, [quantity]);

  return (
    <div style={{ background: "#2d0a0a" }}>
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "100svh", background: "#2d0a0a" }}
      >
        <div className="mx-auto flex w-full max-w-[1512px] flex-col xl:h-[100svh] xl:min-h-[760px] xl:flex-row">
          <div
            className="relative flex min-h-[560px] flex-1 items-center justify-center overflow-hidden px-5 py-10 sm:px-8 lg:px-12 xl:min-h-0 xl:items-stretch xl:py-8"
            style={{
              background: [
                "linear-gradient(180deg, rgba(237, 2, 19, 0) 0%, rgba(237, 2, 19, 0.4) 100%)",
                "url('/images/hero-bg.png') center / cover no-repeat",
              ].join(", "),
              backgroundColor: "#2d0a0a",
            }}
          >
            {/* Dark transparent overlay on hero */}
            <div
              className="absolute inset-0 z-[5]"
              style={{ background: "rgba(15, 7, 7, 0.45)" }}
            />

            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "min(854px, 64vw)",
                height: "min(407px, 28vw)",
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(237, 2, 19, 0.4) 0%, rgba(237, 2, 19, 0) 100%)",
              }}
            />

            <div className="relative z-10 flex w-full flex-col justify-between gap-8 xl:h-full xl:max-w-[760px]">
              <div className="flex items-start justify-between gap-6">
                <Link
                  href="/"
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src="/images/Frame 1437253701.png"
                    alt="Zirwa Qurbani Service"
                    width={206}
                    height={100}
                    priority
                    style={{ width: "clamp(120px, 11vw, 206px)", height: "auto", display: "block" }}
                  />
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center rounded-full"
                  style={{
                    background: "#ED0213",
                    padding: "0 7px 0 21px",
                    gap: "20px",
                    minHeight: "52px",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 510,
                      fontSize: "18px",
                      lineHeight: "22px",
                      color: "#FFFFFF",
                    }}
                  >
                    Home
                  </span>
                  <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                      <path
                        d="M3.5 13.5L13.5 3.5M13.5 3.5H6.5M13.5 3.5V10.5"
                        stroke="#ED0213"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>

              <div className="mx-auto flex w-full max-w-[860px] flex-1 flex-col items-center justify-center text-center xl:py-4">
                <div className="flex flex-col items-center gap-4">
                  <h1
                    style={{
                      margin: 0,
                      maxWidth: "900px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(32px, 3.7vw, 56px)",
                      lineHeight: "1.14",
                      color: "#FFFFFF",
                    }}
                  >
                    Outsource Your Qurbani with Complete Shariah Compliance &amp; Full Transparency
                  </h1>
                  <p
                    style={{
                      margin: 0,
                      maxWidth: "840px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(14px, 1.05vw, 18px)",
                      lineHeight: "1.45",
                      color: "#FFFFFF",
                    }}
                  >
                    From animal selection to sacrifice and distribution among the needy, we handle your Qurbani with dignity, accountability, and strict adherence to Islamic principles.
                  </p>
                </div>

                <div className="mt-8 xl:mt-10">
                  <a
                    href="#order-panel"
                    className="inline-flex items-center rounded-full bg-white no-underline"
                    style={{
                      padding: "0 7px 0 21px",
                      gap: "20px",
                      minHeight: "52px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 510,
                        fontSize: "18px",
                        lineHeight: "22px",
                        color: "#000000",
                      }}
                    >
                      Book Qurbani Now1
                    </span>
                    <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black">
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                        <path
                          d="M3.5 13.5L13.5 3.5M13.5 3.5H6.5M13.5 3.5V10.5"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <aside
            id="order-panel"
            className="relative z-20 w-full xl:ml-[-32px] xl:h-[100svh] xl:max-w-[680px]"
          >
            <div
              className="flex h-full flex-col justify-between rounded-[24px] bg-white shadow-[0_24px_60px_rgba(79,17,21,0.18)] xl:rounded-r-none"
            >
              <div className="flex min-h-0 flex-1 flex-col">
                <div
                  className="flex items-center gap-6 border-b border-black/20 px-4 py-5 sm:px-[22px] sm:py-[17px]"
                  style={{ background: "#FFBABC" }}
                >
                  <Link href="/" aria-label="Back to home" className="inline-flex h-10 w-10 items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path
                        d="M23.332 28.334 15 20.001l8.332-8.333"
                        stroke="#0F0F0F"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: "Fredoka, sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(22px, 2vw, 28px)",
                      lineHeight: "1.1",
                      color: "#494949",
                      textAlign: "center",
                      flex: 1,
                      paddingRight: "40px",
                    }}
                  >
                    Select Date &amp; Time
                  </h2>
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7 md:px-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm uppercase tracking-[0.28px]" style={{ fontFamily: "Fredoka, sans-serif", color: "#47474A" }}>
                      Select Quantity
                    </span>
                    <div
                      className="rounded-xl border bg-[#FEFEFE] p-3 shadow-[4px_4px_12px_rgba(0,0,0,0.18)]"
                      style={{ borderColor: "#848181" }}
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                          <div className="flex flex-col gap-4">
                            <div>
                              <div
                                style={{
                                  fontFamily: "Fredoka, sans-serif",
                                  fontWeight: 600,
                                  fontSize: "24px",
                                  lineHeight: "28px",
                                  color: "#494949",
                                }}
                              >
                                Qurban
                              </div>
                              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm" style={{ fontFamily: "Fredoka, sans-serif", color: "#A3A3A3" }}>
                                {packageFeatures.map((feature, index) => (
                                  <span key={feature} className="inline-flex items-center gap-2">
                                    {index > 0 ? <span className="h-3.5 w-px bg-[#94949E]" aria-hidden="true" /> : null}
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-end gap-2" style={{ fontFamily: "Fredoka, sans-serif" }}>
                              <span className="text-[20px] font-medium leading-none text-black">
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  maximumFractionDigits: 0,
                                }).format(totalPrice)}
                              </span>
                              <span className="pb-0.5 text-xs text-[#94949E] line-through">₹40,000.00</span>
                            </div>
                          </div>

                          <div className="flex items-center self-start rounded-[14px] bg-[#FF5A57] sm:self-auto">
                            <button
                              type="button"
                              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                              className="flex h-[34px] w-[34px] items-center justify-center rounded-l-[14px] text-white"
                              aria-label="Decrease quantity"
                            >
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M3.75 7.5h7.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </button>
                            <div className="flex h-[34px] min-w-[34px] items-center justify-center border-y border-[#D9D0E3] bg-white px-3 text-[18px] text-[#2D0C57]">
                              {quantity}
                            </div>
                            <button
                              type="button"
                              onClick={() => setQuantity((value) => value + 1)}
                              className="flex h-[34px] w-[34px] items-center justify-center rounded-r-[14px] text-white"
                              aria-label="Increase quantity"
                            >
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M7.5 3.75v7.5M3.75 7.5h7.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm uppercase tracking-[0.28px]" style={{ fontFamily: "Fredoka, sans-serif", color: "#47474A" }}>
                      Select Day
                    </span>
                    <div className="grid gap-3 md:grid-cols-3">
                      {deliveryDays.map((day) => {
                        const active = day.id === selectedDay;
                        return (
                          <button
                            key={day.id}
                            type="button"
                            onClick={() => setSelectedDay(day.id)}
                            className="flex min-h-[100px] items-start justify-between rounded-xl border px-3 py-3 text-left"
                            style={{
                              background: active ? "#FEF2F2" : "#FFFFFF",
                              borderColor: active ? "#ED0213" : day.id === "day3" ? "#2C2B2B" : "#D8D8D8",
                            }}
                          >
                            <div className="flex flex-col gap-3">
                              <div
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 700,
                                  fontSize: "18px",
                                  lineHeight: "1.25",
                                  color: active ? "#000000" : day.id === "day2" ? "#646464" : "#000000",
                                }}
                              >
                                {day.title}
                              </div>
                              <div
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  lineHeight: "1.25",
                                  color: "#A3A3A3",
                                }}
                              >
                                {day.date}
                              </div>
                            </div>
                            <span className="mt-0.5 flex h-6 w-6 items-center justify-center">
                              {active ? (
                                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#ED0213]">
                                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                                    <path
                                      d="M1.333 5.222 4.889 8.778 12.667 1"
                                      stroke="#FFFFFF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              ) : day.tag ? (
                                <span className="rounded bg-[#EDEDED] px-2 py-1 text-[8px] font-medium text-[#767575]">
                                  {day.tag}
                                </span>
                              ) : (
                                <span className="h-[22px] w-[22px] rounded-md border border-[#ED0213] bg-white" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm uppercase tracking-[0.28px]" style={{ fontFamily: "Fredoka, sans-serif", color: "#47474A" }}>
                      Available Slots
                    </span>
                    <div className="grid gap-3 md:grid-cols-2">
                      {timeSlots.map((slot) => {
                        const active = slot === selectedSlot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className="flex h-10 items-center justify-center rounded-lg border px-3 text-center"
                            style={{
                              background: active ? "#B21E24" : "#FFFFFF",
                              borderColor: active ? "#B21E24" : "#000000",
                              color: active ? "#FFFFFF" : "#6C6C6C",
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 600,
                              fontSize: "16px",
                              lineHeight: "20px",
                            }}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm uppercase tracking-[0.28px]" style={{ fontFamily: "Fredoka, sans-serif", color: "#47474A" }}>
                      Delivery Preference
                    </span>
                    <div className="flex flex-col gap-3">
                      {preferenceOptions.map((option) => {
                        const active = option === preference;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setPreference(option)}
                            className="flex h-10 items-center gap-3 rounded-[10px] border px-4 text-left"
                            style={{
                              background: active ? "#FEF2F2" : "#FFFFFF",
                              borderColor: active ? "#ED0213" : "#000000",
                            }}
                          >
                            <span
                              className="flex h-4 w-4 items-center justify-center rounded-full border"
                              style={{ borderColor: active ? "#ED0213" : "#D8DADC" }}
                            >
                              {active ? <span className="h-[8.69px] w-[8.69px] rounded-full bg-[#ED0213]" /> : null}
                            </span>
                            <span
                              style={{
                                fontFamily: "Fredoka, sans-serif",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "1.25",
                                color: "#535353",
                              }}
                            >
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-[#FFF7D8] p-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 17v-5m0-4h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
                        stroke="#CD8412"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "Fredoka, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "18px",
                        color: "#626262",
                      }}
                    >
                      Slots are limited and allocated on a first-come-first-serve basis. Secure your preferred time now to avoid delays. <Link href="/terms" style={{ color: "#2E5AAC", textDecoration: "underline" }}>Read Terms &amp; Conditions</Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-6 sm:px-7 md:px-8">
                <button
                  type="button"
                  onClick={() => setShowCustomerDetails(true)}
                  className="flex h-16 w-full items-center justify-center rounded-[43px] text-white shadow-[4px_8px_24px_rgba(36,107,253,0.25)]"
                  style={{
                    background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
                    fontFamily: "Fredoka, sans-serif",
                    fontWeight: 500,
                    fontSize: "24px",
                    lineHeight: "28px",
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Order 2 - Customer Details Panel */}
      <OrderDetail
        isOpen={showCustomerDetails}
        onClose={() => setShowCustomerDetails(false)}
      />
    </div>
  );
}
