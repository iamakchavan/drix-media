import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    image: "https://framerusercontent.com/images/RuuVHScXn21DshuJ5CzY9yFPrU.jpg?width=645&height=908",
    quote: "DRIX MEDIA helps companies create visually stunning and strategically sound digital experiences that captivate audiences.",
    sub: "From concept to launch, we craft digital solutions that not only look exceptional but also drive results, building connections that last.",
    name: "Annie Bassett",
    role: "Project Manager & Founder",
  },
  {
    image: "https://framerusercontent.com/images/aWcD3Iz6LWFQERknQy3rwYGQBI.jpg?width=645&height=908",
    quote: "They helped us shape our brand identity from scratch, giving us a website that perfectly reflects our values and vision.",
    sub: "The team's attention to detail and strategic thinking elevated our brand beyond what we thought was possible.",
    name: "Anna Karenina",
    role: "Owner, Clothing E-commerce",
  },
  {
    image: "https://framerusercontent.com/images/LXqiw60wOK1vHnGm0uYyST90q5A.jpg?width=645&height=908",
    quote: "Working with Drix was a game-changer. Our sales increased by 30% in the first month after the rebrand launched.",
    sub: "Every creative decision was tied to a business goal. That's rare, and it's exactly what we needed.",
    name: "Sarah Morgan",
    role: "Founder, Tech Startup",
  },
];

const DURATION = 5000;

const QuoteSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => go((current + 1) % testimonials.length, 1), [current, go]);
  const prev = useCallback(() => go((current - 1 + testimonials.length) % testimonials.length, -1), [current, go]);

  // Auto-advance + progress bar
  useEffect(() => {
    if (paused) return;
    const interval = 50;
    const step = (interval / DURATION) * 100;
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { next(); return 0; }
        return p + step;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = testimonials[current];

  const imgVariants = {
    enter: (d: number) => ({ clipPath: d > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)', scale: 1.08 }),
    center: { clipPath: 'inset(0 0% 0 0)', scale: 1, transition: { clipPath: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }, scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } },
    exit: (d: number) => ({ clipPath: d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', scale: 0.96, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 40, filter: 'blur(8px)' },
    center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 } },
    exit: { opacity: 0, y: -20, filter: 'blur(4px)', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  };

  const subVariants = {
    enter: { opacity: 0, y: 24 },
    center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <section
      className="w-full bg-white overflow-hidden selection:bg-black selection:text-[#AFFF00]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Mobile: side-by-side compact row. Desktop: full split */}
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:min-h-[680px]">

        {/* ── IMAGE ── */}
        {/* Mobile: tight viewport height. Desktop: tall left column */}
        <div className="relative w-full h-[38svh] md:h-auto md:w-[42%] overflow-hidden bg-black shrink-0">
          <AnimatePresence custom={direction} mode="sync">
            <motion.div
              key={current}
              custom={direction}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover object-[center_20%] grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Counter */}
          <div className="absolute bottom-5 left-6 z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-[11px] font-mono tracking-[0.4em] text-white font-bold opacity-90 drop-shadow-sm">
                {String(current + 1).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-[11px] font-mono tracking-[0.4em] text-white/40">/</span>
              <span className="text-[10px] md:text-[11px] font-mono tracking-[0.4em] text-white/60">
                {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="relative flex flex-col w-full md:w-[58%] px-6 md:px-14 lg:px-20 pt-6 pb-6 md:py-14 bg-white">

          {/* Label */}
          <div className="flex items-center gap-3 mb-5 md:mb-10">
            <div className="w-1.5 h-1.5 bg-black shrink-0" />
            <span className="text-[9px] md:text-[10px] font-mono tracking-[0.35em] uppercase text-black/40">Client Testimonials</span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          {/* Quote mark */}
          <div className="mb-3 md:mb-5 text-black/10">
            <svg width="32" height="24" viewBox="0 0 48 36" fill="currentColor">
              <path d="M0 36V22.5C0 10.5 6 3 18 0l3 4.5C14.5 6.5 11 11 10.5 18H18V36H0ZM30 36V22.5C30 10.5 36 3 48 0l3 4.5C44.5 6.5 41 11 40.5 18H48V36H30Z"/>
            </svg>
          </div>

          {/* Quote */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.p
                key={`quote-${current}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] mona-sans-condensed-medium leading-[1.25] text-black tracking-tight mb-4 md:mb-7"
              >
                {t.quote}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                variants={subVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-[13px] md:text-sm text-black/50 leading-relaxed max-w-lg poppins-regular mb-6 md:mb-8"
              >
                {t.sub}
              </motion.p>
            </AnimatePresence>

            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${current}`}
                variants={subVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col border-t border-black/10 pt-5 md:pt-6"
              >
                <div className="flex flex-col">
                  <span className="text-black font-bold text-[15px] md:text-base tracking-tight poppins-regular leading-tight">{t.name}</span>
                  <span className="text-black/40 text-[11px] md:text-xs poppins-regular mt-1">{t.role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5 md:mt-10 pt-4 md:pt-6 border-t border-black/10">
            {/* Progress bars */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className="relative h-[3px] overflow-hidden cursor-pointer transition-all duration-300"
                  style={{ width: i === current ? 32 : 12, background: 'rgba(0,0,0,0.12)' }}
                >
                  {i === current && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-black"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              {[{ fn: prev, rotate: true }, { fn: next, rotate: false }].map(({ fn, rotate }, bi) => {
                const navClipStyle = {
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)"
                };
                
                return (
                  <button
                    key={bi}
                    onClick={fn}
                    className="group relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 transition-colors duration-300"
                  >
                    {/* Outer Border */}
                    <div 
                      className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black" 
                      style={navClipStyle} 
                    />
                    
                    {/* Inner Mask (1px Border effect) */}
                    <div 
                      className="absolute inset-[1px] bg-white transition-colors duration-300 group-hover:bg-black" 
                      style={navClipStyle} 
                    />

                    {/* Content */}
                    <svg
                      className={`relative z-10 w-3.5 h-3.5 md:w-4 md:h-4 text-black group-hover:text-white transition-colors duration-300 ${rotate ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
