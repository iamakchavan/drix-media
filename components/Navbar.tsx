import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
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

  const ease = [0.76, 0, 0.24, 1];
  const smoothEase = [0.16, 1, 0.3, 1];

  const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Journal', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Journal', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  // Overlay panels — staggered vertical blinds
  const panelVariants: Variants = {
    closed: (i: number) => ({
      scaleY: 0,
      transition: { duration: 0.5, ease, delay: i * 0.04 }
    }),
    open: (i: number) => ({
      scaleY: 1,
      transition: { duration: 0.6, ease, delay: i * 0.05 }
    })
  };

  const contentFade: Variants = {
    closed: { opacity: 0, transition: { duration: 0.25, ease } },
    open: { opacity: 1, transition: { duration: 0.5, ease, delay: 0.35 } }
  };

  const linkVariants: Variants = {
    closed: {
      y: 100,
      rotateX: -25,
      opacity: 0,
      transition: { duration: 0.4, ease }
    },
    open: (i: number) => ({
      y: 0,
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: smoothEase, delay: 0.3 + i * 0.05 }
    })
  };

  const infoVariants: Variants = {
    closed: { y: 20, opacity: 0, transition: { duration: 0.3, ease } },
    open: (i: number) => ({
      y: 0, opacity: 1,
      transition: { duration: 0.7, ease: smoothEase, delay: 0.55 + i * 0.08 }
    })
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ━━━ TOP BAR ━━━ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-[900] pointer-events-none flex justify-center"
      >
        <div 
           className={`pointer-events-auto flex justify-between items-center transition-all duration-[600ms] ease-[cubic-bezier(0.16, 1, 0.3, 1)] will-change-transform ${
             isScrolled && !isOpen
               ? 'w-[calc(100%-2rem)] md:w-[85%] lg:w-[80vw] max-w-[1200px] h-[65px] md:h-[75px] bg-[#050505]/95 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] rounded-[20px] md:rounded-full px-5 md:px-10 mt-3 md:mt-4'
               : 'w-full max-w-none h-[90px] bg-transparent border-transparent rounded-none px-6 md:px-12 lg:px-20 mt-0'
           }`}
        >
            {/* ── Logo ── */}
            <Link 
              to="/" 
              className={`text-xl md:text-3xl mona-sans-condensed-black tracking-tighter uppercase z-[60] transition-colors duration-400 ${
                  isScrolled && !isOpen ? 'text-white' : 'text-white mix-blend-difference'
              }`}
            >
              DRIX MEDIA<sup className="text-xs md:text-sm align-top top-0 ml-0.5">®</sup>
            </Link>

            {/* ── Center Links (Desktop) ── */}
            <div className={`hidden md:flex items-center justify-center gap-10 lg:gap-16 absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                isOpen ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}>
              {navLinks.map((link) => {
                const isItemActive = isActive(link.path);
                // Smart color logic depending on scrolling state vs active vs blending
                let linkStyle = "";
                if (isScrolled && !isOpen) {
                    linkStyle = isItemActive ? 'text-[#AFFF00]' : 'text-white/70 hover:text-white';
                } else {
                    linkStyle = isItemActive ? 'text-[#AFFF00] mix-blend-difference' : 'text-white mix-blend-difference hover:text-[#AFFF00]';
                }

                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`text-[11px] poppins-semibold tracking-[0.15em] transition-colors uppercase ${linkStyle}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* ── Menu Trigger ── */}
            <button
              onClick={() => setIsOpen(true)}
              className={`flex items-center gap-2 md:gap-3 group cursor-pointer z-[60] transition-all duration-500 ${
                  isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              } ${isScrolled && !isOpen ? 'text-white' : 'text-white mix-blend-difference'}`}
            >
              <div className="flex flex-col gap-1 md:gap-1.5 items-end pt-0.5 md:pt-1">
                <span className={`block w-6 md:w-8 h-[2px] transition-colors duration-300 ${isScrolled && !isOpen ? 'bg-white group-hover:bg-[#AFFF00]' : 'bg-white mix-blend-difference group-hover:bg-[#AFFF00]'}`}></span>
                <span className={`block w-4 md:w-5 h-[2px] md:group-hover:w-8 group-hover:w-6 transition-all duration-300 ${isScrolled && !isOpen ? 'bg-white group-hover:bg-[#AFFF00]' : 'bg-white mix-blend-difference group-hover:bg-[#AFFF00]'}`}></span>
              </div>
              <span className={`text-[1.8rem] md:text-5xl mona-sans-condensed-black uppercase tracking-tighter transition-colors duration-300 leading-none ${isScrolled && !isOpen ? 'group-hover:text-[#AFFF00]' : 'group-hover:text-[#AFFF00]'}`}>
                Menu
              </span>
            </button>
        </div>
      </motion.nav>

      {/* ━━━ FULLSCREEN MENU OVERLAY ━━━ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Panels — cinematic vertical blinds reveal */}
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
                    width: '20.5%',
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
                <div className="flex flex-col md:flex-row flex-grow items-end justify-between pb-6 md:pb-10 pt-8 md:pt-0">

                  {/* Left — Contact info */}
                  <div className="flex flex-col gap-8 w-full md:w-5/12 order-2 md:order-1">
                    <motion.div custom={0} variants={infoVariants} className="flex flex-col gap-1.5">
                      <span className="text-[9px] poppins-bold tracking-[0.3em] uppercase text-white/20 mb-3">Get in Touch</span>
                      <a href="mailto:hello@drixmedia.com" className="text-base md:text-lg poppins-medium tracking-tight text-white/50 hover:text-[#AFFF00] transition-colors duration-300">
                        hello@drixmedia.com
                      </a>
                      <a href="tel:5108956500" className="text-sm poppins-medium text-white/25 hover:text-[#AFFF00] transition-colors duration-300">
                        (510) 895-6500
                      </a>
                    </motion.div>

                    <motion.div custom={1} variants={infoVariants} className="flex gap-5">
                      {['Twitter', 'Instagram', 'LinkedIn'].map((s) => (
                        <a key={s} href="#" className="text-[10px] poppins-bold tracking-[0.12em] uppercase text-white/20 hover:text-[#AFFF00] transition-colors duration-300">
                          {s}
                        </a>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right — Framer-style Premium Navigation Links */}
                  <div className="flex flex-col items-end justify-center w-full md:w-8/12 order-1 md:order-2 mb-12 md:mb-0 group/nav gap-2 md:gap-4">
                    {menuItems.map((item, i) => {
                      const isCurrent = isActive(item.path);
                      return (
                        <motion.div
                          key={item.label}
                          custom={i}
                          variants={linkVariants}
                          className="w-full flex justify-end"
                        >
                          <Link
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center justify-end gap-6 md:gap-8 relative transition-all duration-500"
                          >
                            {/* Hover sliding number/descriptor */}
                            <span className="text-[11px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-[#AFFF00] opacity-0 -translate-x-6 md:-translate-x-12 group-hover:opacity-100 group-hover:-translate-x-2 md:group-hover:-translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] pointer-events-none hidden md:block mt-2">
                              0{i+1}&nbsp;&nbsp;—&nbsp;&nbsp;Navigate
                            </span>

                            {/* Main Text -> Bright on Hover */}
                            <span 
                              className={`text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] mona-sans-condensed-bold leading-[0.85] tracking-tighter uppercase transition-all duration-[600ms] ease-[cubic-bezier(0.16, 1, 0.3, 1)] origin-right
                                ${isCurrent ? 'text-[#AFFF00] drop-shadow-[0_0_15px_rgba(175,255,0,0.2)]' : 'text-white/40 group-hover:text-white group-hover:-translate-x-2 md:group-hover:-translate-x-4'} 
                                group-hover/nav:opacity-20 hover:!opacity-100
                              `}
                            >
                              {item.label}
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                </div>

                {/* Bottom bar */}
                <motion.div
                  custom={2}
                  variants={infoVariants}
                  className="flex-none flex justify-between items-center border-t border-white/[0.06] pt-4 pb-1"
                >
                  <span className="text-[9px] poppins-medium tracking-[0.12em] uppercase text-white/15">
                    © 2024 Drix Media
                  </span>
                  <span className="text-[9px] poppins-medium tracking-[0.12em] uppercase text-white/15">
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