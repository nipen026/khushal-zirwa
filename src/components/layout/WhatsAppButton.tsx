import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-50"
      style={{
        width: "50px",
        height: "50px",
        bottom: "30px",
        right: "40px",
      }}
    >
      <Image
        src="/images/Whatsapp.png"
        alt="Chat on WhatsApp"
        width={100}
        height={100}
        style={{ objectFit: "contain" }}
      />
    </a>
  );
}
