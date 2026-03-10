import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoiseOverlay from '../components/NoiseOverlay';
import Footer from '../components/Footer';

// ─── Hero ────────────────────────────────────────────────────────────────────

const ServicesHero = () => (
    <div className="relative w-full h-screen bg-black overflow-hidden z-0">
        <div className="relative w-full h-full origin-center">
            <motion.div
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0"
            >
                <div style={{ position: 'absolute', borderRadius: 'inherit', inset: '0px' }}>
                    <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                        alt="Digital strategy and design"
                        style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }}
                    />
                </div>
                {/* Dynamic Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-[1]" />
            </motion.div>

            <NoiseOverlay />

            <div className="absolute top-0 left-0 w-full z-20 px-6 md:px-10 py-6">
                <Navbar />
            </div>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-10 lg:px-12">

                <motion.h1
                    initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1, delay: 0.2 }}
                    className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white text-center leading-[0.95] max-w-6xl mb-8"
                >
                    Services <span className="text-white/40">Built</span> <br />To Work Together
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1, delay: 0.4 }}
                    className="text-lg md:text-xl lg:text-2xl text-white/70 text-center font-medium max-w-2xl lg:max-w-4xl leading-relaxed px-4"
                >
                    We offer creative production, branding, content strategy, and performance campaigns <br className="hidden md:block" /> as one integrated system. Not as separate silos.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#AFFF00] to-transparent"></div>
            </motion.div>
        </div>
    </div>
);

// ─── Services Overview ────────────────────────────────────────────────────────

const ServicesOverview = () => (
    <section className="w-full bg-white py-40 px-6 md:px-12 text-[#0C0C0C] font-sans">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left: Sticky Headline */}
            <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
                <p className="text-[11px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase mb-8">Integrated Strategy</p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                    One Team.<br /><span className="text-black/15 text-5xl md:text-7xl">One Vision.</span>
                </h2>
                <div className="w-16 h-[2px] bg-black/10"></div>
            </div>

            {/* Right: Editorial Content */}
            <div className="lg:col-span-7 flex flex-col gap-12">
                <p className="text-3xl md:text-4xl font-bold text-black tracking-tight leading-[1.15] max-w-2xl">
                    Most agencies sell services in silos. Branding here. Content there. Campaigns somewhere else.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-black/50 leading-relaxed font-medium">
                    <div className="flex flex-col gap-8">
                        <p className="text-black/80 font-bold">
                            The problem? Your brand ends up feeling fragmented.
                        </p>
                    </div>
                    <div className="flex flex-col gap-8">
                        <p>
                            At Drix Media, everything works together. Your brand strategy informs your content. Your content fuels your campaigns. Your campaigns are tracked and optimized for performance.
                        </p>
                    </div>
                </div>

                {/* Integrated Highlight Block */}
                <div className="mt-8 p-10 md:p-14 bg-[#FAFAFA] border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[#AFFF00]"></div>
                    <p className="text-2xl md:text-3xl font-black text-black leading-tight tracking-tight">
                        One team. One vision. Better results.
                    </p>
                    <div className="mt-8 flex items-center gap-4 text-black/20 group-hover:text-[#AFFF00] transition-colors duration-500">
                        <div className="w-12 h-[1px] bg-current"></div>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">The Drix Media Engine</span>
                    </div>
                </div>
            </div>

        </div>
    </section>
);

// ─── Individual Service Sections ──────────────────────────────────────────────

