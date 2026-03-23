"use client";

import Image from "next/image";
import Link from "next/link";

const STEPS = [
  "Qurbani\nConfirmed",
  "Qurbani in\nProgress",
  "Packing &\nDispatch",
  "Out for\nDelivery",
  "Qurbani\nDelivered",
];

export default function OrderDetailsPage() {
  const activeStep = 1; // 0-indexed, step 1 = "Qurbani Confirmed" is completed

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7FBFF",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* Top Bar - Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "12px 30px",
        }}
      >
        <Link href="/">
          <div
            style={{
              background: "#FFFFFF",
              boxShadow: "2px 4px 8px rgba(0,0,0,0.25)",
              borderRadius: 12,
              padding: "6px 16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/Zirwa.png"
              alt="Zirwa Qurbani Service"
              width={110}
              height={56}
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
      </div>

      {/* Main Card */}
      <div
        style={{
          width: 850,
          maxWidth: "95vw",
          margin: "0 auto 24px",
          background: "#FFFFFF",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
          borderRadius: 16,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        {/* Header Row: Back + Title | Chat with us */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left: Back arrow + Title */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link
              href="/my-orders"
              style={{
                width: 32,
                height: 32,
                border: "1px solid #000000",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path
                  d="M13 6H1M1 6L6 1M1 6L6 11"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "#363636",
              }}
            >
              Order Details
            </span>
          </div>

          {/* Right: Chat with us */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              border: "1px solid #E72343",
              borderRadius: 18,
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 18V6C2 4.89543 2.89543 4 4 4H14C15.1046 4 16 4.89543 16 6V12C16 13.1046 15.1046 14 14 14H6L2 18Z"
                fill="#E72343"
              />
              <path
                d="M22 10V18L18 14H10C8.89543 14 8 13.1046 8 12V10C8 8.89543 8.89543 8 10 8H20C21.1046 8 22 8.89543 22 10Z"
                fill="#E72343"
              />
            </svg>
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "#E72343",
              }}
            >
              Chat with us
            </span>
          </button>
        </div>

        {/* Thank You Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 500,
              fontSize: 18,
              lineHeight: "140%",
              textAlign: "center",
              letterSpacing: "-0.02em",
              color: "#333333",
            }}
          >
            Thank You
          </span>
          <span
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              lineHeight: "140%",
              letterSpacing: "-0.02em",
              color: "#333333",
            }}
          >
            Your Order is Scheduled for Day 1
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "#333333",
              }}
            >
              Order ID:
            </span>
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "#054267",
              }}
            >
              {" "}
              # 1010246
            </span>
          </div>
        </div>

        {/* Progress Stepper */}
        <div style={{ width: "100%" }}>
          {/* Line + Circles */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              width: "100%",
            }}
          >
            {STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: i === 0 || i === STEPS.length - 1 ? "0 0 auto" : undefined,
                }}
              >
                {/* Line before circle (except first) */}
                {i > 0 && (
                  <div
                    style={{
                      width: i === 1 ? 82 : 111,
                      height: 0,
                      borderTop: `4px solid ${i <= activeStep ? "#1AB759" : "#D9D9D9"}`,
                    }}
                  />
                )}
                {/* Circle */}
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `5px solid ${i <= activeStep ? "#1AB759" : "#D9D9D9"}`,
                    boxSizing: "border-box",
                    flexShrink: 0,
                    background: "#FFFFFF",
                  }}
                />
              </div>
            ))}
          </div>
          {/* Labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              width: "100%",
            }}
          >
            {STEPS.map((s, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  lineHeight: "14px",
                  textAlign: "center",
                  letterSpacing: "-0.02em",
                  color: "#333333",
                  width: 100,
                  whiteSpace: "pre-line",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Section: Left info + Right bill */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 24,
            width: "100%",
          }}
        >
          {/* Left Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: 290,
              flexShrink: 0,
            }}
          >
            {/* Order Info Card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E1E1E1",
                borderRadius: 8,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {/* Order ID */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: "140%",
                    letterSpacing: "-0.02em",
                    color: "#333333",
                    width: 120,
                  }}
                >
                  Order ID:
                </span>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "140%",
                    letterSpacing: "-0.02em",
                    color: "rgba(51,51,51,0.8)",
                  }}
                >
                  #CC3112980213
                </span>
              </div>
              {/* Order Status */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: "140%",
                    letterSpacing: "-0.02em",
                    color: "#333333",
                    width: 120,
                  }}
                >
                  Order Status:
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 9px",
                    border: "0.89px solid #26953E",
                    borderRadius: 6,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 13.4,
                    lineHeight: "140%",
                    letterSpacing: "-0.02em",
                    color: "#26953E",
                  }}
                >
                  Completed
                </span>
              </div>
              {/* No. of Items */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: "140%",
                    letterSpacing: "-0.02em",
                    color: "#333333",
                    width: 120,
                  }}
                >
                  No. of Items:
                </span>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "140%",
                    letterSpacing: "-0.02em",
                    color: "rgba(51,51,51,0.8)",
                  }}
                >
                  2 Items
                </span>
              </div>
            </div>

            {/* Customer Details Card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #BBBBBB",
                borderRadius: 8,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {/* Person */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z"
                    fill="#646A78"
                  />
                  <path
                    d="M16 18C11.5817 18 8 20.2386 8 23V25H24V23C24 20.2386 20.4183 18 16 18Z"
                    fill="#646A78"
                  />
                </svg>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      lineHeight: "20px",
                      letterSpacing: "0.28px",
                      color: "#47474A",
                    }}
                  >
                    John Walker
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: "16px",
                      letterSpacing: "0.28px",
                      color: "#7C7B7B",
                    }}
                  >
                    9988771100
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: 0,
                  borderTop: "0.93px solid #D8DADC",
                }}
              />

              {/* Payment Method */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M4.66667 7H23.3333C24.0697 7 24.6667 7.59695 24.6667 8.33333V19.6667C24.6667 20.403 24.0697 21 23.3333 21H4.66667C3.93029 21 3.33333 20.403 3.33333 19.6667V8.33333C3.33333 7.59695 3.93029 7 4.66667 7Z"
                    stroke="#646A78"
                    strokeWidth="1.5"
                  />
                  <path d="M3.33333 12H24.6667" stroke="#646A78" strokeWidth="1.5" />
                  <path
                    d="M7 16.3333H12.3333"
                    stroke="#646A78"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 14,
                      lineHeight: "20px",
                      letterSpacing: "0.28px",
                      color: "#47474A",
                    }}
                  >
                    Payment Method
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: "16px",
                      letterSpacing: "0.28px",
                      color: "#7C7B7B",
                    }}
                  >
                    Paid via UPI
                  </span>
                </div>
              </div>

              {/* Payment Date */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <rect
                    x="4.66667"
                    y="5.83333"
                    width="18.6667"
                    height="18.6667"
                    rx="2"
                    stroke="#646A78"
                    strokeWidth="1.5"
                  />
                  <path d="M4.66667 11.6667H23.3333" stroke="#646A78" strokeWidth="1.5" />
                  <path
                    d="M9.33333 3.5V5.83333"
                    stroke="#646A78"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18.6667 3.5V5.83333"
                    stroke="#646A78"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17.5 18.0833L19.8333 20.4167"
                    stroke="#646A78"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="17.5" cy="18.0833" r="4.08333" stroke="#646A78" strokeWidth="1.5" />
                </svg>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 14,
                      lineHeight: "20px",
                      letterSpacing: "0.28px",
                      color: "#47474A",
                    }}
                  >
                    Payment Date
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: "16px",
                      letterSpacing: "0.28px",
                      color: "#7C7B7B",
                    }}
                  >
                    October 26, 7:55 (a.m) to 8:07
                  </span>
                </div>
              </div>

              {/* Delivery Address */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M14 2.33333C9.21333 2.33333 5.33333 6.21333 5.33333 11C5.33333 17.5 14 25.6667 14 25.6667C14 25.6667 22.6667 17.5 22.6667 11C22.6667 6.21333 18.7867 2.33333 14 2.33333Z"
                    stroke="#646A78"
                    strokeWidth="2"
                  />
                  <circle cx="14" cy="11" r="3" stroke="#646A78" strokeWidth="2" />
                </svg>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 14,
                      lineHeight: "20px",
                      letterSpacing: "0.28px",
                      color: "#47474A",
                    }}
                  >
                    Delivery Address
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: "16px",
                      letterSpacing: "0.28px",
                      color: "#7C7B7B",
                    }}
                  >
                    No.25, Paper Street, Chennai - 600 004
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bill Summary */}
          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              border: "1px solid #D7D7D7",
              borderRadius: 8,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Bill Summary Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M4.58333 2.75H17.4167C18.4292 2.75 19.25 3.57081 19.25 4.58333V19.25L16.5 17.4167L13.75 19.25L11 17.4167L8.25 19.25L5.5 17.4167L2.75 19.25V4.58333C2.75 3.57081 3.57081 2.75 4.58333 2.75Z"
                  fill="#000000"
                />
                <path d="M7.33333 8.25H14.6667" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M7.33333 11.9167H14.6667" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: 600,
                  fontSize: 16.7,
                  lineHeight: "15px",
                  letterSpacing: "0.28px",
                  color: "#000000",
                }}
              >
                Bill Summary
              </span>
            </div>

            {/* Product Card */}
            <div
              style={{
                background: "#FEFEFE",
                border: "0.32px solid #848181",
                boxShadow: "3.96px 3.96px 11.88px rgba(0,0,0,0.25)",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  padding: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 600,
                    fontSize: 24,
                    lineHeight: "28px",
                    color: "#494949",
                  }}
                >
                  2 x Qurban
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 16,
                      lineHeight: "18px",
                      color: "#656567",
                    }}
                  >
                    32 kg and above.
                  </span>
                  <div
                    style={{
                      width: 1,
                      height: 14,
                      background: "#94949E",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 16,
                      lineHeight: "15px",
                      color: "#A3A3A3",
                    }}
                  >
                    Hygienic
                  </span>
                  <div
                    style={{
                      width: 1,
                      height: 14,
                      background: "#94949E",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 500,
                      fontSize: 16,
                      lineHeight: "15px",
                      color: "#A3A3A3",
                    }}
                  >
                    100 % Shariah
                  </span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div
              style={{
                borderTop: "1px solid #AAABAD",
                padding: "8px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {/* Items Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: "15px",
                    letterSpacing: "0.28px",
                    color: "#494949",
                  }}
                >
                  Items Total
                </span>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "18px",
                    color: "#000000",
                  }}
                >
                  ₹36,000.00
                </span>
              </div>
              {/* Taxes */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: "15px",
                    letterSpacing: "0.28px",
                    color: "#47474A",
                  }}
                >
                  Taxes
                </span>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "18px",
                    color: "#000000",
                  }}
                >
                  ₹0.00
                </span>
              </div>
              {/* Delivery Charge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: "15px",
                    letterSpacing: "0.28px",
                    color: "#47474A",
                  }}
                >
                  Delivery Charge
                </span>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "18px",
                    color: "#000000",
                  }}
                >
                  ₹200.00
                </span>
              </div>
              {/* Packing Charge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: "15px",
                    letterSpacing: "0.28px",
                    color: "#47474A",
                  }}
                >
                  Packing Charge
                </span>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "18px",
                    color: "#000000",
                  }}
                >
                  ₹1,000.00
                </span>
              </div>
              {/* Grand Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "20px",
                    letterSpacing: "0.28px",
                    color: "#000000",
                  }}
                >
                  Grand Total
                </span>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "20px",
                    color: "#000000",
                  }}
                >
                  ₹37,200.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            width: "100%",
          }}
        >
          {/* Track Order - disabled style */}
          <button
            style={{
              padding: "8px 20px",
              background:
                "linear-gradient(0deg, rgba(129,127,127,0.7), rgba(129,127,127,0.7)), linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
              opacity: 0.44,
              borderRadius: 10,
              border: "none",
              cursor: "not-allowed",
              minWidth: 120,
              height: 40,
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              Track Order
            </span>
          </button>

          {/* Download Invoice - active */}
          <Link
            href="/invoice"
            style={{
              padding: "8px 20px",
              background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              minWidth: 120,
              height: 40,
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              Download Invoice
            </span>
          </Link>

          {/* Cancel Order - disabled style */}
          <button
            style={{
              padding: "10px 24px",
              background:
                "linear-gradient(0deg, rgba(129,127,127,0.7), rgba(129,127,127,0.7)), linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
              opacity: 0.44,
              borderRadius: 10,
              border: "none",
              cursor: "not-allowed",
              minWidth: 120,
              height: 40,
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "125%",
                color: "#FFFFFF",
              }}
            >
              Cancel Order
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
