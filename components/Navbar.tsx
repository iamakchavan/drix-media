import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const ease = [0.76, 0, 0.24, 1]; // Apple-level cubic-bezier

  // Overlay panels — staggered vertical blinds
  const panelVariants: Variants = {
    closed: (i: number) => ({
      scaleY: 0,
      transition: { duration: 0.5, ease, delay: i * 0.05 }
    }),
    open: (i: number) => ({
      scaleY: 1,
      transition: { duration: 0.7, ease, delay: i * 0.06 }
    })
  };

  const contentFade: Variants = {
    closed: { opacity: 0, transition: { duration: 0.3, ease } },
    open: { opacity: 1, transition: { duration: 0.6, ease, delay: 0.4 } }
  };

  const linkVariants: Variants = {
    closed: {
      y: 80,
      opacity: 0,
      transition: { duration: 0.4, ease }
    },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease, delay: 0.35 + i * 0.06 }
    })
  };

  const infoVariants: Variants = {
    closed: { y: 30, opacity: 0, transition: { duration: 0.3, ease } },
    open: (i: number) => ({
      y: 0, opacity: 1,
      transition: { duration: 0.7, ease, delay: 0.6 + i * 0.08 }
    })
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Fixed Floating Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-[900] px-6 md:px-12 lg:px-20 flex justify-between items-center transition-all duration-500 ease-[0.76,0,0.24,1] ${
        isScrolled && !isOpen
          ? 'py-3 md:py-4 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'py-6 md:py-8 bg-transparent border-b border-transparent'
      }`}>
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl md:text-3xl mona-sans-condensed-black tracking-tighter uppercase text-white mix-blend-difference z-[60] transition-all duration-500"
        >
          DRIX MEDIA<sup className="text-xs md:text-sm align-top top-0 ml-0.5">®</sup>
        </Link>

        {/* Center Links (Desktop) */}
        <div className={`hidden md:flex items-center justify-center gap-16 lg:gap-24 absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${isOpen ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <Link to="/about" className="text-[11px] poppins-bold tracking-[0.15em] text-white mix-blend-difference hover:text-brand-lime transition-colors uppercase">
            About
          </Link>
          <Link to="/services" className="text-[11px] poppins-bold tracking-[0.15em] text-white mix-blend-difference hover:text-brand-lime transition-colors uppercase">
            Services
          </Link>
          <Link to="/blog" className="text-[11px] poppins-bold tracking-[0.15em] text-white mix-blend-difference hover:text-brand-lime transition-colors uppercase">
            Journal
          </Link>
          <Link to="/contact" className="text-[11px] poppins-bold tracking-[0.15em] text-white mix-blend-difference hover:text-brand-lime transition-colors uppercase">
            Contact
          </Link>
        </div>

        {/* Menu Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-3 group cursor-pointer mix-blend-difference z-[60] transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="flex flex-col gap-1.5 items-end pt-1">
            <span className="block w-8 h-[2px] bg-white group-hover:bg-brand-lime transition-colors duration-300"></span>
            <span className="block w-5 h-[2px] bg-white group-hover:w-8 group-hover:bg-brand-lime transition-all duration-300"></span>
          </div>
          <span className="text-3xl md:text-5xl mona-sans-condensed-black uppercase tracking-tighter text-white group-hover:text-brand-lime transition-colors duration-300 leading-none">
            Menu
          </span>
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Panels — cinematic reveal */}
            <motion.div
              className="fixed inset-0 z-[998] pointer-events-none"
              initial="closed"
              animate="open"
              exit="closed"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={panelVariants}
                  className="absolute top-0 h-full bg-[#AFFF00]"
                  style={{
                    left: `${i * 20}%`,
                    width: '20.1%',
                    transformOrigin: 'top',
                  }}
                />
              ))}
            </motion.div>

            {/* Menu Content */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={contentFade}
              className="fixed inset-0 z-[999] flex flex-col text-white poppins-regular selection:bg-[#AFFF00] selection:text-black bg-[#050505]"
            >
              <div className="flex flex-col w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-12 h-full">

                {/* Header — Logo + Close */}
                <div className="flex justify-between items-start w-full flex-none">
                  <motion.div
                    variants={contentFade}
                    className="text-xl md:text-3xl mona-sans-condensed-black tracking-tighter uppercase"
                  >
                    <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-[#AFFF00] transition-colors duration-300">
                      DRIX MEDIA<sup className="text-xs md:text-sm align-top top-0 ml-0.5">®</sup>
                    </Link>
                  </motion.div>

                  <motion.button
                    variants={contentFade}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <span className="text-xl md:text-2xl poppins-bold uppercase tracking-tight text-white/60 group-hover:text-white transition-colors duration-300">
                      Close
                    </span>
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <span className="absolute block w-6 h-[2px] bg-white/60 group-hover:bg-white transform rotate-45 transition-all duration-500 origin-center group-hover:rotate-[225deg]"></span>
                      <span className="absolute block w-6 h-[2px] bg-white/60 group-hover:bg-white transform -rotate-45 transition-all duration-500 origin-center group-hover:-rotate-[225deg]"></span>
                    </div>
                  </motion.button>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col md:flex-row flex-grow items-end justify-between pb-8 md:pb-12 pt-8 md:pt-0">

                  {/* Left — Bottom info */}
                  <div className="flex flex-col gap-8 w-full md:w-5/12 order-2 md:order-1">
                    <motion.div custom={0} variants={infoVariants} className="flex flex-col gap-1">
                      <span className="text-[10px] poppins-bold tracking-[0.25em] uppercase text-white/25 mb-2">Get in Touch</span>
                      <a href="mailto:hello@drixmedia.com" className="text-lg md:text-xl poppins-medium tracking-tight text-white/70 hover:text-[#AFFF00] transition-colors duration-300">
                        hello@drixmedia.com
                      </a>
                      <a href="tel:5108956500" className="text-base poppins-medium text-white/35 hover:text-[#AFFF00] transition-colors duration-300">
                        (510) 895-6500
                      </a>
                    </motion.div>
                    
                    <motion.div custom={1} variants={infoVariants} className="flex gap-6">
                      {['Twitter', 'Instagram', 'Dribbble'].map((s) => (
                        <a key={s} href="#" className="text-[11px] poppins-bold tracking-[0.15em] uppercase text-white/25 hover:text-[#AFFF00] transition-colors duration-300">
                          {s}
                        </a>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right — Navigation Links */}
                  <div className="flex flex-col items-end w-full md:w-7/12 order-1 md:order-2 mb-12 md:mb-0">
                    {menuItems.map((item, i) => (
                      <motion.div
                        key={item.label}
                        custom={i}
                        variants={linkVariants}
                        className="overflow-hidden"
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-baseline gap-4 py-1 md:py-1.5"
                        >
                          <span className="text-[11px] poppins-bold tracking-[0.2em] text-white/0 group-hover:text-[#AFFF00] transition-all duration-500 translate-x-4 group-hover:translate-x-0 uppercase tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] mona-sans-condensed-bold tracking-tight leading-[1.1] text-white/90 group-hover:text-[#AFFF00] transition-all duration-500 uppercase">
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                </div>

                {/* Bottom bar */}
                <motion.div
                  custom={2}
                  variants={infoVariants}
                  className="flex-none flex justify-between items-end border-t border-white/[0.06] pt-5"
                >
                  <span className="text-[10px] poppins-medium tracking-[0.15em] uppercase text-white/20">
                    © 2024 Drix Media
                  </span>
                  <span className="text-[10px] poppins-medium tracking-[0.15em] uppercase text-white/20">
                    All rights reserved
                  </span>
                </motion.div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;