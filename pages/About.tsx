import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoiseOverlay from '../components/NoiseOverlay';
import Footer from '../components/Footer';

// Hero Section
const AboutHero = () => (
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
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2601&auto=format&fit=crop"
                        alt="Minimalistic workspace"
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
                    className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl mona-sans-condensed-black tracking-tighter text-white text-center leading-[0.95] max-w-6xl mb-8"
                >
                    We Build <span className="text-white/40">Brands</span> <br />That Matter
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1, delay: 0.4 }}
                    className="text-lg md:text-xl lg:text-2xl text-white/70 text-center poppins-medium max-w-2xl lg:max-w-3xl leading-relaxed px-4"
                >
                    A creative production agency built on strategy, executed with precision, and grown through consistency.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] poppins-bold tracking-[0.2em] text-white/30 uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#AFFF00] to-transparent"></div>
            </motion.div>
        </div>
    </div>
);


// Our Story
const OurStory = () => (
    <motion.section
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-white py-40 px-6 md:px-12 text-[#0C0C0C] poppins-regular relative"
    >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Left: Sticky Headline & Minimal Timeline Label */}
            <div className="lg:col-span-4 lg:sticky lg:top-40">
                <div className="flex flex-col">
                    <p className="text-[11px] poppins-bold tracking-[0.3em] text-[#476D07] uppercase mb-8">The Origins</p>
                    <h2 className="text-6xl md:text-7xl mona-sans-condensed-black tracking-tighter text-black leading-[0.9] mb-12">
                        How <br />We <br /><span className="text-black/15">Started</span>
                    </h2>

                    {/* Minimalist Timeline Graphic */}
                    <div className="hidden lg:flex flex-col gap-8 border-l border-black/5 pl-6 mt-4">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-black/30 mb-1">2021</span>
                            <span className="text-sm font-bold text-black/80">The Vision</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-black/30 mb-1">2022</span>
                            <span className="text-sm font-bold text-black/80">First Partnerships</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#476D07] mb-1">Present</span>
                            <span className="text-sm font-bold text-black">Integrated System</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Detailed Content */}
            <div className="lg:col-span-8">
                <div className="flex flex-col gap-12">
                    {/* Impactful Lead */}
                    <p className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-[1.1] max-w-4xl">
                        Drix Media was born out of a pivot from <span className="text-black/30 underline decoration-[#588B00] decoration-2 underline-offset-8">chaos to clarity</span>.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-black/60 leading-relaxed font-medium">
                        <div className="space-y-8">
                            <p>
                                We observed a recurring failure in the creative industry: fragmentation.
                                Great strategy was dying in the hands of generic execution. Designs were beautiful but disconnected from the brand's core soul.
                            </p>
                            <p>
                                Businesses were hiring four different experts, resulting in four different voices. We saw the fatigue that caused—not just in the marketing budgets, but in the brand's identity.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <p>
                                We built Drix Media as an antidote to this siloed approach. We unified creative production, branding, and performance into a single, cohesive engine.
                            </p>
                            <p>
                                Today, we don't just deliver "services." We manage reputations. We build digital ecosystems. We ensure that every frame of video and every pixel of design serves the exact same strategic goal.
                            </p>
                        </div>
                    </div>

                    {/* Minimal Highlight Box */}
                    <div className="mt-8 p-10 md:p-14 bg-[#FAFAFA] border border-gray-100 relative overflow-hidden group">
                        {/* Subtle red line accent */}
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#AFFF00] to-transparent"></div>

                        <blockquote className="relative z-10 flex flex-col gap-6">
                            <p className="text-2xl md:text-3xl font-bold text-black leading-tight italic">
                                "Our goal isn't to be the agency with the most clients. It's to be the team that does the work others are afraid to commit to—integrated, honest, and high-performance."
                            </p>
                            <footer className="flex items-center gap-4">
                                <div className="w-8 h-[1px] bg-black/20"></div>
                                <cite className="text-xs font-bold tracking-widest uppercase text-black/40 not-italic">The Drix Media Philosophy</cite>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>

        </div>
    </motion.section>
);

// Our Values
const values = [
    { title: "Strategy First", desc: "Every creative decision starts with a strategic foundation. We do not design for the sake of design. We design with purpose." },
    { title: "Integration Over Isolation", desc: "The best work happens when strategy, design, and execution work as one system. We build brands that feel cohesive across every touchpoint." },
    { title: "Results Over Recognition", desc: "We care more about driving your business forward than winning awards. Performance is the only metric that matters." },
    { title: "Transparency Always", desc: "You will always know what we are working on, why we are doing it, and how it is performing. No jargon. No hidden processes." },
    { title: "Long-Term Thinking", desc: "We are not here for quick wins. We build systems and strategies that grow with you over time." }
];

