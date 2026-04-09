import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrambleButton = ({ text, href }: { text: string; href: string }) => (
  <motion.a
    href={href}
    initial="initial"
    whileHover="hover"
    variants={{
      initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" },
      hover: { clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 16px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
    }}
    className="group relative flex items-center justify-center bg-black h-[54px] md:h-[64px] px-10 md:px-12 overflow-hidden"
  >
    <motion.div variants={{ initial: { y: "100%" }, hover: { y: "0%" } }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 bg-white w-full h-full" />
    <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
      <div className="opacity-0 pointer-events-none flex items-center gap-2 text-[13px] tracking-[0.25em] uppercase font-semibold whitespace-nowrap">
        <span>{text}</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
      </div>
      <motion.div variants={{ initial: { y: "0%" }, hover: { y: "-100%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }} className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] tracking-[0.25em] uppercase font-semibold text-[#AFFF00] whitespace-nowrap">
        <span>{text}</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-45 group-hover:scale-[1.4] transition-transform duration-500"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
      </motion.div>
      <motion.div variants={{ initial: { y: "100%" }, hover: { y: "0%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }} className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] tracking-[0.25em] uppercase font-bold text-black whitespace-nowrap">
        <span>{text}</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45 group-hover:rotate-45 group-hover:scale-[1.4] transition-transform duration-500 delay-75"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
      </motion.div>
    </div>
  </motion.a>
);

// Engineered corner bracket SVG
const CornerBracket = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M0 20 L0 0 L20 0" stroke="#AFFF00" strokeWidth="1.5" strokeOpacity="0.6"/>
  </svg>
);

const wordsVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const lineReveal = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const ChallengeSection: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const painPoints = [
    {
      index: '01',
      label: 'The Reality',
      body: <>Your product is solid. Your team is talented.<br /><span className="text-[#AFFF00]">But something is missing.</span></>,
    },
    {
      index: '02',
      label: 'The Symptoms',
      body: <>Branding feels generic. Content is not connecting. Campaigns are not converting.<br /><span className="text-white/80">Working with five agencies creates chaos.</span></>,
    },
    {
      index: '03',
      label: 'The Root Cause',
      body: <>Disconnected services create <span className="text-white italic">disconnected brands.</span><br />You need alignment.</>,
    },
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-[#080808] text-white pt-28 md:pt-44 pb-0 selection:bg-[#AFFF00] selection:text-black poppins-regular overflow-hidden">

      {/* Subtle green glow */}
      <motion.div style={{ y: yParallax }} className="absolute right-[-10%] top-[15%] w-[600px] h-[600px] bg-[#094B28] rounded-full blur-[220px] opacity-15 pointer-events-none" />

      {/* Engineered background grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 border-l border-white/60" style={{ left: `${(i + 1) * 12.5}%` }} />
        ))}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute left-0 right-0 border-t border-white/60" style={{ top: `${(i + 1) * 8.33}%` }} />
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="mb-20 md:mb-32"
        >
          {/* Top rule with label */}
          <div className="flex items-center gap-4 mb-12">
            <motion.div variants={lineReveal} className="h-px bg-white/20 flex-1 origin-left" />
            <motion.span variants={wordsVariants} className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30 whitespace-nowrap">
              SEC — 02 / DIAGNOSIS
            </motion.span>
            <motion.div variants={lineReveal} className="h-px bg-white/20 w-12 origin-left" />
          </div>

          {/* Main heading with engineered frame */}
          <div className="relative">
            {/* Corner brackets */}
            <CornerBracket className="absolute -top-3 -left-3" />
            <CornerBracket className="absolute -top-3 -right-3 rotate-90" />
            <CornerBracket className="absolute -bottom-3 -left-3 -rotate-90" />
            <CornerBracket className="absolute -bottom-3 -right-3 rotate-180" />

            <div className="px-4 py-2">
              <h2 className="text-[clamp(3rem,9vw,9rem)] mona-sans-condensed-medium tracking-tighter leading-[0.9]">
                <div className="overflow-hidden">
                  <motion.span variants={wordsVariants} className="inline-block">Most Brands Face</motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span variants={wordsVariants} className="inline-block text-white/25">The Same Challenge.</motion.span>
                </div>
              </h2>
            </div>
          </div>

          {/* Bottom rule */}
          <div className="flex items-center gap-4 mt-12">
            <motion.div variants={lineReveal} className="h-px bg-[#AFFF00]/30 w-8 origin-left" />
            <motion.div variants={lineReveal} className="h-px bg-white/10 flex-1 origin-left" />
            <motion.span variants={wordsVariants} className="text-[10px] font-mono tracking-[0.3em] text-white/20">
              X:0000 / Y:0000
            </motion.span>
          </div>
        </motion.div>

        {/* ── PAIN POINTS — stacked rows with ruled lines ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          className="mb-0"
        >
          {painPoints.map((point, i) => (
            <motion.div
              key={point.index}
              variants={wordsVariants}
              className="group relative grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr_auto] items-start gap-6 md:gap-12 py-10 md:py-14 border-t border-white/[0.08] hover:border-white/20 transition-colors duration-500"
            >
              {/* Animated left accent line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-px bg-[#AFFF00] origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              />

              {/* Index + label */}
              <div className="flex flex-col gap-1 pl-4 pt-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#AFFF00]/60">{point.index}</span>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 whitespace-nowrap hidden md:block">{point.label}</span>
              </div>

              {/* Body text */}
              <p className="text-2xl md:text-3xl lg:text-[2.6rem] mona-sans-medium leading-[1.25] text-white/35 group-hover:text-white/70 transition-colors duration-700 tracking-tight">
                {point.body}
              </p>

              {/* Right — engineering tick marks (desktop only) */}
              <div className="hidden md:flex flex-col items-end justify-between self-stretch py-1 gap-1 opacity-20 group-hover:opacity-50 transition-opacity duration-500">
                {[...Array(5)].map((_, t) => (
                  <div key={t} className={`bg-white/60 ${t === 2 ? 'w-6 h-px' : 'w-3 h-px'}`} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Bottom rule after last row */}
          <motion.div variants={lineReveal} className="h-px bg-white/[0.08] origin-left" />
        </motion.div>

        {/* ── SOLUTION BLOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 relative"
        >
          {/* Engineered frame lines on solution block */}
          <div className="absolute -top-px left-0 right-0 flex items-center gap-3 pointer-events-none">
            <div className="w-8 h-px bg-[#AFFF00]/60" />
            <span className="text-[9px] font-mono tracking-[0.35em] text-[#AFFF00]/50 uppercase">Solution.sys</span>
            <div className="flex-1 h-px bg-[#AFFF00]/20" />
            <div className="w-2 h-2 border border-[#AFFF00]/40 rotate-45" />
          </div>

          <div className="w-full bg-[#AFFF00] p-10 md:p-20 lg:p-28 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-16 relative overflow-hidden">

            {/* Engineered grid overlay on green block */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute top-0 bottom-0 border-l border-black" style={{ left: `${(i + 1) * 16.66}%` }} />
              ))}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute left-0 right-0 border-t border-black" style={{ top: `${(i + 1) * 12.5}%` }} />
              ))}
            </div>

            {/* Corner brackets on green block */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-black/20" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-black/20" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-black/20" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-black/20" />

            <div className="flex flex-col max-w-4xl relative z-10">
              <div className="flex items-center gap-3 mb-10 md:mb-16">
                <div className="w-1.5 h-1.5 bg-black/40" />
                <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-black/50">Our Solution</span>
                <div className="w-12 h-px bg-black/20" />
              </div>
              <h2 className="text-[clamp(4rem,11vw,11rem)] mona-sans-condensed-medium tracking-tighter leading-[0.85] text-black mb-10 md:mb-14">
                Under<br className="hidden md:block" /> One Roof.
              </h2>
              <p className="text-2xl md:text-3xl lg:text-[2.8rem] mona-sans-medium text-black/70 leading-[1.15] tracking-tight max-w-3xl">
                Strategy, design, content, and execution working together as{' '}
                <span className="underline decoration-black/20 underline-offset-[10px]">one system.</span>
              </p>
            </div>

            <div className="flex flex-col xl:items-end gap-8 relative z-10 pb-2">
              {/* Engineered data readout */}
              <div className="flex flex-col gap-2 xl:items-end mb-4">
                {[['STATUS', 'ACTIVE'], ['MODE', 'INTEGRATED'], ['OUTPUT', 'UNIFIED']].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3">
                    <span className="text-[9px] font-mono tracking-[0.3em] text-black/30">{k}</span>
                    <div className="w-8 h-px bg-black/20" />
                    <span className="text-[9px] font-mono tracking-[0.3em] text-black/60">{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-lg md:text-xl poppins-medium text-black/60 leading-[1.5] max-w-xs xl:text-right">
                Not separate departments. One integrated team building one unified brand.
              </p>
              <ScrambleButton href="#contact" text="GET STARTED" />
            </div>
          </div>

          {/* Bottom engineering label */}
          <div className="flex items-center gap-3 mt-0 pt-3 border-t border-white/[0.06]">
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/15">END — CHALLENGE.SECTION</span>
            <div className="flex-1 h-px bg-white/[0.04]" />
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/10">©DRIX</span>
          </div>
        </motion.div>

      </div>

      {/* Bottom spacer */}
      <div className="h-24 md:h-32" />
    </section>
  );
};

export default ChallengeSection;
