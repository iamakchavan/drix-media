import React from 'react';

const logos = [
  "/assets/logos/Logo-1.webp",
  "/assets/logos/Logo-2.webp",
  "/assets/logos/Logo-3.webp",
  "/assets/logos/Logo-4.webp",
  "/assets/logos/Logo-5.webp",
  "/assets/logos/Logo-6.webp",
  "/assets/logos/Logo-7.webp",
  "/assets/logos/Logo-8.webp",
  "/assets/logos/Logo-9.webp",
  "/assets/logos/Logo-10.webp",
];

const PartnersSection: React.FC = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="flex w-full">
        <div className="flex animate-marquee min-w-full shrink-0 items-center">
          {logos.map((src, i) => (
            <div key={i} className="w-[290px] h-[140px] flex-shrink-0 border-l border-t border-b border-[#E0E0E0] bg-white flex items-center justify-center">
              <div className="relative w-[120px] h-[60px] flex items-center justify-center">
                <img src={src} alt="Partner Logo" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex animate-marquee min-w-full shrink-0 items-center">
          {logos.map((src, i) => (
            <div key={`dup-${i}`} className="w-[290px] h-[140px] flex-shrink-0 border-l border-t border-b border-[#E0E0E0] bg-white flex items-center justify-center">
              <div className="relative w-[120px] h-[60px] flex items-center justify-center">
                <img src={src} alt="Partner Logo" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;