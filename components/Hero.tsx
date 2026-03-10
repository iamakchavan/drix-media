import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden z-0 font-sans">
      {/* Absolute Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
          alt="Drix Media Strategic Workspace"
          className="w-full h-full object-cover opacity-40 grayscale brightness-[0.35]"
        />
        {/* Simple dark overlay for maximum contrast */}
        <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />
      </div>

      {/* Navbar Container */}
      <div className="absolute top-0 left-0 w-full z-50 px-6 md:px-10 py-8">
        <Navbar />
      </div>

      {/* Ultra Clean Centered Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-center pointer-events-auto"
        >
          <span className="text-[10px] font-black tracking-[0.4em] text-[#AFFF00] uppercase mb-10 block opacity-80 select-text">
            Creative Strategy & Execution
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-8 select-text">
            Stories, strategy, <br />
            <span className="text-[#AFFF00] italic font-medium select-text">and everything</span> in between.
          </h1>

          <p className="text-sm md:text-base text-white/40 font-medium max-w-xl mx-auto mb-12 leading-relaxed tracking-wide select-text">
            Drix Media is a creative agency that builds brands people remember. <br className="hidden md:block" />
            From strategy to execution, we handle the full journey.
          </p>

          <div className="flex flex-col items-center justify-center">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:bg-[#AFFF00] shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
              onClick={() => window.location.href = '#contact'}
            >
              Book a Strategy Call
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;