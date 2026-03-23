import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    { title: "Strategy First", desc: "Every creative decision starts with a strategic foundation. We do not design for the sake of design. We design with purpose." },
    { title: "Integration Over Isolation", desc: "The best work happens when strategy, design, and execution work as one system. We build brands that feel cohesive across every touchpoint." },
    { title: "Results Over Rank", desc: "We care more about driving your business forward than winning awards. Performance is the only metric that matters." },
    { title: "Transparency Always", desc: "You will always know what we are working on, why we are doing it, and how it is performing. No jargon. No hidden processes." },
    { title: "Long-Term Thinking", desc: "We are not here for quick wins. We build systems and strategies that grow with you over time." }
];

const valueIcons = [
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>, 
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>, 
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>, 
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>, 
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
];

const OurValues = () => {
    const CardContent = ({ v, i }: { v: typeof values[0], i: number }) => (
        <motion.div
            initial="rest" whileHover="hover"
            variants={{
                rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 0%)" },
                hover: { clipPath: "polygon(24px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 24px)", transition: { duration: 0.35, ease: [0.19, 1, 0.22, 1] } }
            }}
            className="bg-white w-full h-full p-8 md:p-9 flex flex-col justify-between border border-black/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.03)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-shadow duration-500"
        >
            <div className="flex flex-col gap-6">
                <div className="text-black/50 group-hover:text-[#476D07] transition-colors duration-400 w-[22px] h-[22px]">
                    {valueIcons[i]}
                </div>
                <div>
                    <span className="text-[9px] text-black/25 font-mono tracking-[0.2em] uppercase block mb-2">0{i + 1}</span>
                    <h3 className="text-[1.15rem] md:text-[1.2rem] text-black leading-snug tracking-tight mona-sans-condensed-medium group-hover:text-[#476D07] transition-colors duration-400">{v.title}</h3>
                </div>
            </div>
            <p className="text-black/40 text-[13px] leading-relaxed poppins-regular">{v.desc}</p>
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

            {/* ── MOBILE: CSS scroll-snap horizontal carousel ── */}
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
                        className="shrink-0 h-[300px] group"
                        style={{ scrollSnapAlign: "start", width: "calc(100vw - 3rem)" }}
                    >
                        <CardContent v={v} i={i} />
                    </div>
                ))}
                {/* Trailing spacer so last card peeks correctly */}
                <div className="shrink-0 w-4" />
            </div>

            {/* ── DESKTOP: full-bleed 5-col grid ── */}
            <div className="hidden md:grid grid-cols-5 gap-px w-full px-6 md:px-10 lg:px-16">
                {values.map((v, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.65, delay: i * 0.09, ease: [0.19, 1, 0.22, 1] }}
                        className="group h-[480px]"
                    >
                        <CardContent v={v} i={i} />
                    </motion.div>
                ))}
            </div>

        </section>
    );
};


// What Makes Us Different
const differences = [
    { title: "We Think Like Business Owners", desc: "We do not just execute briefs. We ask the hard questions. Is this the right move for the business? Will this drive real results? If the answer is no, we push back." },
    { title: "One Team, Not Departments", desc: "Your brand strategist, designer, and content creator sit in the same room. They collaborate from day one. The result is work that feels unified, not pieced together." },
    { title: "Built on Systems, Not Heroics", desc: "We do not rely on last-minute magic. We build repeatable processes that deliver quality work consistently." },
    { title: "Honest About What We Do Not Know", desc: "If something is outside our expertise, we say so. We would rather be honest than overpromise and underdeliver." }
];

