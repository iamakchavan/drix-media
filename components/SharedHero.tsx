import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const premiumEasing = [0.16, 1, 0.3, 1];

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
        hover: { clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 16px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
      }}
      className="group relative flex items-center justify-center bg-[#AFFF00] h-[54px] px-10 transition-colors duration-500 overflow-hidden"
    >
      <motion.div 
        variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
            hover: { y: "-100%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 w-full h-full text-[13px] tracking-[0.25em] uppercase font-semibold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] group-hover:rotate-45 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
        
        <motion.div
          variants={{
            initial: { y: "100%" },
            hover: { y: "0%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 w-full h-full text-[13px] tracking-[0.25em] uppercase font-bold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] -rotate-45 group-hover:rotate-45 transition-transform duration-500 delay-75 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
      </div>
    </motion.a>
  );
};

export const PremiumAurora = () => (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">

        {/* Primary green orb — top right, rich and deep */}
        <div className="absolute top-[-15%] right-[-5%] w-[65vw] h-[65vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(175,255,0,0.18) 0%, rgba(175,255,0,0.06) 40%, transparent 70%)', filter: 'blur(60px)' }} />

        {/* Secondary green orb — mid left, softer */}
        <div className="absolute top-[20%] left-[-15%] w-[50vw] h-[50vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(175,255,0,0.08) 0%, transparent 65%)', filter: 'blur(80px)' }} />

        {/* Deep teal/green underlayer for depth */}
        <div className="absolute bottom-[-10%] right-[10%] w-[55vw] h-[40vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(9,75,40,0.35) 0%, transparent 70%)', filter: 'blur(100px)' }} />

        {/* Specular highlight — top center, like light hitting glass */}
        <div className="absolute top-0 left-[20%] w-[60vw] h-[30vh] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        {/* Global Cinematic Noise Overlay — Ultra-fine refined grain */}
        <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03] mix-blend-soft-light" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* Glassy sheen overlay — diagonal light sweep */}
        <div className="absolute inset-0"
            style={{ background: 'linear-gradient(125deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 30%, transparent 55%, rgba(175,255,0,0.03) 100%)' }} />

        {/* Vignette — keeps edges dark and cinematic */}
        <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
    </div>
);

export const SharedHeroLayout = ({
    titleLines,
    subtextContent,
    buttonText,
    buttonHref,
    bottomLabel,
    children,
}: {
    titleLines: React.ReactNode;
    subtextContent: React.ReactNode;
    buttonText?: string;
    buttonHref?: string;
    bottomLabel: string;
    children?: React.ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const yOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-[#050505] flex flex-col pt-[16svh] md:pt-[22vh] pb-[8svh] md:pb-[140px] z-0 overflow-hidden min-h-[90svh] md:min-h-0">
            <PremiumAurora />
            {children}

            <motion.div 
                style={{ opacity: yOpacity }}
                className="relative z-10 flex-grow flex flex-col justify-between px-6 md:px-12 lg:px-20 w-full max-w-[120rem] mx-auto min-h-0 md:min-h-0"
            >
                <div className="flex-grow flex flex-col justify-center md:justify-start relative w-full pt-6 md:pt-10 z-10">
                    
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
                        className="w-full flex justify-start md:justify-end mt-8 md:mt-12 relative"
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
                style={{ opacity: yOpacity }}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.6, delay: 0.9, ease: premiumEasing }}
                className="absolute bottom-[80px] md:bottom-[120px] left-6 text-white/20 text-[10px] uppercase tracking-widest font-bold hidden md:block"
            >
                {bottomLabel}
            </motion.div>
        </div>
    );
};

