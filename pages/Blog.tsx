import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
                <div className="flex flex-wrap items-center overflow-visible pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
                    <span className="flex">
                        {"The ".split('').map((char, index) => (
                            <motion.span key={`line1-a-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                    <span className="flex text-white/50 italic font-medium">
                        {"Drix".split('').map((char, index) => (
                            <motion.span key={`line1-b-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
                <div className="flex flex-wrap items-center overflow-visible mt-1 md:mt-2 pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
                    <span className="flex text-[#AFFF00]">
                        {"Journal".split('').map((char, index) => (
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
    />
);

// ─── Featured Post ────────────────────────────────────────────────────────────

const FeaturedPost = () => (
    <motion.section
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-white py-32 md:py-48 px-6 md:px-12"
    >
        <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                {/* Image Section - Takes 7 Cols */}
                <div className="lg:col-span-7">
                    <div className="overflow-hidden rounded-[2.5rem] group cursor-pointer relative shadow-2xl">
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
                        <div className="absolute top-10 left-10">
                            <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
                                Feature
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section - Takes 5 Cols */}
                <div className="lg:col-span-5 flex flex-col justify-center h-full pt-4 lg:pt-10">
                    <p className="text-[#476D07] text-[12px] font-black uppercase tracking-[0.5em] mb-10 opacity-80">
                        {blogPosts[0].category}
                    </p>
                    <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter text-black mb-10 leading-[0.85]">
                        {blogPosts[0].title}
                    </h2>
                    <p className="text-black/50 text-xl md:text-2xl font-medium mb-12 leading-[1.3] max-w-lg">
                        {blogPosts[0].excerpt}
                    </p>

                    <div className="flex items-center gap-6 mb-16 px-1">
                        <div className="w-12 h-[1px] bg-black/10"></div>
                        <div className="flex flex-col">
                            <span className="text-black font-extrabold text-base tracking-tight">{blogPosts[0].author}</span>
                            <span className="text-black/30 text-[11px] font-bold uppercase tracking-widest mt-1">{blogPosts[0].date} · {blogPosts[0].readTime}</span>
                        </div>
                    </div>

                    <Link to={`/blog/${blogPosts[0].id}`} className="group inline-flex items-center gap-6">
                        <span className="text-2xl font-black text-black group-hover:text-[#476D07] transition-colors duration-300">
                            Read the article
                        </span>
                        <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#AFFF00] group-hover:border-[#AFFF00] group-hover:text-black transition-all duration-500 transform group-hover:translate-x-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </motion.section>
);

// ─── Blog Grid ────────────────────────────────────────────────────────────────

const ArticlesGrid = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? blogPosts.slice(1)
        : blogPosts.slice(1).filter(post => post.category === activeCategory);

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#FBFBFB] py-32 md:py-48 px-6 md:px-12 border-t border-black/5"
        >
            <div className="max-w-[1400px] mx-auto">

                {/* Header Row */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-24">
                    <div className="max-w-2xl">
                        <p className="text-[11px] font-black tracking-[0.5em] text-[#476D07] uppercase mb-10">Archive</p>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-black">
                            Selected <br /><span className="text-black/10">Readings</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-x-10 gap-y-4 border-b border-black/5 pb-2 w-full lg:w-auto overflow-x-auto whitespace-nowrap hide-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-[12px] font-black uppercase tracking-[0.25em] pb-5 transition-all relative ${activeCategory === cat ? 'text-black' : 'text-black/25 hover:text-black/50'
                                    }`}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="journalCatLine"
                                        className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#588B00]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry-Style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                layout
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                                className="group cursor-pointer flex flex-col h-full"
                            >
                                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-10 relative bg-black/5 shadow-xl">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.16, 1, 0.3, 1]"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                                    <div className="absolute top-8 left-8">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-full border border-black/5">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-3xl font-black text-black mb-5 tracking-tighter leading-tight group-hover:text-[#476D07] transition-colors duration-400">
                                        {post.title}
                                    </h3>
                                    <p className="text-black/45 text-lg font-medium mb-10 line-clamp-2 leading-relaxed h-[3.5rem]">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-black/5 group-hover:border-black/10 transition-colors">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-black/25 uppercase tracking-[0.2em]">{post.date}</span>
                                            <span className="text-[10px] font-bold text-black opacity-40 mt-1">{post.readTime}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Visual Anchor */}
                <div className="mt-40 h-[1px] bg-gradient-to-r from-black/5 via-black/10 to-black/5"></div>
            </div>
        </motion.section>
    );
};

// ─── Newsletter ───────────────────────────────────────────────────────────────

const Newsletter = () => (
    <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-white py-48 px-6 md:px-12 text-black font-sans relative overflow-hidden"
    >
        {/* Background Accent */}
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-[#AFFF00]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto text-center flex flex-col items-center relative z-10">
            <p className="text-[12px] font-black tracking-[0.6em] text-[#476D07] uppercase mb-10">Connections</p>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-16 max-w-5xl">
                Knowledge <br /><span className="text-black/5">Unlocked.</span>
            </h2>
            <p className="text-2xl text-black/40 font-medium max-w-2xl leading-relaxed mb-20 px-4">
                Join 5,000+ brand builders getting our monthly digest on design, culture, and the future of branding.
            </p>

            <form className="w-full max-w-3xl flex flex-col md:flex-row gap-4 p-2 bg-[#F6F6F6] rounded-full border border-black/5">
                <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-grow bg-transparent border-none rounded-full px-10 py-6 text-xl font-bold placeholder:text-black/15 focus:ring-0 outline-none transition-all"
                />
                <button className="bg-black text-white px-14 py-6 rounded-full font-black text-xl hover:bg-[#AFFF00] hover:text-black transition-all duration-500 shadow-2xl flex items-center justify-center gap-4">
                    Subscribe
                </button>
            </form>
            <div className="mt-12 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#AFFF00]"></div>
                <p className="text-black/20 text-xs font-black uppercase tracking-[0.3em]">No Spam. Pure Perspectives.</p>
            </div>
        </div>
    </motion.section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Blog: React.FC = () => {
    return (
        <main className="w-full min-h-screen bg-[#050505] overflow-x-hidden">
            <Navbar />
            <BlogHero />
            <div className="relative z-10 bg-white mt-[-60px] md:mt-[-100px] overflow-hidden" 
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
