"use client";

import { useState, useEffect } from "react";
import type { User } from "@/types";

// Stub — replace with real auth (NextAuth / Supabase / custom JWT)
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: fetch session from API or cookie
    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
  };

  return { user, loading, logout };
}
