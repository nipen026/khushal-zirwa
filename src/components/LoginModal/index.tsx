"use client";

import { useState, useEffect, ChangeEvent, use } from "react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../../lib/supabaseClient";
import { FiEye, FiEyeOff, FiMail, FiPhone } from "react-icons/fi";
import toast from "react-hot-toast";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  setIsSignUp: (value: boolean) => void;
  setIsForgot: (value: boolean) => void;
}

export default function LoginModal({
  open,
  onClose,
  setIsSignUp,
  setIsForgot,
}: LoginModalProps) {
  const [show, setShow] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [phonePassword, setPhonepassword] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("sb-mnmxzqmggixijpoeetje-auth-token");
    if (token) {
      const parsedToken = JSON.parse(token);
      localStorage.setItem("auth-token", JSON.stringify(parsedToken?.access_token) || "");
    }
  }, []);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (open) {
      timeout = setTimeout(() => setShow(true), 10);
    } else {
      setTimeout(() => setShow(false), 0);
    }
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    const getUser = async () => {
      const { error, data } = await supabase.auth.getUser();
      console.log(data);

      localStorage.setItem("user", JSON.stringify(data?.user) || "");
    };
    getUser();
  }, []);
  // ---------------------------
  // Email Login
  // ---------------------------
  const handleLogin = async (): Promise<void> => {
    setErrMsg("");

    if (!email.trim()) return setErrMsg("Email is required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErrMsg("Invalid email.");
    if (!password) return setErrMsg("Password is required.");

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    setLoading(false);

    if (error) {
      toast.error(error.message);
      setErrors(error.message);
      return;
    }

    toast.success("Login successful!");

    if (data?.session) {
      localStorage.setItem("auth-token", data.session.access_token);
    }

    if (data?.user) {
      localStorage.setItem("userId", data.user.id);
    }

    onClose();
  };

  // ---------------------------
  // Phone Login
  // ---------------------------
  const handlePhoneLogin = async (): Promise<void> => {
    setErrMsg("");

    if (!phone.trim()) return setErrMsg("Phone Number is required.");
    if (!password) return setErrMsg("Password is required.");

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      phone: `+91${phone}`,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      setErrors(error.message);
      return;
    }

    toast.success("Login successful!");

    if (data?.session) {
      localStorage.setItem("auth-token", data.session.access_token);
    }

    if (data?.user) {
      localStorage.setItem("userId", data.user.id);
    }

    onClose();
  };

  // ---------------------------
  // Google OAuth
  // ---------------------------
  const loginWithGoogle = async (): Promise<void> => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setErrMsg("Google login failed. Try again.");
    }
  };

  return (
    <>
      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4
          bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${show ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`relative bg-white z-60 w-full max-w-md p-8 rounded-2xl shadow-lg border
            transition-all duration-300
            ${
              show
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-75 translate-y-5 opacity-0"
            }`}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-center text-3xl font-semibold text-black">
              Login
            </h2>

            <p className="text-center text-gray-500 text-sm mb-6">
              Login to continue to our website
            </p>

            {/* Tabs */}
            <div className="grid grid-cols-2 mb-6 gap-10 pb-2">
              <button
                onClick={() => setActiveTab("email")}
                className={`flex justify-center items-center gap-2 pb-2 ${
                  activeTab === "email"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500"
                }`}
              >
                <FiMail size={18} /> Email
              </button>

              <button
                onClick={() => setActiveTab("phone")}
                className={`flex items-center justify-center gap-2 pb-2 ${
                  activeTab === "phone"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500"
                }`}
              >
                <FiPhone size={18} /> Phone
              </button>
            </div>

            {/* EMAIL TAB */}
            {activeTab === "email" && (
              <div>
                {errors && (
                  <p className="text-red-600 text-sm mb-3 text-center">
                    {errors}
                  </p>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-black mb-1">
                    Email *
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 outline-none"
                  />
                </div>

                {/* Password */}
                <div className="mb-5 relative">
                  <label className="block text-sm font-semibold text-black mb-1">
                    Password *
                  </label>

                  <input
                    type={showConfirmPass ? "text" : "password"}
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter password"
                    className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 outline-none"
                  />

                  <span
                    className="absolute right-4 top-10 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>

                {errMsg && (
                  <p className="text-red-600 text-sm mb-3 text-center">
                    {errMsg}
                  </p>
                )}

                {/* Forgot */}
                <div
                  className="text-right hover:underline text-sm text-[#C41E3A] font-medium mb-4 cursor-pointer"
                  onClick={() => {
                    onClose();
                    setIsForgot(true);
                  }}
                >
                  Forgot Password?
                </div>

                {/* Login */}
                <div className="flex justify-center">
                  <button
                    disabled={loading}
                    onClick={handleLogin}
                    className="w-full max-w-[264px] bg-[#C41E3A] hover:bg-red-700 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                  >
                    {loading && (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}

                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                {/* Signup */}
                <div className="text-center text-black mb-3 mt-3">
                  Don&apos;t have an account?{" "}
                  <span
                    className="text-[#C41E3A] hover:underline cursor-pointer"
                    onClick={() => {
                      setIsSignUp(true);
                      onClose();
                    }}
                  >
                    Sign up
                  </span>
                </div>

                {/* Social */}
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={loginWithGoogle}
                    className="rounded-full hover:bg-gray-100 p-1"
                  >
                    <FcGoogle size={40} />
                  </button>
                </div>
              </div>
            )}

            {/* PHONE TAB */}
            {activeTab === "phone" && (
              <div>
                {errors && (
                  <p className="text-red-600 text-sm mb-3 text-center">
                    {errors}
                  </p>
                )}

                <div className="mb-4">
                  <label className="font-semibold text-black text-sm">
                    Mobile No *
                  </label>

                  <input
                    type="text"
                    className="w-full text-black mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:border-red-500 outline-none"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPhone(e.target.value)
                    }
                  />
                </div>

                {/* Password */}
                <div className="mb-5 relative">
                  <label className="block text-sm font-semibold text-black mb-1">
                    Password *
                  </label>

                  <input
                    type={phonePassword ? "text" : "password"}
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter password"
                    className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 outline-none"
                  />

                  <span
                    className="absolute right-4 top-10 cursor-pointer text-gray-500"
                    onClick={() => setPhonepassword(!phonePassword)}
                  >
                    {phonePassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>

                {errMsg && (
                  <p className="text-red-600 text-sm mb-3 text-center">
                    {errMsg}
                  </p>
                )}

                {/* Forgot */}
                <div
                  className="text-right hover:underline text-sm text-[#C41E3A] font-medium mb-4 cursor-pointer"
                  onClick={() => {
                    onClose();
                    setIsForgot(true);
                  }}
                >
                  Forgot Password?
                </div>

                {/* Login */}
                <div className="flex justify-center">
                  <button
                    disabled={loading}
                    onClick={handlePhoneLogin}
                    className="w-full max-w-[264px] bg-[#C41E3A] hover:bg-red-700 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                  >
                    {loading && (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}

                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                {/* Signup */}
                <div className="text-center text-black mb-3 mt-3">
                  Don&apos;t have an account?{" "}
                  <span
                    className="text-[#C41E3A] hover:underline cursor-pointer"
                    onClick={() => {
                      setIsSignUp(true);
                      onClose();
                    }}
                  >
                    Sign up
                  </span>
                </div>

                {/* Social */}
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={loginWithGoogle}
                    className="rounded-full hover:bg-gray-100 p-1"
                  >
                    <FcGoogle size={40} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
