"use client";

import OrderDetail from "@/components/orders/OrderDetail";
import Link from "next/link";
import { useState } from "react";

interface Order {
  id: string;
  customerName: string;
  status: "confirmed" | "in-progress" | "delivered";
  date: string;
  amount: number;
  contactNumber: string;
}

const sampleOrders: Order[] = [
  {
    id: "#CC3112980213",
    customerName: "Robert Hiles",
    status: "delivered",
    date: "Feb 2, 2026",
    amount: 36000,
    contactNumber: "99887 7899",
  },
  {
    id: "#CC3112980214",
    customerName: "Sarah Ahmed",
    status: "in-progress",
    date: "Feb 5, 2026",
    amount: 72000,
    contactNumber: "98765 4321",
  },
  {
    id: "#CC3112980215",
    customerName: "Ahmed Hassan",
    status: "confirmed",
    date: "Feb 7, 2026",
    amount: 36000,
    contactNumber: "97654 3210",
  },
];

const statusConfig = {
  confirmed: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Confirmed" },
  "in-progress": { bg: "bg-blue-100", text: "text-blue-800", label: "In Progress" },
  delivered: { bg: "bg-green-100", text: "text-green-800", label: "Delivered" },
};

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedOrder = sampleOrders.find((o) => o.id === selectedOrderId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your Qurbani orders</p>
            </div>
            <Link
              href="/order"
              className="px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
              }}
            >
              Place New Order
            </Link>
          </div>
        </div>
      </div>

      {/* Orders Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sampleOrders.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                onClick={() => setSelectedOrderId(order.id)}
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="text-lg font-bold text-gray-900">{order.id}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusConfig[order.status].bg
                      } ${statusConfig[order.status].text}`}
                    >
                      {statusConfig[order.status].label}
                    </span>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-semibold text-gray-900">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-semibold text-gray-900">{order.contactNumber}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-semibold text-gray-900">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="font-bold text-lg text-red-600">₹{order.amount}</p>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedOrderId(order.id)}
                    className="w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors hover:opacity-80"
                    style={{
                      background: "#F7FBFF",
                      border: "2px solid #82131B",
                      color: "#82131B",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No orders yet</p>
            <Link
              href="/order"
              className="px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity inline-block"
              style={{
                background: "linear-gradient(90deg, #FF4B55 0%, #BA3139 100%)",
              }}
            >
              Place Your First Order
            </Link>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetail
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}
