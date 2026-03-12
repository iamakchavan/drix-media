import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open and compensate for scrollbar width
  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Apply styles to prevent shift
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      // Reset styles
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    }

    // Cleanup ensures we don't leave the body locked if component unmounts
    return () => {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Ultra-premium Apple/Framer easing
  const premiumEasing = [0.19, 1, 0.22, 1];

  const menuVariants: Variants = {
    closed: {
      y: "-100%",
      opacity: 0,
      filter: "blur(20px)",
      transition: {
        duration: 0.6,
        ease: premiumEasing
      }
    },
    open: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: premiumEasing
      }
    }
  };

  const containerVariants: Variants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants: Variants = {
    closed: {
      opacity: 0,
      y: 40,
      rotateX: -20,
      filter: "blur(10px)",
      transition: { duration: 0.4, ease: premiumEasing }
    },
    open: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: premiumEasing
      }
    }
  };

  const menuItems = ['Home', 'About', 'Services', 'Careers', 'Projects', 'Blog', 'Contact'];

  return (
    <>
      {/* Main Navbar (Always Visible, z-50) */}
      <nav className="w-full flex justify-between items-start pt-4 md:pt-6 z-50 relative">
        {/* Logo - visible when closed */}
        <Link to="/" className={`text-xl md:text-3xl mona-sans-condensed-black tracking-tighter uppercase text-white mix-blend-difference z-[60] transition-all duration-500 ease-in-out ${isOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          DRIX MEDIA<sup className="text-xs md:text-sm align-top top-0 ml-0.5">®</sup>
        </Link>

        {/* Center Links (Desktop) - Hide when open */}
        <div className={`hidden md:flex items-start justify-center gap-16 lg:gap-24 absolute left-1/2 transform -translate-x-1/2 top-6 transition-all duration-300 mix-blend-difference ${isOpen ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <Link to="/about" className="text-[11px] poppins-bold tracking-[0.15em] text-white hover:text-brand-lime transition-colors uppercase">
            About
          </Link>
          <Link to="/services" className="text-[11px] poppins-bold tracking-[0.15em] text-white hover:text-brand-lime transition-colors uppercase">
            Services
          </Link>
          <Link to="/blog" className="text-[11px] poppins-bold tracking-[0.15em] text-white hover:text-brand-lime transition-colors uppercase">
            Journal
          </Link>
          <Link to="/contact" className="text-[11px] poppins-bold tracking-[0.15em] text-white hover:text-brand-lime transition-colors uppercase">
            Contact
          </Link>
        </div>

        {/* Menu Trigger - Hide when open */}
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-3 group cursor-pointer mix-blend-difference z-[50] transition-all duration-300 ${isOpen ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0'}`}
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

      {/* Half Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 left-0 w-full h-[65vh] bg-[#000000] z-[999] flex flex-col text-white shadow-2xl overflow-hidden border-b border-white/10"
            >
              <div className="flex flex-col w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-12 h-full justify-between">

                {/* Header Row: Logo + Close Button */}
                <div className="flex justify-between items-start w-full flex-none">
                  {/* Logo */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-xl md:text-3xl mona-sans-condensed-black tracking-tighter uppercase mix-blend-difference"
                  >
                    <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-white/70 transition-colors">DRIX MEDIA<sup className="text-xs md:text-sm align-top top-0 ml-0.5">®</sup></Link>
                  </motion.div>

                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 group cursor-pointer hover:text-white/70 transition-colors"
                  >
                    <span className="text-xl md:text-2xl poppins-bold uppercase tracking-tight mt-[1px]">
                      CLOSE
                    </span>
                    <div className="relative w-6 h-6 flex items-center justify-center pt-1 md:pt-0">
                      <span className="absolute block w-6 h-[2px] bg-white transform rotate-45 transition-transform duration-500 origin-center group-hover:rotate-180"></span>
                      <span className="absolute block w-6 h-[2px] bg-white transform -rotate-45 transition-transform duration-500 origin-center group-hover:-rotate-180"></span>
                    </div>
                  </motion.button>
                </div>

                {/* Content Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col md:flex-row justify-between items-end flex-grow w-full pb-8 pt-12 md:pt-0"
                >

                  {/* Left Side: Contact Info */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-2 md:gap-4 w-full md:w-1/2 mb-4 md:mb-0 order-2 md:order-1 text-left"
                  >
                    <span className="text-white/50 text-xs md:text-sm tracking-widest uppercase mb-1 md:mb-2 poppins-medium">Get in Touch</span>
                    <a href="mailto:hello@drixmedia.com" className="text-xl md:text-3xl poppins-medium tracking-tight hover:text-[#AFFF00] transition-colors">
                      hello@drixmedia.com
                    </a>
                    <a href="tel:5108956500" className="text-lg md:text-xl poppins-medium text-white/50 hover:text-[#AFFF00] transition-colors">
                      (510) 895-6500
                    </a>
                  </motion.div>

                  {/* Right Side: Navigation Links */}
                  <div className="flex flex-col items-end gap-2 md:gap-4 w-full md:w-1/2 text-right order-1 md:order-2 mb-10 md:mb-0 group/menu">
                    {menuItems.map((item) => {
                      const path = item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
                      return (
                        <motion.div key={item} variants={itemVariants} className="block relative">
                          <Link
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className="text-3xl md:text-4xl lg:text-5xl poppins-medium hover:poppins-semibold tracking-tight text-white transition-all duration-300 block relative group-hover/menu:opacity-30 group-hover/menu:blur-[2px] hover:!opacity-100 hover:!blur-none hover:!text-[#AFFF00]"
                          >
                            <span className="relative z-10">{item}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

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