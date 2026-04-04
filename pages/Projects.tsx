import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SharedHeroLayout, letterVariants } from '../components/SharedHero';

// ─── Data ────────────────────────────────────────────────────────────────────

interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    aspect?: 'portrait' | 'landscape' | 'square';
}

const projects: Project[] = [
    {
        id: 'radiant-skincare',
        title: 'Radiant Skincare',
        category: 'Branding',
        image: '/projects/brand-campaign.png',
        aspect: 'landscape',
    },
    {
        id: 'nexus-platform',
        title: 'Nexus Platform',
        category: 'Web Design',
        image: '/projects/web-design.png',
        aspect: 'portrait',
    },
    {
        id: 'vero-campaign',
        title: 'Vero Campaign',
        category: 'Creative Production',
        image: '/projects/film-production.png',
        aspect: 'landscape',
    },
    {
        id: 'bloom-social',
        title: 'Bloom Social',
        category: 'Content Strategy',
        image: '/projects/social-media.png',
        aspect: 'square',
    },
    {
        id: 'noir-collection',
        title: 'Noir Collection',
        category: 'Branding',
        image: '/projects/packaging-design.png',
        aspect: 'portrait',
    },
    {
        id: 'pulse-motion',
        title: 'Pulse Motion',
        category: 'Creative Production',
        image: '/projects/motion-graphics.png',
        aspect: 'landscape',
    },
];

const categories = ['All', 'Branding', 'Web Design', 'Creative Production', 'Content Strategy'];

// ─── Hero ────────────────────────────────────────────────────────────────────

