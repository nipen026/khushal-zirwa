
"use client";

import { useState } from "react";
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

export default function HomePage() {
  const [showOrder, setShowOrder] = useState(false);

  return (
    <>
      <HeroSection onBookNow={() => setShowOrder(true)} />
      <TrustSection />
      <HowItWorksSection />
      <AnimalQualitySection />
      <FullTransparencySection  onBookNow={() => setShowOrder(true)}/>
      <CelebrationSection onBookNow={() => setShowOrder(true)} />
      <PackagesSection />
      <TestimonialsSection />
      <DownloadAppSection />
      <OrderPanel isOpen={showOrder} onClose={() => setShowOrder(false)} />
    </>
  );
}

