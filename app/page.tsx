
"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/StatsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AnimalQualitySection from "@/components/home/AnimalQualitySection";
import FullTransparencySection from "@/components/home/FullTransparencySection";
import CelebrationSection from "@/components/home/CelebrationSection";
import PackagesSection from "@/components/home/PackagesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import DownloadAppSection from "@/components/home/DownloadAppSection";
import OrderPanel from "@/components/order/OrderPanel";
import AnimalQualitySectionUk from "@/components/AnimalQualitySectionUk";
import Image from "next/image";
import QurbaniFormModal from "@/components/QurbaniFormModal";

export default function HomePage() {
  const [showOrder, setShowOrder] = useState(false);
  const [region, setRegion] = useState<"in" | "uk" | "other">("other");
  function getRegion(): "in" | "uk" | "other" {
    if (typeof window === "undefined") return "other";
    const hostname = window.location.hostname;
    if (hostname.endsWith(".in")) return "in";
    if (hostname.endsWith(".uk") || hostname.endsWith(".co.uk")) return "uk";
    return "other";
  }
  useEffect(() => {
    setRegion(getRegion());
  }, []);
  return (
    <>

      <HeroSection onBookNow={() => setShowOrder(true)} />
      <TrustSection />
      <HowItWorksSection />
      <AnimalQualitySection />
      <AnimalQualitySectionUk />
      <QurbaniFormModal />
      {region === "uk" && (
        <div>
          <Image src={'/images/banner_2.png'} alt="Banner 2" width={530} className="w-full h-auto object-cover  " height={200} />
        </div>
      )}
      <FullTransparencySection onBookNow={() => setShowOrder(true)} />
      <CelebrationSection onBookNow={() => setShowOrder(true)} />
      <PackagesSection />
      <TestimonialsSection />
      <DownloadAppSection />
      <OrderPanel isOpen={showOrder} onClose={() => setShowOrder(false)} />
    </>
  );
}

