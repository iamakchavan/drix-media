import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your audience needs.",
    detail: "We dive deep into your market, audience, and competitors. Through stakeholder interviews and data audits, we identify every opportunity your brand can leverage.",
    tags: ["Market Research", "User Interviews", "Competitive Audit"],
    duration: "2–3 weeks",
    deliverable: "Brand Audit Report",
    metric: { value: "40+", label: "data points analyzed" }
  },
  {
    number: "02",
    title: "Strategy",
    description: "Defining positioning and direction.",
    detail: "We turn research into a crystal-clear plan. Your brand gets a positioning framework, messaging architecture, and a channel strategy that connects every touchpoint.",
    tags: ["Brand Positioning", "Content Strategy", "Channel Planning"],
    duration: "1–2 weeks",
    deliverable: "Strategy Playbook",
    metric: { value: "3x", label: "faster alignment" }
  },
  {
    number: "03",
    title: "Creation",
    description: "Bringing identity to life via design.",
    detail: "From visual identity to interactive prototypes, we craft every pixel with purpose. Design systems, UI components, and brand assets all built for scale.",
    tags: ["Visual Identity", "UI/UX Design", "Prototyping"],
    duration: "3–5 weeks",
    deliverable: "Design System & Prototypes",
    metric: { value: "98%", label: "approval rate" }
  },
  {
    number: "04",
    title: "Execution",
    description: "Launching and scaling performance.",
    detail: "Built with precision, tested thoroughly, and ready to perform from day one.",
    tags: ["Development", "QA Testing", "Launch Ops"],
    duration: "4–8 weeks",
    deliverable: "Production-Ready Build",
    metric: { value: "0", label: "launch-day bugs" }
  },
  {
    number: "05",
    title: "Growth",
    description: "Continuous refinement via data.",
    detail: "Launch is just the beginning. We track, refine, and improve to keep performance moving forward.",
    tags: ["Analytics", "A/B Testing", "Optimization"],
    duration: "Ongoing",
    deliverable: "Monthly Growth Reports",
    metric: { value: "2.4x", label: "avg. ROI uplift" }
  }
];

