"use client";

import Link from "next/link";
import Image from "next/image";

type StatusKey =
  | "confirmed"
  | "in-progress"
  | "cancelled"
  | "packing"
  | "out-for-delivery"
  | "delivered";

type PaymentKey = "phonePe" | "upi" | "cash";

interface Order {
  id: string;
  date: string;
  status: StatusKey;
  payment: PaymentKey;
  amount: string;
}

const STATUS_CONFIG: Record<
  StatusKey,
  { label: string; bg: string; border: string; color: string }
> = {
  confirmed: {
    label: "Qurbani Confirmed",
    bg: "#DDE7FF",
    border: "#4679F3",
    color: "#4679F3",
  },
  "in-progress": {
    label: "Qurbani in Progress",
    bg: "#FFEAAA",
    border: "#B54708",
    color: "#B54708",
  },
  cancelled: {
    label: "Cancelled",
    bg: "#FFDBD9",
    border: "#BF0000",
    color: "#BF0000",
  },
  packing: {
    label: "Packing & Dispatch",
    bg: "#AAFFF6",
    border: "#055048",
    color: "#055048",
  },
  "out-for-delivery": {
    label: "Out for Delivery",
    bg: "#E7C9FF",
    border: "#590C96",
    color: "#590C96",
  },
  delivered: {
    label: "Qurbani Delivered",
    bg: "#E0FFDD",
    border: "#0A8100",
    color: "#0A8100",
  },
};

const PAYMENT_CONFIG: Record<
  PaymentKey,
  { label: string; bg: string; color: string }
> = {
  phonePe: {
    label: "PhonePe",
    bg: "rgba(84, 65, 195, 0.13)",
    color: "#5441C3",
  },
  upi: { label: "UPI", bg: "rgba(174, 66, 41, 0.13)", color: "#CB2802" },
  cash: { label: "Cash", bg: "rgba(26, 183, 89, 0.13)", color: "#00913A" },
};

const ORDERS: Order[] = [
  { id: "1010246", date: "09:09 AM, 10-10-2025", status: "confirmed", payment: "phonePe", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", status: "in-progress", payment: "upi", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", status: "cancelled", payment: "upi", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", status: "packing", payment: "cash", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", status: "packing", payment: "phonePe", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", status: "out-for-delivery", payment: "upi", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", status: "delivered", payment: "phonePe", amount: "$212.50" },
];