const ProjectsHero = () => (
    <SharedHeroLayout 
        bottomLabel="The Work"
        buttonText="VIEW ALL PROJECTS"
        buttonHref="#projects-gallery"
        titleLines={
            <>
                <div className="flex flex-wrap items-center overflow-visible pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
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
                <div className="flex flex-wrap items-center overflow-visible mt-1 md:mt-2 pb-2 md:pb-4 gap-x-[1vw] md:gap-x-4">
                    <span className="flex text-[#AFFF00]">
                        {"That Speaks Volumes.".split('').map((char, index) => (
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
    />
);

// ─── Category Filter Tabs ────────────────────────────────────────────────────

const CategoryTabs = ({ active, onChange }: { active: string; onChange: (cat: string) => void }) => (
    <div className="flex flex-wrap justify-center gap-2 md:gap-1">
        {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => onChange(cat)}
                className={`relative px-5 md:px-7 py-2.5 md:py-3 text-[11px] poppins-semibold tracking-[0.12em] uppercase transition-all duration-500 rounded-full border
                    ${active === cat 
                        ? 'bg-[#050505] text-white border-[#050505]' 
                        : 'bg-transparent text-black/40 border-black/[0.08] hover:text-black hover:border-black/20'
                    }`}
            >
                {cat}
            </button>
        ))}
    </div>
);

// ─── Project Image Card ──────────────────────────────────────────────────────

const ProjectImageCard = ({ project, index }: { key?: string; project: Project; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    const aspectClass = project.aspect === 'portrait' 
        ? 'aspect-[3/4]' 
        : project.aspect === 'square' 
            ? 'aspect-square' 
            : 'aspect-[4/3]';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group cursor-pointer"
        >
            <Link to={`/projects/${project.id}`}>
                <div className={`relative w-full ${aspectClass} overflow-hidden rounded-xl md:rounded-2xl bg-[#F2F2F2] shadow-[0_4px_20px_rgba(0,0,0,0.04)] group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] transition-shadow duration-700`}>
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        loading="lazy"
                    />
                    <motion.div 
                        className="absolute top-4 right-4 z-20"
                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="w-10 h-10 rounded-full bg-[#AFFF00] flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17l9.2-9.2M17 17V7H7"/>
                            </svg>
                        </div>
                    </motion.div>
                </div>

                <div className="flex items-start justify-between gap-3 mt-4 md:mt-5 px-1">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-[1rem] md:text-[1.15rem] mona-sans-condensed-medium text-[#050505] leading-snug tracking-tight group-hover:text-[#476D07] transition-colors duration-400">
                            {project.title}
                        </h3>
                        <span className="text-[11px] poppins-regular text-black/30 tracking-wide">
                            {project.category}
                        </span>
                    </div>
                    <svg className="w-4 h-4 text-black/15 group-hover:text-[#476D07] group-hover:rotate-45 transition-all duration-500 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17l9.2-9.2M17 17V7H7"/>
                    </svg>
                </div>
            </Link>
        </motion.div>
    );
};

// ─── Main Gallery Section ────────────────────────────────────────────────────

const ProjectsGallery = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    
    const filteredProjects = activeCategory === 'All' 
        ? projects 
        : projects.filter(p => p.category === activeCategory);

    const col1 = filteredProjects.filter((_, i) => i % 2 === 0);
    const col2 = filteredProjects.filter((_, i) => i % 2 === 1);

    return (
        <section id="projects-gallery" className="w-full bg-white pt-16 pb-20 md:py-40 px-6 md:px-12 selection:bg-[#AFFF00] selection:text-black">
            <div className="w-full max-w-[1400px] mx-auto">

                <div className="w-full flex items-end justify-between border-b border-black/[0.07] pb-8 md:pb-10 mb-10 md:mb-14">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#476D07] uppercase poppins-regular">Portfolio</span>
                        <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] tracking-tight text-[#050505] leading-none mona-sans-condensed-medium font-normal">
                            Our Projects
                        </h2>
                    </div>
                    <p className="hidden md:block text-sm text-black/35 max-w-[220px] leading-relaxed poppins-regular text-right">
                        A curated selection of our finest work across disciplines.
                    </p>
                </div>

                <div className="mb-12 md:mb-16">
                    <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
                </div>

                <div className="flex gap-6 md:gap-8 lg:gap-10">
                    <div className="flex-1 flex flex-col gap-8 md:gap-10">
                        {col1.map((project, i) => (
                            <ProjectImageCard key={project.id} project={project} index={i * 2} />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col gap-8 md:gap-10 pt-16 md:pt-24">
                        {col2.map((project, i) => (
                            <ProjectImageCard key={project.id} project={project} index={i * 2 + 1} />
                        ))}
                    </div>
                </div>

                {filteredProjects.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <span className="text-black/[0.06] text-[5rem] mona-sans-condensed-bold leading-none mb-4">∅</span>
                        <p className="text-black/30 text-[14px] poppins-regular">No projects found in this category yet.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

// ─── Scrolling Image Strips ──────────────────────────────────────────────────

const ScrollingShowcase = () => {
    const row1 = [...projects, ...projects, ...projects];
    const row2 = [...projects.slice().reverse(), ...projects.slice().reverse(), ...projects.slice().reverse()];

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
                                src={project.image} 
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
                                src={project.image} 
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
    <section className="w-full bg-[#080808] px-6 md:px-10 pt-16 md:pt-24 pb-10 selection:bg-black selection:text-[#AFFF00]">
        <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.19,1,0.22,1] }}
            className="w-full bg-[#AFFF00] relative overflow-hidden flex flex-col items-start px-8 md:px-20 py-14 md:py-20"
            style={{ clipPath: "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)" }}
        >
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-black/50 uppercase poppins-regular">Start a Project</span>
                        <h2 className="text-[3rem] md:text-[5rem] lg:text-[6rem] tracking-tight text-black leading-none mona-sans-condensed-medium font-normal">
                            Have a Vision?<br />
                            <span className="text-black/30">Let's Make It Real.</span>
                        </h2>
                        <p className="text-black/60 text-[15px] md:text-[16px] max-w-lg leading-relaxed poppins-regular">
                            Tell us about your next project and let's create work that stands out.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 shrink-0">
                        <Link
                            to="/contact"
                            className="group flex items-center gap-4 bg-black text-white px-8 py-5 text-[13px] tracking-[0.18em] uppercase poppins-regular font-bold transition-all duration-400 hover:bg-[#050505] hover:gap-6"
                            style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)" }}
                        >
                            Start a Conversation
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                        </Link>
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

const Projects: React.FC = () => {
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
                    <ProjectsHero />
                </motion.div>
            </div>

            <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)] mt-[-60px] md:mt-[-100px]" 
                 style={{ clipPath: "polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)" }}>
                <ProjectsGallery />
                <ScrollingShowcase />
                <ProjectsCTA />
                <Footer />
            </div>
        </main>
    );
};

export default Projects;
