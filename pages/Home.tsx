import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ServicesSection from '../components/ServicesSection';
import ChallengeSection from '../components/ChallengeSection';
import WhyDrixSection from '../components/WhyDrixSection';
import QuoteSection from '../components/QuoteSection';
import PartnersSection from '../components/PartnersSection';
import Footer from '../components/Footer';
import ProcessSection from '../components/ProcessSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import EyeSection from '../components/EyeSection';

const Home: React.FC = () => {
    const { scrollY } = useScroll();

    // Hero movement & Fade
    const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);
    const heroY = useTransform(scrollY, [0, 800], [0, -150]);

    return (
        <main className="w-full min-h-screen bg-black">
            {/* Sticky Hero Section - Revealing effect */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
                <motion.div
                    style={{
                        opacity: heroOpacity,
                        y: heroY
                    }}
                    className="w-full h-full"
                >
                    <Hero />
                </motion.div>
            </div>

            {/* Main Content Wrapper - Slides over Hero */}
            <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,-0,-0,0.1)]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <TrustBar />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <ChallengeSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <WhyDrixSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <ServicesSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1 }}
                >
                    <QuoteSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <ProcessSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1 }}
                >
                    <TestimonialsSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <FAQSection />
                </motion.div>

                {/* EyeSection */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 bg-white"
                >
                    <EyeSection />
                </motion.div>

                {/* Footer Integrated into Flow */}
                <div className="relative z-10 bg-[#050505]">
                    <Footer />
                </div>
            </div>
        </main>
    );
};

export default Home;
