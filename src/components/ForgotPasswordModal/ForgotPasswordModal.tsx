"use client";
import { useEffect, useState } from "react";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onContinue?: () => void;
  setIsLogin: (value: boolean) => void;
  setIsLast: (value: boolean) => void;
}

export default function ForgotPasswordModal({
  open,
  onClose,
  onContinue,
  setIsLogin,
  setIsLast,
}: ForgotPasswordModalProps) {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (open) {
      timeout = setTimeout(() => setShow(true), 20);
    } else {
      setTimeout(() => setShow(false), 0);
    }
    return () => clearTimeout(timeout);
  }, [open]);

  const handleContinue = () => {
    onClose();
    setIsLast(true);

    if (onContinue) {
      onContinue();
    }
  };

  return (
    <>
      {open && (
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50
          transition-opacity duration-300 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border
            shadow-[0_0_40px_4px_rgba(255,0,0,0.18)] relative transform transition-all duration-300
            ${
              show
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-75 translate-y-5 opacity-0"
            }`}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            {/* Heading */}
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              Forgot password?
            </h2>

            {/* Email */}
            <label className="block text-sm text-black font-medium mt-6 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 outline-none"
            />

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 mt-5 rounded-full"
            >
              Continue
            </button>

            {/* Back */}
            <button
              onClick={() => {
                onClose();
                setIsLogin(true);
              }}
              className="w-full text-red-600 font-medium text-sm mt-3 hover:underline"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}