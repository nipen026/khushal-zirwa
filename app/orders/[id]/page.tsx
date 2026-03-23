"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { supabase } from "../../../src/lib/supabaseClient";

import { IoArrowBack } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";

import CancelOrderUI from "../../../src/components/CancelOrderUI";
import toast from "react-hot-toast";

interface OrderProduct {
  id: string;
  name: string;
  weight: string;
  sale_price: number;
  image?: {
    image_url: string;
  };
}

interface OrderItem extends OrderProduct {
  quantity: number;
}

interface Order {
  id: string;
  created_at: string;
  address: string;
  order_status: string;
  products: OrderProduct[];
  product_quantities: number[];
  item_total: number;
  delivery_fee: number;
  total_amount: number;
  paid_via: string;
  total_chicken_weight?: number;
  total_mutton_weight?: number;
}

interface Address {
  flat_house_building: string;
  address_line: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  address_type: string;
}

const STATUS_STEP_MAP: Record<string, number> = {
  pending: 0,
  assigned: 1,
  on_the_way: 2,
  delivered: 3,
};

const steps = [
  "Order Pending",
  "Order in progress",
  "Order Assigned",
  "Order on the Way",
  "Order Delivered",
];

export default function OrderDetails() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [, setAddress] = useState<Address | null>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [isCancelDisabled, setIsCancelDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= AUTH ================= */

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push(`/?login=true`);
      }
    };

    checkAuth();
  }, [router]);

  /* ================= FETCH ADDRESS ================= */

  const userAddress = async (addressId: string) => {
    const { data, error } = await supabase
      .from("user_address")
      .select("*")
      .eq("id", addressId)
      .single();

    if (error) {
      console.error("Error fetching address:", error);
      return;
    }

    setAddress(data);
  };

  /* ================= FETCH ORDER ================= */

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("vendor_order")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setOrder(data);

      await userAddress(data.address);

      setActiveStep(STATUS_STEP_MAP[data.order_status] ?? 0);

      const mappedItems =
        data.products?.map((product: OrderProduct, index: number) => ({
          ...product,
          quantity: data.product_quantities?.[index] || 1,
        })) || [];

      setItems(mappedItems);

      const createdTime = new Date(data.created_at).getTime();
      const currentTime = Date.now();

      const diffInSeconds = (currentTime - createdTime) / 1000;

      if (diffInSeconds > 180 || data.order_status !== "pending") {
        setIsCancelDisabled(true);
      }

      setLoading(false);
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  /* ================= CANCEL ORDER ================= */

  const handleCancelOrder = async () => {
    if (!order) return;

    try {
      setIsCancelDisabled(true);

      const { error } = await supabase.rpc("cancel_order_user", {
        p_order_id: order.id,
        p_total_chicken_weight: order.total_chicken_weight ?? 0,
        p_total_mutton_weight: order.total_mutton_weight ?? 0,
      });

      if (error) {
        toast.error("Unable to cancel order");
        setIsCancelDisabled(false);
        return;
      }

      setOrder((prev) =>
        prev
          ? {
              ...prev,
              order_status: "cancelled",
            }
          : prev
      );

      setActiveStep(0);
      setIsModalOpen(false);

      toast.success("Order cancelled successfully");
    } catch (err) {
      console.error(err);
      setIsCancelDisabled(false);
    }
  };

  const handleNavigateToChat = () => {
    if (!order) return;
    router.push(`/userProfile?orderId=${order.id}`);
  };

  /* ================= LOADING ================= */

  if (loading) {
    return <p className="text-center py-20">Loading order...</p>;
  }

  if (!order) {
    return <p className="text-center py-20">Order not found</p>;
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto bg-[#F6F7FB] flex justify-center py-10 px-4">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-3xl p-8">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="border p-2 rounded-full"
            >
              <IoArrowBack className="text-xl" />
            </button>

            <h1 className="text-2xl font-semibold">Order Details</h1>
          </div>

          <button
            onClick={handleNavigateToChat}
            className="flex items-center gap-2 hover:bg-red-50 transition border px-4 py-2 rounded-full text-red-600 border-red-500"
          >
            <FiMessageSquare />
            Chat with us
          </button>
        </div>

        {/* STATUS */}

        <div className="text-center mb-10">
          <h2 className="text-xl font-medium">Thank You</h2>
          <p className="text-gray-600 mt-1">
            Your order status is as follows
          </p>
        </div>

        {/* TIMELINE */}

        <div className="relative px-8 mb-10">
          <div className="absolute top-3 left-0 w-full h-[3px] bg-gray-300">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${(activeStep / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          <div className="flex justify-between relative z-10">
            {steps.map((step, i) => {
              const isActive = i <= activeStep;

              return (
                <div key={i} className="flex flex-col items-center w-24">
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                      isActive
                        ? "bg-green-500 border-green-500"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    {isActive && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>

                  <p
                    className={`text-xs mt-2 ${
                      isActive ? "font-semibold" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* BILL SUMMARY */}

        <div className="border rounded-xl p-5">
          <h3 className="font-semibold mb-3">🧾 Bill Summary</h3>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 flex gap-3 bg-gray-50"
              >
                {item.image?.image_url && (
                  <Image
                    src={item.image.image_url}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded object-cover"
                  />
                )}

                <div className="text-sm">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.weight}</p>
                  <p className="font-semibold">₹{item.sale_price}</p>
                  <p className="text-xs">Qty {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <p>Item Total</p>
              <p>₹{order.item_total}</p>
            </div>

            <div className="flex justify-between">
              <p>Delivery</p>
              <p>₹{order.delivery_fee}</p>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <p>Total</p>
              <p>₹{order.total_amount}</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isCancelDisabled}
            className={`px-6 py-3 rounded-lg text-white btn-gradient ${
              isCancelDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Cancel Order
          </button>
        </div>

        <CancelOrderUI
          onConfirm={handleCancelOrder}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}