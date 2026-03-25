"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import OrderDetail from "@/components/orders/OrderDetail";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

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




const preferenceOptions = ["Self / Family", "Madrasa / Needy"];

interface OrderPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BakridServiceData {
  id: string;
  name: string;
  sale_price: number;
  sale_price_uk?: number;
  original_price?: number;
  original_price_uk?: number;
  weight_low: number;
  weight_high: number;
  enable: boolean;
  is_free_delivery?: boolean;
  delivery_charge?: number;
}

export interface SidebarOrderData {
  quantity: number;
  serviceDateId: string;
  timingId: string;
  deliveryPreference: string;
  service: BakridServiceData;
}

interface DeliveryDay {
  id: string;
  date: string;
  is_sold_out?: boolean;
  day?: string;
  service_date: string;
}

interface TimeSlot {
  id: string;
  bakrid_service_date_id: string;
  start_time: string;
  end_time: string;
  is_sold_out?: boolean;
}

export default function OrderPanel({ isOpen, onClose }: OrderPanelProps) {
  const [quantity, setQuantity] = useState(2);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [preference, setPreference] = useState(preferenceOptions[1]);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [deliveryDays, setDeliveryDays] = useState<DeliveryDay[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [service, setService] = useState<BakridServiceData | null>(null);
  const [region, setRegion] = useState<"in" | "uk" | "other">("other");
  const [madrasaLoading, setMadrasaLoading] = useState(false);

  // Madrasa inline form fields
  const [madrasaFullName, setMadrasaFullName] = useState("");
  const [madrasaPhone, setMadrasaPhone] = useState("");
  const [madrasaQurbaniName1, setMadrasaQurbaniName1] = useState("");
  const [madrasaQurbaniName2, setMadrasaQurbaniName2] = useState("");

  const isMadrasa = preference === "Madrasa / Needy";

  useEffect(() => {
    setRegion(getRegion());
  }, []);

  const totalPrice = useMemo(() => {
    const price = region === "uk"
      ? (service?.sale_price_uk || service?.sale_price || 0)
      : (service?.sale_price || 0);
    return quantity * price;
  }, [quantity, service, region]);

  const packageFeatures = service
    ? [`${service.weight_low} - ${service.weight_high} kg`, "Hygienic", "100 % Shariah"]
    : ["Hygienic", "100 % Shariah"];

  useEffect(() => {
    const fetchBakridData = async () => {
      try {
        // 1️⃣ Get Service
        const { data: serviceData, error: serviceError } = await supabase
          .from("bakrid_service")
          .select("*")
          .eq("enable", true)
          .single();

        if (serviceError) throw serviceError;

        setService(serviceData);

        // 2️⃣ Get Dates using service_id
        const { data: dateData, error: dateError } = await supabase
          .from("bakrid_service_date")
          .select("*");

        if (dateError) throw dateError;

        setDeliveryDays(dateData || []);

        // 3️⃣ Get Timings using service_id
        const { data: timingData, error: timingError } = await supabase
          .from("bakrid_service_timings")
          .select("*");

        if (timingError) throw timingError;

        setTimeSlots(timingData || []);
      } catch (error) {
        console.error("Supabase error:", error);
      }
    };
    fetchBakridData();
  }, []);
  const filteredSlots = useMemo(() => {
    if (!selectedDay) return [];
    return timeSlots.filter(
      (slot) => slot.bakrid_service_date_id === selectedDay
    );
  }, [selectedDay, timeSlots]);

  /* ---------- Madrasa: direct payment flow ---------- */

  const buildMadrasaQurbaniNames = (): string[] => {
    const names: string[] = [];
    if (madrasaQurbaniName1.trim()) names.push(madrasaQurbaniName1.trim());
    if (madrasaQurbaniName2.trim()) names.push(madrasaQurbaniName2.trim());
    return names;
  };

  const placeOrderViaEdgeFunction = async (paymentData: {
    payment_id: string;
    order_id: string | null;
    signature: string | null;
    paypal_meta: unknown | null;
  }) => {
    const currency = getCurrencyCode(region);
    const qurbaniNames = buildMadrasaQurbaniNames();

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
          address_id: null,
          qurbani_names: qurbaniNames,
          service_date_id: selectedDay,
          timing_id: selectedSlot,
          full_name: madrasaFullName,
          phone_number: madrasaPhone,
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

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const loadPaypal = () =>
    new Promise<boolean>((resolve) => {
      if (window.paypal) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=GBP`;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const payMadrasaWithRazorpay = async () => {
    setMadrasaLoading(true);
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      setMadrasaLoading(false);
      return;
    }

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      name: "Zibra Qurbani",
      description: "Qurbani Payment - Madrasa",
      prefill: { name: madrasaFullName, contact: madrasaPhone },
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
    setMadrasaLoading(false);
  };

  const payMadrasaWithPaypal = async () => {
    setMadrasaLoading(true);
    const loaded = await loadPaypal();
    if (!loaded) {
      toast.error("PayPal SDK failed to load");
      setMadrasaLoading(false);
      return;
    }
    setMadrasaLoading(false);

    const container = document.getElementById("madrasa-paypal-button");
    if (container) container.innerHTML = "";

    window.paypal!.Buttons({
      createOrder: (_data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: { currency_code: "GBP", value: totalPrice.toFixed(2) },
          }],
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
    }).render("#madrasa-paypal-button");
  };

  const handleMadrasaPlaceOrder = () => {
    if (!selectedDay || !selectedSlot) {
      toast.error("Please select a day and time slot");
      return;
    }
    if (!madrasaFullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!madrasaPhone.trim()) {
      toast.error("Please enter your contact number");
      return;
    }
    if (buildMadrasaQurbaniNames().length === 0) {
      toast.error("Please enter at least one Qurbani name");
      return;
    }

    if (region === "uk") {
      payMadrasaWithPaypal();
    } else {
      payMadrasaWithRazorpay();
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50" style={{ pointerEvents: "auto" }}>
        {/* Dark transparent overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "#0F0707", opacity: 0.66 }}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        />

        {/* Select Date & Time Panel - slides in from right */}
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
            className="flex items-center gap-6 border-b border-black/20 px-4 py-5 sm:px-[22px] sm:py-[17px]"
            style={{
              background: "#FFBABC",
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

          {/* Scrollable Content */}
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7 md:px-8">
            {/* Select Quantity */}
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
                        <span className="pb-0.5 text-xs text-[#94949E] line-through">{service?.original_price && new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }).format(quantity * (service?.original_price || 0))}</span>
                      </div>
                    </div>

                    <div className="flex items-center self-start rounded-[14px] bg-[#FF5A57] sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setQuantity((v) => Math.max(1, v - 1))}
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
                        onClick={() => setQuantity((v) => v + 1)}
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

            {/* Select Day */}
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
                      onClick={() => {
                        setSelectedDay(day.id);
                        setSelectedSlot(null);
                      }}
                      disabled={day.is_sold_out}
                      className="flex min-h-[100px] items-start justify-between rounded-xl border px-3 py-3 text-left"
                      style={{
                        background: active ? "#FEF2F2" : "#FFFFFF",
                        borderColor: active ? "#ED0213" : "#D8D8D8",
                        opacity: day.is_sold_out ? 0.5 : 1,
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="font-semibold text-lg">
                          {day.day}
                        </div>

                        <div className="text-sm text-gray-500">
                          {new Date(day.service_date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>

                        {day.is_sold_out && (
                          <span className="text-xs text-red-500">Sold Out</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Available Slots */}
            <div className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-[0.28px]" style={{ fontFamily: "Fredoka, sans-serif", color: "#47474A" }}>
                Available Slots
              </span>
              <div className="grid gap-3 md:grid-cols-2">
                {filteredSlots.map((slot) => {
                  const active = slot.id === selectedSlot;

                  const start = slot.start_time.slice(0, 5);
                  const end = slot.end_time.slice(0, 5);

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={slot.is_sold_out}
                      onClick={() => setSelectedSlot(slot.id)}
                      className="flex h-10 items-center justify-center rounded-lg border px-3 text-center"
                      style={{
                        background: active ? "#B21E24" : "#FFFFFF",
                        borderColor: active ? "#B21E24" : "#000000",
                        color: active ? "#FFFFFF" : "#6C6C6C",
                        opacity: slot.is_sold_out ? 0.5 : 1,
                      }}
                    >
                      {start} - {end}
                      {slot.is_sold_out && " (Sold Out)"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Preference */}
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

            {/* Madrasa inline form — shown only when Madrasa / Needy is selected */}
            {isMadrasa && (
              <div className="flex flex-col gap-4">
                <span className="text-sm uppercase tracking-[0.28px]" style={{ fontFamily: "Fredoka, sans-serif", color: "#47474A" }}>
                  Your Details
                </span>

                {/* Full Name */}
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
                    value={madrasaFullName}
                    onChange={(e) => setMadrasaFullName(e.target.value)}
                    placeholder="Full Name"
                    className="flex-1 border-none bg-transparent outline-none"
                    style={{ fontFamily: "Fredoka, sans-serif", fontSize: "16px", color: "#000000" }}
                  />
                </div>

                {/* Contact Number */}
                <div
                  className="flex items-center gap-[10px]"
                  style={{
                    border: "1px solid #D8DADC",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    background: "#FFFFFF",
                  }}
                >
                  <input
                    type="tel"
                    value={madrasaPhone}
                    onChange={(e) => setMadrasaPhone(e.target.value)}
                    placeholder={region === "uk" ? "Phone (e.g. 07911 123456)" : "Phone (e.g. 99887 78899)"}
                    className="flex-1 border-none bg-transparent outline-none"
                    style={{ fontFamily: "Fredoka, sans-serif", fontSize: "16px", color: "#000000" }}
                  />
                </div>

                {/* Qurbani Names */}
                <div className="flex gap-3">
                  <div
                    className="flex flex-1 items-center"
                    style={{
                      border: "1px solid #D8DADC",
                      borderRadius: "10px",
                      padding: "14px 16px",
                      background: "#FFFFFF",
                    }}
                  >
                    <input
                      type="text"
                      value={madrasaQurbaniName1}
                      onChange={(e) => setMadrasaQurbaniName1(e.target.value)}
                      placeholder="Qurbani Name 1"
                      className="w-full border-none bg-transparent outline-none"
                      style={{ fontFamily: "Fredoka, sans-serif", fontSize: "16px", color: "#000000" }}
                    />
                  </div>
                  <div
                    className="flex flex-1 items-center"
                    style={{
                      border: "1px solid #D8DADC",
                      borderRadius: "10px",
                      padding: "14px 16px",
                      background: "#FFFFFF",
                    }}
                  >
                    <input
                      type="text"
                      value={madrasaQurbaniName2}
                      onChange={(e) => setMadrasaQurbaniName2(e.target.value)}
                      placeholder="Qurbani Name 2"
                      className="w-full border-none bg-transparent outline-none"
                      style={{ fontFamily: "Fredoka, sans-serif", fontSize: "16px", color: "#000000" }}
                    />
                  </div>
                </div>

                {/* Payment info */}
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3">
                  <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: "14px", color: "#626262" }}>
                    Payment via {region === "uk" ? "PayPal" : "Razorpay"}
                  </span>
                </div>

                {/* PayPal button container for .uk */}
                {region === "uk" && <div id="madrasa-paypal-button" className="mt-1" />}
              </div>
            )}

            {/* Info Box */}
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
                Slots are limited and allocated on a first-come-first-serve basis. Secure your preferred time now to avoid delays.{" "}
                <Link href="/terms" style={{ color: "#2E5AAC", textDecoration: "underline" }}>
                  Read Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Button — "Place Order" for Madrasa, "Continue" for Self/Family */}
          <div className="px-5 pb-6 sm:px-7 md:px-8">
            <button
              type="button"
              disabled={madrasaLoading && isMadrasa}
              onClick={() => {
                if (isMadrasa) {
                  handleMadrasaPlaceOrder();
                } else {
                  setShowCustomerDetails(true);
                }
              }}
              className="flex h-16 w-full items-center justify-center rounded-[43px] text-white shadow-[4px_8px_24px_rgba(36,107,253,0.25)]"
              style={{
                background: (madrasaLoading && isMadrasa)
                  ? "#999"
                  : "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
                fontFamily: "Fredoka, sans-serif",
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "28px",
                cursor: (madrasaLoading && isMadrasa) ? "not-allowed" : "pointer",
              }}
            >
              {isMadrasa
                ? (madrasaLoading ? "Processing..." : "Place Order")
                : "Continue"}
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

      {/* Order 2 - Customer Details Panel */}
      <OrderDetail
        isOpen={showCustomerDetails}
        onClose={() => setShowCustomerDetails(false)}
        orderData={{
          quantity,
          serviceDateId: selectedDay!,
          timingId: selectedSlot!,
          deliveryPreference: preference,
          service: service!,
        }}
      />
    </>
  );
}
