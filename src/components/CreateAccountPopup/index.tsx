"use client";

import React, { useState, ChangeEvent } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

interface CreateAccountModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function CreateAccountModal({
  open,
  onClose,
}: CreateAccountModalProps) {
  // ---------------- State ----------------
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  // ---------------- Regex ----------------
  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  // ---------------- Validation ----------------
  const validateForm = (): boolean => {
    const errs: FormErrors = {};

    if (!firstName.trim()) errs.firstName = "First name is required";
    else if (!nameRegex.test(firstName))
      errs.firstName = "Only letters allowed";

    if (!lastName.trim()) errs.lastName = "Last name is required";
    else if (!nameRegex.test(lastName))
      errs.lastName = "Only letters allowed";

    if (!email.trim()) errs.email = "Email is required";
    else if (!emailRegex.test(email))
      errs.email = "Invalid email address";

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);

    if (!phone) errs.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(cleanPhone))
      errs.phone = "Invalid phone number";

    if (!password) errs.password = "Password is required";
    else if (!strongPasswordRegex.test(password))
      errs.password =
        "Use 8+ chars with uppercase, lowercase, number & special character";

    if (!confirmPassword)
      errs.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ---------------- Submit ----------------
  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("Account created! Check your mail.");

      const full_name = `${firstName} ${lastName}`;

      await supabase.auth.updateUser({
        data: {
          full_name,
          phone,
        },
      });
    }

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Create Account
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="text-gray-700">First Name</label>
            <input
              value={firstName}
              maxLength={30}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                nameRegex.test(e.target.value) &&
                setFirstName(e.target.value)
              }
              className="w-full border rounded-xl p-3"
              placeholder="Enter First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="text-gray-700">Last Name</label>
            <input
              value={lastName}
              maxLength={30}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                nameRegex.test(e.target.value) &&
                setLastName(e.target.value)
              }
              className="w-full border rounded-xl p-3"
              placeholder="Enter Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-xl p-3"
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-700">Phone</label>
            <PhoneInput
              country="in"
              value={phone}
              onChange={(value: string) => setPhone(value)}
              inputClass="!w-full !h-[48px]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full border rounded-xl p-3 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full border rounded-xl p-3 pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-4"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-8 bg-red-600 text-white rounded-full py-3 text-lg"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}