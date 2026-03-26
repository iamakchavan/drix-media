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
    />
);


// Word helper for text reveal
interface WordProps {
    word: string;
    progress: any;
    range: [number, number];
}

const Word: React.FC<WordProps> = ({ word, progress, range }) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    const isHighlight = word.toLowerCase().includes('clarity');
    
    return (
        <span className="relative inline-block mt-1 mr-3 md:mr-5 lg:mr-6">
            <span className="absolute items-center opacity-0">{word}</span>
            <motion.span 
                style={{ opacity }} 
                className={`text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.2rem] mona-sans-condensed-medium tracking-tighter leading-[0.95] inline-block ${isHighlight ? 'text-[#476D07]' : 'text-black'}`}
            >
                {word}
            </motion.span>
        </span>
    );
};

// Our Story
const OurStory = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "center 65%"]
    });
    const words = "Drix Media was born out of a pivot from chaos to clarity.".split(" ");

    return (
        <section ref={containerRef} className="w-full bg-white pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
            <div className="w-full max-w-[1400px] mx-auto">

                {/* Scroll-reveal headline */}
                <div className="flex flex-wrap mb-16 md:mb-20">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
                    })}
                </div>

                {/* Two-col body copy + blockquote */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.19,1,0.22,1] }}
                        className="flex flex-col gap-6"
                    >
                        <p className="text-black/55 text-[15px] md:text-[16px] leading-relaxed poppins-regular">
                            The creative industry was failing due to fragmentation. Brands were forced to hire independent experts — one for strategy, one for design, one for ads — resulting in disjointed marketing, diluted identities, and exhausted budgets.
                        </p>
                        <p className="text-black/55 text-[15px] md:text-[16px] leading-relaxed poppins-regular">
                            We built Drix Media as the definitive antidote: a unified engine for creative production, branding, and performance. Every pixel serves the same strategic goal.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.19,1,0.22,1] }}
                    >
                        <motion.div
                            initial="rest" whileHover="hover"
                            variants={{
                                rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 0%)" },
                                hover: { clipPath: "polygon(24px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 24px)", transition: { duration: 0.35, ease: [0.19,1,0.22,1] } }
                            }}
                            className="bg-[#FAFAFA] border border-black/[0.05] p-8 md:p-10 flex flex-col gap-6"
                        >
                            <p className="text-[1.1rem] md:text-[1.25rem] text-black leading-[1.5] tracking-tight mona-sans-condensed-medium">
                                "Our goal isn't to be the agency with the most clients. It's to be the team that does the work others are afraid to commit to."
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

const values = [
    { title: "Strategy First", desc: "Every creative decision starts with a strategic foundation. We do not design for the sake of design. We design with purpose.", keyword: "Purpose" },
    { title: "Integration Over Isolation", desc: "The best work happens when strategy, design, and execution work as one system. We build brands that feel cohesive across every touchpoint.", keyword: "Unified" },
    { title: "Results Over Rank", desc: "We care more about driving your business forward than winning awards. Performance is the only metric that matters.", keyword: "Impact" },
    { title: "Transparency Always", desc: "You will always know what we are working on, why we are doing it, and how it is performing. No jargon. No hidden processes.", keyword: "Clarity" },
    { title: "Long-Term Thinking", desc: "We are not here for quick wins. We build systems and strategies that grow with you over time.", keyword: "Growth" }
];

