import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blogs', path: '/blog' },
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
      y: 60,
      opacity: 0,
      transition: { duration: 0.4, ease }
    },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: smoothEase, delay: 0.3 + i * 0.06 }
    })
  };

  const bottomVariants: Variants = {
    closed: { y: 20, opacity: 0, transition: { duration: 0.3, ease } },
    open: {
      y: 0, opacity: 1,
      transition: { duration: 0.7, ease: smoothEase, delay: 0.7 }
    }
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
           className={`pointer-events-auto flex justify-between items-center transition-all duration-[700ms] ease-[cubic-bezier(0.19, 1, 0.22, 1)] will-change-transform ${
             isScrolled && !isOpen
               ? 'w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] md:w-[92%] lg:w-[85vw] max-w-[1400px] h-[60px] md:h-[75px] bg-[#050505]/95 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4)] rounded-full px-4 sm:px-6 md:px-10 mt-3 md:mt-4'
               : 'w-full max-w-none h-[90px] bg-transparent border-transparent rounded-none px-6 md:px-12 lg:px-20 mt-0'
           }`}
        >
            {/* ── Logo ── */}
            <Link to="/" className="z-[60] flex items-center transition-transform duration-500 hover:scale-105 active:scale-95">
              {/* Pill state: icon only */}
              {isScrolled && !isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex-shrink-0">
                  <path fill="#afff00" d="M127.6,872.4c-3.9-76,2-140.5,41.7-207,46.9-78.7,160.1-154.3,253.8-154.3h338c-12.8-54.2-65.2-136.4-163.7-140.3H246.6v121.2l-137.6,133.6-75.2-74,98-102.1v-189.2h441.3c46.6,0,92.5,11.1,134.4,31.6,186,90.9,230.9,381.3,36.1,520.8-55.4,39.6-122.4,59.7-190.5,59.7H127.6ZM761,621.6h-321c-17.6,0-66.2,14.9-84,22.3-49.5,20.5-93.5,65.3-105.2,118h346.5c10,0,47.1-13.2,58.3-18.3,50-22.5,92.8-68.5,105.4-122Z"/>
                  <g fill="#afff00">
                    <path d="M672.1,235.1l-31.2-5.7,7.3-39.9-30.2,35.8-20.4-3.7-15.6-44.1-7.3,39.9-31.2-5.7,15.4-84,38.4,7,17.1,52.7,34.7-43.2,38.4,7-15.4,84Z"/>
                    <path d="M729.5,197.8l-3.5,7.1,52.4,26-9.2,18.6-52.4-26-3.5,7.1,52.4,26-10.8,21.8-80.8-40.1,38-76.5,80.8,40.1-10.8,21.8-52.4-26Z"/>
                    <path d="M861.6,316.9c-19.6,21.4-43.1,18.4-58.3,4.5l-46.8-42.8,57.6-62.9,46.8,42.8c15.2,13.9,20.3,37.1.7,58.5ZM838.3,295.5c10.7-11.7,2.4-19.3-2.6-23.9l-16.2-14.8-21.4,23.4,16.2,14.8c5,4.6,13.3,12.2,24,.5Z"/>
                    <path d="M850.2,378.6l-18.5-25.8,69.3-49.8,18.5,25.8-69.3,49.8Z"/>
                    <path d="M900.1,442l-14.9-33.2-16.4.9-14.3-31.8,92.4-2.7,19.3,43-63.4,67.2-14.3-31.8,11.6-11.6ZM916.8,425.5l19.8-19.7-27.9,1.7,8.1,18Z"/>
                  </g>
                </svg>
              ) : (
                /* Full nav: web logo SVG */
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 85" className="h-4 md:h-5 w-auto mix-blend-difference">
                  <path fill="white" d="M98.4,42.5c0,27-18,39.7-38.6,39.7H2.2V2.8h57.6c20.5,0,38.6,12.7,38.6,39.7ZM78,42.5c0-19.3-10.4-22.6-25.9-22.6h-29.5v45.2h29.5c15.4,0,25.9-3.3,25.9-22.6Z"/>
                  <path fill="white" d="M181.3,58.6l14.6,23.6h-24.1l-12.8-21.2h-32.9v21.2h-20.4V2.8h62.4c18,0,30.4,11.5,30.4,29.2s-6.6,22.5-17.2,26.7ZM126.2,43.9h36.3c6.1,0,15.7,0,15.7-11.9s-9.5-12-15.7-12h-36.3v23.9Z"/>
                  <path fill="white" d="M225.7,82.2h-20.4V25.5h20.4v56.7Z"/>
                  <path fill="white" d="M276.4,42.5L231.7,2.8h28.1l30.4,27.2,30.3-27.2h28.3l-44.7,39.7,44.7,39.7h-28.3l-30.3-27.2-30.4,27.2h-28.1l44.7-39.7Z"/>
                  <path fill="#afff00" d="M225.7,19.9l-20.4-17.1h20.4v17.1Z"/>
                  <path fill="white" d="M428.3,82.2h-10.2v-27.2l-16.5,27.2h-7.4l-16.5-27.2v27.2h-10.2v-39.7h13.8l16.6,28,16.6-28h13.8v39.7Z"/>
                  <path fill="white" d="M443.1,50.6v8.1h31.8v7.4h-31.8v8.1h31.8v8.1h-42v-39.7h42v8.1h-31.8Z"/>
                  <path fill="white" d="M526.7,62.4c0,13.5-9,19.9-19.3,19.9h-28.8v-39.7h28.8c10.3,0,19.3,6.4,19.3,19.9ZM516.5,62.4c0-9.6-5.2-11.3-12.9-11.3h-14.8v22.6h14.8c7.7,0,12.9-1.6,12.9-11.3Z"/>
                  <path fill="white" d="M540.6,82.2h-10.2v-39.7h10.2v39.7Z"/>
                  <path fill="white" d="M582.3,73.8h-23.8l-4.3,8.5h-11.2l20.5-39.7h13.8l20.5,39.7h-11.3l-4.3-8.5ZM578.5,66.2l-8.1-16.1-8.1,16.1h16.2Z"/>
                </svg>
              )}
            </Link>

            {/* ── Center Links (Desktop Adaptive) ── */}
            <div className={`hidden lg:flex items-center justify-center gap-8 xl:gap-16 absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                isOpen ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}>
              {navLinks.map((link) => {
                const isItemActive = isActive(link.path);
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
                    className={`text-[10px] xl:text-[11px] poppins-semibold tracking-[0.15em] transition-colors uppercase ${linkStyle}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* ── Menu Trigger ── */}
            <button
              onClick={() => setIsOpen(true)}
              className={`flex items-center gap-2 sm:gap-3 group cursor-pointer z-[60] transition-all duration-500 ${
                  isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              } ${isScrolled && !isOpen ? 'text-white' : 'text-white mix-blend-difference'}`}
            >
              <div className="flex flex-col gap-1 md:gap-1.5 items-end pt-0.5 md:pt-1">
                <span className={`block w-5 sm:w-6 md:w-8 h-[2px] transition-colors duration-300 ${isScrolled && !isOpen ? 'bg-white group-hover:bg-[#AFFF00]' : 'bg-white mix-blend-difference group-hover:bg-[#AFFF00]'}`}></span>
                <span className={`block w-3 sm:w-4 md:w-5 h-[2px] md:group-hover:w-8 group-hover:w-6 transition-all duration-300 ${isScrolled && !isOpen ? 'bg-white group-hover:bg-[#AFFF00]' : 'bg-white mix-blend-difference group-hover:bg-[#AFFF00]'}`}></span>
              </div>
              <span className={`text-[1.3rem] sm:text-[1.6rem] md:text-4xl lg:text-5xl mona-sans-condensed-black uppercase tracking-tighter transition-colors duration-300 leading-none ${isScrolled && !isOpen ? 'group-hover:text-[#AFFF00]' : 'group-hover:text-[#AFFF00]'}`}>
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
              className="fixed inset-0 z-[999] bg-[#050505] text-white overflow-hidden"
            >
              <div className="relative w-full h-full flex flex-col px-6 md:px-10 lg:px-14 py-6 md:py-8">

                {/* ── Top bar: Logo + Close ── */}
                <div className="flex items-center justify-between w-full flex-none">
                  <motion.div variants={contentFade}>
                    <Link to="/" onClick={() => setIsOpen(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 85" className="h-4 md:h-5 w-auto">
                        <path fill="white" d="M98.4,42.5c0,27-18,39.7-38.6,39.7H2.2V2.8h57.6c20.5,0,38.6,12.7,38.6,39.7ZM78,42.5c0-19.3-10.4-22.6-25.9-22.6h-29.5v45.2h29.5c15.4,0,25.9-3.3,25.9-22.6Z"/>
                        <path fill="white" d="M181.3,58.6l14.6,23.6h-24.1l-12.8-21.2h-32.9v21.2h-20.4V2.8h62.4c18,0,30.4,11.5,30.4,29.2s-6.6,22.5-17.2,26.7ZM126.2,43.9h36.3c6.1,0,15.7,0,15.7-11.9s-9.5-12-15.7-12h-36.3v23.9Z"/>
                        <path fill="white" d="M225.7,82.2h-20.4V25.5h20.4v56.7Z"/>
                        <path fill="white" d="M276.4,42.5L231.7,2.8h28.1l30.4,27.2,30.3-27.2h28.3l-44.7,39.7,44.7,39.7h-28.3l-30.3-27.2-30.4,27.2h-28.1l44.7-39.7Z"/>
                        <path fill="#afff00" d="M225.7,19.9l-20.4-17.1h20.4v17.1Z"/>
                        <path fill="white" d="M428.3,82.2h-10.2v-27.2l-16.5,27.2h-7.4l-16.5-27.2v27.2h-10.2v-39.7h13.8l16.6,28,16.6-28h13.8v39.7Z"/>
                        <path fill="white" d="M443.1,50.6v8.1h31.8v7.4h-31.8v8.1h31.8v8.1h-42v-39.7h42v8.1h-31.8Z"/>
                        <path fill="white" d="M526.7,62.4c0,13.5-9,19.9-19.3,19.9h-28.8v-39.7h28.8c10.3,0,19.3,6.4,19.3,19.9ZM516.5,62.4c0-9.6-5.2-11.3-12.9-11.3h-14.8v22.6h14.8c7.7,0,12.9-1.6,12.9-11.3Z"/>
                        <path fill="white" d="M540.6,82.2h-10.2v-39.7h10.2v39.7Z"/>
                        <path fill="white" d="M582.3,73.8h-23.8l-4.3,8.5h-11.2l20.5-39.7h13.8l20.5,39.7h-11.3l-4.3-8.5ZM578.5,66.2l-8.1-16.1-8.1,16.1h16.2Z"/>
                      </svg>
                    </Link>
                  </motion.div>

                  <motion.button
                    variants={contentFade}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="text-sm md:text-base poppins-semibold uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors duration-300">
                      Close
                    </span>
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <span className="absolute block w-5 h-[1.5px] bg-white/50 group-hover:bg-white transform rotate-45 transition-colors duration-300"></span>
                      <span className="absolute block w-5 h-[1.5px] bg-white/50 group-hover:bg-white transform -rotate-45 transition-colors duration-300"></span>
                    </div>
                  </motion.button>
                </div>

                {/* ── Nav links — right-aligned, transition with safety padding ── */}
                <div className="flex-1 flex flex-col justify-center items-end pr-4 md:pr-6">
                  {menuItems.map((item, i) => {
                    const isCurrent = isActive(item.path);
                    return (
                      <motion.div
                        key={item.label}
                        custom={i}
                        variants={linkVariants}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          onMouseEnter={() => setHoveredIndex(i)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className={`block mona-sans-condensed-bold uppercase tracking-tighter leading-[0.9] transition-colors duration-300
                            text-[12vw] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[4.5vw]
                            ${isCurrent
                              ? 'text-[#AFFF00]'
                              : hoveredIndex !== null
                                ? hoveredIndex === i ? 'text-white' : 'text-white/20'
                                : 'text-white/40'
                            }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ── Bottom: contact info left, copyright right ── */}
                <motion.div
                  variants={contentFade}
                  className="flex-none flex items-end justify-between pt-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] poppins-bold tracking-[0.3em] uppercase text-white/20">Get in touch</span>
                    <a href="mailto:hello@drixmedia.com" className="text-sm poppins-medium text-white/50 hover:text-[#AFFF00] transition-colors duration-300">
                      hello@drixmedia.com
                    </a>
                    <a href="tel:5108956500" className="text-xs poppins-regular text-white/25 hover:text-[#AFFF00] transition-colors duration-300">
                      (510) 895-6500
                    </a>
                  </div>
                  <span className="text-[9px] poppins-medium tracking-[0.15em] uppercase text-white/15">
                    © {new Date().getFullYear()} Drix Media
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