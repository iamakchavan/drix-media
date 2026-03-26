import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, animate, Variants } from 'framer-motion';

// --- Animated Counter Component ---
const Counter = ({ value, suffix = "", decimals = 0 }: { value: number, suffix?: string, decimals?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(motionValue, value, {
                duration: 2.5,
                ease: [0.16, 1, 0.3, 1], // Apple-style soft ease-out
            });
            return controls.stop;
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return motionValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toFixed(decimals) + suffix;
            }
        });
    }, [motionValue, decimals, suffix]);

    return <span ref={ref} />;
};

// --- Animation Variants ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Stagger effect for children
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1] // Apple-style ease-out
        }
    }
};

// Variant specifically for dividers to grow horizontally
const lineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0, opacity: 0 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

const StatsSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

    return (
        // Removed shadow- class for a cleaner look
        <section ref={sectionRef} className="relative z-10 w-full bg-white text-black py-24 px-6 md:px-12 border-b border-gray-100">
            <motion.div
                className="max-w-[1600px] mx-auto w-full flex flex-col"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >

                {/* Top Row: CTA and Headline */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-24 md:mb-32">
                    {/* Left: Let's talk link */}
                    <div className="mb-12 md:mb-0 md:w-1/4 overflow-hidden">
                        <motion.div variants={itemVariants}>
                            <a href="#" className="inline-flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity group text-gray-900">
                                <span className="text-[#FF4D00] transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300">
                                    {/* L-shaped Arrow Icon */}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4V13C4 16.866 7.13401 20 11 20H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                                        <path d="M16 16L20 20L16 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="bevel" />
                                    </svg>
                                </span>
                                Let’s talk
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Headline */}
                    <div className="md:w-3/4 flex justify-start md:justify-center">
                        <div className="overflow-hidden">
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.1] max-w-2xl text-left"
                            >
                                Our work speaks through numbers. Here’s what we’ve achieved so far.
                            </motion.h2>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                    {/* Stat 1 */}
                    <div className="flex flex-col group">
                        <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight mb-8 tabular-nums overflow-hidden pb-2">
                            <motion.div variants={itemVariants}>
                                <Counter value={17} suffix="+" />
                            </motion.div>
                        </div>
                        <motion.div variants={lineVariants} className="w-full h-px bg-gray-200 mb-6 group-hover:bg-gray-300 transition-colors" />
                        <div className="overflow-hidden">
                            <motion.h3 variants={itemVariants} className="text-lg md:text-xl font-bold mb-2 tracking-tight">Websites launched</motion.h3>
                        </div>
                        <div className="overflow-hidden">
                            <motion.p variants={itemVariants} className="text-gray-500 text-sm leading-relaxed font-medium">Helping brands make their mark online.</motion.p>
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex flex-col group">
                        <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight mb-8 tabular-nums overflow-hidden pb-2">
                            <motion.div variants={itemVariants}>
                                <Counter value={1.5} suffix="M+" decimals={1} />
                            </motion.div>
                        </div>
                        <motion.div variants={lineVariants} className="w-full h-px bg-gray-200 mb-6 group-hover:bg-gray-300 transition-colors" />
                        <div className="overflow-hidden">
                            <motion.h3 variants={itemVariants} className="text-lg md:text-xl font-bold mb-2 tracking-tight">Users reached</motion.h3>
                        </div>
                        <div className="overflow-hidden">
                            <motion.p variants={itemVariants} className="text-gray-500 text-sm leading-relaxed font-medium">Our designs engage millions globally.</motion.p>
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex flex-col group">
                        <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight mb-8 tabular-nums overflow-hidden pb-2">
                            <motion.div variants={itemVariants}>
                                <Counter value={98} suffix="%" />
                            </motion.div>
                        </div>
                        <motion.div variants={lineVariants} className="w-full h-px bg-gray-200 mb-6 group-hover:bg-gray-300 transition-colors" />
                        <div className="overflow-hidden">
                            <motion.h3 variants={itemVariants} className="text-lg md:text-xl font-bold mb-2 tracking-tight">Client satisfaction rate</motion.h3>
                        </div>
                        <div className="overflow-hidden">
                            <motion.p variants={itemVariants} className="text-gray-500 text-sm leading-relaxed font-medium">We build long-term partnerships through proven results.</motion.p>
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex flex-col group">
                        <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight mb-8 tabular-nums overflow-hidden pb-2">
                            <motion.div variants={itemVariants}>
                                <Counter value={10} suffix="+" />
                            </motion.div>
                        </div>
                        <motion.div variants={lineVariants} className="w-full h-px bg-gray-200 mb-6 group-hover:bg-gray-300 transition-colors" />
                        <div className="overflow-hidden">
                            <motion.h3 variants={itemVariants} className="text-lg md:text-xl font-bold mb-2 tracking-tight">Years of expertise</motion.h3>
                        </div>
                        <div className="overflow-hidden">
                            <motion.p variants={itemVariants} className="text-gray-500 text-sm leading-relaxed font-medium">Decades of experience in delivering impactful digital solutions.</motion.p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default StatsSection;