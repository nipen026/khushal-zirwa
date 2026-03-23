"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const domesticFaqs: FAQItem[] = [
  {
    question: "How do I book my Qurbani?",
    answer:
      "You can book directly through our website or app. Mention name, choose slot, complete payment and receive confirmation instantly.",
  },
  {
    question: "Is the slaughter Shariah compliant?",
    answer:
      "Yes. Qurbani is performed strictly according to Islamic guidelines under qualified scholars. The customer's name is called before sacrifice.",
  },
  {
    question: "Will I get live streaming?",
    answer:
      "Yes. We provide live video streaming (without showing blood). Your name will be announced before Qurbani.",
  },
  {
    question: "Can I choose the animal?",
    answer:
      "No. We follow a standardized Qurbani model to ensure fairness and smooth operations.\nAll sheep are:\n• Carefully selected\n• Healthy and Shariah-compliant\n• Uniform live weight between 30–35 kg\n• Inspected before slaughter\nThis ensures every customer receives equal quality and value.",
  },
  {
    question: "What are the weight details?",
    answer:
      "Animals are categorized by live weight range between 30 to 35 kilogram live weight.",
  },
  {
    question: "What is the delivery timeline?",
    answer:
      "Meat delivery is done slot-wise on Eid day. You will receive real-time delivery updates via WhatsApp.",
  },
  {
    question: "How is the meat packed?",
    answer:
      "Hygienic cutting and packing in food-grade covers. Proper segregation (Meat in one cover and other parts in another cover).",
  },
  {
    question: "What if I face any issue?",
    answer:
      "Our support team is available on WhatsApp and call support for immediate assistance.",
  },
  {
    question: "Do you provide group Qurbani for above 4+ sheeps?",
    answer:
      "Yes, we offer as per Islamic guidelines. Booking confirmation will include details.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "UPI, Debit/Credit Card, Net Banking, options are available.",
  },
  {
    question: "How fresh is the chicken you deliver?",
    answer:
      "Unlike swipe-based apps, MingleWise focuses on genuine, offline connections. You meet people through hobbies, clubs, and activities —not random feeds or profiles.",
  },
];

const internationalFaqs: FAQItem[] = [
  {
    question: "Can I book Qurbani from outside India?",
    answer:
      "Yes, we accept international orders from UAE, US, UK, Canada, and other countries. You can book online remotely and we handle everything on the ground.",
  },
  {
    question: "In which location is the Qurbani performed?",
    answer:
      "The Qurbani is performed in India under proper Islamic guidelines, and the meat is distributed to deserving and needy people on your behalf.",
  },
  {
    question: "Will my name be called during Qurbani?",
    answer:
      "Yes, your name or the name of the person you're performing Qurbani for will be called at the time of sacrifice.",
  },
  {
    question: "Will I receive proof?",
    answer:
      "Yes, you will receive video proof of the Qurbani performance.",
  },
  {
    question: "Is the Qurbani Shariah compliant?",
    answer:
      "Yes. The Qurbani is performed strictly in accordance with Islamic guidelines, by healthy sheep with specified weight range.",
  },
  {
    question: "Can I choose the animal?",
    answer:
      "No. We follow a standardized system based on availability. This helps maintain fairness and equality for all orders.",
  },
  {
    question: "How do I make payment from abroad?",
    answer:
      "We accept international payment options (USD, GBP, CAD, AUD, etc.) depending on your country.",
  },
  {
    question: "When will Qurbani be performed?",
    answer:
      "Qurbani will be performed during the 3 days of Eid ul Adha according to Islamic guidelines.",
  },
  {
    question: "When will I receive updates/confirmation?",
    answer:
      "You will receive updates after your Qurbani is completed.",
  },
  {
    question: "Can I book multiple Qurbani slots?",
    answer:
      "Yes. You may book multiple Qurbani slots at a very accessible price.",
  },
  {
    question: "What if I need help?",
    answer:
      "Our support team is available on WhatsApp and email:\n• WhatsApp: +91 7829916082\n• Email: mdkaleem@zirwafoods.com",
  },
];

export default function FAQAccordion({
  onTabChange,
}: {
  onTabChange?: (tab: "domestic" | "international") => void;
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"domestic" | "international">("domestic");

  const faqs = activeTab === "domestic" ? domesticFaqs : internationalFaqs;

  const handleTabChange = (tab: "domestic" | "international") => {
    setActiveTab(tab);
    setOpenIndex(0);
    onTabChange?.(tab);
  };

  return (
    <section className="w-full">
      <div className="mb-9 rounded-2xl border border-red-100 bg-white p-2 shadow-[4px_1px_12px_rgba(0,0,0,0.12)]">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleTabChange("domestic")}
            className={`flex h-11 items-center justify-center rounded-[15px] px-4 text-sm font-bold uppercase tracking-wide sm:text-base ${
              activeTab === "domestic"
                ? "bg-gradient-to-r from-[#ff4b55] to-[#ba3139] text-white"
                : "border border-black/30 bg-white text-black/80"
            }`}
          >
            Domestic Orders
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("international")}
            className={`flex h-11 items-center justify-center rounded-[15px] px-4 text-sm font-bold uppercase tracking-wide sm:text-base ${
              activeTab === "international"
                ? "bg-gradient-to-r from-[#ff4b55] to-[#ba3139] text-white"
                : "border border-black/30 bg-white text-black/80"
            }`}
          >
            International Orders
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <article
              key={item.question}
              className="rounded-xl bg-[#fff2f2] px-4 py-4 sm:px-5"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="flex w-full items-start justify-between gap-4 text-left"
                aria-expanded={isOpen}
              >
                <div className="space-y-2">
                  <h3 className="font-['Lato',sans-serif] text-base font-bold text-[#1a202c] sm:text-xl">
                    {item.question}
                  </h3>
                  <p
                    className={`font-['Lato',sans-serif] text-sm text-[#1a202c] whitespace-pre-line sm:text-base ${
                      isOpen ? "block" : "hidden"
                    }`}
                  >
                    {item.answer}
                  </p>
                </div>
                <span className="mt-0.5 inline-flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-full bg-[#ed0213] text-lg font-semibold text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`}
                  >
                    <path d="M12 8l-6 6h12z" />
                  </svg>
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
