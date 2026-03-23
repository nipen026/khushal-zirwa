"use client";

import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const orders = [
  { id: "1010246", date: "09:09 AM, 10-10-2025", products: 2, status: "Completed", payment: "PhonePe", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", products: 2, status: "Cancelled", payment: "UPI", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", products: 2, status: "Cancelled", payment: "UPI", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", products: 2, status: "Completed", payment: "Cash", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", products: 2, status: "Cancelled", payment: "PhonePe", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", products: 2, status: "In Progress", payment: "UPI", amount: "$212.50" },
  { id: "1010246", date: "09:09 AM, 10-10-2025", products: 2, status: "In Progress", payment: "PhonePe", amount: "$212.50" },
];

const statusStyles = {
  delivered: "bg-white text-green-600 border-[#26953E]",
  cancelled: "bg-white text-red-500 border-red-300",
  pending: "bg-white text-orange-500 border-orange-300",
  assigned: "bg-white text-blue-500 border-blue-300",
};

const paymentStyles = {
  PhonePe: "bg-[#5441C321] text-purple-600",
  UPI: "bg-[#AE422921] text-orange-500",
  Cash: "bg-[#1AB75921] text-green-600",
};

export default function OrderTable() {
  const PAGE_SIZE = 5;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeAction, setActiveAction] = useState(null);

  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date_desc");
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("vendor_order")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const now = Date.now();

      const formattedOrders = data.map((order) => {
        const createdTime = new Date(order.created_at).getTime();
        const diffInSeconds = (now - createdTime) / 1000;

        return {
          ...order,
          isCancelDisabled:
            diffInSeconds > 180 || order.order_status !== "pending",
        };
      });

      setOrders(formattedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);
  const sortedOrders = [...orders].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return (a.products?.[0]?.name || "").localeCompare(
          b.products?.[0]?.name || ""
        );
      case "size":
        return (b.products?.length || 0) - (a.products?.length || 0);
      case "date_asc":
        return new Date(a.created_at) - new Date(b.created_at);
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });
  const totalPages = Math.ceil(sortedOrders.length / PAGE_SIZE);

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const handleOrderDetails = (order) =>{
    router.push(`OrderDetails?orderId=${order.id}`)
  }
  return (
    <div className="bg-white w-full rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-red-500">
          Profile Settings
        </h2>

        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="border border-primary px-4 py-1.5 rounded-full text-sm text-primary flex items-center gap-2"
          >
            Sort By <MdOutlineKeyboardArrowDown />
          </button>

          {sortOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-20">
              {[
                { label: "Newest", value: "date_desc" },
                { label: "Oldest", value: "date_asc" },
                { label: "Name", value: "name" },
                { label: "Size", value: "size" },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setSortOpen(false);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Table */}
      <div className="">
        {!loading && orders.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <p className="text-lg font-medium">No orders found</p>
            <p className="text-sm">You haven’t placed any orders yet.</p>
          </div>
        ) : (
          <table className="w-full border-spacing-y-4 text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-3 font-medium text-left">Order ID</th>
                <th className="py-3 font-medium text-left">Products</th>
                <th className="py-3 font-medium text-left">Status</th>
                <th className="py-3 font-medium text-left">Payment Method</th>
                <th className="py-3 font-medium text-left">Amount</th>
                <th className="py-3 font-medium text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedOrders.map((order, i) => (
                <tr
                  key={order.id}
                  className="border-b cursor-pointer last:border-none hover:bg-gray-50 transition"
                >
                  {/* Order ID */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={order.products?.[0]?.image?.image_url || "/assets/product.jpg"}
                        alt="product"
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium capitalize text-gray-800">
                          {order.products?.[0]?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Products */}
                  <td className="py-4 text-gray-500">
                    {order.products?.length || 0} Product
                  </td>

                  {/* Status */}
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 w-[130px] capitalize rounded-lg text-xs border font-medium ${statusStyles[order.order_status]
                        }`}
                    >
                      {order.order_status}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="py-4">
                    <span className="px-4 py-1 rounded-full text-xs font-medium bg-gray-100">
                      {order.paid_via === "razorpay" ? "Razorpay" : "Cash"}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-4 font-medium text-gray-700">
                    ₹{order.total_amount}
                  </td>

                  {/* Action */}
                  <td className="py-4 text-center relative">
                    <button
                      onClick={() =>
                        setActiveAction(activeAction === order.id ? null : order.id)
                      }
                      className="w-7 h-7 rounded-full btn-gradient text-white"
                    >
                      ⋮
                    </button>

                    {activeAction === order.id && (
                      <div className="absolute right-8 top-10 bg-white border rounded-lg shadow-md w-40 z-20">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                          Track Order
                        </button>
                        <button onClick={()=>handleOrderDetails(order)} className="w-full px-4 py-2 text-left hover:bg-gray-100">
                          Order Details
                        </button>
                        <button
                          disabled={order.isCancelDisabled}
                          className={`w-full px-4 py-2 text-left ${order.isCancelDisabled
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-500 hover:bg-gray-100"
                            }`}
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      {orders.length > 0 && (
        <div className="flex items-center justify-between mt-6 text-sm">
          <p>
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, orders.length)} of{" "}
            {orders.length}
          </p>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 rounded-full ${currentPage === i + 1
                    ? "btn-gradient text-white"
                    : "border border-primary"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
