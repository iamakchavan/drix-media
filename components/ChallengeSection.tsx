import React from 'react';
import { motion } from 'framer-motion';

const ChallengeSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-24 px-6 md:px-12 font-sans overflow-hidden">
            <div className="max-w-[1240px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* LEFT: THE PROBLEM */}
                    <div className="lg:col-span-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[10px] font-black tracking-[0.4em] text-black/30 uppercase mb-8 block">The Challenge</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-[1] mb-8">
                                Most Brands Face <br />The Same Challenge.
                            </h2>
                            <p className="text-lg md:text-xl font-bold text-black/80 leading-snug mb-6">
                                Your product is solid. Your team is talented. <br />
                                <span className="text-[#AFFF00] bg-black px-2 py-0.5 inline-block">But something is missing.</span>
                            </p>
                            <p className="text-base text-black/40 leading-relaxed font-medium max-w-md">
                                Branding feels generic. Content is not connecting. Campaigns are not converting. Working with five agencies creates chaos.
                            </p>

                            <div className="mt-12 pt-10 border-t border-black/[0.05]">
                                <span className="text-[11px] font-black text-black uppercase mb-3 block">The Real Problem:</span>
                                <p className="text-2xl font-black text-black/30 leading-none italic">
                                    Disconnected services <br />
                                    <span className="text-black not-italic">create disconnected brands.</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: THE INTEGRATED SOLUTION (BLACK CARD WITH LIME ACCENTS) */}
                    <div className="lg:col-span-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-[#0A0A0A] rounded-[40px] p-10 md:p-14 shadow-2xl relative overflow-hidden group"
                        >
                            {/* Subtle Lime Glow in corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#AFFF00]/5 blur-[60px] pointer-events-none"></div>

                            <div className="mb-12">
                                <span className="text-[10px] font-black tracking-[0.3em] text-[#AFFF00] uppercase mb-10 block">Our Solution</span>
                                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none mb-8">
                                    Under <br />One Roof.
                                </h3>
                                <p className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight mt-6">
                                    Strategy, design, content, and execution working together as <span className="text-[#AFFF00] underline decoration-[#AFFF00]/20 underline-offset-8">one system</span>.
                                </p>
                            </div>

                            <div className="flex flex-col gap-8 pt-12 border-t border-white/10">
                                <p className="text-base md:text-lg font-bold text-white/50 leading-snug">
                                    Not separate departments. <br />
                                    One integrated team building <br />
                                    one <span className="text-white">unified brand.</span>
                                </p>

                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-[#AFFF00] flex items-center justify-center text-black shadow-[0_0_30px_rgba(175,255,0,0.2)] hover:scale-110 transition-transform cursor-pointer">
                                        <svg width="20" height="20" viewBox="0 0 256 256" fill="black"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-[#AFFF00] uppercase tracking-widest leading-none mb-1">Integrated Team</span>
                                        <span className="text-[11px] font-bold text-white uppercase tracking-widest leading-none">Get Started</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ChallengeSection;
