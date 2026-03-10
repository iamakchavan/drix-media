import React from 'react';
import { motion } from 'framer-motion';

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

const ProcessSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFAFA] py-16 md:py-20 px-6 md:px-12 text-[#0C0C0C] font-sans relative">
      <div className="max-w-[1600px] mx-auto">

        {/* Condensed Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-black/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-6 bg-[#AFFF00] rounded-full shadow-[0_0_10px_rgba(175,255,0,0.5)]"></div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase">
              Our <span className="text-black/20">Methodology</span>
            </h2>
          </div>
          <p className="text-[#0C0C0C]/40 text-sm md:text-base font-medium max-w-xs md:text-right">
            Five steps to bridge the gap between strategy and execution.
          </p>
        </div>

        {/* Compact Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-[#0C0C0C] border border-white/5 p-8 flex flex-col items-center text-center hover:border-[#AFFF00]/30 transition-all duration-500 rounded-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              {/* Corner Accent */}
              <div className="absolute top-4 right-4 text-[#AFFF00] opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1H11V11" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              {/* Number Badge - Small & Elegant */}
              <div className="mb-6">
                <span className="text-xs font-black tracking-widest text-[#AFFF00] opacity-40 group-hover:opacity-100 transition-all">
                  STEP {step.number}
                </span>
              </div>

              {/* Title & Short Description */}
              <h3 className="text-xl font-bold mb-3 tracking-tight text-white group-hover:text-[#AFFF00] transition-colors">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                {step.description}
              </p>

              {/* Hover Visual - Expanding underline */}
              <div className="mt-8 w-8 h-1 bg-white/5 group-hover:w-16 group-hover:bg-[#AFFF00] transition-all duration-500 rounded-full"></div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA Bar - Very low profile */}
        <div className="mt-12 flex justify-center">
          <a href="#" className="flex items-center gap-3 py-3 px-6 rounded-full bg-black text-white hover:bg-[#AFFF00] hover:text-black transition-all duration-300 shadow-xl group">
            <span className="font-bold text-xs uppercase tracking-widest">Book Strategy Call</span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <path d="M4 4V13C4 16.866 7.13401 20 11 20H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
              <path d="M16 16L20 20L16 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;