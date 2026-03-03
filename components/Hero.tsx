import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import NoiseOverlay from './NoiseOverlay';

const Hero: React.FC = () => {
  return (
    // Changed from sticky to relative to remove the scroll-over effect and associated animations
    <div className="relative w-full h-screen bg-black overflow-hidden z-0">

      <div className="relative w-full h-full origin-center">
        {/* Background Image Layer */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <div data-framer-background-image-wrapper="true" style={{ position: 'absolute', borderRadius: 'inherit', inset: '0px' }}>
            <img
              decoding="auto"
              sizes="100vw"
              srcSet="https://framerusercontent.com/images/MRuoFuMbnw5FFImDwyAVxU4sYs.jpg?scale-down-to=512&width=2500&height=1500 512w,https://framerusercontent.com/images/MRuoFuMbnw5FFImDwyAVxU4sYs.jpg?scale-down-to=1024&width=2500&height=1500 1024w,https://framerusercontent.com/images/MRuoFuMbnw5FFImDwyAVxU4sYs.jpg?scale-down-to=2048&width=2500&height=1500 2048w,https://framerusercontent.com/images/MRuoFuMbnw5FFImDwyAVxU4sYs.jpg?width=2500&height=1500 2500w"
              src="https://framerusercontent.com/images/MRuoFuMbnw5FFImDwyAVxU4sYs.jpg?width=2500&height=1500"
              alt="Artistic portrait"
              style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }}
            />
          </div>
          {/* Subtle Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-black/10 z-[1]" />
        </motion.div>

        {/* Noise Texture */}
        <NoiseOverlay />

        {/* Navbar - Positioned absolutely within the sticky container */}
        <div className="absolute top-0 left-0 w-full z-20 px-6 md:px-10 py-6">
          <Navbar />
        </div>

        {/* Centered Hero Text */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 mt-16 md:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 25,
              mass: 1,
              delay: 0.2
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white text-center leading-[1.1] max-w-5xl mb-6"
          >
            We Turn Ideas Into Impact
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 25,
              mass: 1,
              delay: 0.3
            }}
            className="text-lg md:text-xl lg:text-2xl text-white/80 text-center font-medium max-w-3xl mb-10 leading-relaxed"
          >
            Drix Media is a creative agency that builds brands people remember. From strategy to execution, we handle the full journey of bringing your vision to life.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 25,
              mass: 1,
              delay: 0.4
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-8 py-4 rounded-full font-bold text-base md:text-lg transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:bg-gray-100"
            onClick={() => {
              // Smooth scroll to contact section or open contact modal
              window.location.href = 'mailto:hello@drixmedia.com';
            }}
          >
            Book a Strategy Call
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;