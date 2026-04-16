import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoiseOverlay from '../components/NoiseOverlay';
import Footer from '../components/Footer';

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = ['All', 'Branding', 'Digital', 'Strategy', 'Culture', 'Production'];

const blogPosts = [
    {
        id: 1,
        category: 'Strategy',
        title: 'The Future of Digital Storytelling in 2026',
        excerpt: 'How emerging AI technologies and spatial computing are redefining the way brands connect with their audiences.',
        author: 'Alex Rivera',
        date: 'March 12, 2026',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop',
        readTime: '8 min read'
    },
    {
        id: 2,
        category: 'Branding',
        title: 'Minimalism is Dead. Long Live Meaningful Design.',
        excerpt: 'Moving beyond the "blanding" era and rediscovering visual character in a saturated market.',
        author: 'Elena Vance',
        date: 'March 08, 2026',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop',
        readTime: '6 min read'
    },
    {
        id: 3,
        category: 'Production',
        title: 'Behind the Scenes: The Kinetic Identity for Solaris',
        excerpt: 'A deep dive into our latest motion-led branding project and the technical challenges we overcame.',
        author: 'Marcus Chen',
        date: 'March 02, 2026',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2670&auto=format&fit=crop',
        readTime: '12 min read'
    },
    {
        id: 4,
        category: 'Culture',
        title: 'Why We Optimized for Autonomy Over Oversight',
        excerpt: 'How Drix Media built a remote-first culture that prioritizes creative freedom and personal ownership.',
        author: 'Sarah Jenkins',
        date: 'February 24, 2026',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop',
        readTime: '5 min read'
    },
    {
        id: 5,
        category: 'Digital',
        title: 'Building High-Performance Web Ecosystems',
        excerpt: 'Why raw speed and intentional motion are the new pillars of premium user experience.',
        author: 'David Kim',
        date: 'February 18, 2026',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        readTime: '10 min read'
    },
    {
        id: 6,
        category: 'Branding',
        title: 'The Psychology of Color in Luxury Branding',
        excerpt: 'Explaining the subtle nuances of hue and saturation that separate premium brands from the mainstream.',
        author: 'Elena Vance',
        date: 'February 11, 2026',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
        readTime: '7 min read'
    },
];

import { SharedHeroLayout, letterVariants } from '../components/SharedHero';

// ─── Hero ─────────────────────────────────────────────────────────────────────

