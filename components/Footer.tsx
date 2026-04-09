import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
   return (
      <footer id="footer" className="w-full bg-[#050505] text-white pt-16 md:pt-20 poppins-regular overflow-x-hidden flex flex-col relative selection:bg-[#AFFF00] selection:text-black">

         <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 flex-grow flex flex-col justify-between relative z-10">
            
            {/* TOP BAR: Logo, Nav, Social Container */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 mt-4">
                
                {/* 1. Logo & Contact info */}
                <div className="w-full md:w-1/3 flex flex-col gap-8">
                    <div className="flex items-start select-none w-fit pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 85" className="h-8 md:h-10 w-auto">
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
                    </div>
                    <div className="flex flex-col gap-2">
                         <span className="text-xs font-bold text-white/25 tracking-widest uppercase mb-1">Get in touch</span>
                         <a href="tel:5108956500" className="text-base md:text-lg font-semibold hover:text-[#AFFF00] transition-colors text-white/70">(510) 895-6500</a>
                    </div>
                </div>

                {/* 2. Navigation */}
                <div className="w-full md:w-1/3 flex flex-col items-start md:items-center relative mt-4 md:mt-0 pt-6">
                    <span className="absolute left-0 top-0 text-white/20 w-4 h-4 flex items-center justify-center font-light text-xl">+</span>
                    
                    <div className="w-fit flex flex-col gap-3 md:gap-4">
                        {[
                            { label: 'Home', path: '/' },
                            { label: 'About', path: '/about' },
                            { label: 'Services', path: '/services' },
                            { label: 'Projects', path: '/projects' },
                            { label: 'Journal', path: '/blog' },
                            { label: 'Contact', path: '/contact' },
                        ].map(({ label, path }) => (
                            <motion.div
                                initial="initial"
                                whileHover="hover"
                                key={label}
                                className="relative flex items-center overflow-hidden w-fit group text-white/80 h-6 md:h-7"
                            >
                                <Link to={path} className="opacity-0 pointer-events-none text-base md:text-lg poppins-semibold">
                                    {label}
                                </Link>
                                <motion.div 
                                    className="absolute inset-0 flex items-center w-full h-full text-base md:text-lg poppins-semibold"
                                    variants={{ initial: { y: "0%" }, hover: { y: "-100%" } }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link to={path}>{label}</Link>
                                </motion.div>
                                <motion.div 
                                    className="absolute inset-0 flex items-center w-full h-full text-base md:text-lg poppins-semibold text-[#AFFF00]"
                                    variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link to={path}>{label}</Link>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3. Social */}
                <div className="w-full md:w-1/3 flex flex-col items-start md:items-end relative mt-4 md:mt-0 pt-6">
                    <span className="absolute left-0 top-0 text-white/20 w-4 h-4 flex items-center justify-center font-light text-xl">+</span>
                    <span className="absolute right-0 top-0 text-white/20 w-4 h-4 hidden md:flex items-center justify-center font-light text-xl pr-6">+</span>
                    
                    <div className="w-fit flex flex-col gap-3 md:gap-4 lg:pr-12">
                        {['Twitter', 'Instagram', 'Dribbble'].map((link) => (
                            <motion.a 
                                initial="initial"
                                whileHover="hover"
                                key={link} 
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="relative flex items-center overflow-hidden w-fit group text-white/80 h-6 md:h-7"
                            >
                                <div className="flex items-center gap-2 opacity-0 pointer-events-none text-base md:text-lg poppins-semibold">
                                    <span>{link}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[1px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                </div>
                                <motion.div 
                                    className="absolute inset-0 flex items-center gap-2 w-full h-full text-base md:text-lg poppins-semibold"
                                    variants={{ initial: { y: "0%" }, hover: { y: "-100%" } }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span>{link}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/25 mb-[1px] group-hover:text-[#AFFF00] group-hover:rotate-45 group-hover:scale-[1.3] transition-all duration-500 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                </motion.div>
                                <motion.div 
                                    className="absolute inset-0 flex items-center gap-2 w-full h-full text-base md:text-lg poppins-semibold text-[#AFFF00]"
                                    variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span>{link}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#AFFF00] mb-[1px] -rotate-45 group-hover:rotate-45 group-hover:scale-[1.3] transition-all duration-500 delay-75 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                </motion.div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Massive Typography "Get in Touch" */}
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
                            animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="mona-sans-condensed-bold tracking-[-0.02em] pointer-events-auto cursor-pointer select-none text-[#AFFF00] flex flex-col items-center uppercase relative w-fit"
                    >
                        <motion.span 
                            variants={{
                                initial: { fontWeight: 500 },
                                animate: { fontWeight: 500 },
                                hover: { fontWeight: 700, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
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
                                    hover: { fontWeight: 700, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="text-[24vw] md:text-[16vw] leading-[0.8] transition-colors duration-700 ease-out"
                            >
                                TOUCH
                            </motion.span>
                            {/* Responsive Standalone Arrow */}
                            <motion.div 
                                variants={{
                                    initial: { rotate: 0, scale: 1 },
                                    hover: { rotate: 45, scale: 1.15, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="flex items-center justify-center flex-shrink-0 mt-2 md:mt-6 ml-2 md:ml-4"
                            >
                                <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 text-[#AFFF00]"
                                  variants={{
                                    initial: { strokeWidth: 4 },
                                    hover: { strokeWidth: 5.5, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                  }}
                                ><path d="M7 17l9.2-9.2M17 17V7H7"/></motion.svg>
                            </motion.div>
                        </div>
                    </motion.a>
                </div>
            </div>

         </div>
      </footer>
   );
};

export default Footer;