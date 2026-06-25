import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SharedHeroLayout, letterVariants, ScrambleButton } from '../components/SharedHero';

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
                    <motion.div
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-6">
                            <p className="text-[1.15rem] md:text-[1.5rem] text-black leading-snug tracking-tight mona-sans-condensed-medium">
                                One team. Every discipline. Strategy, design, content, development, and campaigns — all under one roof, working toward one goal.
                            </p>
                            <p className="text-black/55 text-[15px] md:text-[16px] leading-relaxed poppins-regular max-w-md">
                                We align creativity with your business growth, ensuring every asset we produce serves a distinct strategic purpose.
                            </p>
                        </div>
                        
                        <div className="w-20 h-[1px] bg-black/10" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                        className="flex flex-col gap-10"
                    >
                        <p className="text-black/55 text-[15px] md:text-[16px] leading-relaxed poppins-regular">
                            No handoffs. No silos. Just a unified team that covers all verticals and delivers work that's consistent, intentional, and built to perform.
                        </p>

                        <motion.div
                            initial="rest" whileHover="hover"
                            className="relative group/box w-full"
                        >
                            {/* The Stroke Layer: Absolute to wrap the content-driven parent */}
                            <motion.div 
                                variants={{
                                    rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 100%, 0% 0%)" },
                                    hover: { clipPath: "polygon(24px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 24px, 0% 24px)" }
                                }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 bg-black/15 group-hover/box:bg-black/25 transition-colors duration-500 z-0"
                            />

                            {/* The Inner Body Layer: Now RELATIVE to drive parent height based on text content */}
                            <motion.div 
                                variants={{
                                    rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 23.4px), calc(100% - 23.4px) 100%, 0% 100%, 0% 100%, 0% 0%)" },
                                    hover: { clipPath: "polygon(23.4px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 23.4px, 0% 23.4px)" }
                                }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="relative z-10 bg-[#FAFAFA] m-[1px] p-8 md:p-10 flex flex-col gap-6"
                            >
                                <p className="text-[1.1rem] md:text-[1.25rem] text-black leading-[1.5] tracking-tight mona-sans-condensed-medium">We don't just solve problems.<br />We align creativity with business growth.</p>
                                <div className="flex items-center justify-between border-t border-black/[0.06] pt-6">
                                    <cite className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/30 not-italic poppins-regular">The Drix Media Philosophy</cite>
                                    <ScrambleButton href="/contact" text="WORK WITH US" hoverTheme="dark" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const principleIcons = [
    (<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none"><rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/><rect x="35" y="35" width="30" height="30" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M42 50H58M58 50L52 44M58 50L52 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    (<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none"><line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="65" x2="80" y2="65" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round"/><circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.6"/></svg>),
    (<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none"><path d="M20 80 L50 20 L80 80 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeOpacity="0.4"/><path d="M35 60 L50 30 L65 60 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="50" cy="20" r="4" fill="currentColor" fillOpacity="0.6"/></svg>),
    (<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeOpacity="0.3"/><circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.6"/><line x1="50" y1="20" x2="50" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="50" y1="80" x2="50" y2="86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="50" x2="14" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="80" y1="50" x2="86" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>),
];

const values = [
    { number: '01', title: 'Strategy First', description: 'Every creative decision starts with a business objective. We never design for aesthetics alone.' },
    { number: '02', title: 'Radical Clarity', description: 'We communicate clearly, set honest expectations, and deliver exactly what we promise.' },
    { number: '03', title: 'Integrated Thinking', description: 'Brand, content, and performance are not separate disciplines. They are one system.' },
    { number: '04', title: 'Ownership Mentality', description: 'We treat your brand like it is ours. That means caring about outcomes, not just outputs.' },
];

const PrincipleCard: React.FC<{ value: typeof values[0], iconIndex: number }> = ({ value, iconIndex }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.19,1,0.22,1] }}
            className="group relative bg-white/[0.02] border border-white/[0.06] p-8 md:p-10 flex flex-col gap-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)" }}
        >
            <div className="w-12 h-12 text-white/30 group-hover:text-white/60 transition-colors duration-500">{principleIcons[iconIndex]}</div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <span className="text-[9px] font-mono tracking-[0.3em] text-white/20">{value.number}</span>
                    <h3 className="text-[1.1rem] md:text-[1.25rem] text-white mona-sans-condensed-medium tracking-tight">{value.title}</h3>
                </div>
                <p className="text-white/40 text-[14px] leading-relaxed poppins-regular">{value.description}</p>
            </div>
        </motion.div>
    );
};

