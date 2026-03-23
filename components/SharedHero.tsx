import React from 'react';
import { motion } from 'framer-motion';

export const premiumEasing = [0.19, 1, 0.22, 1];

export const letterVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8, filter: "blur(12px)" },
    show: { 
        opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
        transition: { duration: 1.4, ease: premiumEasing } 
    }
};

export const staggerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
};

export const ScrambleButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <motion.a
      href={href}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" },
        hover: { clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 16px)", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
      }}
      className="group relative flex items-center justify-center bg-[#AFFF00] h-[54px] px-10 transition-colors duration-500 overflow-hidden"
    >
      <motion.div 
        variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 bg-white w-full h-full"
      />
      
      <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
        <div className="opacity-0 pointer-events-none flex items-center gap-2 text-[13px] tracking-[0.25em] uppercase font-semibold whitespace-nowrap">
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </div>
        <motion.div
          variants={{
            initial: { y: "0%" },
            hover: { y: "-100%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 w-full h-full text-[13px] tracking-[0.25em] uppercase font-semibold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] group-hover:rotate-45 group-hover:scale-[1.4] transition-transform duration-500 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
        
        <motion.div
          variants={{
            initial: { y: "100%" },
            hover: { y: "0%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 w-full h-full text-[13px] tracking-[0.25em] uppercase font-bold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] -rotate-45 group-hover:rotate-45 group-hover:scale-[1.4] transition-transform duration-500 delay-75 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
      </div>
    </motion.a>
  );
};

export const SharedHeroLayout = ({
    titleLines,
    subtextContent,
    buttonText,
    buttonHref,
    bottomLabel,
}: {
    titleLines: React.ReactNode;
    subtextContent: React.ReactNode;
    buttonText?: string;
    buttonHref?: string;
    bottomLabel: string;
}) => (
    <div className="relative w-full bg-[#050505] flex flex-col pt-[180px] md:pt-[22vh] pb-[60px] md:pb-[140px] z-0 overflow-hidden min-h-[70vh] lg:min-h-[85vh]">
        
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Subtle Aurora effect to match home */}
            <motion.div 
              animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#AFFF00] blur-[150px] mix-blend-screen opacity-10" 
            />
            {/* Premium SVG Noise Overlay */}
            <div 
              className="absolute inset-0 opacity-10 mix-blend-plus-lighter" 
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
        </div>

        <motion.div 
            className="relative z-10 flex-grow flex flex-col justify-between px-6 md:px-12 lg:px-20 w-full max-w-[120rem] mx-auto"
        >
            <div className="flex-grow flex flex-col justify-start relative w-full pt-4 md:pt-10 z-10">
                
                <div className="flex flex-col w-full relative z-10">
                    <motion.h1 
                        variants={staggerVariants}
                        initial="hidden"
                        animate="show"
                        className="text-[9.5vw] sm:text-[9vw] md:text-[6.5vw] lg:text-[5.75vw] xl:text-[5.5vw] leading-[1.05] md:leading-[1] mona-sans-condensed-bold text-white tracking-tighter w-full flex flex-col items-start"
                    >
                        {titleLines}
                    </motion.h1>
                </div>
                
                <motion.div 
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0, y: 60, scale: 0.98, filter: "blur(8px)" },
                        show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 1.6, delay: 0.6, ease: premiumEasing } }
                    }}
                    className="w-full flex justify-start md:justify-end mt-10 md:mt-12 relative"
                >
                    <div className="w-full lg:w-[85%] xl:w-[75%] flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-8">
                        
                        {/* Text Content */}
                        <div className="w-full md:flex-1 flex items-start gap-4 pr-4">
                            <span className="text-white/40 text-xl font-light mt-0 transform translate-y-[-2px]">+</span>
                            <div className="flex flex-col gap-1 text-white/60 text-sm md:text-base leading-relaxed tracking-wide font-medium mt-[-2px]">
                                {subtextContent}
                            </div>
                        </div>

                        {/* Button explicitly aligned right to match precise reference design */}
                        {buttonText && buttonHref && (
                            <motion.div className="flex-shrink-0 flex items-center justify-start md:justify-end mt-4 md:mt-0">
                                <ScrambleButton href={buttonHref} text={buttonText} />
                            </motion.div>
                        )}
                        
                    </div>
                </motion.div>
                
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.9, ease: premiumEasing }}
            className="absolute bottom-4 left-6 text-white/20 text-[10px] uppercase tracking-widest font-bold hidden md:block"
        >
            {bottomLabel}
        </motion.div>
    </div>
);
