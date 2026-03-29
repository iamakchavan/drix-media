import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoiseOverlay from '../components/NoiseOverlay';
import Footer from '../components/Footer';

import { SharedHeroLayout, letterVariants } from '../components/SharedHero';

// ─── Hero ────────────────────────────────────────────────────────────────────

const ServicesHero = () => (
    <SharedHeroLayout 
        bottomLabel="The Services"
        buttonText="OUR EXPERTISE"
        buttonHref="#approach"
        titleLines={
            <>
                <div className="flex flex-wrap items-center overflow-visible pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
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
                <div className="flex flex-wrap items-center overflow-visible mt-1 md:mt-2 pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
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
                <span className="text-white font-semibold block xl:whitespace-nowrap">We offer creative production, branding, content strategy, and performance campaigns</span>
                <span className="block xl:whitespace-nowrap">as one integrated system. Not as separate silos.</span>
            </>
        }
    />
);

// ─── Services Overview ────────────────────────────────────────────────────────

const ServicesOverview = () => (
    <section id="approach" className="w-full bg-white pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
        <div className="max-w-[1400px] mx-auto">

            {/* Header */}
            <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 mb-12 md:mb-20">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Integrated Strategy</span>
                    <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                        One Team. One Vision.
                    </h2>
                </div>
                <p className="hidden md:block text-sm text-black/35 max-w-[220px] leading-relaxed poppins-regular text-right">
                    Everything works together under one strategic roof.
                </p>
            </div>

            {/* Two-col body copy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-16 md:mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.19,1,0.22,1] }}
                    className="flex flex-col gap-6"
                >
                    <p className="text-[1.3rem] md:text-[1.5rem] text-black leading-snug tracking-tight mona-sans-condensed-medium">
                        Most agencies sell services in silos. Branding here. Content there. Campaigns somewhere else.
                    </p>
                    <p className="text-black/55 text-[15px] md:text-[16px] leading-relaxed poppins-regular">
                        The problem? Your brand ends up feeling fragmented.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.19,1,0.22,1] }}
                >
                    <p className="text-black/55 text-[15px] md:text-[16px] leading-relaxed poppins-regular mb-8">
                        At Drix Media, everything works together. Your brand strategy informs your content. Your content fuels your campaigns. Your campaigns are tracked and optimized for performance.
                    </p>

                    {/* Chamfered highlight block */}
                    <motion.div
                        initial="rest" whileHover="hover"
                        variants={{
                            rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 0%)" },
                            hover: { clipPath: "polygon(24px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 24px)", transition: { duration: 0.35, ease: [0.19,1,0.22,1] } }
                        }}
                        className="bg-[#FAFAFA] border border-black/[0.05] p-8 md:p-10 flex flex-col gap-6"
                    >
                        <p className="text-[1.1rem] md:text-[1.25rem] text-black leading-[1.5] tracking-tight mona-sans-condensed-medium">
                            One team. One vision. Better results.
                        </p>
                        <div className="flex items-center justify-between border-t border-black/[0.06] pt-6">
                            <cite className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/30 not-italic poppins-regular">The Drix Media Engine</cite>
                            <div className="shrink-0 w-7 h-7 border border-black/10 flex items-center justify-center hover:bg-[#476D07] hover:border-[#476D07] transition-all duration-400">
                                <svg className="w-3 h-3 text-black/30 hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                            </div>
                        </div>
                    </motion.div>
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
        deliverables: ['Brand films & commercials', 'Product photography', 'Social media content', 'Motion graphics'],
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop',
        dark: false,
    },
    {
        number: '02',
        title: 'Branding & Identity',
        description: 'Defining how your brand is perceived — strategy, visuals, and messaging systems.',
        deliverables: ['Brand strategy & positioning', 'Visual identity systems', 'Brand messaging & tone', 'Guidelines & systems'],
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
        dark: true,
    },
    {
        number: '03',
        title: 'Content Strategy',
        description: 'Content that connects with your audience and drives them to act.',
        deliverables: ['Content strategy & planning', 'Copywriting (web, social, ads)', 'Social media management', 'SEO-optimized content'],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
        dark: false,
    },
    {
        number: '04',
        title: 'Digital & Web Design',
        description: 'Websites and digital experiences that are fast, functional, and built to convert.',
        deliverables: ['Website design & development', 'E-commerce platforms', 'Landing pages', 'UI/UX design'],
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop',
        accent: true,
    },
    {
        number: '05',
        title: 'Campaigns & Performance',
        description: 'Integrated marketing campaigns across channels, designed for measurable results.',
        deliverables: ['Campaign strategy', 'Paid ads (Google, Meta, LinkedIn)', 'Performance tracking', 'A/B testing & analytics'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
        dark: true,
    },
];

