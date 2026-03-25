"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import type { SidebarOrderData } from "@/components/order/OrderPanel";

/* ---------- Domain helpers ---------- */

function getRegion(): "in" | "uk" | "other" {
  if (typeof window === "undefined") return "other";
  const hostname = window.location.hostname;
  if (hostname.endsWith(".in")) return "in";
  if (hostname.endsWith(".uk") || hostname.endsWith(".co.uk")) return "uk";
  return "other";
}

function getCurrencyCode(region: "in" | "uk" | "other") {
  return region === "uk" ? "GBP" : "INR";
}

/* ---------- Razorpay types ---------- */

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill?: { name?: string; contact?: string };
  theme?: { color?: string };
}

/* Window types are declared in app/checkout/page.tsx */

/* ---------- Props ---------- */

interface CustomerDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  orderData?: SidebarOrderData;
}

export default function OrderDetail({ isOpen, onClose, orderData }: CustomerDetailsPanelProps) {
  const [region, setRegion] = useState<"in" | "uk" | "other">("other");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setRegion(getRegion());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------- Build qurbani names array ---------- */

  const buildQurbaniNames = (): string[] => {
    const names: string[] = [];
    if (formData.qurbaniName1.trim()) names.push(formData.qurbaniName1.trim());
    if (formData.qurbaniName2.trim()) names.push(formData.qurbaniName2.trim());
    return names;
  };

  /* ---------- Save address to Supabase (Self/Family) ---------- */

  const saveAddress = async (): Promise<string | null> => {
    if (!orderData || orderData.deliveryPreference === "Madrasa / Needy") {
      return null;
    }

    const addressStr = [formData.building, formData.area, formData.landmark, formData.city, formData.state]
      .filter(Boolean)
      .join(", ");

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return null;

    const { data, error } = await supabase
      .from("user_address")
      .insert({
        user_id: userData.user.id,
        address: addressStr,
        city: formData.city,
        state: formData.state,
        landmark: formData.landmark,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to save address:", error);
      return null;
    }

    return data.id;
  };

  /* ---------- Call the edge function ---------- */

  const placeOrderViaEdgeFunction = async (paymentData: {
    payment_id: string;
    order_id: string | null;
    signature: string | null;
    paypal_meta: unknown | null;
  }) => {
    if (!orderData) return;

    const addressId = await saveAddress();
    const currency = getCurrencyCode(region);
    const qurbaniNames = buildQurbaniNames();

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      toast.error("Please log in to place an order");
      return;
    }

    const { data, error } = await supabase.functions.invoke(
      "place_bakrid_service_order",
      {
        body: {
          payment_data: paymentData,
          coupon_code: null,
          address_id: addressId,
          qurbani_names: qurbaniNames,
          service_date_id: orderData.serviceDateId,
          timing_id: orderData.timingId,
          full_name: formData.fullName,
          phone_number: formData.contactNumber,
          currency,
        },
      }
    );

    if (error) {
      console.error("Edge function error:", error);
      toast.error("Payment done but order not saved. Please contact support.");
      return;
    }

    toast.success("Order placed successfully!");
    console.log("Order placed:", data);
    onClose();
  };

  /* ---------- Calculate total ---------- */

  const getTotal = (): number => {
    if (!orderData) return 0;
    const price = region === "uk"
      ? (orderData.service.sale_price_uk || orderData.service.sale_price)
      : orderData.service.sale_price;
    return price * orderData.quantity;
  };

  /* ---------- Razorpay (.in) ---------- */

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const payWithRazorpay = async () => {
    setLoading(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    const total = getTotal();

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(total * 100),
      currency: "INR",
      name: "Zibra Qurbani",
      description: "Qurbani Payment",
      prefill: {
        name: formData.fullName,
        contact: formData.contactNumber,
      },
      handler: async (response: RazorpayResponse) => {
        await placeOrderViaEdgeFunction({
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          paypal_meta: null,
        });
      },
      theme: { color: "#ED0213" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  /* ---------- PayPal (.uk) ---------- */

  const loadPaypal = () =>
    new Promise<boolean>((resolve) => {
      if (window.paypal) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=GBP`;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const payWithPaypal = async () => {
    setLoading(true);

    const loaded = await loadPaypal();
    if (!loaded) {
      toast.error("PayPal SDK failed to load");
      setLoading(false);
      return;
    }

    setLoading(false);

    const container = document.getElementById("sidebar-paypal-button");
    if (container) container.innerHTML = "";

    const total = getTotal();

    window.paypal!.Buttons({
      createOrder: (_data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "GBP",
                value: total.toFixed(2),
              },
            },
          ],
        });
      },
      onApprove: async (_data, actions) => {
        const details = await actions.order.capture();
        await placeOrderViaEdgeFunction({
          payment_id: details.id,
          order_id: null,
          signature: null,
          paypal_meta: { paypal_order_id: details.id, status: details.status },
        });
      },
      onError: (err) => {
        console.error("PayPal error:", err);
        toast.error("PayPal payment failed");
      },
    }).render("#sidebar-paypal-button");
  };

  /* ---------- Validate & pay ---------- */

  const handleContinue = () => {
    if (!orderData) {
      toast.error("Order data missing. Please go back and select options.");
      return;
    }

    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!formData.contactNumber.trim()) {
      toast.error("Please enter your contact number");
      return;
    }

    if (buildQurbaniNames().length === 0) {
      toast.error("Please enter at least one Qurbani name");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (orderData.deliveryPreference === "Self / Family") {
      if (!formData.area.trim() && !formData.building.trim()) {
        toast.error("Please enter your delivery address");
        return;
      }
    }

    if (region === "uk") {
      payWithPaypal();
    } else {
      payWithRazorpay();
    }
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
                  {region === "uk" ? (
                    /* UK Flag */
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                      <rect width="24" height="18" fill="#012169" />
                      <path d="M0 0L24 18M24 0L0 18" stroke="white" strokeWidth="3" />
                      <path d="M0 0L24 18M24 0L0 18" stroke="#C8102E" strokeWidth="1.5" />
                      <path d="M12 0V18M0 9H24" stroke="white" strokeWidth="5" />
                      <path d="M12 0V18M0 9H24" stroke="#C8102E" strokeWidth="3" />
                    </svg>
                  ) : (
                    /* India Flag */
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                      <rect width="24" height="6" fill="#FAB446" />
                      <rect y="6" width="24" height="6" fill="#F5F5F5" />
                      <rect y="12" width="24" height="6" fill="#73AF00" />
                      <circle cx="12" cy="9" r="2" fill="#1065D3" />
                    </svg>
                  )}
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
                  placeholder={region === "uk" ? "07911 123456" : "99887 78899"}
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

            {/* Address Section - only for Self/Family */}
            {orderData?.deliveryPreference === "Self / Family" && (
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
            )}

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

            {/* Payment info */}
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3">
              <span
                style={{
                  fontFamily: "Fredoka, sans-serif",
                  fontSize: "14px",
                  color: "#626262",
                }}
              >
                Payment via {region === "uk" ? "PayPal" : "Razorpay"}
              </span>
            </div>

            {/* PayPal button container for .uk */}
            {region === "uk" && (
              <div id="sidebar-paypal-button" className="mt-2" />
            )}
          </div>
        </div>

        {/* Pay & Place Order Button */}
        <div className="px-7 pb-6">
          <button
            type="button"
            disabled={loading}
            onClick={handleContinue}
            className="flex w-full max-w-[624px] mx-auto items-center justify-center hover:opacity-90 transition-opacity"
            style={{
              height: "64px",
              background: loading
                ? "#999"
                : "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
              boxShadow: "4px 8px 24px rgba(36, 107, 253, 0.25)",
              borderRadius: "43px",
              fontFamily: "Fredoka, sans-serif",
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "28px",
              color: "#FFFFFF",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Processing..." : `Pay & Place Order`}
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
