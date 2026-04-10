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

    const inputClasses = "w-full bg-transparent text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] mona-sans-condensed-medium outline-none placeholder-black/10 text-black group-focus-within:text-[#AFFF00] transition-colors duration-500 overflow-hidden resize-none";
    const labelRowClasses = "w-full md:w-[25%] p-6 md:p-8 lg:p-10 flex items-center md:border-r border-black/10 group-focus-within:border-white/10 transition-colors duration-500";
    const labelClasses = "text-[12px] md:text-[14px] font-bold tracking-[0.2em] uppercase text-black/40 group-focus-within:text-white transition-colors duration-500 poppins-regular";
    const inputRowClasses = "w-full md:w-[75%] p-6 md:p-8 lg:p-10 flex items-center relative";
    const rowContainerBase = "w-full flex flex-col md:flex-row border-b border-black/10 group focus-within:bg-[#050505] hover:bg-black/[0.02] focus-within:hover:bg-[#050505] transition-colors duration-500";

    return (
        <section id="form" className="w-full bg-white text-black poppins-regular selection:bg-[#AFFF00] selection:text-black pt-16 md:pt-24 border-t border-black/10">
            <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row px-6 md:px-12 py-10 md:py-16 mb-4 lg:mb-8">
                <div className="w-full md:w-[60%] flex flex-col justify-end">
                    <h2 className="text-[3rem] md:text-[5rem] lg:text-[6rem] leading-[0.85] mona-sans-condensed-bold tracking-tight text-[#050505] uppercase">
                        Start a<br/>New Project
                    </h2>
                </div>
                <div className="w-full md:w-[40%] flex flex-col sm:flex-row gap-10 lg:gap-16 mt-10 md:mt-0 items-start md:items-end justify-start md:justify-end pb-2">
                    <div className="flex flex-col">
                         <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-2 poppins-regular">Inquiries</span>
                         <a href="mailto:hello@drixmedia.com" className="text-[1.1rem] md:text-[1.3rem] mona-sans-condensed-medium hover:text-[#476D07] transition-colors text-black">hello@drixmedia.com</a>
                    </div>
                     <div className="flex flex-col">
                         <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-2 poppins-regular">Call us</span>
                         <span className="text-[1.1rem] md:text-[1.3rem] mona-sans-condensed-medium text-black">(+91) 98765 43210</span>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex w-full justify-center py-20 md:py-40 bg-[#FAFAFA] border-t border-black/10 px-6"
                    >
                        <div className="flex flex-col items-center justify-center text-center p-12 md:p-24 max-w-4xl w-full border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.04)]" style={{ clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)" }}>
                            <div className="w-16 h-16 bg-[#AFFF00] flex items-center justify-center mb-8 border border-black/10 shadow-sm" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}>
                                <svg width="24" height="24" viewBox="0 0 256 256" fill="black">
                                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L100,192.69,218.34,74.34a8,8,0,0,1,11.32,11.32Z" />
                                </svg>
                            </div>
                            <h3 className="text-[3rem] md:text-[4rem] lg:text-[5rem] mona-sans-condensed-bold mb-6 tracking-tighter leading-none text-[#050505] uppercase">
                                Message Sent
                            </h3>
                            <p className="text-black/50 text-[15px] md:text-[18px] poppins-regular max-w-xl mx-auto mb-12">
                                Thank you for reaching out. Our team is carefully reviewing your inquiry and will be in touch with you within 24 hours to begin the process.
                            </p>
                            <button onClick={() => setSubmitted(false)} className="group flex items-center gap-4 border border-black/10 text-black px-10 py-5 text-[13px] tracking-[0.18em] uppercase poppins-regular font-bold transition-all duration-400 hover:bg-[#FAFAFA] hover:gap-6 mx-auto" style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}>
                                Submit Another
                                <svg className="w-4 h-4 text-black/40 group-hover:text-[#AFFF00] transition-colors duration-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col"
                    >
                        {/* Wrapper for the massive grid layout */}
                        <div className="w-full border-t border-black/10">

                            {/* 01: Name */}
                            <div className={rowContainerBase}>
                                <div className={labelRowClasses}>
                                    <label className={labelClasses}>01 / Name *</label>
                                </div>
                                <div className={inputRowClasses}>
                                    <input type="text" name="name" required placeholder="John Doe" value={form.name} onChange={handleChange} className={inputClasses} />
                                </div>
                            </div>

                            {/* 02: Email */}
                            <div className={rowContainerBase}>
                                <div className={labelRowClasses}>
                                    <label className={labelClasses}>02 / E-mail *</label>
                                </div>
                                <div className={inputRowClasses}>
                                    <input type="email" name="email" required placeholder="hello@example.com" value={form.email} onChange={handleChange} className={inputClasses} />
                                </div>
                            </div>

                            {/* 03: Company */}
                            <div className={rowContainerBase}>
                                <div className={labelRowClasses}>
                                    <label className={labelClasses}>03 / Company</label>
                                </div>
                                <div className={inputRowClasses}>
                                    <input type="text" name="company" placeholder="Your Brand" value={form.company} onChange={handleChange} className={inputClasses} />
                                </div>
                            </div>

                            {/* 04: Service Dropdown */}
                            <div className={rowContainerBase}>
                                <div className={labelRowClasses}>
                                    <label className={labelClasses}>04 / Service *</label>
                                </div>
                                <div className={`${inputRowClasses} cursor-pointer outline-none`} tabIndex={0} onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    <div className={`${inputClasses} flex items-center justify-between`}>
                                        <span className={form.service ? 'text-black group-focus-within:text-[#AFFF00]' : 'text-black/10 group-focus-within:text-white/20'}>
                                            {form.service || 'Select discipline'}
                                        </span>
                                        <motion.svg animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }} width="32" height="32" viewBox="0 0 256 256" fill="currentColor" className="text-black/20 group-focus-within:text-white shrink-0">
                                            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                                        </motion.svg>
                                    </div>
                                    <input type="text" name="service" required className="absolute opacity-0 pointer-events-none w-0 h-0" value={form.service} onChange={() => { }} />

                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                                className="absolute top-full left-0 w-full bg-[#050505] border-t border-black/10 md:border-white/10 z-50 flex flex-col shadow-2xl"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {serviceOptions.map((opt) => (
                                                    <div
                                                        key={opt}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setForm({ ...form, service: opt });
                                                            setDropdownOpen(false);
                                                        }}
                                                        className="w-full px-6 md:px-10 py-5 md:py-6 text-[1.2rem] md:text-[1.8rem] mona-sans-condensed-medium uppercase text-white/50 cursor-pointer hover:bg-[#AFFF00]/10 hover:text-[#AFFF00] hover:pl-12 transition-all duration-400 ease-[0.19,1,0.22,1] border-b border-white/5 last:border-0"
                                                    >
                                                        {opt}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* 05: Message */}
                            <div className={`${rowContainerBase} items-start`}>
                                <div className={`${labelRowClasses} h-full pt-10 md:pt-14`}>
                                    <label className={labelClasses}>05 / Message *</label>
                                </div>
                                <div className={`${inputRowClasses} pt-10 md:pt-14 pb-14`}>
                                    <textarea name="message" required placeholder="Project detail..." value={form.message} onChange={handleChange} rows={3} className={inputClasses} />
                                </div>
                            </div>

                        </div>

                        {/* Submit Button Row */}
                        <div className="w-full">
                            <button type="submit" className="w-full bg-[#AFFF00] hover:bg-[#050505] text-[#050505] hover:text-[#AFFF00] transition-colors duration-500 py-12 md:py-16 flex items-center justify-center group outline-none">
                                <span className="text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] leading-none mona-sans-condensed-bold tracking-tighter uppercase mr-5 md:mr-8 group-hover:scale-[1.03] transition-transform duration-500 origin-right">
                                    Send Inquiry
                                </span>
                                <svg className="w-8 h-8 md:w-14 md:h-14 group-hover:rotate-[35deg] group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                            </button>
                        </div>

                    </motion.form>
                )}
            </AnimatePresence>
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
                            className="group bg-white hover:bg-[#F9F9F9] transition-colors duration-500 w-full min-h-[280px] p-10 flex flex-col gap-6"
                        >
                            <div className="flex items-start justify-between">
                                <div className="w-[60px] h-[60px] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                                    {stepIllustrations[i]}
                                </div>
                                <span className="text-[9px] text-black/15 font-mono tracking-[0.2em] uppercase mt-1">0{i + 1}</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[1.3rem] md:text-[1.4rem] text-black leading-snug tracking-tight mona-sans-condensed-medium group-hover:text-[#476D07] transition-colors duration-400">{step.title}</h3>
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
                            className="group bg-white hover:bg-[#F9F9F9] transition-colors duration-500 w-full min-h-[280px] p-10 flex flex-col gap-6"
                        >
                            <div className="flex items-start justify-between">
                                <div className="w-[60px] h-[60px] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                                    {stepIllustrations[i + 3]}
                                </div>
                                <span className="text-[9px] text-black/15 font-mono tracking-[0.2em] uppercase mt-1">0{i + 4}</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[1.3rem] md:text-[1.4rem] text-black leading-snug tracking-tight mona-sans-condensed-medium group-hover:text-[#476D07] transition-colors duration-400">{step.title}</h3>
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
                    <div key={i} className="shrink-0 h-[300px] group" style={{ scrollSnapAlign: "start", width: "calc(100vw - 3rem)" }}>
                        <div className="bg-white w-full h-full p-8 flex flex-col gap-6 border border-black/[0.05]" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 0%)" }}>
                            <div className="flex items-start justify-between">
                                <div className="w-[64px] h-[64px] flex items-center justify-center [&_svg]:w-[64px] [&_svg]:h-[64px]">
                                    {stepIllustrations[i]}
                                </div>
                                <span className="text-[9px] text-black/15 font-mono tracking-[0.2em] uppercase">0{i + 1}</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[1.2rem] text-black tracking-tight mona-sans-condensed-medium">{step.title}</h3>
                                <p className="text-black/40 text-[13px] leading-relaxed poppins-regular">{step.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="shrink-0 w-4" />
            </div>
        </div>
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
                <Footer />
            </div>
        </main>
    );
};

export default Contact;
