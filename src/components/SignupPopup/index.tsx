"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// Icons
import { FiMail, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

// Phone Input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Toast
import { toast } from "react-hot-toast";

interface SignupPopupProps {
  open: boolean;
  onClose: () => void;
  setIsOtp: (val: boolean) => void;
  setPhoneNumber: (phone: string) => void;
  setIsLast: (val: boolean) => void;
}

interface FormErrors {
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  api?: string;
}

export default function SignupPopup({
  open,
  onClose,
  setIsOtp,
  setPhoneNumber,
  setIsLast,
}: SignupPopupProps) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const handleReset = () => {
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (open) {
      timeout = setTimeout(() => setShowPopup(true), 20);
    } else {
      setTimeout(() => {
        setShowPopup(false);
        handleReset();
      }, 0);
    }
    return () => clearTimeout(timeout);
  }, [open]);

  const validateEmailForm = (): boolean => {
    const errs: FormErrors = {};

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errs.email = "Invalid email address";
    }

    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    } else if (!strongPasswordRegex.test(password)) {
      errs.password =
        "Use uppercase, lowercase, number & special character";
    }

    if (!confirmPassword) {
      errs.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePhoneForm = (): boolean => {
    const errs: FormErrors = {};

    const clean = phone.replace(/\D/g, "");
    const last10 = clean.slice(-10);

    if (!phone) errs.phone = "Phone number required";
    else if (!/^[6-9]\d{9}$/.test(last10)) errs.phone = "Invalid phone number";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const preventCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast.error("Copy / Paste is not allowed for security reasons");
  };

  // EMAIL SIGNUP
  const handleEmailSignup = async () => {
    if (!validateEmailForm()) return;

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created! Check your mail.");
    setIsLast(true);

    onClose();
    handleReset();
  };

  // PHONE OTP
  const handleSendOtp = async () => {
    if (!validatePhoneForm()) return;

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      phone: `+${phone}`,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("OTP sent successfully!");

    setPhoneNumber(phone);
    setIsOtp(true);

    onClose();
    handleReset();
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <>
      {open && (
        <div
          className={`fixed z-[999] inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300
          ${showPopup ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`relative bg-white w-full max-w-md mx-4 p-8 rounded-3xl shadow-lg transition-all duration-300 transform
            ${showPopup ? "scale-100" : "scale-90"}`}
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-center text-3xl font-semibold text-black">
              Sign Up
            </h2>

            <p className="text-center text-gray-500 text-sm mb-6">
              Sign up to continue to our website
            </p>

            {/* TABS */}
            <div className="grid grid-cols-2 mb-6 gap-10 pb-2">
              <button
                onClick={() => setActiveTab("email")}
                className={`flex justify-center items-center gap-2 pb-2
            ${activeTab === "email"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500"
                  }`}
              >
                <FiMail size={18} /> Email
              </button>

              <button
                onClick={() => setActiveTab("phone")}
                className={`flex items-center justify-center gap-2 pb-2
            ${activeTab === "phone"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500"
                  }`}
              >
                <FiPhone size={18} /> Phone
              </button>
            </div>

            {/* EMAIL FORM */}
            {activeTab === "email" && (
              <>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full border border-gray-300 text-black px-4 py-3 rounded-xl mb-2 focus:border-red-500 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}

                <div className="relative mt-3">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full border border-gray-300 text-black px-4 py-3 rounded-xl focus:border-red-500 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-4 cursor-pointer text-gray-500"
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}

                <div className="relative mt-3">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 text-black px-4 py-3 rounded-xl focus:border-red-500 outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onPaste={preventCopyPaste}
                  />

                  <span
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-4 top-4 cursor-pointer text-gray-500"
                  >
                    {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}

                <button
                  onClick={handleEmailSignup}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full mt-5 font-semibold transition-colors"
                >
                  {loading ? "Creating..." : "Sign Up"}
                </button>
              </>
            )}

            {/* PHONE FORM */}
            {activeTab === "phone" && (
              <>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={(value: string) => setPhone(value)}
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}

                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full mt-5 font-semibold transition-colors"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}

            {/* GOOGLE */}
            <div className="flex justify-center mt-5">
              <button onClick={loginWithGoogle} className="rounded-full hover:bg-gray-100 p-1">
                <FcGoogle size={40} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
