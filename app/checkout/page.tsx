"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabaseClient";
import { IoClose } from "react-icons/io5";
import { HiMinus, HiPlus } from "react-icons/hi";
import Image from "next/image";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  title: string;
  qty: number;
  price: number;
  image?: string;
}

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
  order_id?: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

export default function Checkout() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [addressId, setAddressId] = useState<string | null>(null);

  const [scheduleType] = useState<"instant" | "schedule">(
    "instant"
  );

  const [hour] = useState<string>("10");
  const [minute] = useState<string>("00");
  const [ampm] = useState<"AM" | "PM">("AM");

  const [paymentMethod] = useState<string>("netbanking");

  /* ---------------- ADDRESS ---------------- */

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("selected_address_id");
      setTimeout(() => setAddressId(id), 0);
    }
  }, []);

  /* ---------------- CART LOAD ---------------- */

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      const { data, error } = await supabase.rpc("get_user_cart");

      if (error) {
        console.error("Cart error:", error);
        setLoading(false);
        return;
      }

      if (!data?.data?.products) {
        setItems([]);
        setLoading(false);
        return;
      }

      const cart = data.data;

      const mappedItems: CartItem[] = cart.products.map(
        (product: { id: string; name: string; sale_price: number; image?: { image_url: string } }, index: number) => ({
          id: product.id,
          title: product.name,
          qty: cart.quantities[index] || 1,
          price: product.sale_price,
          image: product.image?.image_url,
        })
      );

      setItems(mappedItems);
      setLoading(false);
    };

    fetchCart();
  }, []);

  /* ---------------- CART UPDATE ---------------- */

  const updateCartQty = async (productId: string, quantity: number) => {
    await supabase.rpc("upsert_user_cart", {
      p_address_id: null,
      p_delete_product_id: null,
      p_product_id: productId,
      p_quantity: quantity,
    });
  };

  const increaseQty = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newQty = item.qty + 1;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );

    await updateCartQty(id, newQty);
  };

  const decreaseQty = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.qty === 1) return;

    const newQty = item.qty - 1;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );

    await updateCartQty(id, newQty);
  };

  const removeItem = async (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));

    await supabase.rpc("upsert_user_cart", {
      p_address_id: null,
      p_delete_product_id: id,
      p_product_id: null,
      p_quantity: null,
    });
  };

  const clearUserCart = async () => {
    const { error } = await supabase.rpc("clear_user_cart");

    if (error) {
      console.error("Failed to clear cart:", error);
      return false;
    }

    setItems([]);
    return true;
  };

  /* ---------------- TOTAL ---------------- */

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  /* ---------------- ORDER PAYLOAD ---------------- */

  const buildInsertOrderPayload = async ({
    paidVia,
    paymentId = null,
    paymentData = null,
  }: {
    paidVia: string;
    paymentId?: string | null;
    paymentData?: RazorpayResponse | null;
  }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    return {
      p_user_id: user.id,
      p_address: addressId,
      p_products_uuid: items.map((i) => i.id),
      p_product_quantities: items.map((i) => i.qty),
      p_item_total: subtotal,
      p_tax_amount: tax,
      p_delivery_fee: 0,
      p_packaging_fee: 0,
      p_total_amount: total,
      p_paid_via: paidVia,
      p_payment_id: paymentId,
      p_payment_data: paymentData,
      p_schedule_time:
        scheduleType === "schedule" ? `${hour}:${minute} ${ampm}` : null,
      p_nearby_vendors: null,
    };
  };

  /* ---------------- COD ORDER ---------------- */

  const placeCODOrder = async () => {
    setLoading(true);

    const payload = await buildInsertOrderPayload({
      paidVia: "cod",
    });

    const { error } = await supabase.rpc("insert_order", payload);

    setLoading(false);

    if (error) {
      toast.error("Failed to place order");
      console.error(error);
      return;
    }

    await clearUserCart();
    toast.success("Order placed successfully (COD)");
  };

  /* ---------------- RAZORPAY ---------------- */

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
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

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(total * 100),
      currency: "INR",
      name: "Chop & Chicks",
      description: "Qurbani Payment",

      handler: async (response: RazorpayResponse) => {
        const payload = await buildInsertOrderPayload({
          paidVia: "razorpay",
          paymentId: response.razorpay_payment_id,
          paymentData: response,
        });

        const { error } = await supabase.rpc("insert_order", payload);

        if (error) {
          toast.error("Payment done but order not saved");
          return;
        }

        await clearUserCart();
        toast.success("Payment successful 🎉");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    setLoading(false);
  };

  const placeOrder = () => {
    if (paymentMethod === "cod") placeCODOrder();
    else payWithRazorpay();
  };

  /* ---------------- UI ---------------- */

  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)]">
        <Image
          src="/images/empty-cart.png"
          width={300}
          height={300}
          alt="Empty Cart"
        />
        <p className="text-[#82131B] text-2xl text-center mt-3 font-medium">
          Start Filling Your Cart with <br /> Premium Fresh Meat.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* CART ITEMS */}

        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 bg-white shadow-md p-3 rounded-xl border relative"
            >
              <IoClose
                size={20}
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => removeItem(item.id)}
              />

              {item.image && (
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.title}
                  className="rounded-md object-cover"
                />
              )}

              <div className="flex mt-3 justify-between w-full items-end">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="font-medium text-primary mt-1">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-red-500 text-white p-1 rounded-full"
                  >
                    <HiMinus />
                  </button>

                  <span className="px-2 font-semibold">{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-red-500 text-white p-1 rounded-full"
                  >
                    <HiPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}

        <div className="bg-[#FFF1F1] p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="mt-5 w-full py-3 text-white rounded-lg btn-gradient"
          >
            {loading ? "Processing..." : "Place Order →"}
          </button>
        </div>

      </div>
    </div>
  );
}