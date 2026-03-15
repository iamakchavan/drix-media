import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
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
      <div className="w-full bg-[#AFFF00] py-16 md:py-20">
        
        {/* Title */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
          className="text-center text-[11px] md:text-[12px] poppins-bold tracking-[0.25em] uppercase text-black/70 mb-12 md:mb-14 px-6"
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
          <div className="flex w-full">
            <div className="flex animate-marquee min-w-full shrink-0 items-center">
              {logos.map((src, i) => (
                <div key={i} className="flex-shrink-0 flex items-center justify-center px-8 md:px-12 lg:px-14">
                  <img 
                    src={src} 
                    alt="Partner Logo" 
                    className="h-6 md:h-7 w-auto object-contain brightness-0 opacity-40 hover:opacity-65 transition-opacity duration-500" 
                  />
                </div>
              ))}
            </div>
            <div className="flex animate-marquee min-w-full shrink-0 items-center">
              {logos.map((src, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 flex items-center justify-center px-8 md:px-12 lg:px-14">
                  <img 
                    src={src} 
                    alt="Partner Logo" 
                    className="h-6 md:h-7 w-auto object-contain brightness-0 opacity-40 hover:opacity-65 transition-opacity duration-500" 
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