const OurValues = () => (
    <section className="w-full bg-[#050505] py-16 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
        <div className="w-full max-w-[1400px] mx-auto">
            <div className="w-full flex items-end justify-between border-b border-white/[0.06] pb-8 md:pb-10 mb-12 md:mb-20">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular">Core Principles</span>
                    <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-white leading-none mona-sans-condensed-medium font-normal">What We Stand For</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {values.map((value, i) => <PrincipleCard key={i} value={value} iconIndex={i} />)}
            </div>
        </div>
    </section>
);

const differences = [
    { title: "One Team,\nAll Disciplines", desc: "One team. All verticals. Strategy, design, content, and production under one roof. No outsourcing, no misaligned vendors.", keyword: "Unified" },
    { title: "Obsessed With\nYour Growth", desc: "We measure our success by your revenue, not by how many assets we deliver.", keyword: "Growth" },
    { title: "We Challenge\nThe Brief", desc: "We will push back if something doesn't serve your business. Honest counsel is part of the deal.", keyword: "Honest" },
    { title: "Built For\nSpeed", desc: "We ship fast, iterate faster. No six-month timelines for a brand refresh.", keyword: "Velocity" },
];

const WhatMakesUsDifferent = () => {
    const [hoverIndex, setHoverIndex] = React.useState(0);
    return (
        <section className="w-full bg-[#050505] py-16 md:py-40 selection:bg-[#AFFF00] selection:text-black overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-12 md:mb-20">
                <div className="flex flex-col gap-5">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular flex items-center gap-3"><span className="w-2 h-2 bg-[#AFFF00]"></span> The Edge</span>
                    <h2 className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] tracking-tight text-white leading-[0.9] mona-sans-condensed-medium font-normal max-w-3xl">We Didn't Build Another Agency.</h2>
                    <p className="text-white/40 text-[14px] md:text-[16px] leading-relaxed poppins-regular max-w-lg mt-4 md:mt-6">Most agencies optimize for volume. We optimize for clarity, ownership, and outcomes that actually drive results. Here is how we differ.</p>
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
                                <span className="text-[2rem] mona-sans-condensed-bold text-white/30 tracking-tight">0{i+1}</span>
                                <span className="text-[1.4rem] lg:text-[1.8rem] mona-sans-condensed-medium text-white/60 group-hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{diff.title.replace('\n', ' ')}</span>
                            </motion.div>
                            <motion.div animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.6, delay: isActive ? 0.2 : 0 }} className={`absolute inset-0 p-10 lg:p-16 flex flex-col justify-between pointer-events-none ${isActive ? 'z-20' : 'z-0'}`}>
                                <span className="absolute -right-8 -bottom-12 text-[7rem] xl:text-[11rem] font-black leading-none select-none mona-sans-condensed-bold tracking-tighter uppercase text-black/[0.04]">{diff.keyword}</span>
                                <div className="flex justify-between items-start w-full relative z-10">
                                    <h3 className="text-[3rem] lg:text-[4rem] xl:text-[4.5rem] text-black leading-[0.95] tracking-tight mona-sans-condensed-bold w-[80%] uppercase drop-shadow-sm" style={{ whiteSpace: 'pre-line' }}>{diff.title}</h3>
                                    <span className="text-[3rem] lg:text-[4rem] font-black leading-none select-none text-black/20 mona-sans-condensed-bold tracking-tighter">0{i+1}</span>
                                </div>
                                <div className="mt-auto relative z-10 flex items-end justify-between w-full">
                                    <p className="text-black/80 text-[16px] lg:text-[18px] leading-relaxed poppins-medium max-w-sm xl:max-w-md mix-blend-multiply border-l-2 border-black/20 pl-6">{diff.desc}</p>
                                    <div className="w-16 h-16 rounded-full border border-black/20 flex items-center justify-center bg-black/5 shrink-0 ml-8 mb-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/></svg>
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
                                <span className={`text-[2rem] mona-sans-condensed-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-black/30' : 'text-white/30'}`}>0{i+1}</span>
                                <motion.div animate={{ opacity: isActive ? 0 : 1 }} transition={{ duration: 0.3 }} className="pl-4 flex-grow text-right truncate">
                                    <span className="text-[1.2rem] mona-sans-condensed-medium text-white/80 uppercase">{diff.title.replace('\n', ' ')}</span>
                                </motion.div>
                            </div>
                            <motion.div animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }} className="absolute inset-0 pt-[80px] px-6 pb-8 flex flex-col justify-between pointer-events-none">
                                <h3 className="text-[2.2rem] text-black leading-[1.05] tracking-tight mona-sans-condensed-bold uppercase drop-shadow-sm z-10 w-[95%]" style={{ whiteSpace: 'pre-line' }}>{diff.title}</h3>
                                <div className="mt-4 relative z-10 w-full flex items-end justify-between">
                                    <p className="text-black/80 text-[14px] leading-relaxed poppins-medium w-[85%] border-l-2 border-black/20 pl-4">{diff.desc}</p>
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
    (<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M40 12C40 12 28 24 28 44C28 52 32 58 40 64C48 58 52 52 52 44C52 24 40 12 40 12Z" className="stroke-black" strokeWidth="2.5" fill="none"/><circle cx="40" cy="38" r="6" className="fill-[#AFFF00] stroke-black" strokeWidth="2"/><path d="M28 48L18 52L24 44" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M52 48L62 52L56 44" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>),
    (<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><rect x="12" y="14" width="56" height="52" rx="4" className="stroke-black" strokeWidth="2.5" fill="none"/><line x1="12" y1="26" x2="68" y2="26" className="stroke-black/20" strokeWidth="2"/><polyline points="22,56 32,46 42,50 52,34 60,30" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="52" cy="34" r="4" className="fill-[#AFFF00] stroke-black" strokeWidth="1.5"/></svg>),
    (<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M56 28C56 28 50 18 40 18C29 18 20 27 20 38C20 49 29 58 40 58" className="stroke-black" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M24 52C24 52 30 62 40 62C51 62 60 53 60 42C60 31 51 22 40 22" className="stroke-black/30" strokeWidth="2.5" strokeLinecap="round" fill="none"/><polygon points="56,22 62,28 56,34" className="fill-[#AFFF00] stroke-black" strokeWidth="1.5"/><circle cx="40" cy="40" r="8" className="stroke-black" strokeWidth="2.5" fill="none"/><circle cx="40" cy="40" r="3" className="fill-[#AFFF00]"/></svg>),
    (<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M22 30H58L54 66H26L22 30Z" className="stroke-black" strokeWidth="2.5" fill="none"/><path d="M30 30V24C30 18.4772 34.4772 14 40 14C45.5228 14 50 18.4772 50 24V30" className="stroke-black" strokeWidth="2.5" strokeLinecap="round" fill="none"/><line x1="30" y1="42" x2="50" y2="42" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round"/><circle cx="52" cy="24" r="8" className="fill-[#AFFF00] stroke-black" strokeWidth="2"/><path d="M49 24l2 2 4-4" className="stroke-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>),
];

const clients = [
    { title: "Startups Building from Scratch", desc: "You need positioning, identity, and a go-to-market strategy that works from day one." },
    { title: "Growing Brands Scaling Up", desc: "You have traction but your branding feels inconsistent or your marketing is not keeping up." },
    { title: "Established Companies Rebranding", desc: "You have been around for years but your brand no longer reflects who you are or where you are going." },
    { title: "D2C & E-commerce Brands", desc: "You need content, campaigns, and creative that converts browsers into buyers." },
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
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07, ease: [0.19,1,0.22,1] }}
                        className="group bg-white hover:bg-[#FAFAFA] transition-colors duration-500 p-8 md:p-12 flex flex-col gap-8">
                        <div className="w-[64px] h-[64px] text-black/40 group-hover:text-black/70 transition-colors duration-500">{clientIllustrations[i]}</div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-mono tracking-[0.3em] text-black/20">0{i+1}</span>
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
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.19,1,0.22,1] }}
            className="w-full bg-[#AFFF00] relative overflow-hidden flex flex-col items-start px-8 md:px-20 py-14 md:py-20"
            style={{ clipPath: "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)" }}
        >
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-black/50 uppercase poppins-regular">Start a Project</span>
                        <h2 className="text-[3rem] md:text-[5rem] lg:text-[6rem] tracking-tight text-black leading-none mona-sans-condensed-medium font-normal">Ready to Build<br /><span className="text-black/30">Something Real?</span></h2>
                        <p className="text-black/60 text-[15px] md:text-[16px] max-w-lg leading-relaxed poppins-regular">Let's talk about your brand and where you want to take it.</p>
                    </div>
                    <div className="flex flex-col gap-4 shrink-0">
                        <Link to="/contact" className="group flex items-center gap-4 bg-black text-white px-8 py-5 text-[13px] tracking-[0.18em] uppercase poppins-regular font-bold transition-all duration-400 hover:gap-6"
                            style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)" }}>
                            Start a Conversation
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
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
