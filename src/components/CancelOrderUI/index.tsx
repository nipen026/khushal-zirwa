"use client";

import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface CancelOrderUIProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelOrderUI({
  open,
  onClose,
  onConfirm,
}: CancelOrderUIProps) {
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handleConfirm = () => {
    onConfirm();
    setTimeout(() => setShowSuccessModal(true), 200);
  };

  return (
    <>
      {/* Cancel Confirmation Modal */}
      {open && (
        <div
          className={`z-[100] fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white w-[400px] rounded-2xl p-6 text-center animate-[zoomIn_.25s_ease]">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center bg-orange-100 rounded-full">
                <IoMdInformationCircleOutline
                  className="text-[200px] text-orange-500"
                  size={100}
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold">Are you sure?</h2>
            <p className="text-gray-500 mt-1">
              You want to cancel your order?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
              >
                Yes, Cancel It!
              </button>

              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
            showSuccessModal ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white w-[400px] rounded-2xl p-6 text-center animate-[zoomIn_.25s_ease]">
            <div className="flex justify-center mb-4">
              <div className="w-28 h-28 flex items-center justify-center bg-green-100 rounded-full">
                <span className="text-green-600 text-5xl font-bold">✓</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold">Order Cancelled</h2>
            <p className="text-gray-500 mt-1">
              Your order has been cancelled successfully.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}