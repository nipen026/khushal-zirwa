export default function AnimalQualitySectionUk() {
  const points = [
    {
      title: "Healthy, Disease-Free Sheep",
      desc: "Animals are carefully selected and examined to ensure they are healthy and suitable for Qurbani.",
    },
    {
      title: "Proper age and weight compliance",
      desc: "Every animal meets the required Islamic criteria for age and physical condition.",
    },
    {
      title: "Ethically raised in clean farm environments",
      desc: "Sheep are raised in hygienic, well-maintained farms with proper care and nutrition.",
    },
    {
      title: "No Mixed or Bulk Slaughter Practices",
      desc: "Each Qurbani is handled individually with proper intention (Niyyah) and respect.",
    },
  ];
  function TickIcon() {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="tickGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4B55" />
            <stop offset="100%" stopColor="#BA3139" />
          </linearGradient>
        </defs>

        <path
          d="M16 2.5l2.9 2.6 3.8-.9 1.4 3.6 3.6 1.4-.9 3.8 2.6 2.9-2.6 2.9.9 3.8-3.6 1.4-1.4 3.6-3.8-.9L16 29.5l-2.9-2.6-3.8.9-1.4-3.6-3.6-1.4.9-3.8L2.5 16l2.6-2.9-.9-3.8 3.6-1.4 1.4-3.6 3.8.9L16 2.5z"
          fill="url(#tickGrad)"
        />

        <circle cx="16" cy="16" r="6" fill="white" opacity="0.25" />

        <path
          d="M11 16.5l3.5 3.5 6.5-7"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <section className="w-full bg-[#f4f4f4] py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#7a1d1d] mb-4">
            Animal Quality & Farm Transparency
          </h2>

          <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
            We follow strict standards to ensure every Qurbani is performed with integrity,
            ethical care, and full compliance with Islamic guidelines.
          </p>

          <div className="space-y-5">
            {points.map((item, index) => (
              <div key={index} className="flex items-start gap-3">

                {/* Icon */}
                <TickIcon />

                {/* Text */}
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <p className="mt-6 text-xs md:text-sm font-semibold text-red-700 uppercase tracking-wide">
            WE ACCEPT DOMESTIC AND INTERNATIONAL PAYMENTS
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full flex justify-center md:justify-end">
          <video
            src="/images/sheep_farm.mp4" // your video path
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-md h-[320px] md:h-[360px] object-cover rounded-2xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}