// Card style configurations: alternating dark, light, accent
const cardStyles = [
    { bg: 'bg-[#050505]', text: 'text-white', subText: 'text-white/40', ghostColor: 'rgba(255,255,255,0.12)', hoverBg: 'group-hover:bg-[#0A0A0A]', accentText: 'text-[#AFFF00]', borderCol: 'border-white/[0.06]', keywordColor: 'text-white/[0.09]' },
    { bg: 'bg-white', text: 'text-black', subText: 'text-black/40', ghostColor: 'rgba(0,0,0,0.08)', hoverBg: '', accentText: 'text-[#476D07]', borderCol: 'border-black/[0.06]', keywordColor: 'text-black/[0.08]' },
    { bg: 'bg-[#AFFF00]', text: 'text-black', subText: 'text-black/50', ghostColor: 'rgba(0,0,0,0.12)', hoverBg: '', accentText: 'text-black', borderCol: 'border-black/[0.08]', keywordColor: 'text-black/[0.15]' },
    { bg: 'bg-white', text: 'text-black', subText: 'text-black/40', ghostColor: 'rgba(0,0,0,0.08)', hoverBg: '', accentText: 'text-[#476D07]', borderCol: 'border-black/[0.06]', keywordColor: 'text-black/[0.08]' },
    { bg: 'bg-[#050505]', text: 'text-white', subText: 'text-white/40', ghostColor: 'rgba(255,255,255,0.12)', hoverBg: 'group-hover:bg-[#0A0A0A]', accentText: 'text-[#AFFF00]', borderCol: 'border-white/[0.06]', keywordColor: 'text-white/[0.09]' },
];

