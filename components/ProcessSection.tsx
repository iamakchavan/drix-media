import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your audience needs."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Defining positioning and direction."
  },
  {
    number: "03",
    title: "Creation",
    description: "Bringing identity to life via design."
  },
  {
    number: "04",
    title: "Execution",
    description: "Launching and scaling performance."
  },
  {
    number: "05",
    title: "Growth",
    description: "Continuous refinement via data."
  }
];

const ScrambleButtonDark = ({ text, href }: { text: string; href: string }) => {
  return (
    <motion.a
      href={href}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" },
        hover: { clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 16px)", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
      }}
      className="group relative flex items-center justify-center bg-white h-[54px] md:h-[64px] px-10 md:px-12 transition-colors duration-500 overflow-hidden"
    >
      <motion.div 
        variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 bg-[#AFFF00] w-full h-full"
      />
      
      <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
        <div className="opacity-0 pointer-events-none flex items-center gap-2 text-[13px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">
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
    </motion.a>
  );
};

const ProcessSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-[#050505] text-white font-sans selection:bg-[#AFFF00] selection:text-black">
      
      {/* Header Block */}
      <div className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-12 justify-between items-start md:items-end border-b border-white/10">
        <div className="flex flex-col gap-6">
          <p className="text-[#AFFF00] text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase flex items-center gap-3">
             <span className="w-2 h-2 bg-[#AFFF00] shadow-[0_0_10px_rgba(175,255,0,0.5)]"></span>
             Methodology
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-medium tracking-tight leading-[0.9] text-white">
            Our<br />
            <span className="text-white/30">Process</span>
          </h2>
        </div>
        
        <div className="flex flex-col gap-8 w-full max-w-sm mb-4">
          <p className="text-white/50 text-[14px] md:text-[16px] leading-relaxed font-medium">
            Five steps to bridge the gap between strategy and execution.
          </p>
          <div className="w-max">
            <ScrambleButtonDark text="Book Strategy Call" href="#contact" />
          </div>
        </div>
      </div>

      {/* Split Interactive Viewport */}
      <div className="flex flex-col md:flex-row w-full max-w-[1600px] mx-auto relative">
          
          {/* L: Sticky Viewport (Locks to screen) */}
          <div className="w-full md:w-1/2 sticky top-0 h-[45vh] md:h-screen flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-white/10 bg-[#050505] z-10 overflow-hidden">
             
             {/* Dynamic Odometer Number */}
             <div className="relative h-[160px] md:h-[300px] w-full flex items-center justify-center">
                 <AnimatePresence>
                     <motion.div
                       key={activeIndex}
                       initial={{ y: 80, opacity: 0, filter: 'blur(10px)' }}
                       animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                       exit={{ y: -80, opacity: 0, filter: 'blur(10px)' }}
                       transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                       className="absolute text-[12rem] md:text-[22rem] font-bold text-transparent leading-none"
                       style={{ WebkitTextStroke: '3px rgba(175, 255, 0, 0.9)' }}
                     >
                        {steps[activeIndex].number}
                     </motion.div>
                 </AnimatePresence>
             </div>
             
             {/* Floating Title Sync */}
             <div className="relative h-[40px] md:h-[60px] w-full flex items-center justify-center mt-4 md:mt-10">
                 <AnimatePresence>
                     <motion.div
                       key={activeIndex}
                       initial={{ y: 30, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       exit={{ y: -30, opacity: 0 }}
                       transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.05 }}
                       className="absolute text-2xl md:text-5xl font-medium tracking-tight text-white uppercase"
                     >
                        {steps[activeIndex].title}
                     </motion.div>
                 </AnimatePresence>
             </div>

          </div>

          {/* R: Scrolling Content Triggers */}
          <div className="w-full md:w-1/2 flex flex-col px-6 md:px-20 pb-[30vh] md:pb-[50vh] bg-[#050505]">
              {/* Padding to ensure proper intersection observer firing space */}
              <div className="pt-[15vh] md:pt-[25vh]">
                 {steps.map((step, i) => (
                    <motion.div
                       key={i}
                       viewport={{ amount: 0.6 }} // Triggers when element is 60% into view 
                       onViewportEnter={() => setActiveIndex(i)}
                       className={`min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center transition-all duration-700 ease-[0.19,1,0.22,1] ${activeIndex === i ? 'opacity-100 scale-100' : 'opacity-20 scale-95'}`}
                    >
                       <div className="flex items-center gap-6 mb-8">
                          <div className={`w-3 h-3 rounded-full transition-all duration-700 ${activeIndex === i ? 'bg-[#AFFF00] scale-[1.5] shadow-[0_0_20px_rgba(175,255,0,0.6)]' : 'bg-white/20'}`} />
                          <h4 className={`text-xl md:text-3xl font-bold transition-colors duration-700 tracking-widest uppercase ${activeIndex === i ? 'text-[#AFFF00]' : 'text-white/40'}`}>
                            Phase {step.number}
                          </h4>
                       </div>
                       
                       <p className={`text-3xl md:text-5xl leading-[1.3] tracking-tight font-medium transition-colors duration-700 ${activeIndex === i ? 'text-white' : 'text-white/30'}`}>
                         {step.description}
                       </p>
                    </motion.div>
                 ))}
              </div>
          </div>

      </div>
    </section>
  );
};

export default ProcessSection;