const BlogHero = () => (
    <SharedHeroLayout 
        bottomLabel="The Journal"
        buttonText="READ JOURNAL"
        buttonHref="#featured"
        titleLines={
            <>
                <div className="flex flex-wrap items-center overflow-visible pb-1 md:pb-2 gap-x-[1vw] md:gap-x-4">
                    <span className="flex text-white/30 italic">
                        {"Ideas,".split('').map((char, index) => (
                            <motion.span key={`line1-a-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                    <span className="flex">
                        {"Insights &".split('').map((char, index) => (
                            <motion.span key={`line1-b-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
                <div className="flex flex-wrap items-center overflow-visible mt-1 md:mt-2 pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
                    <span className="flex text-[#AFFF00]">
                        {"Perspectives.".split('').map((char, index) => (
                            <motion.span key={`line2-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
            </>
        }
        subtextContent={
            <>
                <span className="text-white font-semibold block xl:whitespace-nowrap">Exploring the intersection of branding, technology, and culture.</span>
                <span className="block xl:whitespace-nowrap">Thought leadership for the modern brand builder.</span>
            </>
        }
    >
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
            <motion.span 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[20vw] md:text-[17vw] font-black text-white/[0.02] uppercase tracking-[-0.05em] translate-y-[-5%] mona-sans-condensed-bold"
            >
                JOURNAL
            </motion.span>
        </div>
    </SharedHeroLayout>
);


// ─── Featured Post ────────────────────────────────────────────────────────────

const FeaturedPost = () => (
    <section className="w-full bg-white pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
        <div className="max-w-[1400px] mx-auto">

            {/* Header */}
            <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 mb-12 md:mb-20">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Featured</span>
                    <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                        Lead Story
                    </h2>
                </div>
                <span className="hidden md:block text-[9px] text-black/25 font-mono tracking-[0.2em] uppercase">Latest</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                {/* Image Section — chamfered */}
                <div className="lg:col-span-7">
                    <motion.div
                        initial="rest" whileHover="hover"
                        variants={{
                            rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0% 100%, 0% 0%)" },
                            hover: { clipPath: "polygon(40px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 40px)", transition: { duration: 0.5, ease: [0.19,1,0.22,1] } }
                        }}
                        className="relative group cursor-pointer overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)]"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="aspect-[16/10] w-full"
                        >
                            <img
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="absolute top-8 left-8">
                            <div className="px-4 py-2 bg-white/90 backdrop-blur text-black text-[9px] font-black uppercase tracking-[0.3em] border border-black/5"
                                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}>
                                Feature
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-5 flex flex-col justify-center h-full pt-4 lg:pt-6">
                    <span className="text-[9px] text-[#476D07] font-bold uppercase tracking-[0.4em] poppins-regular mb-8">
                        {blogPosts[0].category}
                    </span>
                    <h2 className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mona-sans-condensed-medium tracking-tight text-black mb-8 leading-[0.95]">
                        {blogPosts[0].title}
                    </h2>
                    <p className="text-black/45 text-[15px] poppins-regular mb-10 leading-relaxed max-w-lg">
                        {blogPosts[0].excerpt}
                    </p>

                    <div className="flex items-center gap-6 mb-12 border-t border-black/[0.06] pt-6">
                        <span
                            className="text-[2rem] font-black leading-none select-none shrink-0
                                       text-transparent [-webkit-text-stroke:1.5px_rgba(71,109,7,0.3)]"
                        >
                            {blogPosts[0].author[0]}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-black text-[14px] poppins-regular font-bold tracking-tight">{blogPosts[0].author}</span>
                            <span className="text-black/25 text-[10px] font-mono uppercase tracking-[0.2em] mt-1">{blogPosts[0].date} · {blogPosts[0].readTime}</span>
                        </div>
                    </div>

                    <Link to={`/blog/${blogPosts[0].id}`} className="group flex items-center gap-4 self-start">
                        <span className="text-[1.1rem] mona-sans-condensed-medium text-black group-hover:text-[#476D07] transition-colors duration-300 tracking-tight">
                            Read the article
                        </span>
                        <div className="shrink-0 w-10 h-10 border border-black/10 flex items-center justify-center group-hover:bg-[#476D07] group-hover:border-[#476D07] transition-all duration-400">
                            <svg className="w-4 h-4 text-black/30 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

// ─── Blog Grid ────────────────────────────────────────────────────────────────

const ArticlesGrid = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? blogPosts.slice(1)
        : blogPosts.slice(1).filter(post => post.category === activeCategory);

    return (
        <section className="w-full bg-[#FAFAFA] pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
            <div className="max-w-[1400px] mx-auto">

                {/* Header with category filter */}
                <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 mb-12 md:mb-20 gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Archive</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                            Selected Readings
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-black/[0.05] pb-2 w-full lg:w-auto overflow-x-auto whitespace-nowrap hide-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-[11px] font-bold uppercase tracking-[0.25em] pb-4 transition-all relative poppins-regular ${activeCategory === cat ? 'text-black' : 'text-black/25 hover:text-black/50'
                                    }`}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="journalCatLine"
                                        className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#476D07]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles grid — chamfered cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.04]">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                layout
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                                className="group"
                            >
                                <motion.div
                                    initial="rest" whileHover="hover"
                                    variants={{
                                        rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 0%)" },
                                        hover: { clipPath: "polygon(24px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 24px)", transition: { duration: 0.35, ease: [0.19,1,0.22,1] } }
                                    }}
                                    className="bg-white h-full flex flex-col cursor-pointer shadow-[0_2px_16px_rgba(0,0,0,0.03)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-shadow duration-500"
                                >
                                    {/* Image */}
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.16, 1, 0.3, 1]"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-black text-[9px] font-black uppercase tracking-[0.3em] border border-black/5"
                                                style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)" }}>
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow p-6 md:p-8">
                                        <h3 className="text-[1.15rem] md:text-[1.25rem] mona-sans-condensed-medium text-black mb-4 tracking-tight leading-snug group-hover:text-[#476D07] transition-colors duration-400">
                                            {post.title}
                                        </h3>
                                        <p className="text-black/40 text-[13px] poppins-regular mb-8 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/[0.05]">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-mono text-black/25 uppercase tracking-[0.2em]">{post.date}</span>
                                                <span className="text-[9px] text-black/20 mt-1 poppins-regular">{post.readTime}</span>
                                            </div>
                                            <div className="shrink-0 w-7 h-7 border border-black/10 flex items-center justify-center group-hover:bg-[#476D07] group-hover:border-[#476D07] transition-all duration-400">
                                                <svg className="w-3 h-3 text-black/30 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

// ─── Newsletter ───────────────────────────────────────────────────────────────

const Newsletter = () => {
    const sectionRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const glowY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    return (
        <section ref={sectionRef} className="w-full bg-[#050505] relative overflow-hidden selection:bg-[#AFFF00] selection:text-black">

            {/* Ambient glow effects */}
            <motion.div
                style={{ y: glowY }}
                className="absolute -right-40 top-0 w-[600px] h-[600px] bg-[#AFFF00] rounded-full blur-[280px] opacity-[0.04] pointer-events-none"
            />
            <motion.div
                style={{ y: glowY }}
                className="absolute -left-40 bottom-0 w-[500px] h-[500px] bg-[#476D07] rounded-full blur-[250px] opacity-[0.05] pointer-events-none"
            />

            {/* Header */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex items-end justify-between border-b border-white/[0.06] pt-20 md:pt-32 pb-8 md:pb-10">
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular">Connections</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-white leading-none mona-sans-condensed-medium font-normal">
                            Knowledge Unlocked
                        </h2>
                    </div>
                    <p className="hidden md:block text-sm text-white/20 max-w-[220px] leading-relaxed poppins-regular text-right">
                        Stay ahead of the curve with curated insights.
                    </p>
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5">

                    {/* ── Main CTA Card (large left) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="lg:col-span-7 md:col-span-2 relative group"
                    >
                        <motion.div
                            initial="rest" whileHover="hover"
                            variants={{
                                rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0% 100%, 0% 0%)" },
                                hover: { clipPath: "polygon(32px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 32px)", transition: { duration: 0.5, ease: [0.19,1,0.22,1] } }
                            }}
                            className="bg-[#0D0D0D] border border-white/[0.04] p-8 md:p-12 lg:p-14 h-full flex flex-col justify-between min-h-[380px] relative overflow-hidden"
                        >
                            {/* Subtle grid pattern */}
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-2.5 h-2.5 bg-[#AFFF00] animate-pulse"></div>
                                    <span className="text-[9px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular">Monthly Digest</span>
                                </div>

                                <h3 className="text-[1.8rem] md:text-[2.5rem] lg:text-[3rem] text-white leading-[0.95] tracking-tight mona-sans-condensed-medium mb-6 max-w-xl">
                                    Insights on design, culture,
                                    <br />
                                    <span className="text-white/30">and the future of branding.</span>
                                </h3>

                                <p className="text-white/35 text-[14px] md:text-[15px] leading-relaxed poppins-regular max-w-md mb-10">
                                    Join 5,000+ brand builders getting our curated monthly newsletter. No noise. Just the ideas shaping the industry.
                                </p>
                            </div>

                            {/* Newsletter form */}
                            <div className="relative z-10">
                                <form className="flex flex-col sm:flex-row gap-3 max-w-lg">
                                    <div className="relative flex-grow group/input">
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full bg-white/[0.03] border border-white/[0.08] px-6 py-4 md:py-5 text-white text-[14px] poppins-regular placeholder:text-white/15 focus:outline-none focus:border-[#AFFF00]/40 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(175,255,0,0.06)] transition-all duration-500"
                                            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
                                        />
                                        {/* Glow line under input on focus */}
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#AFFF00]/60 to-transparent group-focus-within/input:w-full transition-all duration-700" />
                                    </div>
                                    <button
                                        type="button"
                                        className="group/btn flex items-center justify-center gap-3 bg-[#AFFF00] text-black px-7 py-4 md:py-5 text-[12px] tracking-[0.2em] uppercase poppins-regular font-bold transition-all duration-500 hover:bg-white shrink-0"
                                        style={{ clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)" }}
                                    >
                                        Subscribe
                                        <svg className="w-3.5 h-3.5 group-hover/btn:rotate-45 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                                    </button>
                                </form>

                                <div className="mt-6 flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#AFFF00]/40"></div>
                                    <p className="text-white/15 text-[9px] font-bold uppercase tracking-[0.3em] poppins-regular">No Spam · Unsubscribe Anytime</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Right Column: Stacked cards ── */}
                    <div className="lg:col-span-5 flex flex-col gap-4 md:gap-5">

                        {/* Editorial Quote Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                        >
                            <motion.div
                                initial="rest" whileHover="hover"
                                variants={{
                                    rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 0%)" },
                                    hover: { clipPath: "polygon(20px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 20px)", transition: { duration: 0.4, ease: [0.19,1,0.22,1] } }
                                }}
                                className="bg-[#0D0D0D] border border-white/[0.04] p-8 md:p-10 relative overflow-hidden group cursor-default"
                            >
                                {/* Decorative quote mark */}
                                <span className="absolute top-4 right-6 text-[6rem] leading-none text-white/[0.03] font-serif select-none pointer-events-none">"</span>

                                <div className="relative z-10">
                                    <span className="text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase poppins-regular block mb-6">From Our Perspective</span>
                                    <blockquote className="text-[1.1rem] md:text-[1.3rem] text-white/70 leading-[1.5] mona-sans-condensed-medium tracking-tight mb-6 group-hover:text-white/90 transition-colors duration-500">
                                        "The brands that win in 2026 are the ones building culture, not just campaigns."
                                    </blockquote>
                                    <div className="flex items-center gap-4 border-t border-white/[0.05] pt-5">
                                        <span
                                            className="text-[1.8rem] font-black leading-none select-none shrink-0
                                                       text-transparent [-webkit-text-stroke:1px_rgba(175,255,0,0.3)]"
                                        >
                                            A
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="text-white/60 text-[13px] poppins-regular font-semibold">Alex Rivera</span>
                                            <span className="text-white/20 text-[9px] font-mono uppercase tracking-[0.2em] mt-0.5">Chief Strategist</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Stats Row — Two mini cards */}
                        <div className="grid grid-cols-2 gap-4 md:gap-5">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                                className="group"
                            >
                                <div
                                    className="bg-[#0D0D0D] border border-white/[0.04] p-6 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[180px] hover:border-[#AFFF00]/10 transition-all duration-500 relative overflow-hidden"
                                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" }}
                                >
                                    <span className="text-[9px] font-bold tracking-[0.3em] text-white/15 uppercase poppins-regular">Readers</span>
                                    <div>
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                            className="text-[2.5rem] md:text-[3.5rem] font-black text-white leading-none tracking-tight block mona-sans-condensed-medium"
                                        >
                                            5K<span className="text-[#AFFF00]">+</span>
                                        </motion.span>
                                        <span className="text-white/20 text-[10px] poppins-regular mt-2 block">Active subscribers</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                                className="group"
                            >
                                <div
                                    className="bg-[#AFFF00] p-6 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[180px] relative overflow-hidden"
                                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" }}
                                >
                                    {/* Subtle dot pattern */}
                                    <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    
                                    <span className="text-[9px] font-bold tracking-[0.3em] text-black/30 uppercase poppins-regular relative z-10">Issues</span>
                                    <div className="relative z-10">
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
                                            className="text-[2.5rem] md:text-[3.5rem] font-black text-black leading-none tracking-tight block mona-sans-condensed-medium"
                                        >
                                            48
                                        </motion.span>
                                        <span className="text-black/40 text-[10px] poppins-regular mt-2 block">Published editions</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Topics Strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
                        >
                            <div
                                className="bg-[#0D0D0D] border border-white/[0.04] px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4 overflow-hidden"
                                style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 0%)" }}
                            >
                                <span className="text-[9px] font-bold tracking-[0.3em] text-white/15 uppercase poppins-regular shrink-0">Topics</span>
                                <div className="flex gap-2 flex-wrap justify-end">
                                    {['Branding', 'Culture', 'Strategy', 'Design', 'Tech'].map((topic) => (
                                        <span key={topic} className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 border border-white/[0.06] poppins-regular hover:text-[#AFFF00] hover:border-[#AFFF00]/20 transition-all duration-300 cursor-default">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="pb-8 md:pb-16" />
        </section>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Blog: React.FC = () => {
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
                    <BlogHero />
                </motion.div>
            </div>

            <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,-0,-0,0.1)] mt-[-60px] md:mt-[-100px]" 
                 style={{ clipPath: "polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)" }}>
                <FeaturedPost />
                <ArticlesGrid />
                <Newsletter />
                <Footer />
            </div>
        </main>
    );
};

export default Blog;
