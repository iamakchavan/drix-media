import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectsData } from '../data/projectsData';

// ─── Animation & Style Constants ─────────────────────────────────────────────

const smoothEase = [0.16, 1, 0.3, 1];

// The "Page Fold" Clip Paths from Drix Design System
const pageFoldClip = "polygon(0% 0%, 100% 0%, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0% 100%)";
const pageFoldClipSmall = "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%)";
const sectionFoldClip = "polygon(0% 0%, calc(100% - 60px) 0%, 100% 60px, 100% 100%, 60px 100%, 0% calc(100% - 60px))";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: { 
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 1.2, ease: smoothEase } 
    }
};

const SectionHeader = ({ label, light = false }: { label: string; light?: boolean }) => (
    <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8 md:mb-12 overflow-hidden">
        <div className="w-2.5 h-2.5 rounded-none bg-[#AFFF00]"></div>
        <span className={`text-[11px] md:text-xs font-bold tracking-[0.25em] uppercase poppins-medium ${light ? 'text-white/60' : 'text-black/60'}`}>{label}</span>
    </motion.div>
);

// ─── Page Component ──────────────────────────────────────────────────────────

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = projectsData.find(p => p.id === id);

    useEffect(() => {
        if (!project) {
            navigate('/projects');
        }
        window.scrollTo(0, 0);
    }, [project, navigate]);

    const { scrollY } = useScroll();
    
    // Hero movement & Fade matching Home.tsx
    const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);
    const heroY = useTransform(scrollY, [0, 800], [0, -150]);
    const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);

    if (!project) return null;

    return (
        <main className="w-full min-h-screen bg-black selection:bg-[#AFFF00] selection:text-black poppins-regular overflow-x-hidden">
            <Navbar />

            {/* ── Fixed Back Button with Page Fold ── */}
            <Link 
                to="/projects" 
                className="fixed top-24 left-6 md:left-12 z-[100] group flex items-center gap-4 bg-black/80 backdrop-blur-xl px-8 py-4 text-white hover:text-[#AFFF00] transition-all duration-500 shadow-2xl"
                style={{ clipPath: pageFoldClipSmall }}
            >
                <svg className="w-4 h-4 text-[#AFFF00] group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span className="text-[10px] md:text-xs poppins-bold uppercase tracking-[0.3em]">Back</span>
            </Link>

            {/* ─── Sticky Hero Section ─── */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-[#050505]">
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
                    className="w-full h-full relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                    <img 
                        src={project.heroImage} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
                    />
                    
                    <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.4, ease: smoothEase, delay: 0.4 }}
                            className="flex flex-col gap-4 md:gap-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-[#AFFF00]/50" />
                                <span className="text-[#AFFF00] text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase poppins-medium">
                                    {project.category}
                                </span>
                            </div>
                            <h1 className="text-[14vw] md:text-[10vw] lg:text-[9vw] mona-sans-condensed-bold text-white leading-[0.8] tracking-[-0.05em] uppercase">
                                {project.title}
                            </h1>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* ─── Main Content Wrapper ─── */}
            <div className="relative z-20 bg-white"
                 style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 120px), calc(100% - 120px) 100%, 0 100%)" }}>
                
                {/* ── Strategy Section — REDESIGNED FOR HIGH CONTRAST ── */}
                <section className="w-full pt-32 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="flex flex-col gap-40 md:gap-60">
                            
                            {/* Headline & Quote */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start">
                                <div className="lg:col-span-8">
                                    <SectionHeader label="Strategic Insight" />
                                    <motion.h2 
                                        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}
                                        className="text-4xl md:text-5xl lg:text-7xl mona-sans-condensed-bold leading-[0.9] tracking-tight text-black uppercase"
                                    >
                                        {project.description}
                                    </motion.h2>
                                </div>
                                <div className="lg:col-span-4 lg:pt-16">
                                    <motion.p 
                                        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}
                                        className="text-xl md:text-2xl mona-sans-medium leading-[1.4] text-black pr-4 italic border-l-4 border-[#AFFF00] pl-10"
                                    >
                                        "{project.problem}"
                                    </motion.p>
                                </div>
                            </div>

                            {/* Main Strategic Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-start">
                                {/* Problem Cards - DARK CONTRAST VERSION */}
                                <div className="lg:col-span-7">
                                    <SectionHeader label="Core Challenges" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                                        {project.brandProblems.map((bp, i) => (
                                            <motion.div 
                                                key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}
                                                style={{ clipPath: pageFoldClip }}
                                                className="relative flex flex-col min-h-[380px] p-10 md:p-14 bg-[#0A0A0A] hover:bg-[#AFFF00] transition-all duration-700 ease-[0.16, 1, 0.3, 1] group"
                                            >
                                                <div className="flex items-center gap-3 mb-10">
                                                    <span className="text-[#AFFF00] group-hover:text-black font-bold transition-colors duration-500">{'{'}</span>
                                                    <span className="text-[10px] md:text-[11px] poppins-bold text-white/30 group-hover:text-black font-semibold tracking-[0.4em] uppercase transition-colors duration-500">0{i+1}</span>
                                                    <span className="text-[#AFFF00] group-hover:text-black font-bold transition-colors duration-500">{'}'}</span>
                                                </div>
                                                <p className="text-xl md:text-2xl lg:text-[1.75rem] mona-sans-medium text-white group-hover:text-black leading-[1.25] transition-colors duration-500 tracking-tight">
                                                    {bp}
                                                </p>
                                                <div className="mt-auto w-12 h-12 flex items-center justify-center bg-white/5 rounded-full group-hover:bg-black transition-colors duration-500">
                                                    <svg className="w-5 h-5 text-white/20 group-hover:text-[#AFFF00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <path d="M7 17l9.2-9.2M17 17V7H7"/>
                                                    </svg>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Deliverables - HIGH CONTRAST LIST VERSION */}
                                <div className="lg:col-span-5 flex flex-col">
                                    <SectionHeader label="Execution Strategy" />
                                    <div className="bg-[#FAFAFA] md:p-16 p-8 relative overflow-hidden" 
                                         style={{ clipPath: pageFoldClipSmall }}>
                                        <h3 className="text-4xl mona-sans-condensed-bold mb-14 uppercase tracking-tighter text-black">Deliverables.</h3>
                                        <div className="flex flex-col gap-8">
                                            {project.whatWeDid.map((item, i) => (
                                                <motion.div 
                                                    key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}
                                                    className="group flex flex-col"
                                                >
                                                    <div className="flex items-center justify-between group-hover:translate-x-3 transition-transform duration-500">
                                                        <span className="text-xl md:text-2xl font-semibold tracking-tight text-black group-hover:text-[#AFFF00] transition-colors">{item}</span>
                                                        <span className="text-[10px] poppins-bold text-black/10 group-hover:text-black transition-colors uppercase tracking-[0.3em]">0{i+1}</span>
                                                    </div>
                                                    <div className="w-full h-[1px] bg-black/5 mt-4 group-hover:bg-[#AFFF00]/30 transition-colors" />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="mt-20">
                                            <Link to="/contact" className="inline-flex items-center gap-8 group">
                                                <div className="w-16 h-16 bg-black flex items-center justify-center transition-all duration-500 group-hover:bg-[#AFFF00] group-hover:scale-110" style={{ clipPath: pageFoldClipSmall }}>
                                                    <svg className="w-6 h-6 text-[#AFFF00] group-hover:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <path d="M7 17l9.2-9.2M17 17V7H7"/>
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] poppins-bold uppercase tracking-[0.4em] text-black transition-colors">Start your project</span>
                                                    <div className="w-full h-[2px] bg-black/10 group-hover:bg-[#AFFF00] transition-all" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Visual Exploration Section with Folded Section Base ── */}
                <section className="w-full px-6 md:px-12 lg:px-20 bg-[#f7f7f7]">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="flex flex-col gap-32 md:gap-60">
                            
                            {/* Visual DNA - Folded Black Section */}
                            {project.designAssets && (
                                <div className="w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] lg:w-[calc(100%+10rem)] -ml-6 md:-ml-12 lg:-ml-20 bg-[#050505] py-32 md:py-48 px-6 md:px-12 lg:px-20 text-white relative"
                                     style={{ clipPath: sectionFoldClip }}>
                                     
                                     <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#AFFF00]/5 blur-[120px] rounded-full pointer-events-none" />
                                     
                                     <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-start relative z-10">
                                        {/* Colors */}
                                        <div className="flex flex-col gap-12">
                                            <SectionHeader label="Visual Identity" light={true} />
                                            <div className="flex flex-col">
                                                {project.designAssets.colorPalette.map((color, i) => (
                                                    <motion.div 
                                                        key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}
                                                        className="group py-8 border-b border-white/5 flex items-center justify-between hover:bg-white/[0.02] hover:px-6 transition-all duration-500"
                                                    >
                                                        <div className="flex items-center gap-8">
                                                            <div className="w-14 h-14" style={{ backgroundColor: color.hex, clipPath: pageFoldClipSmall }} />
                                                            <div className="flex flex-col">
                                                                <span className="text-xl md:text-2xl mona-sans-condensed-bold uppercase tracking-tight">{color.name}</span>
                                                                <span className="text-[10px] uppercase tracking-widest text-[#AFFF00] opacity-60">Accent 0{i+1}</span>
                                                            </div>
                                                        </div>
                                                        <span className="text-base md:text-xl font-mono text-white/20 group-hover:text-white transition-colors uppercase">{color.hex}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Type */}
                                        <div className="flex flex-col">
                                            <SectionHeader label="Typography" light={true} />
                                            <div className="flex flex-col gap-24">
                                                {project.designAssets.typography.map((type, i) => (
                                                    <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col">
                                                        <div className="flex items-center gap-4 mb-8">
                                                            <div className="w-1.5 h-1.5 bg-[#AFFF00]" />
                                                            <span className="text-[9px] poppins-bold text-white/40 uppercase tracking-widest">{type.usage}</span>
                                                            <div className="flex-grow h-[1px] bg-white/5" />
                                                        </div>
                                                        <h4 className="text-[10vw] md:text-[6.5vw] mona-sans-condensed-bold leading-[0.85] tracking-tight text-white" style={{ fontFamily: type.font }}>{type.name}</h4>
                                                        <p className="text-white/10 text-[9px] md:text-[10px] mt-8 poppins-medium tracking-[0.6em] uppercase">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                     </div>
                                </div>
                            )}

                            {/* Project Execution - STAGGERED & SMALLER MOCKUPS */}
                            {project.designAssets && (
                                <div className="flex flex-col gap-16">
                                    <SectionHeader label="Project Execution" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-32 md:gap-x-12 lg:gap-x-24">
                                        {project.designAssets.mockups.map((img, i) => (
                                            <motion.div 
                                                key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}
                                                className={`w-full relative shadow-3xl group overflow-hidden ${i % 2 !== 0 ? 'md:mt-48' : ''}`}
                                                style={{ clipPath: pageFoldClipSmall }}
                                            >
                                                <div className="aspect-[3/4] bg-white">
                                                    <img src={img} alt="Execution Asset" className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110" />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── MARKETING CATEGORY BLOCKS with Folded Grid ── */}
                {project.marketingAssets && (
                    <section className="w-full bg-[#050505] pt-32 pb-48 px-6 md:px-12 lg:px-20 text-white relative">
                        <div className="max-w-[1600px] mx-auto">
                            <div className="flex flex-col gap-40 md:gap-60">
                                {/* Stats Massive Numbers with Folded Card Theme */}
                                <div className="flex flex-col gap-24">
                                    <SectionHeader label="Impact & Data" light={true} />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {project.marketingAssets.stats.map((stat, i) => (
                                            <motion.div 
                                                key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}
                                                style={{ clipPath: pageFoldClip }}
                                                className="bg-[#0A0A0A] p-12 md:p-16 flex flex-col justify-between aspect-square group hover:bg-[#AFFF00] transition-all duration-700"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[#AFFF00] font-bold group-hover:text-black transition-colors">{'{'}</span>
                                                    <span className="text-[10px] poppins-bold uppercase tracking-[0.25em] text-white/40 group-hover:text-black transition-colors">{stat.label}</span>
                                                    <span className="text-[#AFFF00] font-bold group-hover:text-black transition-colors">{'}'}</span>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                   <span className="text-7xl md:text-8xl lg:text-9xl mona-sans-condensed-bold tracking-tight text-white group-hover:text-black transition-colors leading-none">{stat.value}</span>
                                                   {stat.trend && <span className="text-[10px] poppins-bold uppercase tracking-widest text-[#AFFF00] group-hover:text-black transition-colors">{stat.trend} Growth</span>}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Creative Gallery Masonry */}
                                <div className="flex flex-col gap-24">
                                    <SectionHeader label="Creative Output" light={true} />
                                    <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                                        {project.marketingAssets.collaterals.map((img, i) => (
                                            <motion.div 
                                                key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}
                                                className="break-inside-avoid relative group overflow-hidden"
                                                style={{ clipPath: pageFoldClipSmall }}
                                            >
                                                <img src={img} alt="Marketing Asset" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1.5s group-hover:scale-110" />
                                                <div className="absolute top-6 left-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                    <span className="text-[#AFFF00] font-bold">{'{'}</span>
                                                    <span className="text-[10px] poppins-bold uppercase tracking-widest text-white">Asset 0{i+1}</span>
                                                    <span className="text-[#AFFF00] font-bold">{'}'}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Conclusion Section ── */}
                <section className="w-full py-40 md:py-60 px-6 md:px-12 lg:px-20 text-center bg-white relative">
                    <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
                        <SectionHeader label="The Vision" />
                        <h2 className="text-3xl md:text-5xl lg:text-6xl mona-sans-condensed-bold tracking-tight uppercase text-black leading-[1.1] italic">"Transforming vision into tangible results, one pixel at a time."</h2>
                        <Link to="/contact" className="mt-8 flex flex-col items-center gap-8 group">
                             <div className="w-20 h-20 bg-black flex items-center justify-center transition-all duration-500 group-hover:bg-[#AFFF00] group-hover:scale-110" 
                                  style={{ clipPath: pageFoldClipSmall }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                                </svg>
                             </div>
                             <span className="text-[10px] poppins-bold uppercase tracking-[0.4em] text-black/40 group-hover:text-black transition-colors">Start your project</span>
                        </Link>
                    </div>
                </section>

                {/* ── Next Project Reveal (The Ending) ── */}
                <section className="relative w-full h-[80vh] bg-[#050505] flex flex-col items-center justify-center overflow-hidden z-20 group cursor-pointer"
                         onClick={() => navigate(`/projects/${projectsData[(projectsData.indexOf(project) + 1) % projectsData.length].id}`)}>
                    <div className="absolute inset-0 opacity-5 flex items-center justify-center">
                        <span className="text-[25vw] mona-sans-condensed-bold text-white tracking-tighter leading-none select-none uppercase">Next Story</span>
                    </div>
                    <div className="relative z-30 flex flex-col items-center gap-4">
                         <SectionHeader label="Continue" light={true} />
                         <h2 className="text-4xl md:text-6xl lg:text-8xl mona-sans-condensed-bold text-white group-hover:text-[#AFFF00] transition-all duration-700 uppercase tracking-tighter text-center">
                            {projectsData[(projectsData.indexOf(project) + 1) % projectsData.length].title}
                         </h2>
                         <div className="mt-12 w-16 h-16 border border-white/20 flex items-center justify-center group-hover:bg-[#AFFF00] group-hover:border-[#AFFF00] transition-all duration-500" style={{ clipPath: pageFoldClipSmall }}>
                             <svg className="w-6 h-6 text-white group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                 <path d="M7 17l9.2-9.2M17 17V7H7"/>
                             </svg>
                         </div>
                    </div>
                </section>

                {/* ── Footer ── */}
                <div className="relative z-30 bg-[#050505] border-t border-white/5">
                    <Footer />
                </div>
            </div>
        </main>
    );
};

export default ProjectDetail;
