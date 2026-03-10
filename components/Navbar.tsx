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

  // Refined Apple-style spring animations
  const menuVariants: Variants = {
    closed: {
      y: "-120%",
      borderBottomRightRadius: "100%",
      borderBottomLeftRadius: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 1
      }
    },
    open: {
      y: "0%",
      borderBottomRightRadius: "3rem", // Match the design rounded corners
      borderBottomLeftRadius: "3rem",
      transition: {
        type: "spring",
        stiffness: 250, // Slightly softer for the open state
        damping: 30,
        mass: 1
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const menuItems = ['Home', 'About', 'Services', 'Careers', 'Projects', 'Blog', 'Contact'];

  return (
    <>
      {/* Main Navbar (Always Visible, z-50) */}
      <nav className="w-full flex justify-between items-start pt-4 md:pt-6 z-50 relative">
        {/* Logo - visible when closed */}
        <Link to="/" className={`text-xl md:text-3xl font-black tracking-tighter uppercase text-white mix-blend-difference z-[60] transition-all duration-500 ease-in-out ${isOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          DRIX MEDIA<sup className="text-xs md:text-sm align-top top-0 ml-0.5">®</sup>
        </Link>

        {/* Center Links (Desktop) - Hide when open */}
        <div className={`hidden md:flex items-start justify-center gap-16 lg:gap-24 absolute left-1/2 transform -translate-x-1/2 top-6 transition-all duration-300 mix-blend-difference ${isOpen ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <Link to="/about" className="text-[11px] font-bold tracking-[0.15em] text-white hover:text-brand-lime transition-colors uppercase">
            About
          </Link>
          <Link to="/services" className="text-[11px] font-bold tracking-[0.15em] text-white hover:text-brand-lime transition-colors uppercase">
            Services
          </Link>
          <Link to="/blog" className="text-[11px] font-bold tracking-[0.15em] text-white hover:text-brand-lime transition-colors uppercase">
            Journal
          </Link>
          <Link to="/contact" className="text-[11px] font-bold tracking-[0.15em] text-white hover:text-brand-lime transition-colors uppercase">
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
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white group-hover:text-brand-lime transition-colors duration-300 leading-none">
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
              className="fixed top-0 left-0 w-full bg-[#AFFF00] z-[999] flex flex-col text-black shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col w-full max-w-[1600px] mx-auto px-6 md:px-10 py-8 md:py-10">

                {/* Header Row: Logo + Close Button */}
                <div className="flex justify-between items-start">
                  {/* Logo */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-xl md:text-3xl font-black tracking-tighter uppercase"
                  >
                    <Link to="/" onClick={() => setIsOpen(false)}>DRIX MEDIA<sup className="text-xs md:text-sm align-top top-0 ml-0.5">®</sup></Link>
                  </motion.div>

                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 md:gap-5 group cursor-pointer hover:opacity-60 transition-opacity"
                  >
                    {/* X Icon */}
                    <div className="relative w-8 h-8 md:w-12 md:h-5 flex items-center justify-center">
                      <span className="absolute block w-full h-[2px] bg-black rotate-12 md:rotate-6 origin-center scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                      <span className="absolute block w-full h-[2px] bg-black -rotate-12 md:-rotate-6 origin-center"></span>
                      <span className="absolute block w-full h-[2px] bg-black rotate-12 md:rotate-6 origin-center"></span>
                    </div>
                    {/* MENU Text */}
                    <span className="text-4xl md:text-6xl font-bebas font-normal uppercase tracking-tight leading-[0.8]">
                      MENU
                    </span>
                  </motion.button>
                </div>

                {/* Content Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col md:flex-row justify-between items-end mt-12 md:mt-24 pb-8"
                >

                  {/* Left Side: Contact Info */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-3 w-full md:w-auto mb-8 md:mb-0 order-2 md:order-1"
                  >
                    <a href="tel:5108956500" className="text-base md:text-lg font-medium hover:text-black/60 transition-colors opacity-90 block">(510) 895-6500</a>
                    <a href="mailto:hello@drixmedia.com" className="text-2xl md:text-4xl font-bold tracking-tight hover:text-black/60 transition-colors leading-none block">
                      hello@drixmedia.com
                    </a>
                  </motion.div>

                  {/* Right Side: Navigation Links */}
                  <div className="flex flex-col items-end gap-1 md:gap-2 w-full md:w-auto text-right order-1 md:order-2 mb-10 md:mb-0">
                    {menuItems.map((item) => {
                      const path = item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
                      return (
                        <motion.div key={item} variants={itemVariants} className="block origin-right">
                          <Link
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className="text-3xl md:text-5xl font-bold tracking-tight hover:text-black/60 transition-colors duration-200 leading-tight block"
                          >
                            {item}
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