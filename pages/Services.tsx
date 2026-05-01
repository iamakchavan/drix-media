import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoiseOverlay from '../components/NoiseOverlay';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';

import { SharedHeroLayout, letterVariants } from '../components/SharedHero';

// ─── Hero ────────────────────────────────────────────────────────────────────

const ServicesHero = () => (
    <SharedHeroLayout
        bottomLabel="The Services"
        buttonText="OUR EXPERTISE"
        buttonHref="#approach"
        titleLines={
            <>
                <div className="flex flex-wrap items-center overflow-visible pb-2 md:pb-4 gap-x-[3vw] md:gap-x-4">
                    <span className="flex">
                        {"Services".split('').map((char, index) => (
                            <motion.span key={`line1-a-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                    <span className="flex text-white/50 italic font-medium">
                        {"Built".split('').map((char, index) => (
                            <motion.span key={`line1-b-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
                <div className="flex flex-wrap items-center overflow-visible mt-1 md:mt-2 pb-2 md:pb-4 gap-x-[3vw] md:gap-x-4">
                    <span className="flex text-[#AFFF00]">
                        {"To Work Together.".split('').map((char, index) => (
                            <motion.span key={`line2-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
            </>
        }
        subtextContent={
            <>
                <span className="text-white font-semibold block xl:whitespace-nowrap">Creative production. Branding. Content strategy. Performance campaigns.</span>
                <span className="block xl:whitespace-nowrap">All working together, not in separate boxes.</span>
            </>
        }
    >
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
            <motion.span
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[28vw] md:text-[15vw] font-black text-white/[0.015] uppercase tracking-[-0.05em] translate-y-[-5%] mona-sans-condensed-bold"
            >
                SERVICES
            </motion.span>
        </div>

    </SharedHeroLayout>
);


// ─── Services Overview ────────────────────────────────────────────────────────

const PhilosophyCard = () => {
    return (
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
                className="relative z-10 bg-[#FAFAFA] m-[1px] p-8 md:p-10 flex flex-col justify-between min-h-[280px]"
            >
                {/* Text Content: This will now push the card height dynamically if needed */}
                <p className="text-[1.1rem] md:text-[1.25rem] text-black leading-[1.5] tracking-tight mona-sans-condensed-medium">
                    Fewer delays. Faster output. Stronger brand.
                </p>

                <div className="flex flex-row items-center justify-between border-t border-black/[0.06] pt-8 md:pt-10 gap-4 md:gap-0 mt-8">
                    <div className="flex flex-col gap-2">
                        <cite className="text-[9px] font-bold tracking-[0.4em] uppercase text-black/50 not-italic poppins-regular">The Drix Engine</cite>
                        <div className="w-10 h-[1px] bg-black/[0.08]" />
                    </div>

                    {/* Premium Arrow Button */}
                    <div className="group/arrow relative w-11 h-11 md:w-12 md:h-12 transition-transform duration-500 hover:scale-110 shrink-0 cursor-pointer">
                        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover/arrow:bg-black" 
                            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}></div>
                        <div className="absolute inset-[1px] bg-white transition-all duration-300 group-hover/arrow:inset-[3.5px] group-hover/arrow:bg-transparent" 
                            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}></div>
                        <div className="relative z-10 flex items-center justify-center w-full h-full">
                            <svg className="w-4 h-4 text-black transition-colors duration-300 group-hover/arrow:text-[#AFFF00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17l9.2-9.2M17 17V7H7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ServicesOverview = () => (
    <section id="approach" className="w-full bg-white pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
        <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 mb-12 md:mb-20">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Integrated Strategy</span>
                    <h2 className="text-[1.8rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                        One Team. One Vision.
                    </h2>
                </div>
                <p className="hidden md:block text-sm text-black/35 max-w-[220px] leading-relaxed poppins-regular text-right">
                    Everything works together under one strategic roof.
                </p>
            </div>

            {/* Two-col body copy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="flex flex-col gap-8"
                >
                    <div className="flex flex-col gap-6">
                        <p className="text-[1.15rem] md:text-[1.5rem] text-black leading-snug tracking-tight mona-sans-condensed-medium">
                            Most agencies sell services in fragments. Branding here. Content there. Campaigns somewhere else.
                        </p>
                        <p className="text-black/55 text-[15px] md:text-[16px] leading-relaxed poppins-regular max-w-md">
                            The problem? Your brand ends up feeling fragmented.
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
                        At Drix Media, everything connects. Your brand strategy shapes your content. Your campaigns are fueled by content and optimised for real results.
                    </p>

                    <PhilosophyCard />
                </motion.div>
            </div>
        </div>
    </section>
);

// ─── Stacking Service Cards ───────────────────────────────────────────────────

interface StackServiceCard {
    number: string;
    title: string;
    description: string;
    deliverables: string[];
    image: string;
    dark?: boolean;
    accent?: boolean;
}

const stackServices: StackServiceCard[] = [
    {
        number: '01',
        title: 'Creative Production',
        description: 'Films, photography, and visual content that captures attention and drives action.',
        deliverables: ['Brand films & commercials', 'Product photography', 'Motion graphics', 'Visual storytelling'],
        image: '/assets/services/Creative-production.webp',
        dark: false,
    },
    {
        number: '02',
        title: 'Branding & Identity',
        description: 'Defining how your brand is perceived — strategy, visuals, and messaging systems.',
        deliverables: ['Brand strategy & positioning', 'Visual identity systems', 'Brand messaging & tone', 'Guidelines & systems'],
        image: '/assets/services/Branding-and-identity.webp',
        dark: true,
    },
    {
        number: '03',
        title: 'Content Strategy',
        description: 'Content that connects with your audience and drives them to act.',
        deliverables: ['Content strategy & planning', 'Social media content', 'Copywriting (web, social, ads)', 'SEO-optimized content'],
        image: '/assets/services/Content-strategy.webp',
        dark: false,
    },
    {
        number: '04',
        title: 'Digital & Web Design',
        description: 'We design and develop websites, apps, and digital experiences that are fast, functional, and built to convert.',
        deliverables: ['Website & app designing', 'UI/UX design', 'Website development', 'E-commerce platforms'],
        image: '/assets/services/Digital-and-website-2.webp',
        accent: true,
    },
    {
        number: '05',
        title: 'Campaigns & Performance',
        description: 'Integrated marketing campaigns across channels, designed for measurable results.',
        deliverables: ['Campaign strategy', 'Paid ads (Google, Meta, LinkedIn)', 'Performance tracking', 'A/B testing & analytics'],
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000&auto=format&fit=crop',
        dark: true,
    },
];

const CARD_TOP_OFFSET = 120; // px from top for sticky
const CARD_STACK_GAP = 30; // additional px each card stacks below prev

const AnimatedServiceCard = ({ service, i, total, progress }: any) => {
    const startShrink = i / total;
    const targetScale = 1 - (total - 1 - i) * 0.05;
    const targetOpacity = (total - 1 - i) * 0.15;

    const scale = useTransform(progress, [startShrink, 1], [1, targetScale]);
    const overlayOpacity = useTransform(progress, [startShrink, 1], [0, targetOpacity]);

    const bgColor = service.accent ? 'bg-[#AFFF00]' : service.dark ? 'bg-[#050505]' : 'bg-white';
    const textMain = service.accent ? 'text-black' : service.dark ? 'text-white' : 'text-[#050505]';
    const textSub = service.accent ? 'text-black/55' : service.dark ? 'text-white/45' : 'text-black/45';
    // Deepen the border color for the 1px stroke visibility
    const strokeColor = service.accent ? 'bg-black/15' : service.dark ? 'bg-white/10' : 'bg-black/10';
    const numberStroke = service.accent ? '2px rgba(0,0,0,0.12)' : service.dark ? '2px rgba(255,255,255,0.06)' : '2px rgba(0,0,0,0.05)';
    const dotColor = service.accent ? 'bg-black/30' : service.dark ? 'bg-[#AFFF00]' : 'bg-[#476D07]';
    const labelColor = service.accent ? 'text-black/40' : service.dark ? 'text-[#AFFF00]' : 'text-[#476D07]';
    
    // Shadow for depth effect as cards stack
    const shadowStyle = service.dark || service.accent
        ? 'shadow-[0_-8px_40px_rgba(0,0,0,0.3)]'
        : 'shadow-[0_-8px_40px_rgba(0,0,0,0.08)]';

    return (
        <div
            className="sticky top-0 flex items-start justify-center w-full"
            style={{
                top: `calc(env(safe-area-inset-top, 0px) + ${80 + i * 20}px)`, // Adaptive mobile-friendly offset
                zIndex: i + 1,
                marginBottom: i === total - 1 ? 0 : '60px',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                style={{ scale, transformOrigin: "top center" }}
                className="relative w-full max-w-[1240px] transform-gpu"
            >
                {/* 1. The High-Fidelity Stroke Layer */}
                <div 
                    className={`absolute inset-0 ${strokeColor} z-0 ${shadowStyle}`}
                    style={{ clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)" }}
                />

                {/* 2. The Content Layer: Offset by 1px to reveal the stroke */}
                <div 
                    className={`relative z-10 ${bgColor} m-[1px] overflow-hidden`}
                    style={{ clipPath: "polygon(0 0, calc(100% - 39px) 0, 100% 39px, 100% 100%, 0 100%)" }}
                >
                    {/* Scroll-driven dark overlay for background depth */}
                    <motion.div
                        style={{ opacity: overlayOpacity }}
                        className="absolute inset-0 bg-black z-40 pointer-events-none"
                    />

                    <div className="flex flex-col lg:flex-row w-full min-h-[400px] md:min-h-[480px]">
                        {/* Left: Content */}
                        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
                            <div>
                                {/* Number + Label */}
                                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-12">
                                    <span
                                        className="text-[3.5rem] md:text-[5.5rem] font-black leading-none select-none tracking-tighter"
                                        style={{ color: 'transparent', WebkitTextStroke: numberStroke }}
                                    >
                                        {service.number}
                                    </span>
                                    <div className="flex flex-col gap-1">
                                        <span className={`text-[8px] md:text-[9px] font-bold tracking-[0.4em] uppercase poppins-regular ${labelColor}`}>Service</span>
                                        <div className={`w-8 h-[1px] ${strokeColor} opacity-50`} />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className={`text-[1.8rem] md:text-[3rem] lg:text-[3.5rem] ${textMain} leading-[0.95] tracking-tight mona-sans-condensed-medium mb-6`}>
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className={`${textSub} text-[14px] md:text-[16px] leading-relaxed poppins-regular max-w-lg mb-10`}>
                                    {service.description}
                                </p>
                            </div>

                            {/* Deliverables — compact dot list */}
                            <div>
                                <span className={`text-[8px] font-bold tracking-[0.3em] uppercase ${textSub} block mb-5 poppins-regular`}>Key Deliverables</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                                    {service.deliverables.map((item: string, j: number) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <div className={`w-1 h-1 md:w-1.5 md:h-1.5 ${dotColor} shrink-0`}></div>
                                            <span className={`${textSub} text-[13px] md:text-[14px] poppins-regular leading-snug`}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Image (Desktop) */}
                        <div className="hidden lg:block w-[42%] relative overflow-hidden group">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                src={service.image}
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${service.accent ? 'from-[#AFFF00]/50' : service.dark ? 'from-[#050505]/60' : 'from-white/40'} to-transparent w-1/3 z-10`} />
                        </div>

                        {/* Mobile image (Adaptive height) */}
                        <div className="lg:hidden w-full h-[220px] sm:h-[280px] relative overflow-hidden">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${service.accent ? 'from-[#AFFF00]/20' : service.dark ? 'from-[#050505]/30' : 'from-white/20'} to-transparent z-10`} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const StackingServicesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="w-full bg-[#FAFAFA] selection:bg-[#AFFF00] selection:text-black relative">
            <div className="sticky top-0 h-0 pointer-events-none" />

            {/* Header */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
                <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 pt-16 md:pt-28 mb-12">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">What We Do</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                            Our Services
                        </h2>
                    </div>
                </div>
            </div>

            {/* Stacking cards container */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-32 md:pb-[25vh] relative z-10 flex flex-col">
                {stackServices.map((service, i) => (
                    <AnimatedServiceCard
                        key={service.number}
                        service={service}
                        i={i}
                        progress={scrollYProgress}
                        total={stackServices.length}
                    />
                ))}
            </div>
        </section>
    );
};

// ─── The Drix Advantage ──────────────────────────────────────────────────────

const DrixAdvantage = () => (
    <section className="w-full bg-[#050505] selection:bg-[#AFFF00] selection:text-black py-16 md:py-32">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="flex flex-col gap-6">
                    <span className="text-[9px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular">The Drix Media Advantage</span>
                    <h3 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-white leading-none mona-sans-condensed-medium font-normal">
                        One team.<br />One strategy.<br />One brand voice.
                    </h3>
                    <p className="text-white/40 text-[15px] md:text-[18px] leading-relaxed poppins-regular max-w-lg">
                        Your strategist, designer, and content creator collaborate from day one. The result is work that feels unified and performs better.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['One contract, one invoice', 'Integrated performance tracking', 'Consistent voice across every touchpoint', 'We handle all internal coordination'].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative bg-white/10 p-[1px]"
                            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)" }}
                        >
                            <div
                                className="relative bg-[#0A0A0A] w-full h-full p-8 md:p-10 flex gap-6 items-start overflow-hidden"
                                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 23px), calc(100% - 23px) 100%, 0 100%)" }}
                            >
                                <span
                                    className="text-[2.5rem] md:text-[3rem] font-bold leading-none select-none shrink-0 
                                               text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] group-hover:[-webkit-text-stroke-color:#AFFF00] transition-all duration-500 font-mono"
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="flex flex-col gap-2 mt-1">
                                    <p className="text-white/60 group-hover:text-white text-[15px] md:text-[16px] leading-relaxed poppins-regular transition-colors duration-400">
                                        {item}
                                    </p>
                                    <div className="w-8 h-[1px] bg-white/10 group-hover:bg-[#AFFF00]/40 transition-all duration-500" />
                                </div>

                                {/* Subtle Ambient Glow on Hover */}
                                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#AFFF00]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// ─── Comparison Table ─────────────────────────────────────────────────────────

const ComparisonTable = () => {
    const rows = [
        ['Separate teams for each service', 'One cross-functional team'],
        ['Disconnected strategies', 'Unified strategy across all services'],
        ['Client manages coordination', 'We handle all internal coordination'],
        ['Inconsistent brand voice', 'Consistent voice across all touchpoints'],
        ['Multiple contracts and invoices', 'One contract, one invoice'],
        ['Siloed reporting', 'Integrated performance tracking'],
    ];

    return (
        <section className="w-full bg-[#FAFAFA] selection:bg-[#AFFF00] selection:text-black overflow-hidden">

            {/* Header */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 pt-16 md:pt-28 mb-12 md:mb-16">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Head to Head</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                            Side by Side
                        </h2>
                    </div>
                    <p className="hidden md:block text-sm text-black/35 max-w-[220px] leading-relaxed poppins-regular text-right">
                        See how the integrated model compares.
                    </p>
                </div>
            </div>

            {/* Table rows — full-width interactive */}
            <div className="w-full">
                {rows.map(([left, right], i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                        className="group relative w-full overflow-hidden cursor-default border-b border-black/[0.06]"
                    >
                        {/* Hover fill */}
                        <div className="absolute inset-0 bg-[#050505] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none z-0" />

                        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-6 md:py-8 grid grid-cols-12 items-center gap-4">
                            {/* Ghost number */}
                            <div className="col-span-1 hidden md:block">
                                <span className="text-[2.5rem] font-black leading-none select-none"
                                    style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(0,0,0,0.08)' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>

                            {/* Traditional */}
                            <div className="col-span-6 md:col-span-5">
                                <p className="text-black/40 group-hover:text-white/40 text-[13px] md:text-[14px] leading-relaxed poppins-regular transition-colors duration-400">
                                    {left}
                                </p>
                            </div>

                            {/* Drix */}
                            <div className="col-span-6 md:col-span-5 md:col-start-8">
                                <p className="text-black group-hover:text-white text-[14px] md:text-[15px] leading-snug tracking-tight mona-sans-condensed-medium transition-colors duration-400">
                                    {right}
                                </p>
                            </div>

                            {/* Arrow */}
                            <div className="col-span-12 md:col-span-1 hidden md:flex justify-end">
                                <div className="shrink-0 w-7 h-7 border border-black/10 group-hover:border-[#AFFF00] group-hover:bg-[#AFFF00] flex items-center justify-center transition-all duration-400">
                                    <svg className="w-3 h-3 text-black/20 group-hover:text-black transition-colors duration-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                </div>
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
};

// ─── CTA Section ─────────────────────────────────────────────────────────────

const CTASection = () => (
    <section className="w-full bg-[#080808] px-6 md:px-10 pt-16 md:pt-24 pb-10 selection:bg-black selection:text-[#AFFF00]">
        <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="w-full bg-[#AFFF00] relative overflow-hidden flex flex-col items-start px-6 md:px-20 py-12 md:py-20"
            style={{ clipPath: "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)" }}
        >
            {/* Subtle dot grid */}
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-12">
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-black/50 uppercase poppins-regular">Get Started</span>
                        <h2 className="text-[2.2rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] tracking-tight text-black leading-none mona-sans-condensed-medium font-normal">
                            See How Integrated<br /> Services Work
                        </h2>
                        <p className="text-black/60 text-[15px] md:text-[16px] max-w-lg leading-relaxed poppins-regular">
                            Let's talk about your goals and how we can help you get there.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 shrink-0 w-full md:w-auto">
                        <div className="w-full md:w-auto scale-[0.85] md:scale-100 origin-left">
                            {/* Re-using the premium button pattern directly */}
                            <motion.a
                                href="/contact"
                                initial="initial"
                                whileHover="hover"
                                variants={{
                                    initial: { clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)" },
                                    hover: { clipPath: "polygon(18px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 18px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="group relative flex items-center justify-center bg-black h-[60px] px-8 md:px-10 transition-colors duration-500 overflow-hidden"
                            >
                                <motion.div 
                                    variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0 bg-white w-full h-full"
                                />
                                <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
                                    <div className="opacity-0 pointer-events-none flex items-center gap-3 text-[12px] md:text-[13px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">
                                        <span>BOOK A STRATEGY CALL</span>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[1px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                    </div>
                                    <motion.div
                                        variants={{ initial: { y: "0%" }, hover: { y: "-100%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                        className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[12px] md:text-[13px] tracking-[0.2em] uppercase font-bold text-white whitespace-nowrap"
                                    >
                                        <span>BOOK A STRATEGY CALL</span>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[1px] group-hover:rotate-45 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                    </motion.div>
                                    <motion.div
                                        variants={{ initial: { y: "100%" }, hover: { y: "0%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                        className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[12px] md:text-[13px] tracking-[0.2em] uppercase font-bold text-black whitespace-nowrap"
                                    >
                                        <span>BOOK A STRATEGY CALL</span>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[1px] -rotate-45 group-hover:rotate-45 transition-transform duration-500 delay-75 ease-[0.16, 1, 0.3, 1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                    </motion.div>
                                </div>
                            </motion.a>
                        </div>
                        <a href="mailto:hello@drixmedia.com" className="text-black/50 hover:text-black transition-colors text-[12px] tracking-[0.12em] poppins-regular text-center md:text-left">hello@drixmedia.com</a>
                    </div>
                </div>
            </div>
        </motion.div>
    </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Services: React.FC = () => {
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
                    <ServicesHero />
                </motion.div>
            </div>

            <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,-0,-0,0.1)] mt-[-60px] md:mt-[-100px]"
                style={{ clipPath: "polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)" }}>
                <ServicesOverview />
                <StackingServicesSection />
                <DrixAdvantage />
                <FAQSection />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
};

export default Services;
