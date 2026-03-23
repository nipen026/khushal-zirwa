"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CustomerDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetail({ isOpen, onClose }: CustomerDetailsPanelProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    qurbaniName1: "",
    qurbaniName2: "",
    contactNumber: "",
    area: "",
    building: "",
    landmark: "",
    city: "",
    state: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" style={{ pointerEvents: "auto" }}>
      {/* Dark transparent overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "#0F0707", opacity: 0.66 }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      />

      {/* Customer Details Panel - slides in from right */}
      <div
        className="absolute right-0 top-0 flex h-full w-full flex-col sm:w-[680px]"
        style={{
          background: "#FFFFFF",
          borderRadius: "24px 0px 0px 24px",
          animation: "slideInRight 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center gap-[76px] border-b border-black/20"
          style={{
            background: "#FFBABC",
            padding: "17px 22px",
            borderRadius: "24px 0px 0px 0px",
            minHeight: "90px",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center hover:opacity-80"
            aria-label="Go back"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M23.332 28.334 15 20.001l8.332-8.333"
                stroke="#0F0F0F"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2
            style={{
              margin: 0,
              fontFamily: "Fredoka, sans-serif",
              fontWeight: 600,
              fontSize: "28px",
              lineHeight: "25px",
              letterSpacing: "0.46px",
              color: "#494949",
              textAlign: "center",
              flex: 1,
            }}
          >
            Customer Details
          </h2>
        </div>

        {/* Form Content - scrollable */}
        <div className="flex-1 overflow-y-auto px-7 py-8">
          <div className="mx-auto flex max-w-[624px] flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-[6px]">
              <label
                style={{
                  fontFamily: "Fredoka, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "125%",
                  color: "#000000",
                }}
              >
                Full Name
              </label>
              <div
                className="flex items-center gap-[10px]"
                style={{
                  border: "1px solid #D8DADC",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  background: "#FFFFFF",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    fill="#37474F"
                  />
                </svg>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Robert Miles"
                  className="flex-1 border-none bg-transparent outline-none"
                  style={{
                    fontFamily: "Fredoka, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "125%",
                    color: "#000000",
                  }}
                />
              </div>
            </div>

            {/* Qurbani Names - side by side */}
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-[6px]">
                <label
                  style={{
                    fontFamily: "Fredoka, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "125%",
                    color: "#000000",
                  }}
                >
                  Qurbani Name 1
                </label>
                <div
                  className="flex items-center"
                  style={{
                    border: "1px solid #D8DADC",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    background: "#FFFFFF",
                  }}
                >
                  <input
                    type="text"
                    name="qurbaniName1"
                    value={formData.qurbaniName1}
                    onChange={handleInputChange}
                    placeholder="Robert Miles"
                    className="w-full border-none bg-transparent outline-none"
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-[6px]">
                <label
                  style={{
                    fontFamily: "Fredoka, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "125%",
                    color: "#000000",
                  }}
                >
                  Qurbani Name 2
                </label>
                <div
                  className="flex items-center"
                  style={{
                    border: "1px solid #D8DADC",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    background: "#FFFFFF",
                  }}
                >
                  <input
                    type="text"
                    name="qurbaniName2"
                    value={formData.qurbaniName2}
                    onChange={handleInputChange}
                    placeholder="Robert Miles"
                    className="w-full border-none bg-transparent outline-none"
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Contact Number */}
            <div className="flex flex-col gap-[6px]">
              <label
                style={{
                  fontFamily: "Fredoka, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "125%",
                  color: "#000000",
                }}
              >
                Contact Number
              </label>
              <div
                className="flex items-center gap-3"
                style={{
                  border: "1px solid #D8DADC",
                  borderRadius: "10px",
                  padding: "14px 15px",
                  background: "#FFFFFF",
                }}
              >
                <div className="flex items-center gap-2">
                  <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                    <rect width="24" height="6" fill="#FAB446" />
                    <rect y="6" width="24" height="6" fill="#F5F5F5" />
                    <rect y="12" width="24" height="6" fill="#73AF00" />
                    <circle cx="12" cy="9" r="2" fill="#1065D3" />
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="#494949"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="99887 78899"
                  className="flex-1 border-none bg-transparent outline-none"
                  style={{
                    fontFamily: "Fredoka, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "125%",
                    color: "#000000",
                  }}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="flex flex-col gap-[6px]">
              <label
                style={{
                  fontFamily: "Fredoka, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "125%",
                  color: "#000000",
                }}
              >
                Address
              </label>

              {/* Search for Area/Locality */}
              <div className="flex flex-col gap-[6px]">
                <span
                  style={{
                    fontFamily: "Fredoka, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "125%",
                    color: "#000000",
                  }}
                >
                  Search for Area/Locality
                </span>
                <div
                  className="flex items-center"
                  style={{
                    border: "1px solid #D8DADC",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    background: "#FFFFFF",
                  }}
                >
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="SM range, MG road, Pune 411061"
                    className="w-full border-none bg-transparent outline-none"
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>

              {/* Flat No / Building Name */}
              <div className="flex flex-col gap-[6px]">
                <span
                  style={{
                    fontFamily: "Fredoka, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "125%",
                    color: "#000000",
                  }}
                >
                  Flat No/ Building Name/ Street Name
                </span>
                <div
                  className="flex items-center"
                  style={{
                    border: "1px solid #D8DADC",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    background: "#FFFFFF",
                  }}
                >
                  <input
                    type="text"
                    name="building"
                    value={formData.building}
                    onChange={handleInputChange}
                    placeholder="231"
                    className="w-full border-none bg-transparent outline-none"
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>

              {/* Landmark */}
              <div className="flex flex-col gap-[6px]">
                <span
                  style={{
                    fontFamily: "Fredoka, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "125%",
                    color: "#000000",
                  }}
                >
                  Landmark
                </span>
                <div
                  className="flex items-center"
                  style={{
                    border: "1px solid #D8DADC",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    background: "#FFFFFF",
                  }}
                >
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="60 feet road"
                    className="w-full border-none bg-transparent outline-none"
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "125%",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-[6px]">
                  <span
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "125%",
                      color: "#000000",
                    }}
                  >
                    City
                  </span>
                  <div
                    className="flex items-center"
                    style={{
                      border: "1px solid #D8DADC",
                      borderRadius: "10px",
                      padding: "14px 16px",
                      background: "#FFFFFF",
                    }}
                  >
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Chennai"
                      className="w-full border-none bg-transparent outline-none"
                      style={{
                        fontFamily: "Fredoka, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "125%",
                        color: "#000000",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-[6px]">
                  <span
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "125%",
                      color: "#000000",
                    }}
                  >
                    State
                  </span>
                  <div
                    className="flex items-center"
                    style={{
                      border: "1px solid #D8DADC",
                      borderRadius: "10px",
                      padding: "14px 16px",
                      background: "#FFFFFF",
                    }}
                  >
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Tamil Nadu"
                      className="w-full border-none bg-transparent outline-none"
                      style={{
                        fontFamily: "Fredoka, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "125%",
                        color: "#000000",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div
              className="flex items-center gap-4"
              style={{
                background: "#FBF4F4",
                border: "1px solid #ED0213",
                borderRadius: "12px",
                padding: "24px 12px",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    agreeToTerms: !prev.agreeToTerms,
                  }))
                }
                className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #ED0213",
                  borderRadius: "6px",
                }}
                aria-label="Accept terms"
              >
                {formData.agreeToTerms && (
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M1.333 5.222 4.889 8.778 12.667 1"
                      stroke="#ED0213"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <span
                style={{
                  fontFamily: "Fredoka, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#434242",
                }}
              >
                I confirm that the Qurbani is performed on my behalf with correct Niyyah and strictly as per Islamic Shariah.{" "}
                <Link
                  href="/terms"
                  style={{
                    color: "#ED0213",
                    textDecoration: "underline",
                    fontWeight: 500,
                  }}
                >
                  Read Terms &amp; Conditions
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="px-7 pb-6">
          <button
            type="button"
            onClick={() => {
              // Save customer details to localStorage for checkout page
              const address = [formData.building, formData.area, formData.landmark, formData.city, formData.state]
                .filter(Boolean)
                .join(", ");
              localStorage.setItem(
                "customerDetails",
                JSON.stringify({
                  fullName: formData.fullName,
                  contactNumber: formData.contactNumber,
                  address,
                })
              );
              router.push("/checkout");
            }}
            className="flex w-full max-w-[624px] mx-auto items-center justify-center hover:opacity-90 transition-opacity"
            style={{
              height: "64px",
              background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
              boxShadow: "4px 8px 24px rgba(36, 107, 253, 0.25)",
              borderRadius: "43px",
              fontFamily: "Fredoka, sans-serif",
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "28px",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Slide-in animation */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
