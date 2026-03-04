import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import NoiseOverlay from '../components/NoiseOverlay';
import Footer from '../components/Footer';

// ─── Hero ─────────────────────────────────────────────────────────────────────

const ContactHero = () => (
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
                        src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2500&auto=format&fit=crop"
                        alt="Join our visionary conversation"
                        style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center 30%', objectFit: 'cover' }}
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
                    Let's <span className="text-white/40">Talk</span> <br />About Your Brand
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1, delay: 0.4 }}
                    className="text-lg md:text-xl lg:text-2xl text-white/70 text-center font-medium max-w-2xl lg:max-w-4xl leading-relaxed px-4"
                >
                    Book a free strategy call — no commitment, no pressure. <br className="hidden md:block" /> Let's explore how we can grow together.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Inquire</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#F9452D] to-transparent"></div>
            </motion.div>
        </div>
    </div>
);

// ─── Contact Form + Info ───────────────────────────────────────────────────────

const serviceOptions = [
    'Branding & Identity',
    'Creative Production',
    'Content Strategy & Marketing',
    'Digital & Web Design',
    'Campaigns & Performance',
    'Full-Service',
];

const ContactFormSection = () => {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: '', email: '', phone: '', company: '', service: '', message: '', referral: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const inputBase = "w-full bg-transparent border-b border-black/10 py-5 text-black placeholder-black/30 focus:outline-none focus:border-black transition-all duration-300 text-lg font-medium";
    const labelBase = "block text-[13px] font-bold text-black/40 mb-1";

    return (
        <section className="w-full bg-white py-32 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-7xl md:text-[8rem] font-black tracking-tighter text-black mb-16 leading-[0.85]"
                >
                    Let's talk
                </motion.h2>

                <div className="bg-[#F6F6F6] rounded-[2rem] p-10 md:p-16 lg:p-24 grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Left side: Info */}
                    <div className="flex flex-col justify-between py-2">
                        <div>
                            <p className="text-xl font-bold text-black mb-2">(+91) 98765 43210</p>
                            <a href="mailto:hello@drixmedia.com" className="text-3xl md:text-5xl lg:text-6xl font-black text-black hover:text-[#F9452D] transition-colors leading-[1.1] break-all">
                                hello@drixmedia.com
                            </a>
                        </div>

                        <div className="mt-20 space-y-12">
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-widest text-black mb-4">Address</p>
                                <p className="text-xl font-medium text-black/60 max-w-xs leading-relaxed">
                                    Drix Media HQ, Creative Suites,<br />Mumbai, India, 400001
                                </p>
                            </div>
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-widest text-black mb-4">Office Hours</p>
                                <p className="text-xl font-medium text-black/60 leading-relaxed">
                                    Monday to Friday: 10:00 AM – 6:00 PM IST
                                </p>
                            </div>
                        </div>

                        <div className="mt-20 flex flex-col gap-4">
                            {[
                                { name: 'Twitter', href: '#' },
                                { name: 'LinkedIn', href: '#' },
                                { name: 'Instagram', href: '#' }
                            ].map(social => (
                                <a key={social.name} href={social.href} className="flex items-center gap-3 group text-xl font-bold text-black">
                                    <span className="text-[#F9452D] transform translate-y-[-2px] group-hover:translate-x-1 group-hover:translate-y-[-4px] transition-transform duration-300">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Form */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-20"
                                >
                                    <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-8">
                                        <svg width="32" height="32" viewBox="0 0 256 256" fill="white">
                                            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L100,192.69,218.34,74.34a8,8,0,0,1,11.32,11.32Z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-4xl font-black text-black mb-4 tracking-tighter leading-tight">Sent successfully</h3>
                                    <p className="text-black/40 text-xl font-medium max-w-sm">
                                        We'll review your inquiry and get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-10"
                                >
                                    <div className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div>
                                                <label className={labelBase}>Name *</label>
                                                <input type="text" name="name" required placeholder="Your full name" value={form.name} onChange={handleChange} className={inputBase} />
                                            </div>
                                            <div>
                                                <label className={labelBase}>E-mail *</label>
                                                <input type="email" name="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} className={inputBase} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div>
                                                <label className={labelBase}>Phone</label>
                                                <input type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} className={inputBase} />
                                            </div>
                                            <div>
                                                <label className={labelBase}>Company</label>
                                                <input type="text" name="company" placeholder="Your company name" value={form.company} onChange={handleChange} className={inputBase} />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelBase}>What do you need help with? *</label>
                                            <div className="relative">
                                                <select
                                                    name="service"
                                                    required
                                                    value={form.service}
                                                    onChange={handleChange}
                                                    className={`${inputBase} appearance-none cursor-pointer pr-10`}
                                                >
                                                    <option value="" disabled>Select a service</option>
                                                    {serviceOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-black/20">
                                                    <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor">
                                                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelBase}>Message (Tell us about your project) *</label>
                                            <textarea
                                                name="message"
                                                required
                                                placeholder="Briefly describe your goals..."
                                                value={form.message}
                                                onChange={handleChange}
                                                rows={1}
                                                className={`${inputBase} overflow-hidden resize-none`}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelBase}>How did you hear about us?</label>
                                            <input type="text" name="referral" placeholder="Google, Social Media, referral..." value={form.referral} onChange={handleChange} className={inputBase} />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="mt-12 flex items-center gap-4 group hover:opacity-70 transition-opacity"
                                    >
                                        <div className="w-8 h-8 flex items-center justify-center text-[#F9452D]">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className="text-2xl font-black text-black tracking-tighter">Get in touch</span>
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};


// ─── What Happens Next ────────────────────────────────────────────────────────

const nextSteps = [
    { number: '01', title: 'We Review Your Request', description: 'Our team will review your submission within 24 hours.' },
    { number: '02', title: 'We Schedule a Call', description: 'We will send you a calendar link to book a time that works for you.' },
    { number: '03', title: 'We Discuss Your Goals', description: 'On the call, we will learn about your business, your challenges, and where you want to go.' },
    { number: '04', title: 'We Share Our Approach', description: 'We will walk you through how we can help and what working together would look like.' },
    { number: '05', title: 'We Send a Proposal', description: 'If it is a fit, we will send you a detailed proposal with scope, timeline, and investment.' },
];

const WhatHappensNext = () => (
    <section className="w-full bg-[#FAFAFA] py-32 px-6 md:px-12 text-[#0C0C0C] font-sans border-t border-black/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left: Sticky Branding */}
            <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                <p className="text-[11px] font-bold tracking-[0.4em] text-[#F9452D] uppercase mb-8">The Journey</p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                    What <br /><span className="text-black/15">Next</span>
                </h2>
                <div className="w-16 h-[2px] bg-black/10 mb-10"></div>
                <p className="text-black/50 text-lg leading-relaxed font-medium max-w-sm">
                    We move quickly and keep you informed at every step. No ghosting, no jargon—just results.
                </p>
            </div>

            {/* Right: Grid of Steps */}
            <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {nextSteps.map((step, i) => (
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

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
    { q: 'How much do your services cost?', a: 'It depends on the scope of work. We offer custom pricing based on your needs. After our strategy call, we will send a detailed proposal with transparent pricing.' },
    { q: 'Do you work with startups?', a: 'Yes. We work with startups, growing brands, and established companies across industries.' },
    { q: 'What industries do you work with?', a: 'We have experience across D2C, SaaS, hospitality, finance, education, healthcare, and more. If you have a great product and ambitious goals, we can help.' },
    { q: 'How long does a project take?', a: 'It depends on the scope. A branding project typically takes 6 to 8 weeks. A website can take 4 to 6 weeks. Campaigns are ongoing. We will give you a clear timeline in our proposal.' },
    { q: 'Do you offer retainer packages?', a: 'Yes. Many of our clients work with us on a monthly retainer for ongoing content, campaigns, and creative work.' },
    { q: 'Can you help with just one service?', a: 'Yes, but we recommend an integrated approach for the best results. If you only need one service, we can do that too.' },
    { q: 'Where are you located?', a: 'We are based in India, but we work with clients across India and internationally.' },
];

const FAQItem = ({ q, a }: { q: string; a: string;[key: string]: any }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-[#E5E5E5]">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-start justify-between gap-6 py-7 text-left group"
            >
                <span className="text-lg md:text-xl font-bold text-black tracking-tight group-hover:text-[#F9452D] transition-colors duration-200 leading-snug">{q}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center mt-0.5 transition-all duration-300 ${open ? 'bg-[#F9452D] border-[#F9452D] rotate-45' : 'bg-white'}`}>
                    <svg width="12" height="12" viewBox="0 0 256 256" fill={open ? 'white' : '#0C0C0C'}>
                        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                    </svg>
                </div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="text-[#0C0C0C]/60 text-base leading-relaxed pb-8 max-w-2xl">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection = () => (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-4">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-black/40 uppercase mb-4">FAQ</p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black leading-tight">
                        Common Questions
                    </h2>
                </div>
                <div className="lg:col-span-8">
                    {faqs.map((item, i) => (
                        <FAQItem key={i} q={item.q} a={item.a} />
                    ))}
                    <div className="border-t border-[#E5E5E5]"></div>
                </div>
            </div>
        </div>
    </section>
);

// ─── Social Proof ─────────────────────────────────────────────────────────────

const testimonials = [
    { quote: 'Drix Media helped us build a brand that finally reflects who we are. The results speak for themselves.', author: 'Client Name', company: 'Company' },
    { quote: 'Working with Drix Media feels like having an in-house team that actually gets our business.', author: 'Client Name', company: 'Company' },
];

const SocialProof = () => (
    <section className="w-full bg-black py-24 px-6 md:px-12 text-white">
        <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-20">
                <p className="text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase mb-4">Social Proof</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                    Trusted by Brands<br />Across Industries
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-10 md:p-12 relative overflow-hidden group hover:bg-white/8 transition-colors duration-300">
                        {/* Subtle grid */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                        {/* Red corner */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-l-[2px] border-t-[2px] border-[#F9452D]"></div>

                        <div className="relative z-10">
                            {/* Quote mark */}
                            <div className="mb-8 text-[#F9452D]">
                                <svg width="36" height="36" viewBox="0 0 256 256" fill="currentColor">
                                    <path d="M100,60H44A12,12,0,0,0,32,72v56a12,12,0,0,0,12,12h45.51C83.74,169.53,62.88,189.67,36.26,198.81a8,8,0,1,0,5.19,15.13c33.36-11.45,60.67-37.47,69.58-77.57A12.54,12.54,0,0,0,112,128V72A12,12,0,0,0,100,60Zm112,0H156a12,12,0,0,0-12,12v56a12,12,0,0,0,12,12h45.51c-5.77,29.53-26.63,49.67-53.25,58.81a8,8,0,1,0,5.19,15.13c33.36-11.45,60.67-37.47,69.58-77.57A12.54,12.54,0,0,0,224,128V72A12,12,0,0,0,212,60Z" />
                                </svg>
                            </div>
                            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-10 tracking-tight">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                                <div className="w-10 h-10 rounded-full bg-[#F9452D] flex items-center justify-center text-white font-bold text-base shrink-0 shadow-[0_0_20px_rgba(249,69,45,0.4)]">
                                    {t.author[0]}
                                </div>
                                <div>
                                    <span className="block text-white font-bold text-base">{t.author}</span>
                                    <span className="text-white/50 text-sm">{t.company}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// ─── Social Media ─────────────────────────────────────────────────────────────

const socials = [
    {
        name: 'Instagram',
        href: '#',
        icon: (
            <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
            </svg>
        ),
    },
    {
        name: 'Twitter / X',
        href: '#',
        icon: (
            <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                <path d="M214.75,211.71l-62.6-98.36,61.77-67.95a8,8,0,0,0-11.84-10.76L143,99.65,100.75,32.29A8,8,0,0,0,94,28H48a8,8,0,0,0-6.75,12.29l62.6,98.36L41.08,206.61a8,8,0,1,0,11.84,10.76l58.1-63.88L154,219.71A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM166.39,208,62.57,48H89.61L193.43,208Z" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: '#',
        icon: (
            <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v96a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm128,16v80a8,8,0,0,1-16,0V132a28,28,0,0,0-56,0v76a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A44,44,0,0,1,216,132Z" />
            </svg>
        ),
    },
    {
        name: 'Behance',
        href: '#',
        icon: (
            <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                <path d="M168,100h48a8,8,0,0,0,0-16H168a8,8,0,0,0,0,16Zm56,28a8,8,0,0,0-8-8H168.43A36,36,0,0,0,132,156c0,19.88,16.12,36,36,36a35.68,35.68,0,0,0,24.71-9.93,8,8,0,1,0-11.06-11.56A19.8,19.8,0,0,1,168,176a20,20,0,0,1-19.6-16H216A8,8,0,0,0,224,128Zm-55.62,16A20,20,0,0,1,188,128h.14a20,20,0,0,1,19.48,16ZM120,128a36,36,0,0,1-36,36H32a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a32,32,0,0,1,25.08,51.77A35.88,35.88,0,0,1,120,128ZM40,88v24H80a16,16,0,0,0,0-32Zm0,40v24H84a20,20,0,0,0,0-40Z" />
            </svg>
        ),
    },
    {
        name: 'Dribbble',
        href: '#',
        icon: (
            <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm78.36,56.71A88.24,88.24,0,0,1,214.9,120c-4-.78-39.37-7.44-74.89-3.22a348,348,0,0,0-14.18-31.4C163,74.18,196.06,65.13,206.36,80.71ZM128,40a88,88,0,0,1,58,21.87c-11.57,16.52-42.63,25.07-69.55,21.63A231.63,231.63,0,0,0,84.25,40.83,88.39,88.39,0,0,1,128,40ZM67.88,47.64A215.7,215.7,0,0,1,102.63,99c-38.68,10.3-72.78,10.22-76.45,10.18A88.37,88.37,0,0,1,67.88,47.64ZM40,128c0-.75,0-1.5,0-2.25,3.55,0,43.73.08,85.09-12.31C127,118.07,128.83,122.49,130.6,127c-42.26,13.17-64.26,49.07-72.53,63.6A87.81,87.81,0,0,1,40,128Zm88,88a87.88,87.88,0,0,1-55-19.25C80,183.11,100.75,147.48,145.81,133.9c.78-.24,1.55-.47,2.32-.68a428.74,428.74,0,0,1,21.68,76.91A87.7,87.7,0,0,1,128,216Zm38.77-14.58a444.65,444.65,0,0,0-20.13-73.76c33.61-4.07,63.15,3,66.67,3.87A88.3,88.3,0,0,1,166.77,201.42Z" />
            </svg>
        ),
    },
];

const SocialMediaSection = () => (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-black/40 uppercase mb-4">Social Media</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-6 leading-tight">Follow Us</h2>
                <p className="text-[#0C0C0C]/60 text-lg leading-relaxed max-w-sm">
                    Stay updated with our work, insights, and behind-the-scenes on social media.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-0">
                {socials.map((s, i) => (
                    <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-between gap-4 py-6 border-t border-[#E5E5E5] group hover:text-[#F9452D] transition-colors duration-200"
                    >
                        <div className="absolute top-[-1px] right-0 w-2 h-2 border-r-[2px] border-b-[2px] border-[#F9452D] transform -rotate-90"></div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#0C0C0C] group-hover:bg-[#F9452D] group-hover:text-white transition-all duration-300 shrink-0">
                                {s.icon}
                            </div>
                            <span className="text-xl font-bold text-black group-hover:text-[#F9452D] tracking-tight transition-colors duration-200">{s.name}</span>
                        </div>
                        <div className="w-5 h-5 text-[#F9452D] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0">
                            <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
                                <path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z" />
                            </svg>
                        </div>
                    </a>
                ))}
                <div className="border-t border-[#E5E5E5]"></div>
            </div>
        </div>
    </section>
);

// ─── CTA ─────────────────────────────────────────────────────────────────────

const CTASection = () => (
    <section className="w-full bg-black text-white p-6 md:p-12 pb-24 mx-auto max-w-full">
        <div className="w-full bg-[#F9452D] py-32 px-6 text-center text-white flex flex-col items-center rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tighter mb-8 max-w-4xl relative z-10 leading-tight">
                Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-12 opacity-90 max-w-2xl relative z-10 tracking-tight">
                Book your strategy call and let's build something great.
            </p>
            <a
                href="mailto:hello@drixmedia.com"
                className="bg-black text-white px-10 py-5 font-bold text-lg md:text-xl transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:shadow-[0_0_60px_rgba(0,0,0,0.4)] hover:-translate-y-1 relative z-10"
                style={{ borderRadius: '100px' }}
            >
                Book a Call
            </a>
        </div>
    </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Contact: React.FC = () => {
    return (
        <main className="w-full min-h-screen bg-black overflow-x-hidden">
            <ContactHero />
            <div className="relative z-10 bg-white">
                <ContactFormSection />
                <WhatHappensNext />
                <FAQSection />
                <SocialProof />
                <SocialMediaSection />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
};

export default Contact;
