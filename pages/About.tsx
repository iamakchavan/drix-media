import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SharedHeroLayout, letterVariants, premiumEasing, ScrambleButton } from '../components/SharedHero';

const AboutHero = () => (
    <SharedHeroLayout
        bottomLabel="The Agency"
        buttonText="WORK WITH US"
        buttonHref="#contact"
        titleLines={
            <>
                <div className="flex flex-wrap items-center overflow-visible pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
                    <span className="flex">
                        {"We Build".split('').map((char, index) => (
                            <motion.span key={`line1-a-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                    <span className="flex text-white/50 italic font-medium">
                        {"Brands".split('').map((char, index) => (
                            <motion.span key={`line1-b-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
                <div className="flex flex-wrap items-center overflow-visible mt-1 md:mt-2 pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
                    <span className="flex text-[#AFFF00]">
                        {"That Matter.".split('').map((char, index) => (
                            <motion.span key={`line2-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
            </>
        }
        subtextContent={
            <>
                <span className="text-white font-semibold block xl:whitespace-nowrap">A creative production agency built on strategy,</span>
                <span className="block xl:whitespace-nowrap">executed with precision, and grown through consistency.</span>
            </>
        }
    >
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
            <motion.span
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[25vw] md:text-[22vw] font-black text-white/[0.02] uppercase tracking-[-0.05em] translate-y-[-5%] mona-sans-condensed-bold"
            >
                ABOUT
            </motion.span>
        </div>
    </SharedHeroLayout>
);

interface WordProps { word: string; progress: any; range: [number, number]; }
const Word: React.FC<WordProps> = ({ word, progress, range }) => {
    const opacity = useTransform(progress, range, [0.08, 1]);
    return (
        <motion.span style={{ opacity }} className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] mona-sans-condensed-medium tracking-tight text-black mr-[0.25em] leading-[1.1]">
            {word}
        </motion.span>
    );
};

const OurStory = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 85%", "center 65%"] });
    const words = "Drix Media was born out of a pivot from chaos to clarity.".split(" ");

    return (
        <section ref={containerRef} className="w-full bg-white pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
            <div className="w-full max-w-[1400px] mx-auto">
                <div className="flex flex-wrap mb-16 md:mb-20">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
                    })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }} className="flex flex-col gap-6">
                        <p className="text-black/55 text-[15px] md:text-[16px] leading-relaxed poppins-regular">
                            Brands don’t need more partners. They need one system that works end to end.
                        </p>
                        <p className="text-black/55 text-[15px] md:text-[16px] leading-relaxed poppins-regular">
                            Drix Media brings strategy, design, and performance together with one clear direction.
                        </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}>
                        <motion.div
                            initial="rest" whileHover="hover"
                            variants={{
                                rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 0%)" },
                                hover: { clipPath: "polygon(24px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 24px)", transition: { duration: 0.35, ease: [0.19, 1, 0.22, 1] } }
                            }}
                            className="bg-[#FAFAFA] border border-black/[0.05] p-8 md:p-10 flex flex-col gap-6"
                        >
                            <p className="text-[1.1rem] md:text-[1.25rem] text-black leading-[1.5] tracking-tight mona-sans-condensed-medium">
                                We don’t measure success by how many clients we have.<br /> We measure it by results. The work either performs, or we refine it until it does.
                            </p>
                            <div className="flex items-center justify-between border-t border-black/[0.06] pt-6">
                                <cite className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/30 not-italic poppins-regular">The Drix Media Philosophy</cite>
                                <ScrambleButton href="/contact" text="WORK WITH US" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const principleIcons = [
    (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
            <rect x="35" y="35" width="30" height="30" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M42 50H58M58 50L52 44M58 50L52 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="65" x2="80" y2="65" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M72 43L79 50L72 57" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="30" y1="28" x2="30" y2="42" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="50" y1="58" x2="50" y2="72" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="14" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" fill="none" />
            <circle cx="55" cy="55" r="14" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" fill="none" />
            <circle cx="40" cy="65" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="65" cy="40" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="80" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M88 43L95 50L88 57" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 50H80M80 50L73 43M80 50L73 57" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 30L60 30" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 40L70 40" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 60L70 60" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 70L60 70" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
            <path d="M40 40L60 60M60 40L40 60" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="78" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M85 43L92 50L85 57" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
];

const values = [
    { 
        title: "Strategy First", 
        desc: "We don't design for aesthetics alone; we design with purpose.", 
        keyword: "PURPOSE", 
        bentoClass: "md:col-span-8 md:row-span-2", 
        theme: "dark",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    },
    { 
        title: "Integrated Systems", 
        desc: "Strategy, design, and execution work as one unit. No disconnected partners. No dropped handoffs.", 
        keyword: "UNIFIED", 
        bentoClass: "md:col-span-4", 
        theme: "dark",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800"
    },
    { 
        title: "Results Over Rank", 
        desc: "We focus on what actually delivers results.", 
        keyword: "IMPACT", 
        bentoClass: "md:col-span-4", 
        theme: "green",
        image: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=800"
    },
    { 
        title: "Transparency Always", 
        desc: "You will always know what we are working on, why we are doing it, and how it is performing.", 
        keyword: "CLARITY", 
        bentoClass: "md:col-span-6", 
        theme: "dark",
        image: "https://images.unsplash.com/photo-1454165833762-02c0f1359670?auto=format&fit=crop&q=80&w=800"
    },
    { 
        title: "Long-Term Thinking", 
        desc: "We are not here for quick wins. We build systems and strategies that grow with your business.", 
        keyword: "GROWTH", 
        bentoClass: "md:col-span-6", 
        theme: "dark",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
    }
];

const PrincipleCard: React.FC<{ value: typeof values[0], iconIndex: number }> = ({ value, iconIndex }) => {
    const isGreen = value.theme === "green";
    
    // Main Card Colors for Sleek Dark Theme
    let bgClass = "bg-[#0A0A0A] border border-white/5 group-hover:border-[#AFFF00]/30"; 
    let textTitleClass = "text-white";
    let textDescClass = "text-white/40";
    let iconWrapClass = "bg-white/[0.04] text-[#AFFF00]";
    let watermarkClass = "text-white/[0.02]";
    let overlayClass = "bg-black/70 group-hover:bg-black/60";

    if (isGreen) {
        bgClass = "bg-[#AFFF00] border-none";
        textTitleClass = "text-[#050505]";
        textDescClass = "text-[#050505]/70";
        iconWrapClass = "bg-black/[0.1] text-[#050505]";
        watermarkClass = "text-black/[0.04]";
        overlayClass = "bg-[#AFFF00]/80 group-hover:bg-[#AFFF00]/70";
    }

    // A beautiful chamfered corner only on the bottom right
    const clipPath = "polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: iconIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`group w-full h-full flex transition-all duration-500`}
        >
            <div 
                className={`w-full h-full flex flex-col p-6 md:p-8 ${bgClass} relative overflow-hidden transition-all duration-700 min-h-[280px] shadow-2xl`}
                style={{ clipPath }}
            >
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={value.image} 
                        alt={value.title} 
                        className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${isGreen ? 'grayscale brightness-[1.2]' : 'grayscale opacity-30 group-hover:opacity-40'}`}
                    />
                    <div className={`absolute inset-0 transition-colors duration-500 ${overlayClass}`} />
                </div>

                {/* Top Section: Index and Icon */}
                <div className="flex items-start justify-between relative z-10 w-full mb-12 md:mb-16">
                    <span className="text-[11px] md:text-[13px] font-bold tracking-[0.2em] uppercase opacity-40 font-mono text-inherit">
                        0{iconIndex + 1}
                    </span>
                    <div className={`w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-[12px] flex items-center justify-center p-2 md:p-2.5 transition-transform duration-500 group-hover:scale-110 ${iconWrapClass}`}>
                        {principleIcons[iconIndex]}
                    </div>
                </div>

                {/* Ambient Watermark */}
                <div className={`absolute -right-4 -bottom-4 text-[4.5rem] md:text-[6rem] font-black leading-none uppercase tracking-tighter ${watermarkClass} select-none pointer-events-none mona-sans-condensed-bold z-0 transition-transform duration-1000 group-hover:scale-110 origin-bottom-right`}>
                    {value.keyword}
                </div>

                {/* Content Area */}
                <div className="flex flex-col mt-auto relative z-10">
                    <h3 className={`text-[1.2rem] md:text-[1.5rem] ${textTitleClass} tracking-tight mb-3 font-semibold leading-[1.1] mona-sans-condensed-medium uppercase`}>
                        {value.title}
                    </h3>
                    <p className={`${textDescClass} text-[12px] md:text-[14px] leading-[1.5] poppins-regular max-w-[95%]`}>
                        {value.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const OurValues = () => (
    <section className="w-full bg-[#050505] relative pt-16 pb-20 md:pt-28 md:pb-32 font-sans selection:bg-[#AFFF00] selection:text-black">
        {/* Subtle grid backdrop for dark aesthetic */}
        <div className="absolute inset-0 z-0 flex justify-center pointer-events-none opacity-[0.03]">
            <div className="w-[1px] h-full bg-white absolute left-[20%]"></div>
            <div className="w-[1px] h-full bg-white absolute left-[50%]"></div>
            <div className="w-[1px] h-full bg-white absolute left-[80%]"></div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-14 md:gap-20">
            
            {/* Header Area */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between border-b border-white/10 pb-10 gap-6 xl:gap-0">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular mb-1 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-[#AFFF00]"></span> The Blueprint
                    </span>
                    <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] tracking-tight text-white leading-[0.9] mona-sans-condensed-medium font-normal">
                        Our Core Principles
                    </h2>
                </div>
                <p className="xl:text-right text-[14px] md:text-[16px] text-white/40 max-w-[340px] leading-relaxed poppins-regular">
                    We don't just solve problems.<br />We align creativity with business growth.
                </p>
            </div>

            {/* Dark Theme Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 w-full items-stretch relative">
                {values.map((v, i) => (
                    <div className={v.bentoClass} key={i}>
                        <PrincipleCard value={v} iconIndex={i} />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const differences = [
    { title: "One Team\nAll Verticals", desc: "Strategy, design, content, and production, all handled together. Everything moves with one clear direction.", keyword: "UNIFIED" },
    { title: "Focused\nGrowth", desc: "We stay focused on helping you grow.", keyword: "FOCUSED" },
    { title: "Candid\nGuidance", desc: "If something doesn’t move your business forward, we’ll tell you. Straight, honest counsel is always part of the work.", keyword: "CANDID" },
    { title: "Efficient\nExecution", desc: "We move fast and iterate faster. Your brand refresh shouldn't take six months.", keyword: "DRIVEN" },
];

const WhatMakesUsDifferent = () => {
    const [hoverIndex, setHoverIndex] = React.useState(0);
    return (
        <section className="w-full bg-[#050505] py-16 md:py-40 selection:bg-[#AFFF00] selection:text-black overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-12 md:mb-20">
                <div className="flex flex-col gap-5">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular flex items-center gap-3"><span className="w-2 h-2 bg-[#AFFF00]"></span> The Edge</span>
                    <h2 className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] tracking-tight text-white leading-[0.9] mona-sans-condensed-medium font-normal max-w-3xl">We Didn't Build Another Agency.</h2>
                    <p className="text-white/40 text-[14px] md:text-[16px] leading-relaxed poppins-regular max-w-lg mt-4 md:mt-6">Most agencies chase scale. We focus on what works and what makes a real difference.</p>
                </div>
            </div>
            <div className="hidden md:flex flex-row w-full max-w-[1400px] mx-auto h-[600px] lg:h-[700px] gap-4 px-6 md:px-12">
                {differences.map((diff, i) => {
                    const isActive = hoverIndex === i;
                    return (
                        <motion.div key={i} onHoverStart={() => setHoverIndex(i)} onClick={() => setHoverIndex(i)} layout
                            animate={{ flex: isActive ? 6 : 1, backgroundColor: isActive ? '#AFFF00' : '#0a0a0a', borderColor: isActive ? '#AFFF00' : 'rgba(255,255,255,0.06)' }}
                            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                            className="relative h-full overflow-hidden cursor-pointer border group"
                            style={{ clipPath: isActive ? "polygon(0 0, 100% 0, 100% calc(100% - 48px), calc(100% - 48px) 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                        >
                            <motion.div animate={{ opacity: isActive ? 0 : 1 }} transition={{ duration: 0.3 }} className={`absolute inset-0 flex flex-col justify-between items-center py-10 pointer-events-none ${isActive ? 'z-0' : 'z-20'}`}>
                                <span className="text-[2rem] mona-sans-condensed-bold text-white/30 tracking-tight">0{i + 1}</span>
                                <span className="text-[1.8rem] lg:text-[2.2rem] mona-sans-condensed-bold text-white/40 group-hover:text-[#AFFF00] transition-colors tracking-[0.1em] uppercase whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{diff.keyword}</span>
                            </motion.div>
                            <motion.div animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.6, delay: isActive ? 0.2 : 0 }} className={`absolute inset-0 p-10 lg:p-16 flex flex-col justify-between pointer-events-none ${isActive ? 'z-20' : 'z-0'}`}>
                                <span className="absolute -right-8 -bottom-12 text-[7rem] xl:text-[11rem] font-black leading-none select-none mona-sans-condensed-bold tracking-tighter uppercase text-black/[0.04]">{diff.keyword}</span>
                                <div className="flex justify-between items-start w-full relative z-10">
                                    <h3 className="text-[3rem] lg:text-[4rem] xl:text-[4.5rem] text-black leading-[0.95] tracking-tight mona-sans-condensed-bold w-[80%] uppercase drop-shadow-sm" style={{ whiteSpace: 'pre-line' }}>{diff.title}</h3>
                                    <span className="text-[3rem] lg:text-[4rem] font-black leading-none select-none text-black/20 mona-sans-condensed-bold tracking-tighter">0{i + 1}</span>
                                </div>
                                <div className="mt-auto relative z-10 flex items-end justify-between w-full">
                                    <p className="text-black/80 text-[16px] lg:text-[18px] leading-relaxed poppins-medium max-w-sm xl:max-w-md mix-blend-multiply border-l-2 border-black/20 pl-6">{diff.desc}</p>
                                    <div className="w-16 h-16 rounded-full border border-black/20 flex items-center justify-center bg-black/5 shrink-0 ml-8 mb-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" /></svg>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
            <div className="md:hidden flex flex-col w-full px-6 gap-3">
                {differences.map((diff, i) => {
                    const isActive = hoverIndex === i;
                    return (
                        <motion.div key={i} onClick={() => setHoverIndex(i)} layout
                            animate={{ height: isActive ? 380 : 80, backgroundColor: isActive ? '#AFFF00' : '#0a0a0a', borderColor: isActive ? '#AFFF00' : 'rgba(255,255,255,0.06)' }}
                            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                            className="relative overflow-hidden w-full border cursor-pointer group"
                            style={{ clipPath: isActive ? "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                        >
                            <div className="absolute top-0 left-0 w-full h-[80px] flex items-center justify-between px-6 z-20 pointer-events-none">
                                <span className={`text-[2rem] mona-sans-condensed-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-black/30' : 'text-white/30'}`}>0{i + 1}</span>
                                <motion.div animate={{ opacity: isActive ? 0 : 1 }} transition={{ duration: 0.3 }} className="pl-4 flex-grow text-right truncate">
                                    <span className="text-[1.2rem] mona-sans-condensed-medium text-white/80 uppercase">{diff.title.replace('\n', ' ')}</span>
                                </motion.div>
                            </div>
                            <motion.div animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }} className="absolute inset-0 pt-[80px] px-6 pb-8 flex flex-col justify-between pointer-events-none">
                                <span className="absolute -right-4 -bottom-6 text-[6rem] font-black leading-none select-none mona-sans-condensed-bold tracking-tightest uppercase text-black/[0.04] z-0">{diff.keyword}</span>
                                <h3 className="text-[2.4rem] text-black leading-[1.0] tracking-tight mona-sans-condensed-bold uppercase drop-shadow-sm z-10 w-[95%]" style={{ whiteSpace: 'pre-line' }}>{diff.title}</h3>
                                <div className="mt-4 relative z-10 w-full flex items-end justify-between">
                                    <p className="text-black/80 text-[15px] leading-relaxed poppins-medium w-[85%] border-l-2 border-[#094B28]/20 pl-4">{diff.desc}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
            <div className="pb-10 md:pb-16" />
        </section>
    );
};

const clientIllustrations = [
    (<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M40 12C40 12 28 24 28 44C28 52 32 58 40 64C48 58 52 52 52 44C52 24 40 12 40 12Z" className="stroke-black" strokeWidth="2.5" fill="none" /><circle cx="40" cy="38" r="6" className="fill-[#AFFF00] stroke-black" strokeWidth="2" /><path d="M28 48L18 52L24 44" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M52 48L62 52L56 44" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>),
    (<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><rect x="12" y="14" width="56" height="52" rx="4" className="stroke-black" strokeWidth="2.5" fill="none" /><line x1="12" y1="26" x2="68" y2="26" className="stroke-black/20" strokeWidth="2" /><polyline points="22,56 32,46 42,50 52,34 60,30" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="52" cy="34" r="4" className="fill-[#AFFF00] stroke-black" strokeWidth="1.5" /></svg>),
    (<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M56 28C56 28 50 18 40 18C29 18 20 27 20 38C20 49 29 58 40 58" className="stroke-black" strokeWidth="2.5" strokeLinecap="round" fill="none" /><path d="M24 52C24 52 30 62 40 62C51 62 60 53 60 42C60 31 51 22 40 22" className="stroke-black/30" strokeWidth="2.5" strokeLinecap="round" fill="none" /><polygon points="56,22 62,28 56,34" className="fill-[#AFFF00] stroke-black" strokeWidth="1.5" /><circle cx="40" cy="40" r="8" className="stroke-black" strokeWidth="2.5" fill="none" /><circle cx="40" cy="40" r="3" className="fill-[#AFFF00]" /></svg>),
    (<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M22 30H58L54 66H26L22 30Z" className="stroke-black" strokeWidth="2.5" fill="none" /><path d="M30 30V24C30 18.4772 34.4772 14 40 14C45.5228 14 50 18.4772 50 24V30" className="stroke-black" strokeWidth="2.5" strokeLinecap="round" fill="none" /><line x1="30" y1="42" x2="50" y2="42" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" /><circle cx="52" cy="24" r="8" className="fill-[#AFFF00] stroke-black" strokeWidth="2" /><path d="M49 24l2 2 4-4" className="stroke-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>),
];

const clients = [
    { title: "Startups Building from Scratch", desc: "You need clear positioning, a strong visual identity, and a strategy that performs from day one." },
    { title: "Growing Brands Ready to Scale", desc: "You have traction but your branding feels fragmented and your marketing is struggling to scale." },
    { title: "Rebranding for Established Businesses", desc: "You have been around for years but your brand no longer reflects who you are or where you are going." },
    { title: "D2C & E-commerce Brands", desc: "You need premium content and campaigns that convert your browsers into long-term repeat buyers." },
];

const WhoWeWorkWith = () => (
    <section className="w-full bg-[#FAFAFA] pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
        <div className="w-full max-w-[1400px] mx-auto">
            <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 mb-12 md:mb-20">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Our Clients</span>
                    <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">Who We Work With</h2>
                </div>
                <p className="hidden md:block text-sm text-black/35 max-w-[220px] leading-relaxed poppins-regular text-right">We work best with brands that are serious about growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/[0.04]">
                {clients.map((client, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07, ease: [0.19, 1, 0.22, 1] }}
                        className="group bg-white hover:bg-[#FAFAFA] transition-colors duration-500 p-8 md:p-12 flex flex-col gap-8"
                    >
                        <div className="w-[64px] h-[64px] text-black/40 group-hover:text-black/70 transition-colors duration-500">{clientIllustrations[i]}</div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-mono tracking-[0.3em] text-black/20">0{i + 1}</span>
                                <h3 className="text-[1.15rem] md:text-[1.3rem] text-black mona-sans-condensed-medium tracking-tight group-hover:text-[#476D07] transition-colors duration-400">{client.title}</h3>
                            </div>
                            <p className="text-black/45 text-[14px] leading-relaxed poppins-regular">{client.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const CTASection = () => (
    <section className="w-full bg-[#080808] px-6 md:px-10 pt-16 md:pt-24 pb-10 selection:bg-black selection:text-[#AFFF00]">
        <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="w-full bg-[#AFFF00] relative overflow-hidden flex flex-col items-start px-8 md:px-20 py-14 md:py-20"
            style={{ clipPath: "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)" }}
        >
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-black/50 uppercase poppins-regular">Start a Project</span>
                        <h2 className="text-[3rem] md:text-[5rem] lg:text-[6rem] tracking-tight text-black leading-none mona-sans-condensed-medium font-normal">
                            Ready to Build<br /><span className="text-black/30">Something Real?</span>
                        </h2>
                        <p className="text-black/60 text-[15px] md:text-[16px] max-w-lg leading-relaxed poppins-regular">Let's talk about your brand and where you want to take it.</p>
                    </div>
                    <div className="flex flex-col gap-4 shrink-0">
                        <Link to="/contact" className="group flex items-center gap-4 bg-black text-white px-8 py-5 text-[13px] tracking-[0.18em] uppercase poppins-regular font-bold transition-all duration-400 hover:gap-6"
                            style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)" }}>
                            Start a Conversation
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                        </Link>
                        <a href="mailto:hello@drixmedia.com" className="text-black/50 hover:text-black transition-colors text-[12px] tracking-[0.12em] poppins-regular text-center">hello@drixmedia.com</a>
                    </div>
                </div>
            </div>
        </motion.div>
    </section>
);

const About: React.FC = () => {
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);
    const heroY = useTransform(scrollY, [0, 800], [0, -150]);

    return (
        <main className="w-full min-h-screen bg-[#050505] overflow-x-hidden">
            <Navbar />
            <div className="sticky top-0 h-[75vh] md:h-[80vh] lg:h-[85vh] w-full overflow-hidden z-0">
                <motion.div style={{ opacity: heroOpacity, y: heroY }} className="w-full h-full">
                    <AboutHero />
                </motion.div>
            </div>
            <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)] mt-[-60px] md:mt-[-100px]"
                style={{ clipPath: "polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)" }}>
                <OurStory />
            </div>
            <OurValues />
            <WhatMakesUsDifferent />
            <WhoWeWorkWith />
            <CTASection />
            <Footer />
        </main>
    );
};

export default About;
