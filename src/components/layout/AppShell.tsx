"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname === "/order";

  return (
    <>
      <main>{children}</main>
      {!hideFooter ? <Footer /> : null}
    </>
  );
}