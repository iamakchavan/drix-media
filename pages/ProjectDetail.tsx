import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { Project } from '../types/project';

// ─── Animation & Style Constants ─────────────────────────────────────────────

const smoothEase = [0.16, 1, 0.3, 1];

const pageFoldClipSmall = "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%)";

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
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [otherProjects, setOtherProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error || !data) {
                    console.error("Project not found:", id, error);
                    navigate('/projects');
                    return;
                }

                setProject(data as Project);
                
                // Fetch other projects for the bottom section
                const { data: others } = await supabase
                    .from('projects')
                    .select('*')
                    .neq('id', id)
                    .limit(4);
                if (others) setOtherProjects(others as Project[]);
            } catch (err) {
                console.error("Error fetching project:", err);
                navigate('/projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    const { scrollY } = useScroll();
    
    // Hero movement & Fade matching Home.tsx
    const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);
    const heroY = useTransform(scrollY, [0, 800], [0, -150]);
    const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);

    if (loading) {
        return (
            <main className="w-full h-screen bg-black flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-2 border-white/5 border-t-[#AFFF00] rounded-full animate-spin" />
                <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold poppins-medium">Decrypting Case Study...</span>
            </main>
        );
    }

    if (!project) {
        return (
            <main className="w-full h-screen bg-black flex flex-col items-center justify-center gap-4">
                <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold poppins-medium">Project Not Found</span>
                <Link to="/projects" className="text-[#AFFF00] text-xs uppercase tracking-widest border-b border-[#AFFF00]/20 pb-1">Back to Gallery</Link>
            </main>
        );
    }

    const mockups = project.assets?.mockups || [];
    const sketches = project.assets?.sketches || [];
    const allImages = [...mockups, ...sketches].filter(Boolean);

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
                    {project.hero_image && (
                        <img 
                            src={project.hero_image} 
                            alt={project.title} 
                            className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
                        />
                    )}
                    
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
            <div className="relative z-20 bg-white">
                
                {/* ── Minimal Project Details ── */}
                <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-black/5">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">
                            <div className="md:col-span-4 flex flex-col gap-10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-black/40 uppercase tracking-[0.1em] font-medium poppins-medium block mb-2">(SERVICES)</span>
                                    <span className="text-sm md:text-[15px] text-black poppins-regular leading-snug">{project.services?.join(', ') || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-black/40 uppercase tracking-[0.1em] font-medium poppins-medium block mb-2">(INDUSTRY)</span>
                                    <span className="text-sm md:text-[15px] text-black poppins-regular leading-snug">{project.category}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-black/40 uppercase tracking-[0.1em] font-medium poppins-medium block mb-2">(YEAR)</span>
                                    <span className="text-sm md:text-[15px] text-black poppins-regular leading-snug">2024</span>
                                </div>
                            </div>

                            <div className="md:col-span-8 flex flex-col gap-12 pt-1">
                                <div className="flex flex-col gap-6">
                                    <span className="text-[10px] text-black/40 uppercase tracking-[0.1em] font-medium poppins-medium block">(INFORMATION)</span>
                                    <div className="text-[15px] md:text-base poppins-regular text-black/90 leading-[1.8] max-w-3xl">
                                        <p>{project.description}</p>
                                    </div>
                                </div>

                                {(project.problem || (project.brand_problems && project.brand_problems.length > 0)) && (
                                    <div className="flex flex-col gap-6 pt-4 border-t border-black/5">
                                        <span className="text-[10px] text-black/40 uppercase tracking-[0.1em] font-medium poppins-medium block">(THE CHALLENGE)</span>
                                        <div className="text-[15px] md:text-base poppins-regular text-black/90 leading-[1.8] max-w-3xl">
                                            {project.problem && <p className="mb-6 font-medium text-black">{project.problem}</p>}
                                            
                                            {project.brand_problems && project.brand_problems.length > 0 && (
                                                <div className="flex flex-col gap-4">
                                                    <p className="text-black/60 italic">
                                                        {project.challenge_title || "Objective included addressing fundamental challenges such as"}:
                                                    </p>
                                                    <ul className="flex flex-col gap-3">
                                                        {project.brand_problems.map((prob, i) => (
                                                            <li key={i} className="flex gap-4 items-start">
                                                                 <span className="w-1.5 h-1.5 bg-[#AFFF00] mt-2.5 shrink-0" />
                                                                <span className="text-black/80">{prob}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Extended Gallery (Dynamic Layout) ── */}
                {allImages.length > 0 && (
                    <section className="w-full bg-[#f9f9f9] py-1 md:py-2">
                        {project.gallery_layout === 'carousel' ? (
                            /* ── Horizontal Carousel Mode ── */
                            <div className="w-full py-16 md:py-24 overflow-hidden relative">
                                <div className="flex gap-4 md:gap-8 px-6 md:px-12 lg:px-20 overflow-x-auto no-scrollbar scroll-smooth">
                                    {allImages.map((img, i) => (
                                        <div key={i} className="shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw] aspect-[16/10] md:aspect-[16/9] bg-black/5 relative group overflow-hidden"
                                             style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)" }}>
                                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10" />
                                            <img 
                                                src={img} 
                                                alt={`${project.title} Detail ${i+1}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s] ease-[0.16,1,0.3,1]"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 px-6 md:px-12 lg:px-20 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <span className="text-[10px] text-black/20 uppercase tracking-widest font-bold poppins-medium">Scroll to explore</span>
                                        <div className="w-12 h-[1px] bg-black/10 mt-[7px]" />
                                    </div>
                                    <span className="text-[10px] text-black/10 poppins-bold uppercase tracking-[0.4em]">{allImages.length} Visuals</span>
                                </div>
                            </div>
                        ) : (
                            /* ── Bento Grid Mode ── */
                            <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2 auto-rows-[30vh] md:auto-rows-[45vh] grid-flow-dense">
                                {allImages.map((img, i) => {
                                    const mod = i % 5;
                                    let spanClass = "col-span-1 row-span-1";
                                    if (mod === 0) spanClass = "md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2";
                                    else if (mod === 1) spanClass = "md:col-span-1 lg:col-span-2 row-span-1";
                                    else if (mod === 4) spanClass = "md:col-span-1 lg:col-span-2 row-span-1";

                                    return (
                                        <div key={i} className={`relative w-full h-full overflow-hidden bg-black/5 group ${spanClass}`}>
                                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                                            <img 
                                                src={img} 
                                                alt={`${project.title} Execution ${i+1}`} 
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[0.16,1,0.3,1]"
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        <style dangerouslySetInnerHTML={{ __html: `
                            .no-scrollbar::-webkit-scrollbar { display: none; }
                            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                        ` }} />
                    </section>
                )}

                {/* ── More Projects Grid ── */}
                {otherProjects.length > 0 && (
                    <section className="w-full bg-[#050505] py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-20">
                        <div className="max-w-[1600px] mx-auto flex flex-col gap-12 md:gap-16">
                            <SectionHeader label="More Work" light={true} />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                                {otherProjects.map((p, i) => (
                                    <Link 
                                        key={i} 
                                        to={`/projects/${p.id}`}
                                        className="group relative flex flex-col w-full aspect-[3/4] overflow-hidden bg-[#111] border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-500"
                                        style={{ clipPath: pageFoldClipSmall }}
                                    >
                                        <div className="absolute inset-0 z-0">
                                            <img 
                                                src={p.thumbnail || p.hero_image} 
                                                alt={p.title} 
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-90 group-hover:scale-[1.04] transition-all duration-[1s] ease-[0.16,1,0.3,1]"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
                                        <div className="relative z-20 flex flex-col justify-end h-full p-5 md:p-6">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-[#AFFF00] text-[9px] font-bold tracking-[0.3em] uppercase poppins-medium">
                                                    {p.category}
                                                </span>
                                                <h3 className="text-[1.35rem] md:text-[1.5rem] text-white mona-sans-condensed-bold tracking-tight uppercase leading-[0.9]">
                                                    {p.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <div className="relative z-30 bg-[#050505] border-t border-white/5">
                    <Footer />
                </div>
            </div>
        </main>
    );
};

export default ProjectDetail;
