import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import NoiseOverlay from '../components/NoiseOverlay';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { SharedHeroLayout, letterVariants } from '../components/SharedHero';



// ─── Interfaces ───────────────────────────────────────────────────────────────

interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    read_time: string;
    cover_image: string;
    created_at: string;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const BlogHero = () => (
    <SharedHeroLayout
        bottomLabel="Blogs"
        buttonText="READ JOURNAL"
        buttonHref="#featured"
        titleLines={
            <>
                <div className="flex flex-wrap items-center overflow-visible pb-1 md:pb-2 gap-x-[4vw] md:gap-x-4">
                    <span className="flex">
                        {"The Drix".split('').map((char, index) => (
                            <motion.span key={`line1-a-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
                <div className="flex flex-wrap items-center overflow-visible mt-0 md:mt-2 pb-1 md:pb-4 gap-x-[4vw] md:gap-x-4">
                    <span className="flex text-[#AFFF00]">
                        {"Archive.".split('').map((char, index) => (
                            <motion.span key={`line2-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
            </>
        }
        subtextContent={
            <>
                <span className="text-white font-semibold block xl:whitespace-nowrap">Exploring the intersection of branding, technology, and culture.</span>
                <span className="block xl:whitespace-nowrap">Real talk on branding, marketing, and what actually works.</span>
            </>
        }
    >
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
            <motion.span
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[25vw] md:text-[17vw] font-black text-white/[0.02] uppercase tracking-[-0.05em] translate-y-[-5%] mona-sans-condensed-bold"
            >
                JOURNAL
            </motion.span>
        </div>
    </SharedHeroLayout>
);


// ─── Featured Post ────────────────────────────────────────────────────────────

const FeaturedPost = ({ post }: { post: Post | undefined }) => {
    if (!post) return null;

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <section id="featured" className="w-full bg-white pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 mb-12 md:mb-20">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Latest Blog</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                            Recent Post
                        </h2>
                    </div>
                    <span className="hidden md:block text-[9px] text-black/25 font-mono tracking-[0.2em] uppercase">Latest</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Image Section — chamfered */}
                    <div className="lg:col-span-7">
                        <Link to={`/blog/${post.slug}`}>
                            <motion.div
                                initial="rest" whileHover="hover"
                                variants={{
                                    rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0% 100%, 0% 0%)" },
                                    hover: { clipPath: "polygon(40px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 40px)", transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } }
                                }}
                                className="relative group cursor-pointer overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)]"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="aspect-[16/10] w-full"
                                >
                                    <img
                                        src={post.cover_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                <div className="absolute top-8 left-8">
                                    <div className="px-4 py-2 bg-white/90 backdrop-blur text-black text-[9px] font-black uppercase tracking-[0.3em] border border-black/5"
                                        style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}>
                                        New
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-5 flex flex-col justify-center h-full pt-4 lg:pt-6">
                        <span className="text-[9px] text-[#476D07] font-bold uppercase tracking-[0.4em] poppins-regular mb-8">
                            {post.category}
                        </span>
                        <h2 className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mona-sans-condensed-medium tracking-tight text-black mb-8 leading-[0.95]">
                            {post.title}
                        </h2>
                        <p className="text-black/45 text-[15px] poppins-regular mb-10 leading-relaxed max-w-lg">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center gap-6 mb-12 border-t border-black/[0.06] pt-6">
                            <span
                                className="text-[2rem] font-black leading-none select-none shrink-0
                                           text-transparent [-webkit-text-stroke:1.5px_rgba(71,109,7,0.3)]"
                            >
                                {post.author ? post.author[0] : 'D'}
                            </span>
                            <div className="flex flex-col">
                                <span className="text-black text-[14px] poppins-regular font-bold tracking-tight">{post.author}</span>
                                <span className="text-black/25 text-[10px] font-mono uppercase tracking-[0.2em] mt-1">{formattedDate} · {post.read_time}</span>
                            </div>
                        </div>

                        <Link to={`/blog/${post.slug}`} className="group flex items-center gap-4 self-start">
                            <span className="text-[1.1rem] mona-sans-condensed-medium text-black group-hover:text-[#476D07] transition-colors duration-300 tracking-tight">
                                Read the article
                            </span>
                            <div className="shrink-0 w-10 h-10 border border-black/10 flex items-center justify-center group-hover:bg-[#476D07] group-hover:border-[#476D07] transition-all duration-400">
                                <svg className="w-4 h-4 text-black/30 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── Blog Grid ────────────────────────────────────────────────────────────────

interface ArticlesGridProps {
    posts: Post[];
    categories: string[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLoading?: boolean;
}

const ArticlesGrid = ({ posts, categories, searchQuery, setSearchQuery, isLoading }: ArticlesGridProps) => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch = searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="w-full bg-[#FAFAFA] pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
            <div className="max-w-[1400px] mx-auto">

                {/* Header with category filter and search */}
                <div className="w-full flex flex-col gap-6 border-b border-black/[0.07] pb-8 mb-12 md:mb-20">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Archive</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                            Selected Readings
                        </h2>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-2">
                        {/* Categories */}
                        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 lg:pb-0 flex-nowrap w-full lg:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`relative shrink-0 p-[1px] transition-all duration-300 whitespace-nowrap
                                        ${activeCategory === cat
                                            ? 'bg-[#050505]'
                                            : 'bg-black/[0.08] hover:bg-black/20'
                                        }`}
                                    style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                                >
                                    <div
                                        className={`px-5 py-3 text-[10px] md:text-[11px] poppins-semibold tracking-[0.12em] md:tracking-[0.15em] uppercase transition-all duration-300
                                            ${activeCategory === cat
                                                ? 'bg-[#050505] text-[#AFFF00]'
                                                : 'bg-[#FAFAFA] text-black/40 hover:text-black hover:bg-[#FAFAFA]'
                                            }`}
                                        style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                                    >
                                        {cat}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div
                            className={`p-[1px] w-full lg:max-w-xs xl:max-w-md transition-all duration-300
                                ${searchQuery ? 'bg-[#476D07]' : 'bg-black/[0.08] hover:bg-black/20 focus-within:bg-[#476D07]'}`}
                            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                        >
                            <div className="relative w-full group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/30 group-focus-within:text-[#476D07] transition-colors duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="SEARCH ARCHIVE..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-10 py-3 bg-[#FAFAFA] focus:bg-white outline-none text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em] md:tracking-[0.15em] poppins-semibold text-black placeholder:text-black/35 transition-all duration-300"
                                    style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-black/30 hover:text-black transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Articles grid — chamfered cards */}
                {isLoading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-32"
                    >
                        <div className="w-10 h-10 rounded-full border-[3px] border-black/10 border-t-[#AFFF00] animate-spin"></div>
                    </motion.div>
                ) : filteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <span className="text-black/[0.04] text-[6rem] mona-sans-condensed-bold leading-none mb-4 tracking-tighter">NULL</span>
                        <p className="text-black/30 text-[12px] md:text-[14px] poppins-regular uppercase tracking-widest">No entries found matching your search</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.04]">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post, index) => {
                                const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                                return (
                                    <motion.div
                                        layout
                                        key={post.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.6, delay: index * 0.05 }}
                                        className="group"
                                    >
                                        <Link to={`/blog/${post.slug}`}>
                                            <motion.div
                                                initial="rest" whileHover="hover"
                                                variants={{
                                                    rest: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%, 0% 0%)" },
                                                    hover: { clipPath: "polygon(24px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 24px)", transition: { duration: 0.35, ease: [0.19, 1, 0.22, 1] } }
                                                }}
                                                className="bg-white h-full flex flex-col cursor-pointer shadow-[0_2px_16px_rgba(0,0,0,0.03)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-shadow duration-500"
                                            >
                                                {/* Image */}
                                                <div className="aspect-[4/3] overflow-hidden relative">
                                                    <img
                                                        src={post.cover_image}
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
                                                            <span className="text-[9px] font-mono text-black/25 uppercase tracking-[0.2em]">{formattedDate}</span>
                                                            <span className="text-[9px] text-black/20 mt-1 poppins-regular">{post.read_time}</span>
                                                        </div>
                                                        <div className="shrink-0 w-7 h-7 border border-black/10 flex items-center justify-center group-hover:bg-[#476D07] group-hover:border-[#476D07] transition-all duration-400">
                                                            <svg className="w-3 h-3 text-black/30 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                )}
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
                                hover: { clipPath: "polygon(32px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 32px)", transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } }
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
                                    Ideas worth reading.
                                    <br />
                                    <span className="text-white/30">Strategies worth stealing.</span>
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
                                        <svg className="w-3.5 h-3.5 group-hover/btn:rotate-45 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
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
                                    hover: { clipPath: "polygon(20px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 20px)", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
                                }}
                                className="bg-[#0D0D0D] border border-white/[0.04] p-8 md:p-10 relative overflow-hidden group cursor-default"
                            >
                                {/* Decorative quote mark */}
                                <span className="absolute top-4 right-6 text-[6rem] leading-none text-white/[0.03] font-serif select-none pointer-events-none">"</span>

                                <div className="relative z-10">
                                    <span className="text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase poppins-regular block mb-6">From Our Perspective</span>
                                    <blockquote className="text-[1.1rem] md:text-[1.3rem] text-white/70 leading-[1.5] mona-sans-condensed-medium tracking-tight mb-6 group-hover:text-white/90 transition-colors duration-500">
                                        "The brands that cut through aren't louder; they're clearer. Strategy is the difference between content and communication."
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
                                            10
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
                                    {['Branding', 'Culture', 'Strategy', 'Design', 'Tech', 'Marketing', 'UI/UX', 'Development', 'Content', 'Growth', 'Identity', 'Digital'].map((topic) => (
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

    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<string[]>(['All']);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [postsRes, catRes] = await Promise.all([
                supabase
                    .from('posts')
                    .select('*, categories(name)')
                    .eq('status', 'published')
                    .order('created_at', { ascending: false }),
                supabase.from('categories').select('name').order('name')
            ]);

            if (postsRes.data) {
                const mappedPosts = postsRes.data.map((p: any) => ({
                    ...p,
                    category: p.categories?.name || 'Uncategorized'
                }));
                setPosts(mappedPosts);
            }
            if (catRes.data) {
                setCategories(['All', ...catRes.data.map(c => c.name)]);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const featuredPost = posts.length > 0 ? posts[0] : undefined;
    const gridPosts = posts;

    return (
        <main className="w-full min-h-screen bg-[#050505] overflow-x-hidden">
            <Helmet>
                <title>Journal | Drix Media</title>
                <meta name="description" content="Exploring the intersection of branding, technology, and culture. Real talk on branding, marketing, and what actually works." />
            </Helmet>
            <Navbar />

            <div className="sticky top-0 h-[85svh] md:h-[90vh] lg:h-[95vh] w-full overflow-hidden z-0">
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="w-full h-full"
                >
                    <BlogHero />
                </motion.div>
            </div>

            <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,-0,-0,0.1)] mt-[-60px] md:mt-[-100px]"
                style={{ clipPath: "polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)" }}>
                {!searchQuery && <FeaturedPost post={featuredPost} />}
                <ArticlesGrid posts={gridPosts} categories={categories} searchQuery={searchQuery} setSearchQuery={setSearchQuery} isLoading={isLoading} />
                <Newsletter />
                <Footer />
            </div>
        </main>
    );
};

export default Blog;
