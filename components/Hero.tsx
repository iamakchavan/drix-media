import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hls from 'hls.js';
import Navbar from './Navbar';
import { PremiumAurora } from './SharedHero';

const ScrambleButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <motion.a
      href={href}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" },
        hover: { clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 16px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
      }}
      className="group relative flex items-center justify-center bg-[#AFFF00] h-[54px] px-10 transition-colors duration-500 overflow-hidden"
    >
      <motion.div
        variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-white w-full h-full"
      />

      <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
        <div className="opacity-0 pointer-events-none flex items-center gap-2 text-[13px] tracking-[0.25em] uppercase font-semibold whitespace-nowrap">
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </div>
        <motion.div
          variants={{
            initial: { y: "0%" },
            hover: { y: "-100%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 w-full h-full text-[13px] tracking-[0.25em] uppercase font-semibold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] group-hover:rotate-45 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>

        <motion.div
          variants={{
            initial: { y: "100%" },
            hover: { y: "0%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 w-full h-full text-[13px] tracking-[0.25em] uppercase font-bold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] -rotate-45 group-hover:rotate-45 transition-transform duration-500 delay-75 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
      </div>
    </motion.a>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // HLS Video Background — smooth crossfade loop
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const src = 'https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8';

    const handleTimeUpdate = () => {
      // Endless loop trimmed to 6 seconds
      if (video.currentTime >= 6) {
        video.currentTime = 0;
        video.play().catch(() => { });
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => { video.play().catch(() => { }); });
      return () => { video.removeEventListener('timeupdate', handleTimeUpdate); hls.destroy(); };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => { video.play().catch(() => { }); });
    }
    return () => { video.removeEventListener('timeupdate', handleTimeUpdate); };
  }, []);

  // Ultra-premium Apple/Framer easing (custom cubic-bezier)
  const premiumEasing = [0.16, 1, 0.3, 1];

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.8,
      filter: "blur(12px)"
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: premiumEasing }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-[100svh] bg-black overflow-hidden flex flex-col poppins-regular selection:bg-[#AFFF00] selection:text-black">

      {/* HLS Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <PremiumAurora />

      {/* Navbar is now globally fixed — removed from Hero */}

      <motion.div
        style={{ opacity: yOpacity }}
        className="relative z-10 flex-grow flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-20 w-full max-w-[120rem] mx-auto pt-[16svh] md:pt-[22vh] pb-8 md:pb-12 min-h-[100svh]"
      >
        {/* Main Content Area - Aligned to Reference Design */}
        <div className="flex-grow flex flex-col justify-center relative w-full pt-10 md:pt-16 pb-12 z-10">

          <div className="flex flex-col w-full relative z-10">
            {/* Massive Heading, Left Aligned, Clean 2-Line Structure */}
            <motion.h1
              variants={staggerVariants}
              initial="hidden"
              animate="show"
              className="text-[12vw] sm:text-[10vw] md:text-[6.5vw] lg:text-[5.75vw] xl:text-[5.5vw] leading-[1.05] md:leading-[1] mona-sans-condensed-bold text-white tracking-tighter w-full flex flex-col items-start"
            >
              <div className="flex flex-wrap items-center overflow-visible pb-1 md:pb-4 gap-x-[2vw] md:gap-x-4">
                <span className="flex">
                  {"Stories,".split('').map((char, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">{char}</motion.span>
                  ))}
                </span>
                <span className="flex text-white/50 italic font-medium">
                  {"Strategy,".split('').map((char, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">{char}</motion.span>
                  ))}
                </span>
              </div>
              <div className="flex flex-wrap items-center overflow-visible mt-0.5 md:mt-2 pb-2 md:pb-4 gap-x-[2vw] md:gap-x-4">
                <span className="flex">
                  {"And everything".split('').map((char, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                  ))}
                </span>
                <span className="flex text-[#AFFF00]">
                  {"In Between.".split('').map((char, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                  ))}
                </span>
              </div>
            </motion.h1>
          </div>

          {/* Two-Column Below Structure (Mapped from reference image) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.98, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 1.6, delay: 0.6, ease: premiumEasing }
              }
            }}
            className="w-full flex justify-start md:justify-end mt-[6vh] md:mt-12 relative"
          >
            <div className="w-full lg:w-[90%] xl:w-[85%] flex flex-col md:flex-row justify-between items-start gap-10 md:gap-8">

              {/* Left Column: Text + Button */}
              <div className="w-full md:w-[60%] lg:w-[55%] flex flex-col gap-8 md:gap-10 mt-1">
                <div className="flex items-start gap-3 md:gap-4 pr-1 md:pr-4">
                  <span className="text-white/40 text-lg md:text-xl font-light mt-0 transform translate-y-[-2px]">+</span>
                  <div className="flex flex-col gap-1 text-white/60 text-[15px] md:text-base leading-relaxed tracking-wide font-medium mt-[-2px]">
                    <span className="text-white font-semibold block sm:whitespace-nowrap">Drix Media is a creative agency that builds unforgettable brands.</span>
                    <span className="block sm:whitespace-nowrap">From strategy to execution, we handle the full technical delivery for you.</span>
                  </div>
                </div>

                <motion.div className="flex items-center ml-0 md:ml-8 mt-2 md:mt-2">
                  <ScrambleButton href="#contact" text="BOOK STRATEGY" />
                </motion.div>
              </div>

              {/* Right Column: List Group (Hidden on Mobile) */}
              <div className="hidden md:flex w-full md:w-[40%] lg:w-[45%] flex-col gap-0 text-white font-medium text-sm md:text-base md:pl-12">
                {[
                  { num: '01', text: 'Creative Strategy' },
                  { num: '02', text: 'UI/UX Design' },
                  { num: '03', text: 'Brand Identity' },
                  { num: '04', text: 'Technical Development' }
                ].map((item, i) => (
                  <div key={item.num} className="flex items-center gap-6 py-4 border-b border-white/10 group cursor-default">
                    <span className="text-white/20 italic font-mono text-xs">({item.num})</span>
                    <span className="text-white/70 group-hover:text-[#AFFF00] transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* Copyright Floating */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.9, ease: premiumEasing }}
            className="absolute bottom-4 left-0 text-white/20 text-[10px] uppercase tracking-widest font-bold hidden md:block"
          >
            Drix® Studio © {new Date().getFullYear()}
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default Hero;
