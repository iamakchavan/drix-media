import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrambleButtonPrimary = ({ text }: { text: string }) => {
  return (
    <motion.button
      type="submit"
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" },
        hover: { clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 16px)", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
      }}
      className="group relative flex items-center justify-center bg-[#AFFF00] h-[54px] md:h-[64px] px-8 md:px-12 transition-colors duration-500 overflow-hidden w-full lg:w-auto"
    >
      <motion.div 
        variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 bg-white w-full h-full"
      />
      
      <div className="relative z-10 flex h-full items-center justify-center overflow-hidden w-full">
        <div className="opacity-0 pointer-events-none flex items-center gap-2 text-[13px] md:text-[14px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">
          <span>{text}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </div>
        
        <motion.div
          variants={{
            initial: { y: "0%" },
            hover: { y: "-100%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] md:text-[14px] tracking-[0.2em] uppercase font-bold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] group-hover:rotate-45 transition-transform duration-500 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
        
        <motion.div
          variants={{
            initial: { y: "100%" },
            hover: { y: "0%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] md:text-[14px] tracking-[0.2em] uppercase font-bold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] -rotate-45 group-hover:rotate-0 transition-transform duration-500 delay-75 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
      </div>
    </motion.button>
  );
};


const EyeSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["min(-10%, -50px)", "0%"]);

    return (
        <section ref={sectionRef} className="relative w-full bg-[#050505] overflow-hidden flex flex-col justify-center py-20 md:py-32 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
            
            {/* Cinematic Parallax Background Image */}
            <motion.div 
               style={{ y: backgroundY }}
               className="absolute inset-0 z-0 origin-bottom opacity-60"
            >
                <img
                    decoding="auto"
                    loading="lazy"
                    src="https://framerusercontent.com/images/rp4zyOdeyfzpa7PQUF4DNepU80.jpg"
                    alt="Eye structure"
                    className="w-full h-[120%] object-cover object-center drop-grayscale grayscale"
                />
                <div className="absolute inset-0 bg-[#050505]/60 block"></div>
                {/* Heavy gradient mask to sink the image perfectly into the black background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent"></div>
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col h-full bg-transparent border-t border-white/10 pt-16 md:pt-20">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start w-full">
                    
                    {/* Left Column: Headline & Info */}
                    <div className="flex flex-col">
                        {/* Top Label */}
                        <div className="flex items-center gap-3 mb-8 md:mb-12">
                            <span className="w-2 h-2 bg-[#AFFF00] shadow-[0_0_10px_rgba(175,255,0,0.5)]"></span>
                            <span className="text-[#AFFF00] text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase">
                               Contact Us
                            </span>
                        </div>
                        
                        <h2 className="text-5xl md:text-6xl lg:text-[6.5rem] font-medium tracking-tight text-white leading-[0.95] text-left mb-8 md:mb-10">
                            Ready to build<br/>
                            <span className="text-white/30 hidden md:inline">something </span>
                            <span className="text-white/30 md:hidden">someth- <br/> ing </span>
                            that <br className="hidden lg:block"/> works?
                        </h2>

                        <div className="flex flex-col max-w-sm w-full border-l border-[#AFFF00]/50 pl-6 md:pl-8">
                            <p className="text-white/50 text-[15px] leading-relaxed font-medium">
                                Book a free strategy call and let's talk about where your brand can go.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Brutalist Form */}
                    <div className="flex flex-col w-full bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12">
                        <form className="flex flex-col w-full" onSubmit={(e) => e.preventDefault()}>
                            
                            {/* Name */}
                            <div className="group relative w-full mb-8 md:mb-10">
                                <label className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#AFFF00] mb-3 block">01 // Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/20 focus:outline-none focus:border-[#AFFF00] transition-colors duration-500 text-lg md:text-xl font-medium rounded-none"
                                />
                            </div>
                            
                            {/* Email */}
                            <div className="group relative w-full mb-8 md:mb-10">
                                <label className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#AFFF00] mb-3 block">02 // E-mail</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/20 focus:outline-none focus:border-[#AFFF00] transition-colors duration-500 text-lg md:text-xl font-medium rounded-none"
                                />
                            </div>

                            {/* Message */}
                            <div className="group relative w-full mb-10 md:mb-12">
                                <label className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#AFFF00] mb-3 block">03 // Message</label>
                                <textarea
                                    required
                                    placeholder="Tell us about your project..."
                                    className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/20 focus:outline-none focus:border-[#AFFF00] transition-colors duration-500 text-lg md:text-xl font-medium resize-none h-[40px] min-h-[40px] rounded-none"
                                />
                            </div>
                            
                            {/* Submit Button Component copied exactly from Hero logic */}
                            <div className="w-full">
                                <ScrambleButtonPrimary text="Get in touch" />
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EyeSection;