const OurValues = () => (
    <section className="w-full bg-[#FAFAFA] py-48 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative Layout Marker */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
            <span className="text-[12rem] font-black leading-none tracking-tighter">DNA</span>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex flex-col mb-32">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                    <div className="max-w-3xl">
                        <p className="text-[11px] font-black tracking-[0.5em] text-[#476D07] uppercase mb-10 text-left">The Blueprint</p>
                        <h2 className="text-6xl md:text-[6rem] font-black tracking-tighter text-black leading-[0.85] text-left">
                            Our Core <br /><span className="text-black/5">Principles</span>
                        </h2>
                    </div>
                    <p className="text-2xl text-black/35 font-medium max-w-sm leading-tight mb-4 text-left lg:text-right">
                        Refined over years of navigating the intersection of creativity and commerce.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
                {values.map((v, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="flex flex-col group"
                    >
                        {/* Top Accent & Number */}
                        <div className="flex items-center gap-8 mb-12 text-black/5 transition-colors group-hover:text-[#AFFF00]/10">
                            <span className="text-8xl font-black leading-none tracking-tighter transition-colors group-hover:text-[#AFFF00]">0{i + 1}</span>
                            <div className="h-[2px] flex-grow bg-current transform origin-left transition-transform duration-700 group-hover:scale-x-110"></div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col">
                            <h3 className="text-4xl font-black text-black mb-10 tracking-tighter leading-tight group-hover:text-[#476D07] transition-colors duration-400">
                                {v.title}
                            </h3>
                            <p className="text-black/45 text-xl leading-relaxed font-medium mb-12 h-[6rem] line-clamp-3">
                                {v.desc}
                            </p>

                            {/* Solid Branding Line */}
                            <div className="w-16 h-2 bg-black/5 group-hover:bg-[#AFFF00] group-hover:w-full transition-all duration-700 ease-[0.16, 1, 0.3, 1]"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// What Makes Us Different
const differences = [
    { title: "We Think Like Business Owners", desc: "We do not just execute briefs. We ask the hard questions. Is this the right move for the business? Will this drive real results? If the answer is no, we push back." },
    { title: "One Team, Not Departments", desc: "Your brand strategist, designer, and content creator sit in the same room. They collaborate from day one. The result is work that feels unified, not pieced together." },
    { title: "Built on Systems, Not Heroics", desc: "We do not rely on last-minute magic. We build repeatable processes that deliver quality work consistently." },
    { title: "Honest About What We Do Not Know", desc: "If something is outside our expertise, we say so. We would rather be honest than overpromise and underdeliver." }
];

const WhatMakesUsDifferent = () => (
    <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-white py-40 px-6 md:px-12 text-[#0C0C0C] font-sans"
    >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left: Sticky Branding */}
            <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                <p className="text-[11px] font-bold tracking-[0.4em] text-[#476D07] uppercase mb-8">The Edge</p>
                <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
                    Why <br />We <br /><span className="text-black/15">Differ</span>
                </h2>
                <div className="w-12 h-[2px] bg-black/10 mb-8"></div>
                <p className="text-xl text-black/40 font-medium max-w-sm leading-relaxed">
                    We've eliminated the friction of the traditional agency model to focus purely on high-impact outcomes.
                </p>
            </div>

            <div className="lg:col-span-1"></div> {/* Spacer */}

            {/* Right: Clean List */}
            <div className="lg:col-span-7 flex flex-col w-full">
                {differences.map((diff, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        key={i}
                        className="group border-b border-black/5 last:border-0 py-16 first:pt-0"
                    >
                        <div className="flex flex-col gap-8">
                            <span className="text-sm font-black tracking-widest text-[#476D07] opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                AREA 0{i + 1}
                            </span>
                            <div className="flex flex-col gap-6">
                                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-black leading-tight">
                                    {diff.title}
                                </h3>
                                <p className="text-black/50 text-xl font-medium leading-relaxed group-hover:text-black/70 transition-colors duration-500 max-w-2xl">
                                    {diff.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    </motion.section>
);

// Our Personality & Company Culture
const OurPersonalityAndCulture = () => (
    <section className="w-full bg-black py-40 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle glow in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#AFFF00]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1600px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                {/* Left: Personality */}
                <div className="lg:col-span-5">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-[#AFFF00] uppercase mb-8">Personality</p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-16 leading-[0.9]">
                        How We <br /><span className="text-white/20 text-4xl md:text-6xl">Show Up</span>
                    </h2>

                    <ul className="space-y-10">
                        {[
                            { title: 'Direct', desc: 'We skip the fluff and get to what matters.' },
                            { title: 'Curious', desc: 'We ask why before we ask how.' },
                            { title: 'Builders', desc: 'We care about creating things that last.' },
                            { title: 'Practical', desc: 'Strategy is only useful if it can be executed.' },
                            { title: 'Obsessive', desc: 'If it does not meet our standard, it does not go out.' },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-6 group">
                                <div className="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center mt-1 group-hover:border-[#AFFF00] transition-colors">
                                    <div className="w-2 h-2 bg-white rounded-full group-hover:bg-[#AFFF00] transition-colors"></div>
                                </div>
                                <div>
                                    <span className="block text-xl font-bold text-white mb-1">{item.title}</span>
                                    <span className="text-white/50 text-lg leading-relaxed">{item.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Culture */}
                <div className="lg:col-span-7 bg-white/5 border border-white/10 p-12 md:p-20 rounded-[40px] backdrop-blur-xl">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase mb-8">Our Vibe</p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-20 leading-tight">Company Culture</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            { title: 'Collaboration Over Ego', desc: 'The best ideas win, no matter where they come from.' },
                            { title: 'Ownership Mindset', desc: 'Everyone takes responsibility for outcomes, not tasks.' },
                            { title: 'Learning Culture', desc: 'We invest in growth and constantly level up our craft.' },
                            { title: 'Work That Matters', desc: 'Life is too short to build things we do not care about.' },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <div className="text-[#AFFF00]">
                                    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-93.66a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,164.69l50.34-50.35A8,8,0,0,1,173.66,122.34Z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                                <p className="text-white/50 text-base leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center gap-8 justify-between">
                        <p className="text-white/30 text-sm font-medium italic">"A small team with a massive hunger for quality."</p>
                        <a href="/careers" className="text-white font-bold group flex items-center gap-3 hover:text-[#AFFF00] transition-colors">
                            Join the team
                            <svg className="group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Who We Work With
const clients = [
    { title: "Startups Building from Scratch", desc: "You need positioning, identity, and a go-to-market strategy that works." },
    { title: "Growing Brands Scaling Up", desc: "You have traction but your branding feels inconsistent or your marketing is not keeping up with growth." },
    { title: "Established Companies Rebranding", desc: "You have been around for years but your brand no longer reflects who you are or where you are going." },
    { title: "D2C & E-commerce Brands", desc: "You need content, campaigns, and creative that converts browsers into buyers." }
];

const WhoWeWorkWith = () => (
    <section className="w-full bg-white py-32 px-6 md:px-12 text-center border-t border-gray-50">
        <div className="max-w-[1400px] mx-auto">
            <p className="text-[11px] font-bold tracking-[0.2em] text-black/40 uppercase mb-6">Our Ecosystem</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-black leading-none">The Brands We Partner With</h2>
            <p className="text-xl md:text-2xl text-black/50 max-w-3xl mx-auto mb-20 px-4 leading-relaxed">
                We work with ambitious businesses that are ready to stop doing disconnected marketing and start building an integrated brand.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {clients.map((c, i) => (
                    <div key={i} className="bg-[#FAFAFA] border border-gray-200 p-12 md:p-16 flex flex-col items-start text-left hover:border-black transition-all duration-500 group relative overflow-hidden">
                        {/* Number indicator */}
                        <div className="absolute top-12 right-12 text-4xl font-black text-black/5 group-hover:text-black/10 transition-colors">
                            {i + 1}
                        </div>

                        <h3 className="text-3xl font-bold text-black mb-6 tracking-tight leading-tight max-w-[280px]">{c.title}</h3>
                        <p className="text-black/60 text-lg leading-relaxed max-w-sm">{c.desc}</p>

                        <div className="mt-12 w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#AFFF00] group-hover:border-[#AFFF00] transition-all duration-300">
                            <svg className="group-hover:text-black transition-colors" width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// CTA Section
const CTASection = () => (
    <section className="w-full bg-black text-black p-6 md:p-12 pb-32 mx-auto max-w-full">
        <div className="w-full bg-[#AFFF00] py-40 px-6 text-center text-black flex flex-col items-center rounded-[40px] overflow-hidden shadow-2xl relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="relative z-10 max-w-5xl">
                <p className="text-[11px] font-bold tracking-[0.4em] text-black/60 uppercase mb-10 text-center">Get Started</p>
                <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mb-12 leading-[0.9] text-black">
                    Let's Build <br /><span className="text-black/30">Something Great</span>
                </h2>
                <p className="text-2xl md:text-3xl font-medium mb-16 text-black/70 max-w-3xl mx-auto tracking-tight leading-relaxed">
                    Book a free strategy call and tell us where you want your brand to go.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        to="/contact"
                        className="bg-black text-white px-12 py-6 font-bold text-xl transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] hover:-translate-y-2"
                        style={{ borderRadius: '100px' }}
                    >
                        Book Your Call
                    </Link>
                    <a
                        href="mailto:hello@drixmedia.com"
                        className="px-12 py-6 font-bold text-xl border border-black/10 hover:bg-black/5 transition-all text-black"
                        style={{ borderRadius: '100px' }}
                    >
                        hello@drixmedia.com
                    </a>
                </div>
            </div>
        </div>
    </section>
);

const About: React.FC = () => {
    return (
        <main className="w-full min-h-screen bg-black overflow-x-hidden">
            <AboutHero />
            <div className="relative z-10 bg-white">
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