const OurValues = () => {
    const ValueCard = ({ v, i, style }: { v: typeof values[0], i: number, style: typeof cardStyles[0] }) => (
        <motion.div
            initial="rest" whileHover="hover"
            variants={{
                rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0% 100%, 0% 0%)" },
                hover: { clipPath: "polygon(28px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 28px)", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
            }}
            className={`${style.bg} ${style.hoverBg} w-full h-full p-8 md:p-10 flex flex-col justify-between border ${style.borderCol} shadow-[0_4px_24px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 relative overflow-hidden`}
        >
            {/* Fully visible and balanced background keyword */}
            <span
                className={`absolute right-8 bottom-6 text-[3rem] md:text-[3.8rem] lg:text-[4.2rem] font-black leading-none select-none pointer-events-none mona-sans-condensed-bold tracking-tighter uppercase text-right w-full ${style.keywordColor} transition-colors duration-500`}
            >
                {v.keyword}
            </span>

            <div className="flex flex-col gap-5 relative z-10">
                {/* Ghost number */}
                <span
                    className="text-[4rem] md:text-[5rem] font-black leading-none select-none block mona-sans-condensed-bold tracking-tighter"
                    style={{ color: 'transparent', WebkitTextStroke: `1.5px ${style.ghostColor}` }}
                >
                    {String(i + 1).padStart(2, '0')}
                </span>

                <div>
                    <h3 className={`text-[1.2rem] md:text-[1.4rem] ${style.text} leading-snug tracking-tight mona-sans-condensed-medium group-hover:${style.accentText.replace('text-', '')} transition-colors duration-400`}>
                        {v.title}
                    </h3>
                </div>
            </div>

            <div className="relative z-10 mt-8">
                <div className={`w-full h-px ${style.borderCol.replace('border-', 'bg-')} mb-5`} />
                <p className={`${style.subText} text-[13px] leading-relaxed poppins-regular`}>{v.desc}</p>
            </div>
        </motion.div>
    );

    return (
        <section className="w-full bg-[#FAFAFA] pt-16 pb-20 md:py-40 selection:bg-[#AFFF00] selection:text-black">

            {/* Header */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 mb-10 md:mb-20">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">The Blueprint</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                            Our Core Principles
                        </h2>
                    </div>
                    <p className="hidden md:block text-sm text-black/35 max-w-[220px] leading-relaxed poppins-regular text-right">
                        Refined over years at the intersection of creativity and commerce.
                    </p>
                </div>
            </div>

            {/* ── MOBILE: Scroll-snap carousel ── */}
            <div
                className="md:hidden flex gap-4 overflow-x-auto px-6"
                style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {values.map((v, i) => (
                    <div
                        key={i}
                        className="shrink-0 h-[340px] group"
                        style={{ scrollSnapAlign: "start", width: "calc(100vw - 3rem)" }}
                    >
                        <ValueCard v={v} i={i} style={cardStyles[i]} />
                    </div>
                ))}
                <div className="shrink-0 w-4" />
            </div>

            {/* ── DESKTOP: Staggered 3+2 grid ── */}
            <div className="hidden md:block w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
                {/* Top row — 3 cards */}
                <div className="grid grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
                    {values.slice(0, 3).map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                            className="group h-[380px] lg:h-[420px]"
                        >
                            <ValueCard v={v} i={i} style={cardStyles[i]} />
                        </motion.div>
                    ))}
                </div>
                {/* Bottom row — 2 cards, wider */}
                <div className="grid grid-cols-2 gap-4 md:gap-5">
                    {values.slice(3).map((v, i) => (
                        <motion.div
                            key={i + 3}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: (i + 3) * 0.1, ease: [0.19, 1, 0.22, 1] }}
                            className="group h-[340px] lg:h-[380px]"
                        >
                            <ValueCard v={v} i={i + 3} style={cardStyles[i + 3]} />
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
};


// What Makes Us Different
const differences = [
    { title: "We Think Like Business Owners", desc: "We do not just execute briefs. We ask the hard questions. Is this the right move for the business? Will this drive real results? If the answer is no, we push back.", keyword: "OWNERSHIP" },
    { title: "One Team, Not Departments", desc: "Your brand strategist, designer, and content creator sit in the same room. They collaborate from day one. The result is work that feels unified, not pieced together.", keyword: "UNITY" },
    { title: "Built on Systems, Not Heroics", desc: "We do not rely on last-minute magic. We build repeatable processes that deliver quality work consistently.", keyword: "SYSTEMS" },
    { title: "Honest About What We Do Not Know", desc: "If something is outside our expertise, we say so. We would rather be honest than overpromise and underdeliver.", keyword: "HONESTY" }
];

const WhatMakesUsDifferent = () => {
    const [hoverIndex, setHoverIndex] = React.useState(0);

    return (
        <section className="w-full bg-[#050505] selection:bg-[#AFFF00] selection:text-black overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 relative">
            
            {/* Header */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-12 md:mb-20">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#AFFF00]"></span> The Edge
                    </span>
                    <h2 className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] tracking-tight text-white leading-[0.9] mona-sans-condensed-medium font-normal max-w-3xl">
                        We Didn't Build Another Agency.
                    </h2>
                    <p className="text-white/40 text-[14px] md:text-[16px] leading-relaxed poppins-regular max-w-lg mt-4 md:mt-6">
                        Most agencies optimize for volume. We optimize for clarity, ownership, and outcomes that actually move the needle. Here is how we differ.
                    </p>
                </div>
            </div>

            {/* ── DESKTOP: Expanding Flex Gallery ── */}
            <div className="hidden md:flex flex-row w-full max-w-[1400px] mx-auto h-[600px] lg:h-[700px] gap-4 px-6 md:px-12">
                {differences.map((diff, i) => {
                    const isActive = hoverIndex === i;
                    
                    return (
                        <motion.div
                            key={i}
                            onHoverStart={() => setHoverIndex(i)}
                            onClick={() => setHoverIndex(i)}
                            layout
                            animate={{ 
                                flex: isActive ? 6 : 1,
                                backgroundColor: isActive ? '#AFFF00' : '#0a0a0a',
                                borderColor: isActive ? '#AFFF00' : 'rgba(255,255,255,0.06)'
                            }}
                            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                            className={`relative h-full overflow-hidden cursor-pointer border group`}
                            style={{ 
                                clipPath: isActive ? "polygon(0 0, 100% 0, 100% calc(100% - 48px), calc(100% - 48px) 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                            }}
                        >
                            {/* Inactive Content - Vertical Layout */}
                            <motion.div
                                animate={{ opacity: isActive ? 0 : 1 }}
                                transition={{ duration: 0.3 }}
                                className={`absolute inset-0 flex flex-col justify-between items-center py-10 pointer-events-none ${isActive ? 'z-0' : 'z-20'}`}
                            >
                                <span className="text-[2rem] mona-sans-condensed-bold text-white/30 tracking-tight">0{i+1}</span>
                                <span className="text-[1.4rem] lg:text-[1.8rem] mona-sans-condensed-medium text-white/60 group-hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                    {diff.title}
                                </span>
                            </motion.div>

                            {/* Active Content - Full Reveal */}
                            <motion.div
                                animate={{ opacity: isActive ? 1 : 0 }}
                                transition={{ duration: 0.6, delay: isActive ? 0.2 : 0 }}
                                className={`absolute inset-0 p-10 lg:p-16 flex flex-col justify-between pointer-events-none ${isActive ? 'z-20' : 'z-0'}`}
                            >
                                {/* Giant Watermark */}
                                <span className="absolute -right-8 -bottom-12 text-[7rem] xl:text-[11rem] font-black leading-none select-none mona-sans-condensed-bold tracking-tighter uppercase text-black/[0.04]">
                                    {diff.keyword}
                                </span>

                                <div className="flex justify-between items-start w-full relative z-10">
                                    <h3 className="text-[3rem] lg:text-[4rem] xl:text-[4.5rem] text-black leading-[0.95] tracking-tight mona-sans-condensed-bold w-[80%] uppercase drop-shadow-sm">
                                        {diff.title}
                                    </h3>
                                    <span className="text-[3rem] lg:text-[4rem] font-black leading-none select-none text-black/20 mona-sans-condensed-bold tracking-tighter">
                                        0{i + 1}
                                    </span>
                                </div>
                                
                                <div className="mt-auto relative z-10 flex items-end justify-between w-full">
                                    <p className="text-black/80 text-[16px] lg:text-[18px] leading-relaxed poppins-medium max-w-sm xl:max-w-md mix-blend-multiply border-l-2 border-black/20 pl-6">
                                        {diff.desc}
                                    </p>
                                    
                                    {/* Accent icon container */}
                                    <div className="w-16 h-16 rounded-full border border-black/20 flex items-center justify-center bg-black/5 shrink-0 ml-8 mb-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/></svg>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── MOBILE: Expanding Stacked Cards ── */}
            <div className="md:hidden flex flex-col w-full px-6 gap-3">
                {differences.map((diff, i) => {
                    const isActive = hoverIndex === i;
                    
                    return (
                        <motion.div
                            key={i}
                            onClick={() => setHoverIndex(i)}
                            layout
                            animate={{ 
                                height: isActive ? 380 : 80, 
                                backgroundColor: isActive ? '#AFFF00' : '#0a0a0a',
                                borderColor: isActive ? '#AFFF00' : 'rgba(255,255,255,0.06)'
                            }}
                            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                            className="relative overflow-hidden w-full border cursor-pointer group"
                            style={{ 
                                clipPath: isActive ? "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                            }}
                        >
                            {/* Constant Header Row */}
                            <div className="absolute top-0 left-0 w-full h-[80px] flex items-center justify-between px-6 z-20 pointer-events-none">
                                <span className={`text-[2rem] mona-sans-condensed-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-black/30' : 'text-white/30'}`}>
                                    0{i+1}
                                </span>
                                <motion.div animate={{ opacity: isActive ? 0 : 1 }} transition={{ duration: 0.3 }} className="pl-4 flex-grow text-right truncate">
                                    <span className="text-[1.2rem] mona-sans-condensed-medium text-white/80 uppercase">
                                        {diff.title}
                                    </span>
                                </motion.div>
                                <motion.div animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/></svg>
                                </motion.div>
                            </div>
                            
                            {/* Active Content - Fades in below header */}
                            <motion.div 
                                animate={{ opacity: isActive ? 1 : 0 }}
                                transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }}
                                className="absolute inset-0 pt-[80px] px-6 pb-8 flex flex-col justify-between pointer-events-none"
                            >
                                <h3 className="text-[2.2rem] text-black leading-[1.05] tracking-tight mona-sans-condensed-bold uppercase drop-shadow-sm z-10 w-[95%]">
                                    {diff.title}
                                </h3>
                                <div className="mt-4 relative z-10 w-full flex items-end justify-between">
                                    <p className="text-black/80 text-[14px] leading-relaxed poppins-medium w-[85%] border-l-2 border-black/20 pl-4">
                                        {diff.desc}
                                    </p>
                                </div>
                                <span className="absolute -right-4 -bottom-6 text-[5rem] font-black leading-none select-none mona-sans-condensed-bold tracking-tighter uppercase text-black/[0.04]">
                                    {diff.keyword}
                                </span>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>
            
            <div className="pb-10 md:pb-16" />
        </section>
    );
};



// Who We Work With
const clients = [
    { title: "Startups Building from Scratch", desc: "You need positioning, identity, and a go-to-market strategy that works from day one." },
    { title: "Growing Brands Scaling Up", desc: "You have traction but your branding feels inconsistent or your marketing is not keeping up." },
    { title: "Established Companies Rebranding", desc: "You have been around for years but your brand no longer reflects who you are or where you are going." },
    { title: "D2C & E-commerce Brands", desc: "You need content, campaigns, and creative that converts browsers into buyers." }
];

const WhoWeWorkWith = () => (
    <section className="w-full bg-[#FAFAFA] pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
        <div className="w-full max-w-[1400px] mx-auto">

            {/* Header */}
            <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 mb-12 md:mb-16">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Our Ecosystem</span>
                    <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">Who We Work With</h2>
                </div>
                <p className="hidden md:block text-sm text-black/35 max-w-[220px] leading-relaxed poppins-regular text-right">
                    Ambitious businesses ready to build integrated brands.
                </p>
            </div>

            {/* 2×2 chamfer card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/[0.04]">
                {clients.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: [0.19,1,0.22,1] }}
                        className="group"
                    >
                        <motion.div
                            initial="rest" whileHover="hover"
                            variants={{
                                rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 0%)" },
                                hover: { clipPath: "polygon(24px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 24px)", transition: { duration: 0.35, ease: [0.19,1,0.22,1] } }
                            }}
                            className="bg-white h-full p-8 md:p-12 flex flex-col justify-between min-h-[260px] md:min-h-[300px] shadow-[0_2px_16px_rgba(0,0,0,0.03)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-shadow duration-500"
                        >
                            <div className="flex flex-col gap-4">
                                <span className="text-[9px] text-black/25 font-mono tracking-[0.2em] uppercase">0{i+1}</span>
                                <h3 className="text-[1.3rem] md:text-[1.5rem] text-black leading-snug tracking-tight mona-sans-condensed-medium group-hover:text-[#476D07] transition-colors duration-400">{c.title}</h3>
                            </div>
                            <div className="flex items-end justify-between mt-8">
                                <p className="text-black/45 text-[13px] leading-relaxed poppins-regular">{c.desc}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

        </div>
    </section>
);

// CTA Section
const CTASection = () => (
    <section className="w-full bg-[#080808] px-6 md:px-10 pt-16 md:pt-24 pb-10 selection:bg-black selection:text-[#AFFF00]">
        <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.19,1,0.22,1] }}
            className="w-full bg-[#AFFF00] relative overflow-hidden flex flex-col items-start px-8 md:px-20 py-14 md:py-20"
            style={{ clipPath: "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)" }}
        >
            {/* Subtle dot grid */}
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">

                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-black/50 uppercase poppins-regular">Get Started</span>
                        <h2 className="text-[3rem] md:text-[5rem] lg:text-[6rem] tracking-tight text-black leading-none mona-sans-condensed-medium font-normal">
                            Let's Build<br />
                            <span className="text-black/30">Something Great.</span>
                        </h2>
                        <p className="text-black/60 text-[15px] md:text-[16px] max-w-lg leading-relaxed poppins-regular">
                            Book a free strategy call and tell us where you want your brand to go.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 shrink-0">
                        <Link
                            to="/contact"
                            className="group flex items-center gap-4 bg-black text-white px-8 py-5 text-[13px] tracking-[0.18em] uppercase poppins-regular font-bold transition-all duration-400 hover:bg-[#050505] hover:gap-6"
                            style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)" }}
                        >
                            Book Your Call
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                        </Link>
                        <a
                            href="mailto:hello@drixmedia.com"
                            className="text-black/50 hover:text-black transition-colors text-[12px] tracking-[0.12em] poppins-regular text-center"
                        >
                            hello@drixmedia.com
                        </a>
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
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="w-full h-full"
                >
                    <AboutHero />
                </motion.div>
            </div>

            <div className="relative z-10 bg-white mt-[-60px] md:mt-[-100px]" 
                 style={{ clipPath: "polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)" }}>
                <OurStory />
                <OurValues />
                <WhatMakesUsDifferent />

                <WhoWeWorkWith />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
};

export default About;
