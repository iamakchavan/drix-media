import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoiseOverlay from '../components/NoiseOverlay';
import Footer from '../components/Footer';

// ─── Hero ─────────────────────────────────────────────────────────────────────

const CareersHero = () => (
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
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
                        alt="Join our visionary team"
                        style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }}
                    />
                </div>
                {/* Dynamic Overlay for deep cinematic feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-[1]" />
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
                    Build Your <span className="text-white/40">Career</span> <br />At Drix Media
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1, delay: 0.4 }}
                    className="text-lg md:text-xl lg:text-2xl text-white/70 text-center font-medium max-w-2xl lg:max-w-4xl leading-relaxed px-4"
                >
                    We are looking for strategists, designers, writers, and thinkers <br className="hidden md:block" /> who want to do work that actually matters.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Open Roles</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#F9452D] to-transparent"></div>
            </motion.div>
        </div>
    </div>
);

// ─── Why Work at Drix Media ───────────────────────────────────────────────────

const whyReasons = [
    {
        number: '01',
        title: 'Do Work That Actually Matters',
        desc: 'We only take on projects we believe in. You will work on brands you care about, solving real problems.',
        dark: false,
    },
    {
        number: '02',
        title: 'Learn From the Best',
        desc: 'You will work alongside experienced strategists, designers, and marketers who care about your growth.',
        dark: true,
    },
    {
        number: '03',
        title: 'Own Your Projects',
        desc: 'We do not micromanage. If you have an idea, pitch it. If it is good, we will run with it.',
        dark: false,
    },
    {
        number: '04',
        title: 'Build Real Skills',
        desc: 'You will not be stuck doing one thing. You will touch strategy, execution, client communication, and performance tracking.',
        dark: false,
    },
    {
        number: '05',
        title: 'Work With Great People',
        desc: 'Our team is curious, collaborative, and obsessed with quality. Ego has no place here.',
        dark: true,
    },
];

const WhyWorkHere = () => (
    <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#FAFAFA] py-24 px-6 md:px-12"
    >
        <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-4">
                    Why Work at Drix Media
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whyReasons.map((r, i) => {
                    const bg = r.dark ? 'bg-black' : 'bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-300';
                    const titleColor = r.dark ? 'text-white' : 'text-black';
                    const descColor = r.dark ? 'text-white/70' : 'text-[#0C0C0C]/70';
                    const badgeBg = r.dark ? 'bg-[#F9452D] text-white shadow-[0_0_30px_rgba(249,69,45,0.4)]' : 'bg-black text-white';
                    const gridStyle = r.dark
                        ? { backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '30px 30px' }
                        : {};
                    const isWide = i === whyReasons.length - 1 && whyReasons.length % 2 !== 0;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`${bg} p-10 md:p-12 flex flex-col justify-between min-h-[320px] relative overflow-hidden group ${isWide ? 'md:col-span-2' : ''}`}
                        >
                            {r.dark && (
                                <div className="absolute inset-0 opacity-5" style={gridStyle}></div>
                            )}
                            {/* Number Badge */}
                            <div className={`absolute top-8 right-8 w-12 h-12 rounded-full ${badgeBg} flex items-center justify-center text-lg font-bold`}>
                                {r.number}
                            </div>
                            {/* Red corner accent */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-l-[2px] border-t-[2px] border-[#F9452D]"></div>

                            <div className="mt-4 relative z-10">
                                <h3 className={`text-2xl md:text-3xl font-bold ${titleColor} mb-4 tracking-tight`}>{r.title}</h3>
                                <p className={`${descColor} text-base md:text-lg leading-relaxed max-w-xl`}>{r.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </motion.section>
);

// ─── Our Culture ──────────────────────────────────────────────────────────────

const cultureItems = [
    { title: 'Collaboration Over Ego', desc: 'The best idea wins, no matter who it comes from. We value teamwork over individual heroics.' },
    { title: 'Quality Over Speed', desc: 'We move fast, but we never compromise on quality. If it does not meet our standard, it does not go out.' },
    { title: 'Ownership Mindset', desc: 'Everyone takes responsibility for outcomes, not just tasks. We care about results, not just checking boxes.' },
    { title: 'Learning Never Stops', desc: 'We invest in training, courses, and development. If there is something you want to learn, we will help you get there.' },
    { title: 'Balance Matters', desc: 'We work hard, but we also respect your time. Burnout culture is not our thing.' },
];

const OurCulture = () => (
    <section className="w-full bg-black py-32 px-6 md:px-12 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left: Sticky Header */}
            <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                <p className="text-[11px] font-bold tracking-[0.4em] text-[#F9452D] uppercase mb-8">Life at Drix</p>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
                    Our <br /><span className="text-white/20">Culture</span>
                </h2>
                <div className="w-16 h-[2px] bg-white/10 mb-10"></div>
                <p className="text-white/50 text-lg leading-relaxed font-medium">
                    We are not just a place to work. We are a team of people who care deeply about the work and about each other.
                </p>
            </div>

            {/* Right: Compact Grid */}
            <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {cultureItems.map((item, i) => (
                        <div key={i} className="group relative">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-2 h-2 bg-[#F9452D] rounded-full shadow-[0_0_12px_rgba(249,69,45,0.6)]"></div>
                                <div className="h-[1px] flex-grow bg-white/10 group-hover:bg-[#F9452D]/30 transition-colors duration-500"></div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white group-hover:text-[#F9452D] transition-colors duration-300">
                                {item.title}
                            </h3>
                            <p className="text-white/40 text-base leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// ─── Benefits & Perks ─────────────────────────────────────────────────────────

const benefits = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
        ),
        title: 'Competitive Salary',
        desc: 'We pay fairly for great work. Performance-linked bonuses and clear growth paths.'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Health & Wellness',
        desc: 'Comprehensive medical insurance and mental health support for you and your family.'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
        title: 'Learning Budget',
        desc: 'Access to premium courses, conferences, and books to help you stay ahead of the curve.'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: 'Vibrant Culture',
        desc: 'Regular team-building events, collaborative workshops, and an annual retreat.'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        title: 'Flexible Work',
        desc: 'Work from where you are most productive. We value outcomes over hours spent at a desk.'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.5 1.5" />
                <path d="M7 11c.17 0 .33.02.5.06a3.5 3.5 0 0 1 3.5 3.5c0 .17-.02.33-.06.5" />
            </svg>
        ),
        title: 'Creative Freedom',
        desc: 'Ownership of your ideas. We provide the tools and the space for you to experiment and innovate.'
    },
];

const BenefitsSection = () => (
    <section className="w-full bg-white py-40 px-6 md:px-12 text-[#0C0C0C] font-sans">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left: Sticky Branding */}
            <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
                <p className="text-[11px] font-bold tracking-[0.4em] text-[#F9452D] uppercase mb-8">The Drix Life</p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                    Benefits <br />& <span className="text-black/15">Perks</span>
                </h2>
                <div className="w-16 h-[2px] bg-black/10 mb-10"></div>
                <p className="text-xl text-black/40 font-medium max-w-sm leading-relaxed">
                    We take care of our people. From health to growth, we've built a package that supports you personally and professionally.
                </p>
            </div>

            {/* Right: Clean Benefit Items */}
            <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {benefits.map((b, i) => (
                        <div key={i} className="flex flex-col group">
                            <div className="flex items-center gap-4 mb-8 text-black/20 group-hover:text-[#F9452D] transition-colors duration-500">
                                <div className="p-3 border border-black/5 bg-[#FAFAFA] rounded-xl group-hover:bg-[#F9452D]/5 group-hover:border-[#F9452D]/10 transition-all duration-500">
                                    {b.icon}
                                </div>
                                <div className="h-[1px] flex-grow bg-black/5 group-hover:bg-[#F9452D]/20 transition-colors"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-4 tracking-tight group-hover:text-[#F9452D] transition-colors duration-300">
                                {b.title}
                            </h3>
                            <p className="text-black/50 text-lg leading-relaxed font-medium">
                                {b.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Visual Accent */}
                <div className="mt-24 p-1  bg-gradient-to-r from-[#F9452D] to-transparent opacity-10"></div>
            </div>

        </div>
    </section>
);

// ─── Open Positions ───────────────────────────────────────────────────────────

// To add real roles, add objects to this array, e.g.:
// { title: 'Brand Strategist', type: 'Full-Time · Remote', desc: '...' }
const openRoles: { title: string; type: string; desc: string }[] = [];

const OpenPositions = () => (
    <section id="open-positions" className="w-full bg-[#FAFAFA] py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto">
            <div className="mb-16">
                <p className="text-[11px] font-bold tracking-[0.2em] text-black/40 uppercase mb-4">Join the Team</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black">Open Positions</h2>
            </div>

            {openRoles.length === 0 ? (
                /* No current openings */
                <div className="bg-black text-white p-12 md:p-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    <div className="relative z-10 max-w-2xl">
                        <div className="w-12 h-12 rounded-full bg-[#F9452D] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(249,69,45,0.4)]">
                            <svg width="22" height="22" viewBox="0 0 256 256" fill="white">
                                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a16,16,0,1,1,16,16A16,16,0,0,1,112,84Z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                            No open roles right now.
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed mb-10">
                            We are not actively hiring, but we are always open to meeting great people. Send us your portfolio and tell us why you want to work with us.
                        </p>
                        <a
                            href="mailto:careers@drixmedia.com"
                            className="inline-flex items-center gap-4 group text-white hover:text-[#F9452D] transition-colors"
                        >
                            <div className="w-5 h-5 text-[#F9452D] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
                                    <path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg">careers@drixmedia.com</span>
                        </a>
                    </div>
                </div>
            ) : (
                /* Roles list */
                <div className="flex flex-col gap-0">
                    {openRoles.map((role, i) => (
                        <div key={i} className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 py-10 border-t border-[#E5E5E5] group">
                            <div className="absolute top-[-1px] right-0 w-2.5 h-2.5 border-r-[2px] border-b-[2px] border-[#F9452D] transform -rotate-90"></div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight mb-2">{role.title}</h3>
                                <p className="text-[#0C0C0C]/60 text-sm font-medium mb-1">{role.type}</p>
                                <p className="text-[#0C0C0C]/70 text-base leading-relaxed max-w-xl">{role.desc}</p>
                            </div>
                            <a
                                href="mailto:careers@drixmedia.com"
                                className="shrink-0 bg-black text-white px-8 py-4 font-bold text-base hover:-translate-y-0.5 transition-all duration-300 hover:bg-[#F9452D]"
                                style={{ borderRadius: '100px' }}
                            >
                                Apply
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </section>
);

// ─── Application Process ──────────────────────────────────────────────────────

const processSteps = [
    { number: '01', title: 'Apply', description: 'Send us your resume, portfolio, and a note about why you want to work at Drix Media.' },
    { number: '02', title: 'Initial Call', description: 'We will set up a quick call to learn more about you and answer your questions.' },
    { number: '03', title: 'Assignment', description: 'You will get a short project to work on. This helps us see how you think and work.' },
    { number: '04', title: 'Team Interview', description: 'Meet the team. We will dive deeper into your experience and how you approach work.' },
    { number: '05', title: 'Offer', description: 'If it is a fit, we will make you an offer and get you onboarded.' },
];

const ApplicationProcess = () => (
    <section className="w-full bg-white py-32 px-6 md:px-12 text-[#0C0C0C] font-sans">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left: Sticky Branding */}
            <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                <p className="text-[11px] font-bold tracking-[0.4em] text-[#F9452D] uppercase mb-8">The Process</p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                    How It <br /><span className="text-black/15">Works</span>
                </h2>
                <div className="w-16 h-[2px] bg-black/10 mb-10"></div>
                <p className="text-black/50 text-lg leading-relaxed font-medium mb-12">
                    Our process is straightforward. We move quickly, respect your time, and keep you informed at every step.
                </p>
                <a
                    href="mailto:careers@drixmedia.com"
                    className="inline-flex items-center gap-4 group"
                >
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#F9452D] group-hover:bg-[#F9452D] group-hover:text-white transition-all duration-500">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                            <path d="M4 4V13C4 16.866 7.13401 20 11 20H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                            <path d="M16 16L20 20L16 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="bevel" />
                        </svg>
                    </div>
                    <span className="font-bold text-base uppercase tracking-widest text-black">Apply Now</span>
                </a>
            </div>

            {/* Right: Grid of Steps */}
            <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {processSteps.map((step, i) => (
                        <div key={i} className="flex flex-col group">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl font-black text-black/5 group-hover:text-[#F9452D]/10 transition-colors duration-500">
                                    {step.number}
                                </span>
                                <div className="h-[1px] flex-grow bg-black/5 group-hover:bg-[#F9452D]/20 transition-colors"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-3 tracking-tight group-hover:text-[#F9452D] transition-colors duration-300">
                                {step.title}
                            </h3>
                            <p className="text-black/50 text-lg leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Visual Accent */}
                <div className="mt-24 p-[0.5px] bg-gradient-to-r from-[#F9452D] to-transparent opacity-10"></div>
            </div>
        </div>
    </section>
);

// ─── What We Look For ─────────────────────────────────────────────────────────

const traits = [
    { number: '01', title: 'Curiosity', desc: 'You ask why before you ask how.', dark: false },
    { number: '02', title: 'Ownership', desc: 'You take responsibility for outcomes, not just tasks.', dark: true },
    { number: '03', title: 'Attention to Detail', desc: 'You notice the small things others miss.', dark: false },
    { number: '04', title: 'Collaboration', desc: 'You work well with others and value feedback.', dark: false },
    { number: '05', title: 'Growth Mindset', desc: 'You are always learning and improving.', dark: false },
    { number: '06', title: 'Results-Driven', desc: 'You care about delivering work that performs, not just work that looks good.', dark: true },
];

const WhatWeLookFor = () => (
    <section className="w-full bg-[#FAFAFA] py-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
            <div className="max-w-5xl mx-auto text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-4">What We Look For</h2>
                <p className="text-[#0C0C0C]/60 text-lg leading-relaxed">We hire for character as much as for skill.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {traits.map((t, i) => {
                    const bg = t.dark ? 'bg-black' : 'bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-300';
                    const titleColor = t.dark ? 'text-white' : 'text-black';
                    const descColor = t.dark ? 'text-white/70' : 'text-[#0C0C0C]/70';
                    const badgeBg = t.dark ? 'bg-[#F9452D] text-white shadow-[0_0_30px_rgba(249,69,45,0.4)]' : 'bg-black text-white';

                    return (
                        <div
                            key={i}
                            className={`${bg} p-10 md:p-12 flex flex-col justify-between min-h-[280px] relative overflow-hidden group`}
                        >
                            {t.dark && (
                                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                            )}
                            <div className={`absolute top-8 right-8 w-12 h-12 rounded-full ${badgeBg} flex items-center justify-center text-lg font-bold`}>
                                {t.number}
                            </div>
                            <div className="absolute top-0 left-0 w-3 h-3 border-l-[2px] border-t-[2px] border-[#F9452D]"></div>

                            <div className="mt-4 relative z-10">
                                <h3 className={`text-2xl md:text-3xl font-bold ${titleColor} mb-4 tracking-tight`}>{t.title}</h3>
                                <p className={`${descColor} text-base leading-relaxed`}>{t.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

// ─── CTA Section ─────────────────────────────────────────────────────────────

const CTASection = () => (
    <section className="w-full bg-black text-white p-6 md:p-12 pb-24 mx-auto max-w-full">
        <div className="w-full bg-[#F9452D] py-32 px-6 text-center text-white flex flex-col items-center rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tighter mb-8 max-w-4xl relative z-10 leading-tight">
                Ready to Join Drix Media?
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-12 opacity-90 max-w-2xl relative z-10 tracking-tight">
                Send us your application and let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <a
                    href="#open-positions"
                    className="bg-black text-white px-10 py-5 font-bold text-lg md:text-xl transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:shadow-[0_0_60px_rgba(0,0,0,0.4)] hover:-translate-y-1"
                    style={{ borderRadius: '100px' }}
                >
                    Apply Now
                </a>
                <a
                    href="mailto:careers@drixmedia.com"
                    className="bg-white/20 backdrop-blur text-white border border-white/30 px-10 py-5 font-bold text-lg md:text-xl transition-all duration-300 hover:bg-white/30 hover:-translate-y-1"
                    style={{ borderRadius: '100px' }}
                >
                    careers@drixmedia.com
                </a>
            </div>
        </div>
    </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Careers: React.FC = () => {
    return (
        <main className="w-full min-h-screen bg-black overflow-x-hidden">
            <CareersHero />
            <div className="relative z-10 bg-white">
                <WhyWorkHere />
                <OurCulture />
                <BenefitsSection />
                <OpenPositions />
                <ApplicationProcess />
                <WhatWeLookFor />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
};

export default Careers;
