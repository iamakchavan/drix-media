import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Adapted Scramble Button for dark/light contexts
const ScrambleButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <motion.a
      href={href}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" },
        hover: { clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 16px)", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
      }}
      className="group relative flex items-center justify-center bg-black h-[54px] md:h-[64px] px-10 md:px-12 transition-colors duration-500 overflow-hidden"
    >
      <motion.div 
        variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 bg-white w-full h-full"
      />
      
      <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
        <div className="opacity-0 pointer-events-none flex items-center gap-2 text-[13px] tracking-[0.25em] uppercase font-semibold whitespace-nowrap">
          <span>{text}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </div>
        
        <motion.div
          variants={{
            initial: { y: "0%" },
            hover: { y: "-100%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] md:text-sm tracking-[0.25em] uppercase font-semibold text-[#AFFF00] whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] group-hover:rotate-45 transition-transform duration-500 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
        
        <motion.div
          variants={{
            initial: { y: "100%" },
            hover: { y: "0%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] md:text-sm tracking-[0.25em] uppercase font-bold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] -rotate-45 group-hover:rotate-0 transition-transform duration-500 delay-75 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
      </div>
    </motion.a>
  );
};

// Word reveal animations
const wordsVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -20, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] } }
};

const ChallengeSection: React.FC = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax logic for background abstract
    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return (
        <section ref={sectionRef} className="relative w-full bg-[#0a0a0a] text-white pt-32 md:pt-48 pb-16 px-4 md:px-8 lg:px-12 selection:bg-[#AFFF00] selection:text-black poppins-regular overflow-hidden">
            
            {/* Parallax abstract background element */}
            <motion.div 
                style={{ y: yParallax }} 
                className="absolute right-0 top-[20%] w-[500px] h-[500px] bg-[#094B28] rounded-full blur-[200px] opacity-20 pointer-events-none" 
            />

            <div className="max-w-[1600px] mx-auto relative z-10">
                
                {/* Header Section */}
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        show: { transition: { staggerChildren: 0.05 } }
                    }}
                    className="flex flex-col mb-24 md:mb-40"
                >
                    <motion.div variants={wordsVariants} className="flex items-center gap-3 mb-10 overflow-hidden">
                        <div className="w-2 h-2 rounded-none bg-[#AFFF00]"></div>
                        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/60">The Challenge</span>
                    </motion.div>
                    
                <h2 className="text-5xl md:text-7xl lg:text-[7.5rem] mona-sans-condensed-medium tracking-tighter leading-[0.95] text-white flex flex-col">
                        <div className="overflow-hidden p-2 -m-2">
                           <motion.span variants={wordsVariants} className="inline-block">Most Brands Face </motion.span>
                        </div>
                        <div className="overflow-hidden p-2 -m-2">
                            <motion.span variants={wordsVariants} className="inline-block text-white/40">The Same Challenge.</motion.span>
                        </div>
                    </h2>
                </motion.div>

                {/* 3-Column Pain Points Grid */}
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-12 lg:gap-x-20 mb-32 md:mb-48 border-t border-white/10 pt-16 md:pt-24"
                >
                    
                    {/* Point 1 */}
                    <motion.div 
                        variants={wordsVariants}
                        className="flex flex-col group pr-4 md:pr-0"
                    >
                        <h3 className="text-sm md:text-base poppins-semibold mb-8 text-white tracking-widest uppercase">01 / The Reality</h3>
                        <p className="text-2xl md:text-3xl lg:text-4xl text-white/40 leading-[1.3] mona-sans-medium transition-colors duration-700 ease-[0.19,1,0.22,1] group-hover:text-white">
                            Your product is solid. <br/>Your team is talented. <br/><span className="text-[#AFFF00] mt-4 inline-block tracking-tight">But something is missing.</span>
                        </p>
                    </motion.div>

                    {/* Point 2 */}
                    <motion.div 
                        variants={wordsVariants}
                        className="flex flex-col group pr-4 md:pr-0"
                    >
                        <h3 className="text-sm md:text-base poppins-semibold mb-8 text-white tracking-widest uppercase">02 / The Symptoms</h3>
                        <p className="text-2xl md:text-3xl lg:text-4xl text-white/40 leading-[1.3] mona-sans-medium transition-colors duration-700 ease-[0.19,1,0.22,1] group-hover:text-white">
                            Branding feels generic. Content is not connecting. Campaigns are not converting. <br/><span className="text-white/80 mt-4 inline-block tracking-tight">Working with five agencies creates chaos.</span>
                        </p>
                    </motion.div>

                    {/* Point 3 */}
                    <motion.div 
                        variants={wordsVariants}
                        className="flex flex-col group pr-4 md:pr-0"
                    >
                        <h3 className="text-sm md:text-base poppins-semibold mb-8 text-white tracking-widest uppercase">03 / The Root Cause</h3>
                        <p className="text-2xl md:text-3xl lg:text-4xl text-white/40 leading-[1.3] mona-sans-medium transition-colors duration-700 ease-[0.19,1,0.22,1] group-hover:text-white">
                            Disconnected services create <span className="text-white italic">disconnected brands.</span> <br/><span className="mt-4 inline-block tracking-tight">You need alignment.</span>
                        </p>
                    </motion.div>

                </motion.div>

                {/* The Solution Block - Massive Scroll Reveal */}
                <motion.div 
                    initial={{ opacity: 0, clipPath: 'inset(10% 0% 10% 0%)', scale: 0.95, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "0px 0px -200px 0px" }}
                    transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                    className="w-full bg-[#AFFF00] rounded-none p-10 md:p-20 lg:p-32 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-16 overflow-hidden relative"
                >
                    <div className="flex flex-col max-w-5xl relative z-10">
                        <span className="text-xs md:text-sm poppins-bold tracking-[0.2em] uppercase text-[#094B28] mb-12 lg:mb-20 block">
                            Our Solution
                        </span>
                        
                        <h2 className="text-6xl md:text-8xl lg:text-[10rem] mona-sans-condensed-medium tracking-tighter leading-[0.85] text-black mb-12 lg:mb-16">
                            Under <br className="hidden md:block"/>
                            One Roof.
                        </h2>
                        
                        <p className="text-3xl md:text-4xl lg:text-[3.5rem] mona-sans-medium text-black leading-[1.2] lg:leading-[1.05] tracking-tight max-w-4xl">
                            Strategy, design, content, and execution working together as <span className="underline decoration-black/20 underline-offset-[10px]">one system.</span>
                        </p>
                    </div>

                    <div className="flex flex-col xl:items-end w-full max-w-lg xl:text-right gap-6 mt-12 xl:mt-0 pb-4 relative z-10">
                        {/* Spinning Abstract SVG Decorative Element */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                            className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mb-8 md:mb-12 xl:mb-16 ml-0 xl:mr-0 flex-shrink-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 580 580" preserveAspectRatio="xMidYMid meet" style={{width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)", contentVisibility: "visible"}}><defs><clipPath id="__lottie_element_692"><rect width="580" height="580" x="0" y="0"></rect></clipPath><clipPath id="__lottie_element_694"><path d="M0,0 L750,0 L750,750 L0,750z"></path></clipPath><clipPath id="__lottie_element_698"><path d="M0,0 L480,0 L480,480 L0,480z"></path></clipPath></defs><g clipPath="url(#__lottie_element_692)"><g clipPath="url(#__lottie_element_694)" transform="matrix(1,0,0,1,-145,-170)" opacity="1" style={{display: "block"}}><g clipPath="url(#__lottie_element_698)" transform="matrix(1,0,0,1,135,135)" opacity="1" style={{display: "block"}}><g transform="matrix(1.0000015497207642,0,0,1.0000015497207642,240,239.99993896484375)" opacity="1" style={{display: "block"}}><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(0,0,0)" strokeOpacity="1" strokeWidth="4" d=" M-145.58200073242188,-95.91999816894531 C-145.58200073242188,-95.91999816894531 2.5250000953674316,-95.35900115966797 2.5250000953674316,-95.35900115966797 C2.5250000953674316,-95.35900115966797 -126.64399719238281,-20.430999755859375 -126.64399719238281,-20.430999755859375 C-126.64399719238281,-20.430999755859375 -145.58200073242188,-9.664999961853027 -145.58200073242188,-9.664999961853027 C-145.58200073242188,-9.664999961853027 -145.58200073242188,-95.91999816894531 -145.58200073242188,-95.91999816894531z"></path></g></g><g transform="matrix(1.0000015497207642,0,0,1.0000015497207642,240,239.99993896484375)" opacity="1" style={{display: "block"}}><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(0,0,0)" strokeOpacity="1" strokeWidth="4" d=" M84.66799926757812,36.33000183105469 C84.66799926757812,36.33000183105469 84.9000015258789,-48.46900177001953 84.9000015258789,-48.46900177001953 C84.9000015258789,-48.46900177001953 84.60600280761719,44.069000244140625 84.60600280761719,44.069000244140625 C84.60600280761719,44.069000244140625 84.83599853515625,130.2100067138672 84.83599853515625,130.2100067138672 C84.83599853515625,130.2100067138672 84.66799926757812,36.33000183105469 84.66799926757812,36.33000183105469z"></path></g></g><g transform="matrix(1.0000015497207642,0,0,1.0000015497207642,240,239.9989471435547)" opacity="1" style={{display: "block"}}><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(0,0,0)" strokeOpacity="1" strokeWidth="4" d=" M-200,21.750999450683594 C-200,21.750999450683594 -118.79399871826172,68.8759994506836 -118.79399871826172,68.8759994506836 C-118.79399871826172,68.8759994506836 -118.79399871826172,162.39999389648438 -118.79399871826172,162.39999389648438 C-118.79399871826172,162.39999389648438 -200,115.19999694824219 -200,115.19999694824219 C-200,115.19999694824219 -200,21.750999450683594 -200,21.750999450683594z"></path></g></g><g transform="matrix(1.0000015497207642,0,0,1.0000015497207642,240,239.99993896484375)" opacity="1" style={{display: "block"}}><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(0,0,0)" strokeOpacity="1" strokeWidth="4" d=" M84.29199981689453,36.47800064086914 C84.29199981689453,36.47800064086914 199.2989959716797,36.47800064086914 199.2989959716797,36.47800064086914 C199.2989959716797,36.47800064086914 199.2989959716797,130 199.2989959716797,130 C199.2989959716797,130 84.71199798583984,130 84.71199798583984,130 C84.71199798583984,130 84.32599639892578,44 84.32599639892578,44 C84.32599639892578,44 84.29199981689453,36.47800064086914 84.29199981689453,36.47800064086914z"></path></g></g><g transform="matrix(1.0000015497207642,0,0,1.0000015497207642,240,239.99993896484375)" opacity="1" style={{display: "block"}}><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(0,0,0)" strokeOpacity="1" strokeWidth="4" d=" M-145.45700073242188,-162.2100067138672 C-145.45700073242188,-162.2100067138672 -145.406005859375,-95.70999908447266 -145.406005859375,-95.70999908447266 C-145.406005859375,-95.70999908447266 -145.41000366210938,-9.937999725341797 -145.41000366210938,-9.937999725341797 C-145.41000366210938,-9.937999725341797 -145.32699584960938,-75.93800354003906 -145.32699584960938,-75.93800354003906 C-145.32699584960938,-75.93800354003906 -145.45700073242188,-154.68800354003906 -145.45700073242188,-154.68800354003906 C-145.45700073242188,-154.68800354003906 -145.45700073242188,-162.2100067138672 -145.45700073242188,-162.2100067138672z"></path></g></g><g transform="matrix(1.0000015497207642,0,0,1.0000015497207642,240.00099182128906,239.99993896484375)" opacity="1" style={{display: "block"}}><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(0,0,0)" strokeOpacity="1" strokeWidth="4" d=" M-118.79399871826172,68.8759994506836 C-118.79399871826172,68.8759994506836 84.71199798583984,-48.51499938964844 84.71199798583984,-48.51499938964844 C84.71199798583984,-48.51499938964844 84.29199981689453,36.47800064086914 84.29199981689453,36.47800064086914 C84.29199981689453,36.47800064086914 84.32599639892578,44 84.32599639892578,44 C84.32599639892578,44 -118.79399871826172,162.39999389648438 -118.79399871826172,162.39999389648438 C-118.79399871826172,162.39999389648438 -118.79399871826172,68.8759994506836 -118.79399871826172,68.8759994506836z"></path></g></g><g transform="matrix(1.0000015497207642,0,0,1.0000015497207642,240,239.99993896484375)" opacity="1" style={{display: "block"}}><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(0,0,0)" strokeOpacity="1" strokeWidth="4" d=" M-145.58200073242188,-95.91999816894531 C-145.58200073242188,-95.91999816894531 -145.58200073242188,-161.97900390625 -145.58200073242188,-161.97900390625 C-145.58200073242188,-161.97900390625 200,-162.39999389648438 200,-162.39999389648438 C200,-162.39999389648438 199.2989959716797,36.47800064086914 199.2989959716797,36.47800064086914 C199.2989959716797,36.47800064086914 84.29199981689453,36.47800064086914 84.29199981689453,36.47800064086914 C84.29199981689453,36.47800064086914 84.71299743652344,-48.51499938964844 84.71299743652344,-48.51499938964844 C84.71299743652344,-48.51499938964844 -118.79399871826172,68.8759994506836 -118.79399871826172,68.8759994506836 C-118.79399871826172,68.8759994506836 -200,21.750999450683594 -200,21.750999450683594 C-200,21.750999450683594 2.5250000953674316,-95.35900115966797 2.5250000953674316,-95.35900115966797 C2.5250000953674316,-95.35900115966797 -145.58200073242188,-95.91999816894531 -145.58200073242188,-95.91999816894531z"></path></g></g></g></g></g></svg>
                        </motion.div>

                        <p className="text-xl md:text-2xl poppins-medium text-black/70 leading-[1.4] pr-2 xl:pr-0">
                            Not separate departments. One integrated team building one unified brand.
                        </p>
                        
                        {/* High-Tech Scramble Button Matching Hero */}
                        <div className="mt-4">
                            <ScrambleButton href="#contact" text="GET STARTED" />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default ChallengeSection;