const WhatMakesUsDifferent = () => (
    <section className="w-full bg-white selection:bg-[#AFFF00] selection:text-black overflow-hidden">

        {/* Header */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 pt-16 md:pt-28 mb-0">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">The Edge</span>
                    <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">Why We Differ</h2>
                </div>
                <p className="hidden md:block text-sm text-black/35 max-w-[200px] leading-relaxed poppins-regular text-right">
                    What sets us apart from every other agency.
                </p>
            </div>
        </div>

        {/* Full-bleed invert rows */}
        <div className="w-full flex flex-col">
            {differences.map((diff, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="group relative w-full overflow-hidden cursor-default border-b border-black/[0.06] last:border-0"
                >
                    {/* Hover fill — pure CSS, slides up from bottom */}
                    <div className="absolute inset-0 bg-[#050505] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none z-0" />

                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-10 md:py-14 grid grid-cols-12 items-center gap-4">
                        {/* Ghost outline number */}
                        <div className="col-span-2 md:col-span-1">
                            <span className="text-[3.5rem] md:text-[5rem] font-black leading-none select-none block"
                                style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(0,0,0,0.12)' }}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Title */}
                        <div className="col-span-10 md:col-span-6">
                            <h3 className="text-[1.6rem] md:text-[2.2rem] lg:text-[2.6rem] text-[#050505] group-hover:text-white leading-[1.05] tracking-tight mona-sans-condensed-medium transition-colors duration-400">
                                {diff.title}
                            </h3>
                        </div>

                        {/* Description */}
                        <div className="col-span-12 md:col-span-4 md:col-start-9 pl-0 md:pl-8">
                            <p className="text-black/40 group-hover:text-white/55 text-[13px] md:text-[14px] leading-relaxed poppins-regular transition-colors duration-400">
                                {diff.desc}
                            </p>
                        </div>
                    </div>

                    {/* Green accent line */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#476D07] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none z-20" />
                </motion.div>
            ))}
        </div>

        <div className="pb-16 md:pb-28" />
    </section>
);


// Our Personality & Company Culture
const personalities = [
    { title: 'Direct', desc: 'We skip the fluff and get straight to what matters. No noise.' },
    { title: 'Curious', desc: 'We ask why before we ask how. Depth drives everything.' },
    { title: 'Builders', desc: 'We care about creating things that last beyond the brief.' },
    { title: 'Practical', desc: 'Strategy is only useful if it can actually be executed.' },
    { title: 'Obsessive', desc: 'If it does not meet our standard, it does not go out.' },
];
const culture = [
    { title: 'Collaboration Over Ego', desc: 'The best ideas win, no matter where they come from.' },
    { title: 'Ownership Mindset', desc: 'Everyone takes responsibility for outcomes, not tasks.' },
    { title: 'Learning Culture', desc: 'We invest in growth and constantly level up our craft.' },
    { title: 'Work That Matters', desc: 'Life is too short to build things we do not care about.' },
];

const OurPersonalityAndCulture = () => (
    <section className="w-full bg-[#050505] relative overflow-hidden selection:bg-[#AFFF00] selection:text-black">

        {/* ── PERSONALITY — Full-width display words ── */}
        <div className="w-full border-b border-white/[0.06]">
            {/* Header bar */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex items-end justify-between border-b border-white/[0.06] pt-16 md:pt-24 pb-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular">Our Character</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-white leading-none mona-sans-condensed-medium font-normal">How We Show Up</h2>
                    </div>
                    <span className="hidden md:block text-[9px] text-white/20 font-mono tracking-[0.2em] uppercase">01 — 05</span>
                </div>
            </div>

            {/* Each personality trait — full-width expandable row */}
            {personalities.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group relative w-full border-b border-white/[0.04] last:border-0 overflow-hidden cursor-default"
                >
                    {/* Hover fill */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        style={{ originX: 0 }}
                        className="absolute inset-0 bg-white/[0.03] pointer-events-none"
                    />

                    <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between py-6 md:py-5 gap-8">
                        {/* huge display word */}
                        <div className="flex items-baseline gap-5 md:gap-8">
                            <span className="text-[9px] text-white/15 font-mono tracking-[0.2em] shrink-0">0{i + 1}</span>
                            <h3
                                className="text-[2.4rem] md:text-[3.8rem] lg:text-[5rem] xl:text-[6rem] leading-none tracking-tight mona-sans-condensed-medium
                                           text-white/30 group-hover:text-white transition-colors duration-400"
                            >
                                {item.title}
                            </h3>
                        </div>

                        {/* description — appears on hover */}
                        <p className="hidden md:block text-white/0 group-hover:text-white/40 text-[12px] leading-relaxed poppins-regular max-w-[260px] text-right transition-colors duration-500">
                            {item.desc}
                        </p>

                        {/* arrow */}
                        <div className="shrink-0 w-7 h-7 border border-white/10 flex items-center justify-center group-hover:border-[#AFFF00] group-hover:bg-[#AFFF00] transition-all duration-400">
                            <svg className="w-3 h-3 text-white/20 group-hover:text-black transition-colors duration-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* ── CULTURE — Horizontal tiled dark grid ── */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="flex items-center justify-between mb-10">
                <span className="text-[9px] font-bold tracking-[0.4em] text-white/30 uppercase poppins-regular">Company Culture</span>
                <Link to="/careers" className="group flex items-center gap-2 text-white/30 hover:text-[#AFFF00] transition-colors text-[11px] tracking-[0.1em] poppins-regular">
                    Join the team
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
                {culture.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                        className="group bg-[#050505] hover:bg-white/[0.02] transition-colors duration-400 p-8 md:p-10 flex gap-8 items-start"
                    >
                        {/* Large ghost index */}
                        <span
                            className="text-[3rem] font-black leading-none select-none shrink-0 mt-1
                                       text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] group-hover:[-webkit-text-stroke-color:rgba(175,255,0,0.3)] transition-all duration-500"
                        >
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="flex flex-col gap-2 pt-1">
                            <h3 className="text-[1.05rem] text-white/80 group-hover:text-white mona-sans-condensed-medium leading-snug transition-colors duration-400">{item.title}</h3>
                            <p className="text-white/30 text-[12px] leading-relaxed poppins-regular">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

    </section>
);

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
                            <div className="flex items-end justify-between">
                                <p className="text-black/45 text-[13px] leading-relaxed poppins-regular max-w-[85%]">{c.desc}</p>
                                <div className="shrink-0 w-7 h-7 border border-black/10 flex items-center justify-center group-hover:bg-[#476D07] group-hover:border-[#476D07] transition-all duration-400 ml-4">
                                    <svg className="w-3 h-3 text-black/30 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                                </div>
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
    <section className="w-full bg-[#080808] px-6 md:px-10 pt-0 pb-10 selection:bg-black selection:text-[#AFFF00]">
        <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.19,1,0.22,1] }}
            className="w-full bg-[#AFFF00] relative overflow-hidden flex flex-col items-start px-8 md:px-20 py-20 md:py-32"
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
                <OurPersonalityAndCulture />
                <WhoWeWorkWith />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
};

export default About;
