"use client";

import Image from "next/image";
import { useState } from "react";
import FAQAccordion from "@/components/faq/FAQAccordion";
import DownloadAppSection from "@/components/home/DownloadAppSection";
import Navbar from "@/components/layout/Navbar";

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<"domestic" | "international">("domestic");

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff" }}>
        <Navbar />
      </div>

      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1392px] px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-5xl text-center">
          <h1 className="text-4xl font-semibold text-black sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-base text-[#4a5568] sm:text-lg">
            Find answers to the most popular questions about Zirwa Foods here.
            If you are facing any issue using the app, contact us at
            {" "}
            <a className="font-medium text-[#82131b]" href="mailto:mdkaleem@zirwafoods.com">
              mdkaleem@zirwafoods.com
            </a>
            {" "}
            or via our support channels. We are here to help you 24/7.
          </p>
        </header>

          <FAQAccordion onTabChange={setActiveTab} />
        </section>

        <section className="mx-auto w-full max-w-[1100px] px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-[#82131b] sm:text-4xl">
              Our Certifications &amp; Compliance
            </h2>
            <p className="mt-3 text-sm text-[#585858] sm:text-base">
              Recognized and certified to uphold the highest standards of Shariah
              compliance, hygiene, and operational excellence.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl rounded-2xl border border-[#e8d7d7] bg-white p-3 shadow-[0_10px_28px_rgba(118,23,31,0.12)] sm:p-5">
            {/* Left arrow */}
            <button
              type="button"
              aria-label="Previous certificate"
              onClick={() => setActiveTab(activeTab === "domestic" ? "international" : "domestic")}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur transition hover:bg-white sm:left-4 sm:h-12 sm:w-12"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#82131b" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <Image
              src={activeTab === "domestic" ? "/images/faq1.png" : "/images/faq2.png"}
              alt={activeTab === "domestic" ? "Domestic certification" : "International certification"}
              width={1600}
              height={900}
              className="h-auto w-full rounded-xl"
              priority
            />

            {/* Right arrow */}
            <button
              type="button"
              aria-label="Next certificate"
              onClick={() => setActiveTab(activeTab === "domestic" ? "international" : "domestic")}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur transition hover:bg-white sm:right-4 sm:h-12 sm:w-12"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#82131b" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="mt-3 flex justify-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full transition ${activeTab === "domestic" ? "bg-[#82131b]" : "bg-[#e8d7d7]"}`} />
              <span className={`h-2.5 w-2.5 rounded-full transition ${activeTab === "international" ? "bg-[#82131b]" : "bg-[#e8d7d7]"}`} />
            </div>
          </div>
        </section>

        <DownloadAppSection />
      </main>
    </>
  );
}
