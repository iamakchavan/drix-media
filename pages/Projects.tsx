import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SharedHeroLayout, letterVariants } from '../components/SharedHero';
import { supabase } from '../lib/supabase';
import { Project } from '../types/project';


const categories = ['All', 'Branding', 'Web Design', 'Creative Production', 'Content Strategy'];

// ─── Hero ────────────────────────────────────────────────────────────────────

const ProjectsHero = () => (
    <SharedHeroLayout
        bottomLabel="Projects"
        buttonText="VIEW ALL PROJECTS"
        buttonHref="#projects-gallery"
        titleLines={
            <>
                <div className="flex flex-wrap items-center overflow-visible pb-1 md:pb-4 gap-x-[4vw] md:gap-x-4">
                    <span className="flex">
                        {"Selected".split('').map((char, index) => (
                            <motion.span key={`line1-a-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                    <span className="flex text-white/50 italic font-medium">
                        {"Work".split('').map((char, index) => (
                            <motion.span key={`line1-b-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
                <div className="flex flex-wrap items-center overflow-visible mt-0 md:mt-2 pb-1 md:pb-4 gap-x-[4vw] md:gap-x-4">
                    <span className="flex text-[#AFFF00]">
                        {"That Speaks for Itself.".split('').map((char, index) => (
                            <motion.span key={`line2-${index}`} variants={letterVariants} className="inline-block whitespace-pre">{char === ' ' ? '\u00A0' : char}</motion.span>
                        ))}
                    </span>
                </div>
            </>
        }
        subtextContent={
            <>
                <span className="text-white font-semibold block xl:whitespace-nowrap">Every project is a story of strategy, craft, and measurable results</span>
                <span className="block xl:whitespace-nowrap">that move brands forward — not just sideways.</span>
            </>
        }
    >
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
            <motion.span
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[22vw] md:text-[15vw] font-black text-white/[0.018] uppercase tracking-[-0.05em] translate-y-[-5%] mona-sans-condensed-bold"
            >
                PROJECTS
            </motion.span>
        </div>
    </SharedHeroLayout>
);


// ─── Category Filter Tabs ────────────────────────────────────────────────────

const CategoryTabs = ({ active, onChange }: { active: string; onChange: (cat: string) => void }) => (
    <div className="flex overflow-x-auto hide-scrollbar gap-2 flex-nowrap scroll-smooth w-full md:w-auto">
        {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => onChange(cat)}
                className={`relative shrink-0 p-[1px] transition-all duration-300 whitespace-nowrap
                    ${active === cat
                        ? 'bg-[#050505]'
                        : 'bg-black/[0.08] hover:bg-black/20'
                    }`}
                style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
            >
                <div
                    className={`px-5 py-3 text-[10px] md:text-[11px] poppins-semibold tracking-[0.12em] md:tracking-[0.15em] uppercase transition-all duration-300
                        ${active === cat
                            ? 'bg-[#050505] text-[#AFFF00]'
                            : 'bg-white text-black/40 hover:text-black hover:bg-white'
                        }`}
                    style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                >
                    {cat}
                </div>
            </button>
        ))}
    </div>
);

// ─── Project Image Card ──────────────────────────────────────────────────────

const ProjectImageCard = ({ project, index }: { key?: string; project: Project; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    const aspectClass = 'aspect-video';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group cursor-pointer w-full"
        >
            <Link to={`/projects/${project.id}`}>
                <div
                    className={`relative w-full ${aspectClass} overflow-hidden bg-[#F2F2F2] transition-all duration-700`}
                    style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)" }}
                >
                    <motion.img
                        src={project.thumbnail || project.hero_image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        loading="lazy"
                    />

                    {/* Corner Detail (Industrial Zen Signature) */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 backdrop-blur-md flex items-center justify-center"
                        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}>
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full translate-x-2 translate-y-[-8px]" />
                    </div>

                    <motion.div
                        className="absolute bottom-4 right-4 z-20"
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 border border-white/20 bg-black/10 backdrop-blur-md flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17l9.2-9.2M17 17V7H7" />
                            </svg>
                        </div>
                    </motion.div>
                </div>

                <div className="flex items-start justify-between gap-3 mt-4 md:mt-6 px-1">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-[0.95rem] md:text-[1.25rem] mona-sans-condensed-medium text-[#050505] leading-none tracking-tight group-hover:text-[#476D07] transition-colors duration-400">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-[1px] bg-black/10" />
                            <span className="text-[9px] md:text-[10px] poppins-regular text-black/40 tracking-[0.1em] uppercase">
                                {project.category}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

// ─── Main Gallery Section ────────────────────────────────────────────────────

const ProjectsGallery = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('order_index', { ascending: true });

            if (data) setProjects(data);
            setLoading(false);
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
        const matchesSearch = searchQuery === '' ||
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.services && project.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesCategory && matchesSearch;
    });

    return (
        <section id="projects-gallery" className="w-full bg-white pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
            <div className="w-full max-w-[1400px] mx-auto">

                <div className="w-full flex flex-col gap-6 border-b border-black/[0.07] pb-8 mb-10 md:mb-16">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Portfolio Index</span>
                        <h2 className="text-[2.2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                            Our Projects
                        </h2>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-2">
                        {/* Categories */}
                        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

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
                                    placeholder="SEARCH PROJECTS..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-10 py-3 bg-white focus:bg-white outline-none text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em] md:tracking-[0.15em] poppins-semibold text-black placeholder:text-black/35 transition-all duration-300"
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

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-12 h-12 border-2 border-black/5 border-t-black rounded-full animate-spin" />
                        <span className="text-[10px] font-bold tracking-[0.4em] text-black/20 uppercase">Indexing...</span>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <span className="text-black/[0.04] text-[6rem] mona-sans-condensed-bold leading-none mb-4 tracking-tighter">NULL</span>
                        <p className="text-black/30 text-[12px] md:text-[14px] poppins-regular uppercase tracking-widest">
                            {searchQuery ? "No entries found matching your search" : "No entries found in index"}
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                        {filteredProjects.map((project, i) => (
                            <ProjectImageCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

// ─── Scrolling Image Strips ──────────────────────────────────────────────────

const ScrollingShowcase = ({ projects }: { projects: Project[] }) => {
    const row1 = projects.length > 0 ? [...projects, ...projects, ...projects] : [];
    const row2 = projects.length > 0 ? [...projects.slice().reverse(), ...projects.slice().reverse(), ...projects.slice().reverse()] : [];

    if (projects.length === 0) return null;

    return (
        <section className="w-full bg-[#FAFAFA] selection:bg-[#AFFF00] selection:text-black overflow-hidden pt-16 pb-10 md:pt-28 md:pb-16">

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-10 md:mb-14">
                <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Highlights</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                            Featured Showcase
                        </h2>
                    </div>
                    <p className="hidden md:block text-sm text-black/35 max-w-[220px] leading-relaxed poppins-regular text-right">
                        A quick look at some of our standout work.
                    </p>
                </div>
            </div>

            <div className="relative w-full overflow-hidden mb-4 md:mb-5">
                <motion.div
                    className="flex gap-4 md:gap-5"
                    animate={{ x: ['0%', '-33.33%'] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                    {row1.map((project, i) => (
                        <div
                            key={`row1-${i}`}
                            className="shrink-0 w-[260px] md:w-[360px] lg:w-[420px] aspect-[16/10] rounded-lg md:rounded-xl overflow-hidden bg-[#E8E8E8] group cursor-pointer relative"
                        >
                            <img
                                src={project.thumbnail || project.hero_image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4 md:p-5">
                                <div className="flex items-end justify-between w-full">
                                    <span className="text-white text-[13px] mona-sans-condensed-medium tracking-tight">{project.title}</span>
                                    <span className="text-[9px] poppins-bold tracking-[0.15em] text-[#AFFF00] uppercase">{project.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="relative w-full overflow-hidden">
                <motion.div
                    className="flex gap-4 md:gap-5"
                    animate={{ x: ['-33.33%', '0%'] }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                >
                    {row2.map((project, i) => (
                        <div
                            key={`row2-${i}`}
                            className="shrink-0 w-[260px] md:w-[360px] lg:w-[420px] aspect-[16/10] rounded-lg md:rounded-xl overflow-hidden bg-[#E8E8E8] group cursor-pointer relative"
                        >
                            <img
                                src={project.thumbnail || project.hero_image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4 md:p-5">
                                <div className="flex items-end justify-between w-full">
                                    <span className="text-white text-[13px] mona-sans-condensed-medium tracking-tight">{project.title}</span>
                                    <span className="text-[9px] poppins-bold tracking-[0.15em] text-[#AFFF00] uppercase">{project.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// ─── CTA Section ─────────────────────────────────────────────────────────────

const ProjectsCTA = () => (
    <section className="w-full bg-[#080808] px-4 md:px-10 pt-16 md:pt-24 pb-10 selection:bg-black selection:text-[#AFFF00]">
        <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="w-full bg-[#AFFF00] relative overflow-hidden flex flex-col items-start px-7 md:px-20 py-12 md:py-20"
            style={{
                clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)",
                // Responsive clip-path would be better handled by a CSS variable, but for now we'll use a fixed value that works well for both
            }}
        >
            {/* Desktop variant for larger chamfer */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (min-width: 768px) {
                    .projects-cta-card { clip-path: polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%) !important; }
                }
            ` }} />

            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 md:gap-12">
                    <div className="flex flex-col gap-5 md:gap-6">
                        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.4em] text-black/50 uppercase poppins-regular">Start a Project</span>
                        <h2 className="text-[2.6rem] sm:text-[3rem] md:text-[5rem] lg:text-[6rem] tracking-tight text-black leading-[1.05] md:leading-none mona-sans-condensed-medium font-normal">
                            Have a Vision?<br />
                            <span className="text-black/30">Let's Make It Real.</span>
                        </h2>
                        <p className="text-black/60 text-[14px] md:text-[16px] max-w-lg leading-relaxed poppins-regular">
                            Tell us about your next project.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
                        <Link
                            to="/contact"
                            className="group flex items-center justify-between md:justify-start gap-6 bg-black text-white px-8 py-5 md:py-6 text-[12px] md:text-[13px] tracking-[0.15em] md:tracking-[0.18em] uppercase poppins-bold transition-all duration-400 hover:bg-[#050505]"
                            style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)" }}
                        >
                            <span className="shrink-0">Start a Conversation</span>
                            <svg className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                        </Link>
                        <a
                            href="mailto:hello@drixmedia.com"
                            className="text-black/50 hover:text-black transition-colors text-[11px] md:text-[12px] tracking-[0.12em] poppins-regular text-center md:text-left md:pl-2"
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

const Projects: React.FC = () => {
    const { scrollY } = useScroll();
    const [projects, setProjects] = useState<Project[]>([]);
    const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);
    const heroY = useTransform(scrollY, [0, 800], [0, -150]);

    React.useEffect(() => {
        const fetchProjects = async () => {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('order_index', { ascending: true });
            if (data) setProjects(data);
        };
        fetchProjects();
    }, []);

    return (
        <main className="w-full min-h-screen bg-[#050505] overflow-x-hidden">
            <Navbar />

            <div className="sticky top-0 h-[75vh] md:h-[80vh] lg:h-[85vh] w-full overflow-hidden z-0">
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="w-full h-full"
                >
                    <ProjectsHero />
                </motion.div>
            </div>

            <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)] mt-[-60px] md:mt-[-100px]"
                style={{ clipPath: "polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)" }}>
                <ProjectsGallery />
                <ScrollingShowcase projects={projects} />
                <ProjectsCTA />
                <Footer />
            </div>
        </main>
    );
};

export default Projects;
