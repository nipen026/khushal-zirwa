import Image from "next/image";

export default function TrustSection() {
  return (
    <section className="bg-white px-4 py-10 sm:px-8 md:px-16 lg:px-[88px] md:py-[60px]">
      <div style={{ maxWidth: "1336px", margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <Image
          src="/images/Frame 1437253421.png"
          alt="100% Shariah, Hygienic, Doorstep delivery"
          width={1336}
          height={200}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
    </section>
  );
}
