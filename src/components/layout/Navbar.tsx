"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthFlow from "@/components/auth/LoginModal";
import { usePathname } from "next/dist/client/components/navigation";
import { LuUserRound } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [token, setToken] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const pathname = usePathname();
 useEffect(() => {
        const syncAuth = () => {
            setToken(localStorage.getItem("auth-token"));
            setUser(localStorage.getItem("user"));
        };

        syncAuth();
        window.addEventListener("auth-change", syncAuth);
        return () => window.removeEventListener("auth-change", syncAuth);
    }, []);
return (
  <>
    <header className="flex items-center justify-between w-full px-4 sm:px-6 py-3 sm:py-4">
      <Link href="/" style={{ textDecoration: "none" }}>
        <Image
          src="/images/Frame 1437253701.png"
          alt="Zirwa Qurbani Service"
          width={206}
          height={100}
          priority
          className="w-[140px] sm:w-[180px] md:w-[206px] h-auto block"
        />
      </Link>

      {/* <button
          onClick={() => setLoginOpen(true)}
          className="inline-flex items-center rounded-full border-none cursor-pointer"
          style={{
            background: "#ED0213",
            padding: "3px 4px 3px 12px",
            gap: "10px",
            height: "44px",
          }}
        >
          <span
            className="text-white whitespace-nowrap"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "13px",
              fontWeight: 510,
              lineHeight: "16px",
            }}
          >
            Login
          </span>
          <span
            className="flex items-center justify-center rounded-full flex-shrink-0 bg-white"
            style={{ width: "36px", height: "36px" }}
          >
            <svg width="15" height="15" viewBox="0 0 17 17" fill="none" aria-hidden="true">
              <path
                d="M3.5 13.5L13.5 3.5M13.5 3.5H6.5M13.5 3.5V10.5"
                stroke="#ED0213"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button> */}
      {token ? (
        <Link
          href="/profile"
          className={`flex ${pathname === "/profile" ? "text-primary  font-medium" : "text-red-500 bg-white p-2 px-3 rounded-full"} items-center gap-3 text-lg no-underline`}
        >
          <LuUserRound className="text-xl" />
          <span>Profile</span>
        </Link>
      ) : (

        <button
          className="flex  items-center justify-between gap-2 bg-red-600 text-white ps-4 pe-1 py-1 rounded-full font-medium"
          onClick={() => setLoginOpen(true)}
        >
          Login
          <span className="bg-white text-red-600 rounded-full p-2 text-sm">
            <FaArrowRight />
          </span>
        </button>
      )}
    </header>

    <AuthFlow loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
  </>
);
}