interface ServiceDetailProps {
    number: string;
    title: string;
    whatWeDo: string;
    deliverables: string[];
    whyItMatters: string;
    howWeDiffer: string;
    image: string;
    dark?: boolean;
    accent?: boolean; // red bg
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
    number, title, whatWeDo, deliverables, whyItMatters, howWeDiffer, image, dark, accent
}) => {
    const bg = accent ? 'bg-[#AFFF00]' : dark ? 'bg-black' : 'bg-[#FAFAFA]';
    const textColor = accent ? 'text-black' : dark ? 'text-white' : 'text-[#0C0C0C]';
    const subColor = accent ? 'text-black/60' : dark ? 'text-white/60' : 'text-[#0C0C0C]/50';
    const numberBg = accent ? 'bg-black text-white' : dark ? 'bg-[#AFFF00] text-black' : 'bg-black text-white';
    const labelColor = accent ? 'text-black/40' : dark ? 'text-white/40' : 'text-black/30';
    const borderColor = accent ? 'border-black/10' : dark ? 'border-white/10' : 'border-black/5';
    const dotColor = accent ? 'bg-white' : 'bg-[#AFFF00]';

    return (
        <section className={`w-full ${bg} py-32 md:py-48 px-6 md:px-12 first:pt-48`}>
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                {/* Left: Image + Number */}
                <div className="lg:col-span-5 flex flex-col gap-12">
                    <div className="relative group cursor-none">
                        {/* Number Badge */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className={`absolute -top-6 -left-6 w-16 h-16 rounded-full ${numberBg} flex items-center justify-center text-xl font-black z-10 shadow-2xl transition-transform duration-500 group-hover:scale-110`}
                        >
                            {number}
                        </motion.div>
                        <div className="w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl bg-black/5">
                            <motion.img
                                initial={{ scale: 1.2, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className={`border-t ${borderColor} pt-8`}>
                            <p className={`text-[10px] font-black tracking-[0.4em] uppercase mb-4 ${labelColor}`}>Why It Matters</p>
                            <p className={`${subColor} text-base leading-relaxed font-medium`}>{whyItMatters}</p>
                        </div>
                        <div className={`border-t ${borderColor} pt-8`}>
                            <p className={`text-[10px] font-black tracking-[0.4em] uppercase mb-4 ${labelColor}`}>Drix Edge</p>
                            <p className={`${subColor} text-base leading-relaxed font-medium`}>{howWeDiffer}</p>
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-7 flex flex-col pt-4">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className={`text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter ${textColor} mb-10 leading-[0.85]`}>
                            {title}
                        </h2>
                        <p className={`${subColor} text-xl md:text-2xl font-medium leading-[1.3] mb-16 max-w-xl`}>{whatWeDo}</p>
                    </motion.div>

                    {/* Deliverables */}
                    <div className="mt-4">
                        <p className={`text-[11px] font-black tracking-[0.5em] uppercase mb-10 ${labelColor}`}>Key Deliverables</p>
                        <div className="flex flex-col">
                            {deliverables.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative flex items-center justify-between py-6 border-t ${borderColor} group cursor-default`}
                                >
                                    <span className={`${textColor} text-xl md:text-2xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300`}>{item}</span>
                                    <div className={`w-3 h-3 rounded-full ${dotColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                </motion.div>
                            ))}
                            <div className={`border-t ${borderColor}`}></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

// ─── Service data ─────────────────────────────────────────────────────────────

const serviceItems: ServiceDetailProps[] = [
    {
        number: '01',
        title: 'Creative Production',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop',
        whatWeDo: 'We create films, photography, and visual content that captures attention and tells your story.',
        deliverables: [
            'Brand films and commercials',
            'Product photography and videography',
            'Social media content creation',
            'Event coverage and documentation',
            'Animation and motion graphics',
        ],
        whyItMatters: 'Content is how your audience experiences your brand. If it is generic, forgettable, or poorly executed, they move on. We create content that stops the scroll and drives action.',
        howWeDiffer: 'We do not just shoot what looks good. We shoot what performs. Every piece of content is built with distribution and performance in mind.',
        dark: false,
    },
    {
        number: '02',
        title: 'Branding & Identity',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
        whatWeDo: 'We define how your brand is perceived and build the visual and messaging systems to support it.',
        deliverables: [
            'Brand strategy and positioning',
            'Visual identity (logo, typography, color systems)',
            'Brand messaging and tone of voice',
            'Brand guidelines and systems',
            'Rebranding and brand evolution',
        ],
        whyItMatters: 'Your brand is not your logo. It is the sum of every interaction someone has with your business. If it is unclear or inconsistent, trust breaks down. We build brands that are clear, memorable, and built to scale.',
        howWeDiffer: 'We start with business goals, not aesthetics. Every branding decision is rooted in strategy, not trends.',
        dark: true,
    },
    {
        number: '03',
        title: 'Content Strategy & Marketing',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
        whatWeDo: 'We plan, create, and distribute content that connects with your audience and drives them to act.',
        deliverables: [
            'Content strategy and planning',
            'Copywriting (web, social, email, ads)',
            'Social media management',
            'Blog and long-form content',
            'SEO-optimized content',
        ],
        whyItMatters: 'Good content builds trust. Great content builds businesses. Your audience is looking for answers, solutions, and stories. If you are not providing them, someone else is.',
        howWeDiffer: 'We write for humans and optimize for search. Every piece of content serves a purpose, whether it is driving traffic, building authority, or converting leads.',
        dark: false,
    },
    {
        number: '04',
        title: 'Digital & Web Design',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop',
        whatWeDo: 'We design and build websites and digital experiences that are fast, functional, and built to convert.',
        deliverables: [
            'Website design and development',
            'E-commerce platforms',
            'Landing pages optimized for conversion',
            'UI/UX design',
            'Website maintenance and optimization',
        ],
        whyItMatters: 'Your website is your most important sales tool. If it is slow, confusing, or outdated, you are losing business. We build sites that look great and perform better.',
        howWeDiffer: 'We design with data. Every element is tested and optimized for user experience and conversion.',
        accent: true,
    },
    {
        number: '05',
        title: 'Campaigns & Performance',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
        whatWeDo: 'We plan and execute integrated marketing campaigns across channels, designed to deliver measurable results.',
        deliverables: [
            'Campaign strategy and planning',
            'Paid advertising (Google, Meta, LinkedIn)',
            'Performance tracking and optimization',
            'A/B testing and experimentation',
            'Reporting and analytics',
        ],
        whyItMatters: 'A campaign without performance tracking is just guessing. We build campaigns that are measurable, scalable, and optimized to hit your goals.',
        howWeDiffer: 'We do not launch and disappear. We monitor, test, and optimize continuously to improve performance over time.',
        dark: true,
    },
];

// ─── Why Integrated Services Matter ──────────────────────────────────────────

const problemCards = [
    {
        title: 'Inconsistent Messaging',
        desc: 'Your brand voice changes depending on who wrote it.',
    },
    {
        title: 'Wasted Time',
        desc: 'You are the one connecting the dots between agencies. That is not your job.',
    },
    {
        title: 'Higher Costs',
        desc: 'Multiple agencies mean multiple contracts, multiple onboarding processes, and more overhead.',
    },
    {
        title: 'Slower Execution',
        desc: 'When teams do not talk, timelines stretch and work gets duplicated.',
    },
];

const WhyIntegrated = () => (
    <section className="w-full bg-[#FAFAFA] py-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">

            {/* Headline */}
            <div className="max-w-5xl mb-20">
                <p className="text-[11px] font-bold tracking-[0.2em] text-black/40 uppercase mb-4">The Real Problem</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black leading-tight">
                    The Problem With Siloed Agencies
                </h2>
            </div>

            {/* Problem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                {problemCards.map((card, i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-200 p-10 md:p-12 flex flex-col justify-between min-h-[260px] relative overflow-hidden group hover:border-gray-300 transition-colors duration-300"
                    >
                        {/* Number Badge */}
                        <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
                            0{i + 1}
                        </div>
                        {/* Red corner accent */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-l-[2px] border-t-[2px] border-[#AFFF00]"></div>

                        <div className="mt-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 tracking-tight">{card.title}</h3>
                            <p className="text-[#0C0C0C]/60 text-base md:text-lg leading-relaxed">{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Drix Advantage Block */}
            <div className="bg-black text-white p-10 md:p-16 relative overflow-hidden">
                {/* Grid Lines */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                ></div>
                {/* Glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#AFFF00]/20 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6">The Drix Media Advantage</p>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-tight mb-6">
                            One team.<br />One strategy.<br />One brand voice.
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed">
                            Your strategist, designer, and content creator collaborate from day one. The result is work that feels unified and performs better.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        {['One contract, one invoice', 'Integrated performance tracking', 'Consistent voice across every touchpoint', 'We handle all internal coordination'].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className="w-5 h-5 rounded-full bg-[#AFFF00] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(249,69,45,0.4)]">
                                    <svg width="10" height="8" viewBox="0 0 8 6" fill="black"><path d="M2.5 6L0 3.5L0.71 2.79L2.5 4.58L7.29 0L8 0.71L2.5 6Z" /></svg>
                                </div>
                                <span className="text-white font-medium text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
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
        <section className="w-full bg-white py-24 px-6 md:px-12 text-[#0C0C0C] font-sans border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-4">Side by Side</h2>
                    <p className="text-[#0C0C0C]/60 text-lg">See how the integrated model compares.</p>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-2 gap-0 mb-0">
                    <div className="bg-[#F5F5F5] px-6 md:px-10 py-5 border border-gray-200 border-b-0">
                        <p className="text-sm font-bold tracking-[0.12em] uppercase text-black/50">Traditional Agency Model</p>
                    </div>
                    <div className="bg-black px-6 md:px-10 py-5 border border-black">
                        <p className="text-sm font-bold tracking-[0.12em] uppercase text-[#AFFF00]">Drix Media Integrated Model</p>
                    </div>
                </div>

                {/* Table Rows */}
                {rows.map(([left, right], i) => (
                    <div key={i} className="grid grid-cols-2 gap-0">
                        <div className="flex items-center gap-4 px-6 md:px-10 py-6 border border-gray-200 border-t-0 bg-white group">
                            <div className="w-2 h-2 rounded-full bg-black/20 shrink-0"></div>
                            <span className="text-[#0C0C0C]/70 text-base">{left}</span>
                        </div>
                        <div className="flex items-center gap-4 px-6 md:px-10 py-6 border border-black border-t-0 bg-black/3 group">
                            <div className="w-2 h-2 rounded-full bg-[#AFFF00] shrink-0 shadow-[0_0_8px_rgba(249,69,45,0.5)]"></div>
                            <span className="text-[#0C0C0C] font-medium text-base">{right}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// ─── CTA Section ─────────────────────────────────────────────────────────────

const CTASection = () => (
    <section className="w-full bg-black text-black p-6 md:p-12 pb-24 mx-auto max-w-full">
        <div className="w-full bg-[#AFFF00] py-32 px-6 text-center text-black flex flex-col items-center rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tighter mb-8 max-w-4xl relative z-10 leading-tight text-black">
                Ready to See How Integrated Services Work?
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-12 text-black/70 max-w-2xl relative z-10 tracking-tight">
                Let's talk about your goals and how we can help you get there.
            </p>
            <Link
                to="/contact"
                className="bg-black text-white px-10 py-5 font-bold text-lg md:text-xl transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:shadow-[0_0_60px_rgba(0,0,0,0.4)] hover:-translate-y-1 relative z-10"
                style={{ borderRadius: '100px' }}
            >
                Book a Strategy Call
            </Link>
        </div>
    </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Services: React.FC = () => {
    return (
        <main className="w-full min-h-screen bg-black overflow-x-hidden">
            <ServicesHero />
            <div className="relative z-10 bg-white">
                <ServicesOverview />
                {serviceItems.map((service, i) => (
                    <ServiceDetail key={i} {...service} />
                ))}
                <WhyIntegrated />
                <ComparisonTable />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
};

export default Services;
