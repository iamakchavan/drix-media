import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
   return (
      <footer id="footer" className="w-full bg-[#f6f6f6] text-black pt-16 md:pt-20 font-sans overflow-x-hidden flex flex-col relative selection:bg-black selection:text-[#AFFF00]">

         <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 flex-grow flex flex-col justify-between relative z-10">
            
            {/* TOP BAR: Logo, Nav, Social Container */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 mt-4">
                
                {/* 1. Logo & Contact info */}
                <div className="w-full md:w-1/3 flex flex-col gap-8">
                    <div className="flex items-start select-none text-black hover:text-[#094B28] transition-colors duration-500 cursor-default w-fit group pt-2">
                        <span className="font-bebas text-[36px] md:text-[42px] tracking-[-0.04em] leading-none mb-4">DRIX MEDIA</span>
                        <span className="font-bebas text-[12px] ml-1 mt-[2px] leading-none tracking-[-0.04em]">®</span>
                    </div>
                    <div className="flex flex-col gap-2">
                         <span className="text-xs font-bold text-black/30 tracking-widest uppercase mb-1">Get in touch</span>
                         <a href="tel:5108956500" className="text-base md:text-lg font-semibold hover:text-[#094B28] transition-colors text-black/80">(510) 895-6500</a>
                    </div>
                </div>

                {/* 2. Navigation */}
                <div className="w-full md:w-1/3 flex flex-col items-start md:items-center relative mt-4 md:mt-0 pt-6">
                    <span className="absolute left-0 top-0 text-black/30 w-4 h-4 flex items-center justify-center font-light text-xl">+</span>
                    
                    <div className="w-fit flex flex-col gap-3 md:gap-4">
                        {['Home', 'About', 'Services', 'Blog'].map((link) => (
                            <motion.a 
                                initial="initial"
                                whileHover="hover"
                                key={link} 
                                href={link === 'Home' ? '/' : `./${link.toLowerCase().replace(/ /g, '-')}`} 
                                className="relative flex items-center overflow-hidden w-fit group text-black/90 h-6 md:h-7"
                            >
                                <div className="opacity-0 pointer-events-none text-base md:text-lg font-semibold">
                                    {link}
                                </div>
                                <motion.div 
                                    className="absolute inset-0 flex items-center w-full h-full text-base md:text-lg font-semibold"
                                    variants={{ initial: { y: "0%" }, hover: { y: "-100%" } }}
                                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                >
                                    {link}
                                </motion.div>
                                <motion.div 
                                    className="absolute inset-0 flex items-center w-full h-full text-base md:text-lg font-semibold text-[#094B28]"
                                    variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
                                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                >
                                    {link}
                                </motion.div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* 3. Social */}
                <div className="w-full md:w-1/3 flex flex-col items-start md:items-end relative mt-4 md:mt-0 pt-6">
                    <span className="absolute left-0 top-0 text-black/30 w-4 h-4 flex items-center justify-center font-light text-xl">+</span>
                    <span className="absolute right-0 top-0 text-black/30 w-4 h-4 hidden md:flex items-center justify-center font-light text-xl pr-6">+</span>
                    
                    <div className="w-fit flex flex-col gap-3 md:gap-4 lg:pr-12">
                        {['Twitter', 'Instagram', 'Dribbble'].map((link) => (
                            <motion.a 
                                initial="initial"
                                whileHover="hover"
                                key={link} 
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="relative flex items-center overflow-hidden w-fit group text-black/90 h-6 md:h-7"
                            >
                                <div className="flex items-center gap-2 opacity-0 pointer-events-none text-base md:text-lg font-semibold">
                                    <span>{link}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[1px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                </div>
                                <motion.div 
                                    className="absolute inset-0 flex items-center gap-2 w-full h-full text-base md:text-lg font-semibold"
                                    variants={{ initial: { y: "0%" }, hover: { y: "-100%" } }}
                                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                >
                                    <span>{link}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/30 transition-colors mb-[1px] group-hover:text-[#094B28]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                </motion.div>
                                <motion.div 
                                    className="absolute inset-0 flex items-center gap-2 w-full h-full text-base md:text-lg font-semibold text-[#094B28]"
                                    variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
                                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                >
                                    <span>{link}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#476D07] mb-[1px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                </motion.div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Massive Typography matching "Get in Touch" in Bebas Font */}
            <div className="w-full flex justify-center items-center py-16 md:py-24 pointer-events-none z-10 flex-col overflow-visible">
                <div className="w-full flex justify-center relative items-center mt-12 md:mt-16">
                    <motion.a 
                        href="mailto:hello@drixmedia.com"
                        initial="initial"
                        whileInView="animate"
                        whileHover="hover"
                        viewport={{ once: true, margin: "0px" }}
                        variants={{
                            initial: { opacity: 0, y: 100 },
                            animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } }
                        }}
                        className="font-bebas tracking-[-0.02em] pointer-events-auto cursor-pointer select-none text-[#094B28] flex flex-col items-center uppercase relative w-fit"
                    >
                        {/* Hover Overlay Text to crossfade color beautifully without layout shifts */}
                        <div className="absolute inset-0 flex flex-col items-center w-full h-full text-[#AFFF00] z-20 pointer-events-none mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <motion.span 
                            variants={{
                                initial: { fontWeight: 500 },
                                animate: { fontWeight: 500 },
                                hover: { fontWeight: 700, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
                            }}
                            className="text-[24vw] md:text-[16vw] leading-[0.8] w-full text-center md:pl-[6vw] transition-colors duration-700 ease-out"
                        >
                            GET IN
                        </motion.span>
                        <div className="flex items-center gap-4 md:gap-8 justify-center">
                            <motion.span 
                                variants={{
                                    initial: { fontWeight: 500 },
                                    animate: { fontWeight: 500 },
                                    hover: { fontWeight: 700, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
                                }}
                                className="text-[24vw] md:text-[16vw] leading-[0.8] transition-colors duration-700 ease-out"
                            >
                                TOUCH
                            </motion.span>
                            {/* Responsive Standalone Arrow */}
                            <motion.div 
                                variants={{
                                    initial: { x: 0, y: 0 },
                                    hover: { x: 16, y: -16, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
                                }}
                                className="flex items-center justify-center flex-shrink-0 mt-2 md:mt-6 ml-2 md:ml-4"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 text-[#094B28]"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                            </motion.div>
                        </div>
                    </motion.a>
                </div>
            </div>

            {/* Bottom Bar: Copyright & Extras */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pb-8 mt-auto relative z-20 border-t border-black/5 pt-8">
                <span className="text-[11px] font-semibold text-black/40 tracking-wider">
                    © {new Date().getFullYear()} DRIX MEDIA. ALL RIGHTS RESERVED.
                </span>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[10px] md:text-[11px] font-semibold text-black/60 tracking-wider">
                    <a href="#" className="hover:text-[#476D07] transition-colors">PRIVACY POLICY</a>
                    <a href="#" className="hover:text-[#476D07] transition-colors">TERMS OF SERVICE</a>
                </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;