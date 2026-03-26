import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoiseOverlay from '../components/NoiseOverlay';
import Footer from '../components/Footer';

import { SharedHeroLayout, letterVariants } from '../components/SharedHero';

// ─── Hero ─────────────────────────────────────────────────────────────────────

const ContactHero = () => (
    <SharedHeroLayout
        bottomLabel="The Contact"
        buttonText="GET IN TOUCH"
        buttonHref="#form"
        titleLines={
            <>
                <div className="flex flex-wrap items-center overflow-visible pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
                    <span className="flex">
                        {"Let's".split('').map((char, index) => (
                            <motion.span key={`line1-a-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                    <span className="flex text-white/50 italic font-medium">
                        {"Talk".split('').map((char, index) => (
                            <motion.span key={`line1-b-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
                <div className="flex flex-wrap items-center overflow-visible mt-1 md:mt-2 pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
                    <span className="flex text-[#AFFF00]">
                        {"About Your Brand.".split('').map((char, index) => (
                            <motion.span key={`line2-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
            </>
        }
        subtextContent={
            <>
                <span className="text-white font-semibold block xl:whitespace-nowrap">Book a free strategy call — no commitment, no pressure.</span>
                <span className="block xl:whitespace-nowrap">Let's explore how we can grow together.</span>
            </>
        }
    />
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
    const [dropdownOpen, setDropdownOpen] = useState(false);
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

    const inputBase = "w-full bg-transparent border-b border-black/[0.08] py-5 text-black placeholder-black/25 focus:outline-none focus:border-[#476D07] transition-all duration-300 text-[15px] poppins-regular";
    const labelBase = "block text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 mb-1 poppins-regular";

    return (
        <section id="form" className="w-full bg-white text-black poppins-regular selection:bg-[#AFFF00] selection:text-black pt-16 md:pt-24">
            <div className="max-w-[1600px] mx-auto w-full flex flex-col items-start border-t border-black/10">

                {/* Split Layout */}
                <div className="flex flex-col lg:flex-row w-full relative">

                    {/* Left Column: Sticky Info Panel */}
                    <div className="w-full lg:w-[35%] py-10 md:py-16 px-6 md:px-12 lg:sticky lg:top-24 lg:h-auto flex flex-col justify-start self-start">
                        {/* Label */}
                        <div className="flex items-center gap-3 mb-8 md:mb-12">
                            <span className="w-2 md:w-2.5 h-2 md:h-2.5 bg-black"></span>
                            <span className="text-black text-[12px] md:text-[13px] font-bold tracking-[0.25em] uppercase">
                                Get in Touch
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mona-sans-condensed-bold tracking-tight mb-10 md:mb-12">
                            LET'S<br />TALK
                        </h2>

                        {/* Contact details */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 poppins-regular block mb-2">Email</span>
                                <a href="mailto:hello@drixmedia.com" className="text-[1.3rem] md:text-[1.5rem] mona-sans-condensed-medium tracking-tight text-black hover:text-[#476D07] transition-colors leading-tight break-all">
                                    hello@drixmedia.com
                                </a>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 poppins-regular block mb-2">Phone</span>
                                <p className="text-[15px] poppins-regular text-black/60">(+91) 98765 43210</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 poppins-regular block mb-2">Address</span>
                                <p className="text-[15px] poppins-regular text-black/55 max-w-xs leading-relaxed mt-1">
                                    Drix Media HQ, Creative Suites,<br />Mumbai, India, 400001
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full lg:w-[65%] flex flex-col border-l border-black/10 pl-0 lg:pl-10">
                        <div className="px-6 md:px-12 py-10 md:py-16">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center py-32 lg:py-48"
                                    >
                                        <div className="w-14 h-14 bg-[#050505] flex items-center justify-center mb-8" style={{ clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)" }}>
                                            <svg width="24" height="24" viewBox="0 0 256 256" fill="white">
                                                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L100,192.69,218.34,74.34a8,8,0,0,1,11.32,11.32Z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-[2.5rem] md:text-[3rem] mona-sans-condensed-medium text-black mb-4 tracking-tight leading-tight">Sent successfully</h3>
                                        <p className="text-black/40 text-[15px] poppins-regular max-w-sm">
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
                                        {/* Form heading */}
                                        <div className="mb-4">
                                            <span className="text-[9px] text-black/25 font-mono tracking-[0.2em] uppercase block mb-3">01</span>
                                            <h3 className="text-[1.3rem] md:text-[1.5rem] mona-sans-condensed-medium text-black tracking-tight">Your Details</h3>
                                        </div>

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
                                        </div>

                                        {/* Section 2 */}
                                        <div className="mt-8 border-t border-black/[0.06] pt-10">
                                            <div className="mb-6">
                                                <span className="text-[9px] text-black/25 font-mono tracking-[0.2em] uppercase block mb-3">02</span>
                                                <h3 className="text-[1.3rem] md:text-[1.5rem] mona-sans-condensed-medium text-black tracking-tight">Your Project</h3>
                                            </div>

                                            <div className="space-y-10">
                                                <div>
                                                    <label className={labelBase}>What do you need help with? *</label>
                                                    <div className="relative">
                                                        <div
                                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                                            className={`${inputBase} flex items-center justify-between cursor-pointer pb-4`}
                                                        >
                                                            <span className={form.service ? 'text-black' : 'text-black/25'}>
                                                                {form.service || 'Select a service'}
                                                            </span>
                                                            <motion.svg
                                                                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                                                                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                                                width="12" height="12" viewBox="0 0 256 256" fill="currentColor" className="text-black/20 shrink-0"
                                                            >
                                                                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                                                            </motion.svg>
                                                        </div>

                                                        {/* Hidden required input for form validation */}
                                                        <input type="text" name="service" required className="absolute opacity-0 pointer-events-none w-0 h-0" value={form.service} onChange={() => { }} />

                                                        <AnimatePresence>
                                                            {dropdownOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                                                                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                                                    className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.06)] z-50 overflow-hidden"
                                                                >
                                                                    {serviceOptions.map((opt) => (
                                                                        <div
                                                                            key={opt}
                                                                            onClick={() => {
                                                                                setForm({ ...form, service: opt });
                                                                                setDropdownOpen(false);
                                                                            }}
                                                                            className="px-6 py-4 text-[14px] text-black/70 poppins-regular cursor-pointer hover:bg-[#FAFAFA] hover:text-[#476D07] transition-all duration-300 border-b border-black/[0.03] last:border-0"
                                                                        >
                                                                            {opt}
                                                                        </div>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
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
                                                        rows={3}
                                                        className={`${inputBase} overflow-hidden resize-none`}
                                                    />
                                                </div>

                                                <div>
                                                    <label className={labelBase}>How did you hear about us?</label>
                                                    <input type="text" name="referral" placeholder="Google, Social Media, referral..." value={form.referral} onChange={handleChange} className={inputBase} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex items-center gap-8">
                                            <button
                                                type="submit"
                                                className="group flex items-center gap-4 bg-black text-white px-10 py-5 text-[13px] tracking-[0.18em] uppercase poppins-regular font-bold transition-all duration-400 hover:bg-[#050505] hover:gap-6"
                                                style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)" }}
                                            >
                                                Get in touch
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                            </button>
                                            <span className="text-[10px] text-black/25 poppins-regular tracking-wide hidden md:block">We reply within 24 hours</span>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Spacer */}
                        <div className="h-16 md:h-24"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};


// ─── What Happens Next ────────────────────────────────────────────────────────

const stepIllustrations = [
    // 01 — Clipboard / Review
    (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="12" width="40" height="56" rx="4" className="stroke-black" strokeWidth="2.5" fill="none" />
            <rect x="28" y="8" width="24" height="10" rx="3" className="fill-[#AFFF00] stroke-black" strokeWidth="2" />
            <circle cx="40" cy="13" r="2" className="fill-black" />
            <line x1="28" y1="30" x2="42" y2="30" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="28" y1="38" x2="52" y2="38" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="28" y1="46" x2="48" y2="46" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="28" y1="54" x2="44" y2="54" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M48 50l4 4 8-8" className="stroke-[#050505]" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    ),
    // 02 — Calendar / Schedule
    (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="18" width="52" height="48" rx="4" className="stroke-black" strokeWidth="2.5" fill="none" />
            <line x1="14" y1="32" x2="66" y2="32" className="stroke-black" strokeWidth="2.5" />
            <line x1="30" y1="12" x2="30" y2="24" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="12" x2="50" y2="24" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" />
            {/* Grid dots */}
            <circle cx="26" cy="41" r="2.5" className="fill-black/30" />
            <circle cx="40" cy="41" r="2.5" className="fill-black/30" />
            <circle cx="54" cy="41" r="2.5" className="fill-black/30" />
            <circle cx="26" cy="52" r="2.5" className="fill-black/30" />
            <circle cx="40" cy="52" r="5" className="fill-[#AFFF00] stroke-black" strokeWidth="2" />
            <circle cx="54" cy="52" r="2.5" className="fill-black/30" />
        </svg>
    ),
    // 03 — Speech Bubbles / Discuss
    (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20C12 17.7909 13.7909 16 16 16H48C50.2091 16 52 17.7909 52 20V40C52 42.2091 50.2091 44 48 44H24L16 52V44H16C13.7909 44 12 42.2091 12 40V20Z"
                className="stroke-black" strokeWidth="2.5" fill="none" />
            <path d="M56 30C56 27.7909 57.7909 26 60 26H64C66.2091 26 68 27.7909 68 30V50C68 52.2091 66.2091 54 64 54V62L56 54H36C33.7909 54 32 52.2091 32 50V48"
                className="stroke-black/40" strokeWidth="2.5" fill="none" />
            <line x1="20" y1="25" x2="36" y2="25" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="31" x2="44" y2="31" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="37" x2="32" y2="37" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="42" cy="42" r="8" className="fill-[#AFFF00]" />
            <path d="M40 42l2 2 4-4" className="stroke-black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    ),
    // 04 — Lightbulb / Strategy
    (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 12C29.5 12 21 20.5 21 31C21 38.2 25.2 44.4 31 47.5V54C31 55.6569 32.3431 57 34 57H46C47.6569 57 49 55.6569 49 54V47.5C54.8 44.4 59 38.2 59 31C59 20.5 50.5 12 40 12Z"
                className="stroke-black" strokeWidth="2.5" fill="none" />
            <line x1="34" y1="62" x2="46" y2="62" className="stroke-black/60" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="67" x2="44" y2="67" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            {/* Rays */}
            <line x1="40" y1="2" x2="40" y2="8" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" />
            <line x1="58" y1="8" x2="54" y2="12" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" />
            <line x1="22" y1="8" x2="26" y2="12" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" />
            <line x1="68" y1="22" x2="62" y2="25" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" />
            <line x1="12" y1="22" x2="18" y2="25" className="stroke-[#AFFF00]" strokeWidth="3" strokeLinecap="round" />
            {/* Inner glow */}
            <circle cx="40" cy="30" r="10" className="fill-[#AFFF00]" />
        </svg>
    ),
    // 05 — Document / Proposal
    (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12H50L60 22V64C60 66.2091 58.2091 68 56 68H24C21.7909 68 20 66.2091 20 64V16C20 13.7909 21.7909 12 24 12H20Z"
                className="stroke-black" strokeWidth="2.5" fill="none" />
            <path d="M50 12V22H60" className="stroke-black" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
            <line x1="28" y1="32" x2="52" y2="32" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="28" y1="40" x2="48" y2="40" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="28" y1="48" x2="44" y2="48" className="stroke-black/40" strokeWidth="2.5" strokeLinecap="round" />
            {/* Checkmark badge */}
            <circle cx="54" cy="56" r="12" className="fill-[#AFFF00] stroke-black" strokeWidth="2" />
            <path d="M49 56l3 3 6-6" className="stroke-black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    ),
];

const nextSteps = [
    { title: 'We Review Your Request', description: 'Our team will review your submission within 24 hours.' },
    { title: 'We Schedule a Call', description: 'We will send you a calendar link to book a time that works for you.' },
    { title: 'We Discuss Your Goals', description: 'On the call, we will learn about your business, your challenges, and where you want to go.' },
    { title: 'We Share Our Approach', description: 'We will walk you through how we can help and what working together would look like.' },
    { title: 'We Send a Proposal', description: 'If it is a fit, we will send you a detailed proposal with scope, timeline, and investment.' },
];

const WhatHappensNext = () => (
    <section className="w-full bg-[#FAFAFA] pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
        <div className="w-full max-w-[1400px] mx-auto">

            {/* Header */}
            <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 mb-10 md:mb-20">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">The Journey</span>
                    <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                        What Next
                    </h2>
                </div>
                <p className="hidden md:block text-sm text-black/35 max-w-[220px] leading-relaxed poppins-regular text-right">
                    We move quickly and keep you informed at every step. No ghosting, no jargon—just results.
                </p>
            </div>

            {/* ── DESKTOP: Editorial 1px Seamless Grid ── */}
            <div className="hidden md:flex flex-col gap-px w-full bg-black/5 border border-black/5 mb-10 overflow-hidden">
                {/* Row 1: 3 cards */}
                <div className="grid grid-cols-3 gap-px bg-black/5">
                    {nextSteps.slice(0, 3).map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65, delay: i * 0.05 }}
                            className="group bg-white hover:bg-[#F9F9F9] transition-colors duration-500 w-full min-h-[350px] p-10 flex flex-col justify-between"
                        >
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start justify-between">
                                    <div className="w-[60px] h-[60px] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                                        {stepIllustrations[i]}
                                    </div>
                                    <span className="text-[9px] text-black/15 font-mono tracking-[0.2em] uppercase mt-1">0{i + 1}</span>
                                </div>
                                <h3 className="text-[1.3rem] md:text-[1.4rem] text-black leading-snug tracking-tight mona-sans-condensed-medium group-hover:text-[#476D07] transition-colors duration-400">{step.title}</h3>
                            </div>
                            <div className="flex items-end justify-between mt-8">
                                <p className="text-black/40 text-[14px] leading-relaxed poppins-regular max-w-[95%]">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Row 2: 2 cards — wider */}
                <div className="grid grid-cols-2 gap-px bg-black/5">
                    {nextSteps.slice(3).map((step, i) => (
                        <motion.div
                            key={i + 3}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65, delay: (i + 3) * 0.05 }}
                            className="group bg-white hover:bg-[#F9F9F9] transition-colors duration-500 w-full min-h-[320px] p-10 flex flex-col justify-between"
                        >
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start justify-between">
                                    <div className="w-[60px] h-[60px] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                                        {stepIllustrations[i + 3]}
                                    </div>
                                    <span className="text-[9px] text-black/15 font-mono tracking-[0.2em] uppercase mt-1">0{i + 4}</span>
                                </div>
                                <h3 className="text-[1.3rem] md:text-[1.4rem] text-black leading-snug tracking-tight mona-sans-condensed-medium group-hover:text-[#476D07] transition-colors duration-400">{step.title}</h3>
                            </div>
                            <div className="flex items-end justify-between mt-8">
                                <p className="text-black/40 text-[14px] leading-relaxed poppins-regular max-w-[95%]">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── MOBILE: CSS scroll-snap horizontal carousel ── */}
            <div
                className="md:hidden flex gap-4 overflow-x-auto"
                style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {nextSteps.map((step, i) => (
                    <div key={i} className="shrink-0 h-[340px] group" style={{ scrollSnapAlign: "start", width: "calc(100vw - 3rem)" }}>
                        <div className="bg-white w-full h-full p-8 flex flex-col justify-between border border-black/[0.05]" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 0%)" }}>
                            <div className="flex flex-col gap-5">
                                <div className="flex items-start justify-between">
                                    <div className="w-[64px] h-[64px] flex items-center justify-center [&_svg]:w-[64px] [&_svg]:h-[64px]">
                                        {stepIllustrations[i]}
                                    </div>
                                    <span className="text-[9px] text-black/15 font-mono tracking-[0.2em] uppercase">0{i + 1}</span>
                                </div>
                                <h3 className="text-[1.2rem] text-black tracking-tight mona-sans-condensed-medium">{step.title}</h3>
                            </div>
                            <p className="text-black/40 text-[13px] leading-relaxed poppins-regular">{step.description}</p>
                        </div>
                    </div>
                ))}
                <div className="shrink-0 w-4" />
            </div>
        </div>
    </section>
);

// ─── FAQ (matching Home page FAQSection pattern) ─────────────────────────────

const faqs = [
    { q: 'How much do your services cost?', a: 'It depends on the scope of work. We offer custom pricing based on your needs. After our strategy call, we will send a detailed proposal with transparent pricing.' },
    { q: 'Do you work with startups?', a: 'Yes. We work with startups, growing brands, and established companies across industries.' },
    { q: 'What industries do you work with?', a: 'We have experience across D2C, SaaS, hospitality, finance, education, healthcare, and more. If you have a great product and ambitious goals, we can help.' },
    { q: 'How long does a project take?', a: 'It depends on the scope. A branding project typically takes 6 to 8 weeks. A website can take 4 to 6 weeks. Campaigns are ongoing. We will give you a clear timeline in our proposal.' },
    { q: 'Do you offer retainer packages?', a: 'Yes. Many of our clients work with us on a monthly retainer for ongoing content, campaigns, and creative work.' },
    { q: 'Can you help with just one service?', a: 'Yes, but we recommend an integrated approach for the best results. If you only need one service, we can do that too.' },
    { q: 'Where are you located?', a: 'We are based in India, but we work with clients across India and internationally.' },
];

const ContactFAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="group flex flex-col border-b border-black/10 cursor-pointer overflow-hidden transition-colors duration-500 hover:bg-[#FAFAFA]"
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* Row Header */}
            <div className="flex justify-between items-start md:items-center py-6 md:py-10 px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 lg:gap-24 w-full pr-8">
                    <span className="text-black/30 font-bold tracking-[0.2em] text-[13px] md:text-sm transition-colors duration-500 group-hover:text-black/50">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className={`text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.1] mona-sans-condensed-medium tracking-tight transition-colors duration-500 ${isOpen ? 'text-[#AFFF00]' : 'text-black group-hover:text-black/70'}`}>
                        {question}
                    </h3>
                </div>

                {/* Toggle Icon */}
                <div className="relative shrink-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 mt-1 md:mt-0 overflow-hidden">
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        className={`absolute inset-0 flex items-center justify-center transition-colors duration-500 ${isOpen ? 'text-[#AFFF00]' : 'text-black/30 group-hover:text-black'}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </motion.div>
                </div>
            </div>

            {/* Expandable Content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 md:px-12 pb-10 md:pb-12 pt-2 ml-0 md:ml-20 lg:ml-32">
                            <p className="text-base md:text-xl text-black/60 leading-relaxed poppins-medium max-w-3xl">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ScrambleButtonSecondary = ({ text, href }: { text: string; href: string }) => {
    return (
        <motion.a
            href={href}
            initial="initial"
            whileHover="hover"
            variants={{
                initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" },
                hover: { clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 16px)", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
            }}
            className="group relative w-max flex items-center justify-center bg-transparent border border-black/20 h-[50px] md:h-[56px] px-8 md:px-10 transition-colors duration-500 overflow-hidden"
        >
            <motion.div
                variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 bg-black w-full h-full"
            />

            <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
                <div className="opacity-0 pointer-events-none flex items-center gap-3 text-[13px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">
                    <span>{text}</span>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </div>

                <motion.div
                    variants={{
                        initial: { y: "0%" },
                        hover: { y: "-100%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
                    }}
                    className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] tracking-[0.2em] uppercase font-bold text-black whitespace-nowrap"
                >
                    <span>{text}</span>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] group-hover:rotate-45 group-hover:scale-[1.4] transition-transform duration-500 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </motion.div>

                <motion.div
                    variants={{
                        initial: { y: "100%" },
                        hover: { y: "0%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
                    }}
                    className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] tracking-[0.2em] uppercase font-bold text-white whitespace-nowrap"
                >
                    <span>{text}</span>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] -rotate-45 group-hover:rotate-45 group-hover:scale-[1.4] transition-transform duration-500 delay-75 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                </motion.div>
            </div>
        </motion.a>
    );
};

const FAQSection = () => (
    <section className="w-full bg-white text-black poppins-regular selection:bg-black selection:text-[#AFFF00] pt-24 md:pt-40">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col items-start border-t border-black/10">

            {/* Superior Split Layout */}
            <div className="flex flex-col lg:flex-row w-full relative">

                {/* Left Column: Sticky Header */}
                <div className="w-full lg:w-[35%] py-16 px-6 md:px-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-start">
                    {/* Label */}
                    <div className="flex items-center gap-3 mb-10 md:mb-16">
                        <span className="w-2 h-2 bg-black shadow-[0_0_10px_rgba(0,0,0,0.2)]"></span>
                        <span className="text-black text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase">
                            Common Questions
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] mona-sans-condensed-medium tracking-tight mb-8 md:mb-12">
                        FAQ
                    </h2>

                    {/* Subtitle */}
                    <p className="text-black/50 text-lg md:text-xl poppins-medium leading-relaxed max-w-xs mb-12">
                        Everything you need to know before working with us.
                    </p>

                    {/* Ask Question Button */}
                    <ScrambleButtonSecondary text="Ask a question" href="mailto:hello@drixmedia.com" />
                </div>

                {/* Right Column: Expansive Accordion */}
                <div className="w-full lg:w-[65%] flex flex-col border-l border-black/10">
                    {faqs.map((faq, index) => (
                        <ContactFAQItem key={index} index={index} question={faq.q} answer={faq.a} />
                    ))}

                    {/* Spacer */}
                    <div className="h-32"></div>
                </div>

            </div>

        </div>
    </section>
);



// ─── CTA ─────────────────────────────────────────────────────────────────────

const CTASection = () => (
    <section className="w-full bg-[#080808] px-6 md:px-10 pt-16 md:pt-24 pb-10 selection:bg-black selection:text-[#AFFF00]">
        <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="w-full bg-[#AFFF00] relative overflow-hidden flex flex-col items-start px-8 md:px-20 py-14 md:py-20"
            style={{ clipPath: "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)" }}
        >
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-black/50 uppercase poppins-regular">Get Started</span>
                        <h2 className="text-[3rem] md:text-[5rem] lg:text-[6rem] tracking-tight text-black leading-none mona-sans-condensed-medium font-normal">
                            Ready to Get<br />
                            <span className="text-black/30">Started?</span>
                        </h2>
                        <p className="text-black/60 text-[15px] md:text-[16px] max-w-lg leading-relaxed poppins-regular">
                            Book your strategy call and let's build something great.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 shrink-0">
                        <a
                            href="mailto:hello@drixmedia.com"
                            className="group flex items-center gap-4 bg-black text-white px-8 py-5 text-[13px] tracking-[0.18em] uppercase poppins-regular font-bold transition-all duration-400 hover:bg-[#050505] hover:gap-6"
                            style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)" }}
                        >
                            Book a Call
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                        </a>
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

const Contact: React.FC = () => {
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
                    <ContactHero />
                </motion.div>
            </div>

            <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,-0,-0,0.1)] mt-[-60px] md:mt-[-100px]"
                style={{ clipPath: "polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)" }}>
                <ContactFormSection />
                <WhatHappensNext />
                <FAQSection />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
};

export default Contact;
