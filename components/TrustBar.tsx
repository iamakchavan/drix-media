import React from 'react';
import { motion } from 'framer-motion';

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

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

const TrustBar: React.FC = () => {
  return (
    <section className="w-full relative overflow-hidden selection:bg-black selection:text-[#AFFF00] poppins-regular bg-[#050505]">
      
      {/* Vertical Blind Panels — scroll-triggered reveal */}
      <div className="absolute inset-0 z-10 flex pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: i * 0.06 }}
            className="flex-1 bg-[#050505] origin-top"
          />
        ))}
      </div>

      {/* Actual Section Content */}
      <div className="w-full bg-[#AFFF00] py-14 sm:py-16 md:py-20 relative">
        
        {/* Title */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-center text-[10px] sm:text-[11px] md:text-[12px] poppins-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black/70 mb-10 sm:mb-12 md:mb-14 px-6"
        >
          Trusted by brands across India and beyond
        </motion.p>
        
        {/* Logo Marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.55 }}
          className="w-full relative"
        >
          {/* Subtle side fade for mobile for more premium adaptive feel */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#AFFF00] to-transparent z-10 md:hidden" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#AFFF00] to-transparent z-10 md:hidden" />

          <div className="flex w-full overflow-hidden">
            <div className="flex animate-marquee min-w-full shrink-0 items-center">
              {logos.map((src, i) => (
                <div key={i} className="flex-shrink-0 flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-14">
                  <img 
                    src={src} 
                    alt="Partner Logo" 
                    className="h-14 sm:h-18 md:h-24 w-auto object-contain brightness-0 opacity-40 hover:opacity-65 transition-opacity duration-500" 
                  />
                </div>
              ))}
            </div>
            <div className="flex animate-marquee min-w-full shrink-0 items-center">
              {logos.map((src, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-14">
                  <img 
                    src={src} 
                    alt="Partner Logo" 
                    className="h-14 sm:h-18 md:h-24 w-auto object-contain brightness-0 opacity-40 hover:opacity-65 transition-opacity duration-500" 
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