const ScrambleButtonDark = ({ text, href }: { text: string; href: string }) => {
  const clipStyle = {
    clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)"
  };

  return (
    <motion.a
      href={href}
      initial="initial"
      whileHover="hover"
      className="group relative flex items-center justify-center h-[54px] md:h-[64px] px-10 md:px-12 transition-colors duration-500 overflow-hidden"
    >
      {/* Outer Border */}
      <div className="absolute inset-0 bg-white/20 group-hover:bg-[#AFFF00]" style={clipStyle} />
      {/* Inner Mask (1px border) */}
      <div className="absolute inset-[1.5px] bg-white group-hover:bg-[#AFFF00]" style={clipStyle} />

      <motion.div
        variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={clipStyle}
        className="absolute inset-0 bg-[#AFFF00] w-full h-full"
      />

      <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
        <div className="opacity-0 pointer-events-none flex items-center gap-3 text-[13px] md:text-[14px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </div>

        <motion.div
          variants={{
            initial: { y: "0%" },
            hover: { y: "-100%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] md:text-[14px] tracking-[0.2em] uppercase font-bold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] group-hover:rotate-45 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>

        <motion.div
          variants={{
            initial: { y: "100%" },
            hover: { y: "0%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] md:text-[14px] tracking-[0.2em] uppercase font-bold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] -rotate-45 group-hover:rotate-45 transition-transform duration-500 delay-75 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
      </div>
    </motion.a>
  );
};

const ProcessSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-[#050505] text-white poppins-regular selection:bg-[#AFFF00] selection:text-black">

      {/* Header Block */}
      <div className="pt-20 pb-12 md:pt-32 md:pb-20 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-12 justify-between items-start md:items-end border-b border-white/10">
        <div className="flex flex-col gap-6">
          <p className="text-[#AFFF00] text-[11px] md:text-[12px] poppins-bold tracking-[0.2em] uppercase flex items-center gap-3">
            <span className="w-2 h-2 bg-[#AFFF00] shadow-[0_0_10px_rgba(175,255,0,0.5)]"></span>
            Methodology
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-[8rem] mona-sans-condensed-medium tracking-tight leading-[0.9] text-white">
            Our<br />
            <span className="text-white/30">Process</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-sm mb-4">
          <p className="text-white/50 text-[14px] md:text-[16px] leading-relaxed poppins-medium">
            Five steps to bridge the gap between strategy and execution.
          </p>
          <div className="w-full sm:w-max">
            <ScrambleButtonDark text="Book Strategy Call" href="#contact" />
          </div>
        </div>
      </div>

      {/* Split Interactive Viewport */}
      <div className="flex flex-col md:flex-row w-full max-w-[1600px] mx-auto relative">

        {/* L: Sticky Viewport (Locks to screen) */}
        <div className="w-full md:w-1/2 sticky top-[64px] md:top-0 h-[38svh] md:h-screen flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-white/10 bg-[#050505] z-10 overflow-hidden">

          {/* Dynamic Odometer Number — Responsive Stroke */}
          <style>{`
               .process-number { -webkit-text-stroke: 1.2px rgba(175, 255, 0, 0.9); }
               @media (min-width: 768px) { .process-number { -webkit-text-stroke: 3px rgba(175, 255, 0, 0.9); } }
             `}</style>
          <div className="relative h-[120px] md:h-[300px] w-full flex items-center justify-center">
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={{ y: 60, opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -60, opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="process-number absolute text-[8rem] sm:text-[10rem] md:text-[22rem] font-bold text-transparent leading-none"
              >
                {steps[activeIndex].number}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Title Sync */}
          <div className="relative h-[30px] md:h-[60px] w-full flex items-center justify-center mt-2 md:mt-10">
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="absolute text-xl sm:text-2xl md:text-5xl font-medium tracking-tight text-white uppercase"
              >
                {steps[activeIndex].title}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* R: Scrolling Content — Clean Editorial Layout */}
        <div className="w-full md:w-1/2 flex flex-col px-6 md:px-12 lg:px-16 pb-[20vh] md:pb-[50vh] bg-[#050505]">
          <div className="pt-[15vh] md:pt-[25vh]">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                viewport={{ amount: 0.6 }}
                onViewportEnter={() => setActiveIndex(i)}
                className={`min-h-[55vh] md:min-h-[75vh] flex flex-col justify-center transition-all duration-700 ease-[0.16, 1, 0.3, 1] ${activeIndex === i ? 'opacity-100' : 'opacity-15'}`}
              >
                {/* Phase Label */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-2 h-2 transition-all duration-700 ${activeIndex === i ? 'bg-[#AFFF00] shadow-[0_0_12px_rgba(175,255,0,0.5)]' : 'bg-white/20'}`} />
                  <span className={`text-[11px] poppins-bold tracking-[0.25em] uppercase transition-colors duration-700 ${activeIndex === i ? 'text-[#AFFF00]' : 'text-white/30'}`}>
                    Phase {step.number}
                  </span>
                  <span className="flex-1 h-px bg-white/10" />
                  <span className={`text-[11px] poppins-medium tracking-wider uppercase transition-colors duration-700 ${activeIndex === i ? 'text-white/35' : 'text-white/15'}`}>
                    {step.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-4xl md:text-6xl lg:text-7xl mona-sans-condensed-bold tracking-tight leading-[0.95] uppercase mb-6 transition-colors duration-700 ${activeIndex === i ? 'text-white' : 'text-white/25'}`}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className={`text-lg md:text-xl leading-[1.6] poppins-medium max-w-lg mb-10 transition-colors duration-700 ${activeIndex === i ? 'text-white/50' : 'text-white/15'}`}>
                  {step.detail}
                </p>

                {/* Stat Strip */}
                <div className={`flex gap-px transition-all duration-700 ${activeIndex === i ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`flex-1 py-4 px-5 border-l-2 transition-colors duration-700 ${activeIndex === i ? 'border-[#AFFF00]/40 bg-white/[0.02]' : 'border-white/5'}`}>
                    <span className={`block text-[10px] poppins-bold tracking-[0.2em] uppercase mb-2 transition-colors duration-700 ${activeIndex === i ? 'text-white/30' : 'text-white/15'}`}>Deliverable</span>
                    <span className={`block text-sm poppins-semibold transition-colors duration-700 ${activeIndex === i ? 'text-white/80' : 'text-white/25'}`}>{step.deliverable}</span>
                  </div>
                  <div className={`w-px transition-colors duration-700 ${activeIndex === i ? 'bg-white/10' : 'bg-white/5'}`} />
                  <div className={`flex-1 py-4 px-5 border-l-2 transition-colors duration-700 ${activeIndex === i ? 'border-[#AFFF00]/40 bg-white/[0.02]' : 'border-white/5'}`}>
                    <span className={`block text-[10px] poppins-bold tracking-[0.2em] uppercase mb-2 transition-colors duration-700 ${activeIndex === i ? 'text-white/30' : 'text-white/15'}`}>Impact</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-2xl poppins-bold tracking-tight transition-colors duration-700 ${activeIndex === i ? 'text-[#AFFF00]' : 'text-white/25'}`}>{step.metric.value}</span>
                      <span className={`text-[11px] poppins-medium transition-colors duration-700 ${activeIndex === i ? 'text-white/35' : 'text-white/15'}`}>{step.metric.label}</span>
                    </div>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-12 flex items-center gap-3">
                  {steps.map((_, j) => (
                    <div key={j} className={`h-[2px] flex-1 transition-all duration-700 ${j <= activeIndex ? 'bg-[#AFFF00]/50' : 'bg-white/8'}`} />
                  ))}
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;

