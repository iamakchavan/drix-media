import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Journal', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Pinterest', href: '#' },
  { label: 'Contra', href: '#' },
  { label: 'Behance', href: '#' },
];

const HoverLink = ({ label, path }: { label: string; path: string; [key: string]: any }) => (
  <motion.div initial="initial" whileHover="hover" className="relative flex items-center overflow-hidden w-fit text-white/80 h-6 md:h-7">
    <Link to={path} className="opacity-0 pointer-events-none text-base md:text-lg poppins-semibold">{label}</Link>
    <motion.div className="absolute inset-0 flex items-center w-full h-full text-base md:text-lg poppins-semibold" variants={{ initial: { y: "0%" }, hover: { y: "-100%" } }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <Link to={path}>{label}</Link>
    </motion.div>
    <motion.div className="absolute inset-0 flex items-center w-full h-full text-base md:text-lg poppins-semibold text-[#AFFF00]" variants={{ initial: { y: "100%" }, hover: { y: "0%" } }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <Link to={path}>{label}</Link>
    </motion.div>
  </motion.div>
);

const HoverSocial = ({ label, href }: { label: string; href: string; [key: string]: any }) => (
  <motion.a initial="initial" whileHover="hover" href={href} target="_blank" rel="noopener noreferrer" className="relative flex items-center overflow-hidden w-fit text-white/80 h-6 md:h-7">
    <span className="opacity-0 pointer-events-none text-base md:text-lg poppins-semibold">{label}</span>
    <motion.span className="absolute inset-0 flex items-center w-full h-full text-base md:text-lg poppins-semibold" variants={{ initial: { y: "0%" }, hover: { y: "-100%" } }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>{label}</motion.span>
    <motion.span className="absolute inset-0 flex items-center w-full h-full text-base md:text-lg poppins-semibold text-[#AFFF00]" variants={{ initial: { y: "100%" }, hover: { y: "0%" } }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>{label}</motion.span>
  </motion.a>
);

const LogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 85" className="h-[18px] md:h-[24px] w-auto">
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
);

const GetInTouch = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.8 });
  // Only auto-trigger hover state on touch/mobile devices
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  const animate = (isMobile && isInView) ? "hover" : "animate";

  return (
    <div className="w-full flex justify-start items-center md:justify-center py-8 md:pb-12 md:py-0 pointer-events-none z-10 overflow-visible mt-0 md:mt-24">
      <div className="w-full flex justify-start md:justify-center relative items-center">
        <motion.a
          ref={ref}
          href="mailto:hello@drixmedia.com"
          initial="initial"
          animate={animate}
          whileHover="hover"
          variants={{
            initial: { opacity: 0, y: 60 },
            animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
            hover: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="mona-sans-condensed-bold tracking-[-0.02em] pointer-events-auto cursor-pointer select-none text-[#AFFF00] flex flex-col items-start md:items-center uppercase relative w-fit"
        >
          <motion.span
            variants={{ initial: { fontWeight: 500 }, animate: { fontWeight: 500 }, hover: { fontWeight: 700, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-[16.5vw] md:text-[13vw] leading-[0.85] w-full text-left md:text-center md:pl-[3vw] transition-colors duration-700 ease-out"
          >
            GET IN
          </motion.span>
          <div className="flex items-center gap-3 md:gap-5 justify-start md:justify-center">
            <motion.span
              variants={{ initial: { fontWeight: 500 }, animate: { fontWeight: 500 }, hover: { fontWeight: 700, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-[16.5vw] md:text-[13vw] leading-[0.85] transition-colors duration-700 ease-out"
            >
              TOUCH
            </motion.span>
            <motion.div
              variants={{ initial: { rotate: 0, scale: 1 }, animate: { rotate: 0, scale: 1 }, hover: { rotate: 45, scale: 1.15, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="flex items-center justify-center flex-shrink-0 mt-1.5 md:mt-3"
            >
              <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="butt" strokeLinejoin="miter"
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-36 md:h-36 lg:w-44 lg:h-44 text-[#AFFF00]"
                variants={{ initial: { strokeWidth: 4 }, animate: { strokeWidth: 4 }, hover: { strokeWidth: 5.5, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              >
                <path d="M7 17L17 7M17 17V7H7"/>
              </motion.svg>
            </motion.div>
          </div>
        </motion.a>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="w-full min-h-screen bg-[#050505] text-white pt-20 md:pt-32 poppins-regular overflow-x-hidden flex flex-col relative selection:bg-[#AFFF00] selection:text-black">
      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 flex-grow flex flex-col justify-between relative z-10 pb-8 md:pb-12">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0 mt-4 md:mt-12">

          {/* 1. Logo & Contact — left */}
          <div className="w-full md:w-1/3 flex flex-col items-start gap-6 pt-0">
            <div className="select-none w-fit">
              <LogoSVG />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-[10px] md:text-sm font-bold text-white/20 tracking-[0.2em] uppercase">Get in touch</span>
              <a href="tel:5108956500" className="text-xl md:text-lg font-semibold hover:text-[#AFFF00] transition-colors text-white/70 tracking-tight">(510) 895-6500</a>
            </div>
            <div className="flex items-center gap-5 mt-2">
              <Link to="/privacy" className="text-[10px] md:text-[11px] poppins-medium tracking-[0.12em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300">Privacy</Link>
              <Link to="/terms" className="text-[10px] md:text-[11px] poppins-medium tracking-[0.12em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300">Terms</Link>
              <Link to="/cookies" className="text-[10px] md:text-[11px] poppins-medium tracking-[0.12em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300">Cookies</Link>
            </div>
          </div>

          {/* 2. Nav links — center */}
          <div className="w-full md:w-1/3 flex flex-col items-start md:items-center relative pt-6 md:pt-0">
            <div className="w-fit grid grid-cols-2 gap-x-6 md:gap-x-16 gap-y-4">
              {navLinks.map(({ label, path }) => (
                <HoverLink key={label} label={label} path={path} />
              ))}
            </div>
          </div>

          {/* 3. Social — right */}
          <div className="w-full md:w-1/3 flex flex-col items-start md:items-end relative pt-6 md:pt-0">
            <div className="w-fit grid grid-cols-2 gap-x-6 md:gap-x-16 gap-y-4 md:mr-0">
              {socialLinks.map(({ label, href }) => (
                <HoverSocial key={label} label={label} href={href} />
              ))}
            </div>
          </div>
        </div>

        {/* GET IN TOUCH CTA */}
        <GetInTouch />

      </div>

    </footer>
  );
};

export default Footer;