const CARD_TOP_OFFSET = 120; // px from top for sticky
const CARD_STACK_GAP = 30; // additional px each card stacks below prev

const AnimatedServiceCard = ({ service, i, total, progress }: any) => {
    // The point where this specific card has fully reached its sticky top
    // and the NEXT card starts coming up over it.
    const startShrink = i / total;
    
    // How much this card scales down depends on its position in the deck
    const targetScale = 1 - (total - 1 - i) * 0.05;
    const targetOpacity = (total - 1 - i) * 0.15; // Max darkness

    // Scale and dimming are driven by the wrapper's scroll progress
    const scale = useTransform(progress, [startShrink, 1], [1, targetScale]);
    const overlayOpacity = useTransform(progress, [startShrink, 1], [0, targetOpacity]);

    const bgColor = service.accent ? 'bg-[#AFFF00]' : service.dark ? 'bg-[#050505]' : 'bg-white';
    const textMain = service.accent ? 'text-black' : service.dark ? 'text-white' : 'text-[#050505]';
    const textSub = service.accent ? 'text-black/55' : service.dark ? 'text-white/45' : 'text-black/45';
    const borderCol = service.accent ? 'border-black/[0.08]' : service.dark ? 'border-white/[0.06]' : 'border-black/[0.06]';
    const numberStroke = service.accent ? '2px rgba(0,0,0,0.12)' : service.dark ? '2px rgba(255,255,255,0.06)' : '2px rgba(0,0,0,0.05)';
    const delivColor = service.accent ? 'text-black/70' : service.dark ? 'text-white/60' : 'text-black/55';
    const dotColor = service.accent ? 'bg-black/30' : service.dark ? 'bg-[#AFFF00]' : 'bg-[#476D07]';
    const labelColor = service.accent ? 'text-black/40' : service.dark ? 'text-[#AFFF00]' : 'text-[#476D07]';
    const arrowBorder = service.accent ? 'border-black/15 hover:bg-black hover:border-black' : service.dark ? 'border-white/10 hover:bg-[#AFFF00] hover:border-[#AFFF00]' : 'border-black/10 hover:bg-[#476D07] hover:border-[#476D07]';
    const arrowIcon = service.accent ? 'text-black/30 hover:text-white' : service.dark ? 'text-white/20 hover:text-black' : 'text-black/30 hover:text-white';

    // Shadow for depth effect as cards stack
    const shadowStyle = service.dark || service.accent
        ? 'shadow-[0_-8px_40px_rgba(0,0,0,0.3)]'
        : 'shadow-[0_-8px_40px_rgba(0,0,0,0.08)]';

    return (
        <div
            className="sticky top-0 flex items-start justify-center w-full"
            style={{ 
                top: `${CARD_TOP_OFFSET + i * CARD_STACK_GAP}px`, 
                zIndex: i + 1,
                marginBottom: i === total - 1 ? 0 : '80px',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 100, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                style={{ 
                    scale,
                    transformOrigin: "top center",
                    clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)" 
                }}
                className={`${bgColor} ${shadowStyle} relative overflow-hidden w-full max-w-[1240px] transform-gpu border ${borderCol}`}
            >
                {/* Scroll-driven dark overlay for background depth */}
                <motion.div 
                    style={{ opacity: overlayOpacity }} 
                    className="absolute inset-0 bg-black z-50 pointer-events-none" 
                />
                <div className="flex flex-col lg:flex-row w-full min-h-[420px] md:min-h-[480px]">
                    {/* Left: Content */}
                    <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
                        <div>
                            {/* Number + Label */}
                            <div className="flex items-center gap-6 mb-8 md:mb-12">
                                <span
                                    className="text-[4rem] md:text-[5.5rem] font-black leading-none select-none"
                                    style={{ color: 'transparent', WebkitTextStroke: numberStroke }}
                                >
                                    {service.number}
                                </span>
                                <span className={`text-[9px] font-bold tracking-[0.4em] uppercase poppins-regular ${labelColor}`}>Service</span>
                            </div>

                            {/* Title */}
                            <h3 className={`text-[2rem] md:text-[3rem] lg:text-[3.5rem] ${textMain} leading-[0.95] tracking-tight mona-sans-condensed-medium mb-6`}>
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className={`${textSub} text-[15px] md:text-[16px] leading-relaxed poppins-regular max-w-lg mb-10`}>
                                {service.description}
                            </p>
                        </div>

                        {/* Deliverables — compact dot list */}
                        <div>
                            <span className={`text-[9px] font-bold tracking-[0.3em] uppercase ${textSub} block mb-5 poppins-regular`}>Key Deliverables</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                {service.deliverables.map((item: string, j: number) => (
                                    <div key={j} className="flex items-center gap-3 group/item">
                                        <div className={`w-1.5 h-1.5 ${dotColor} shrink-0 group-hover/item:scale-150 transition-transform duration-300`}></div>
                                        <span className={`${delivColor} text-[13px] md:text-[14px] poppins-regular leading-snug group-hover/item:text-[${textMain}] transition-colors duration-300`}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="hidden lg:block w-[42%] relative overflow-hidden group">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            src={service.image}
                            alt={service.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                        {/* Gradient overlay for text readability on edges */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${service.accent ? 'from-[#AFFF00]/50' : service.dark ? 'from-[#050505]/60' : 'from-white/40'} to-transparent w-1/3 z-10`} />

                        {/* Arrow button bottom-right */}
                        <div className="absolute bottom-6 right-6 z-20">
                            <div className={`w-12 h-12 border ${arrowBorder} flex items-center justify-center transition-all duration-400 backdrop-blur-md bg-white/5`}>
                                <svg className={`w-5 h-5 ${arrowIcon} transition-colors group-hover:block`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* Mobile image */}
                    <div className="lg:hidden w-full h-[250px] relative overflow-hidden">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
                    {['One contract, one invoice', 'Integrated performance tracking', 'Consistent voice across every touchpoint', 'We handle all internal coordination'].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.19,1,0.22,1] }}
                            className="group bg-[#050505] hover:bg-white/[0.02] transition-colors duration-400 p-6 md:p-8 flex gap-5 items-start"
                        >
                            <span
                                className="text-[2rem] font-black leading-none select-none shrink-0 mt-0.5
                                           text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] group-hover:[-webkit-text-stroke-color:rgba(175,255,0,0.3)] transition-all duration-500"
                            >
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="text-white/60 group-hover:text-white text-[14px] leading-relaxed poppins-regular transition-colors duration-400">{item}</p>
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
                                    <svg className="w-3 h-3 text-black/20 group-hover:text-black transition-colors duration-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
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
                            Ready to See How<br />
                            <span className="text-black/30">Integrated Services Work?</span>
                        </h2>
                        <p className="text-black/60 text-[15px] md:text-[16px] max-w-lg leading-relaxed poppins-regular">
                            Let's talk about your goals and how we can help you get there.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 shrink-0">
                        <Link
                            to="/contact"
                            className="group flex items-center gap-4 bg-black text-white px-8 py-5 text-[13px] tracking-[0.18em] uppercase poppins-regular font-bold transition-all duration-400 hover:bg-[#050505] hover:gap-6"
                            style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)" }}
                        >
                            Book a Strategy Call
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
                <CTASection />
                <Footer />
            </div>
        </main>
    );
};

export default Services;