export default function OrderList() {
  return (
    <div style={{ background: "#FFFCFC", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "20px 24px",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 24px",
              background: "#FFFFFF",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.25)",
              borderRadius: "16px",
              width: "160px",
              height: "80px",
            }}
          >
            <Image
              src="/images/Frame 1437253701.png"
              alt="Zirwa Qurbani Service"
              width={120}
              height={60}
              style={{ width: "120px", height: "auto" }}
            />
          </div>
        </Link>

        <Link
          href="/profile"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 7px 0 18px",
            gap: "12px",
            background: "#ED0213",
            borderRadius: "60px",
            height: "44px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 510,
              fontSize: "16px",
              color: "#FFFFFF",
            }}
          >
            Profile
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              background: "#FFFFFF",
              borderRadius: "50%",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#ED0213" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          maxWidth: "1200px",
          width: "100%",
          margin: "20px auto 60px",
          padding: "0 24px",
          flex: 1,
        }}
      >
        {/* Page title */}
        <h1
          style={{
            fontFamily: "'Noto Serif', serif",
            fontWeight: 700,
            fontSize: "36px",
            lineHeight: "44px",
            letterSpacing: "-1px",
            color: "#363636",
            margin: 0,
            textAlign: "center",
          }}
        >
          My Orders
        </h1>

        {/* Two-column layout */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "32px",
            width: "100%",
            opacity: 0.8,
          }}
        >
          {/* LEFT: Sidebar */}
          <div
            style={{
              width: "220px",
              minWidth: "220px",
              background: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
              borderRadius: "18px",
              padding: "40px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Avatar + name */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#D9D9D9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#999" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  color: "#333333",
                }}
              >
                Sam Jordan
              </span>
            </div>

            {/* Menu */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
              {/* My Profile */}
              <Link
                href="/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  gap: "8px",
                  width: "100%",
                  height: "42px",
                  borderBottom: "1px solid #D7D7D7",
                  textDecoration: "none",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#363636" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    lineHeight: "140%",
                    letterSpacing: "-0.02em",
                    color: "#363636",
                  }}
                >
                  My Profile
                </span>
              </Link>

              {/* My Orders - active */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  gap: "7px",
                  width: "100%",
                  height: "44px",
                  background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" fill="#FFFFFF" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    lineHeight: "140%",
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                  }}
                >
                  My Orders
                </span>
              </button>

              {/* Logout */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  gap: "10px",
                  width: "100%",
                  height: "42px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid #D7D7D7",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5z" fill="#FF5858" />
                  <path d="M16.56 12.01l-3.09-3.09L12 10.38l4.62 4.62 4.62-4.62-1.47-1.46-3.21 3.09z" fill="#FF5858" transform="rotate(-90 16.62 12.01)" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    lineHeight: "140%",
                    letterSpacing: "-0.02em",
                    color: "#363636",
                  }}
                >
                  Logout
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: Orders table card */}
          <div
            style={{
              flex: 1,
              border: "1px solid rgba(0, 0, 0, 0.12)",
              filter: "drop-shadow(0px 3.5px 3.5px rgba(0, 0, 0, 0.25))",
              borderRadius: "16px",
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "9px",
              background: "#FFFFFF",
            }}
          >
            {/* Header: title + sort */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  margin: 0,
                }}
              >
                Orders list
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 10px",
                  gap: "10px",
                  border: "1px solid #ED0213",
                  borderRadius: "32px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#ED0213",
                    letterSpacing: "-1px",
                  }}
                >
                  Sort by
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="#ED0213" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Table */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Table header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.5fr 1.2fr 0.8fr 0.6fr",
                  alignItems: "center",
                  padding: "4px 20px",
                  gap: "10px",
                }}
              >
                {["Order ID", "Status", "Payment Method", "Amount", "Action"].map(
                  (h) => (
                    <span
                      key={h}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: "13px",
                        lineHeight: "140%",
                        letterSpacing: "-0.02em",
                        color: "#333333",
                        textAlign: "center",
                      }}
                    >
                      {h === "Status" ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          Status
                          <svg width="14" height="10" viewBox="0 0 18 12" fill="none">
                            <path d="M0 0h18v2H0V0zm3 5h12v2H3V5zm5 5h4v2H8v-2z" fill="#333" />
                          </svg>
                        </span>
                      ) : (
                        h
                      )}
                    </span>
                  )
                )}
              </div>

              {/* Order rows */}
              {ORDERS.map((order, idx) => {
                const s = STATUS_CONFIG[order.status];
                const p = PAYMENT_CONFIG[order.payment];
                return (
                  <div
                    key={idx}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1.5fr 1.2fr 0.8fr 0.6fr",
                      alignItems: "center",
                      padding: "8px 20px",
                      gap: "10px",
                      border: "1px solid #D7D7D7",
                      minHeight: "62px",
                    }}
                  >
                    {/* Order ID + thumbnail + date */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "45px",
                          borderRadius: "5px",
                          border: "1px solid #BAB5B5",
                          background: "#f0f0f0",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: "13px",
                            lineHeight: "140%",
                            letterSpacing: "-0.02em",
                            color: "#333333",
                          }}
                        >
                          {order.id}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: "10.5px",
                            lineHeight: "140%",
                            letterSpacing: "-0.02em",
                            color: "#333333",
                          }}
                        >
                          {order.date}
                        </span>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "6px 10px",
                          background: s.bg,
                          border: `1.2px solid ${s.border}`,
                          borderRadius: "12px",
                          fontFamily: "'SF Pro Display', sans-serif",
                          fontWeight: 600,
                          fontSize: "12.5px",
                          lineHeight: "120%",
                          color: s.color,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>

                    {/* Payment method pill */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "5px 12px",
                          background: p.bg,
                          borderRadius: "20px",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "140%",
                          letterSpacing: "-0.02em",
                          color: p.color,
                        }}
                      >
                        {p.label}
                      </span>
                    </div>

                    {/* Amount */}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: "13px",
                        lineHeight: "140%",
                        letterSpacing: "-0.02em",
                        color: "#333333",
                        textAlign: "center",
                      }}
                    >
                      {order.amount}
                    </span>

                    {/* Action: info icon */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Link href={`/orders/${order.id}`}>
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <defs>
                            <linearGradient id="infoGrad" x1="0" y1="0" x2="20" y2="0" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#FF4B55" />
                              <stop offset="1" stopColor="#BA3139" />
                            </linearGradient>
                          </defs>
                          <circle cx="10" cy="10" r="9" stroke="url(#infoGrad)" strokeWidth="1.5" fill="none" />
                          <path d="M10 9v5" stroke="url(#infoGrad)" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="10" cy="6.5" r="0.75" fill="url(#infoGrad)" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer: showing results + pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 14px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  color: "#A6A6A6",
                }}
              >
                Showing 1 to 4 of 20 results
              </span>

              {/* Pagination */}
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                {/* Page 1 - active */}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#FFFFFF",
                  }}
                >
                  1
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    cursor: "pointer",
                  }}
                >
                  2
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#333333",
                  }}
                >
                  ....
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    cursor: "pointer",
                  }}
                >
                  5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
