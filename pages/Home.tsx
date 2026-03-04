import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ServicesSection from '../components/ServicesSection';
import PrioritySection from '../components/PrioritySection';
import WhyDrixSection from '../components/WhyDrixSection';
import QuoteSection from '../components/QuoteSection';
import PartnersSection from '../components/PartnersSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';
import ProcessSection from '../components/ProcessSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import EyeSection from '../components/EyeSection';

const Home: React.FC = () => {
    const { scrollY, scrollYProgress } = useScroll();

    // Maintain full scale and position, only apply a subtle opacity fade for depth
    // Increased range to 1500px and deepened final opacity to 0.1 for maximum cinematic control
    const heroOpacity = useTransform(scrollY, [0, 1500], [1, 0.1]);

    // Add a very slow upward parallax drift to the hero
    // As we scroll 1500px, the hero only moves 250px, creating a sophisticated depth effect
    const heroY = useTransform(scrollY, [0, 1500], [0, -250]);

    // Footer Reveal Animations (Converse of Hero)
    // We use the last 15% of the page scroll to reveal the footer
    const footerOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
    const footerY = useTransform(scrollYProgress, [0.85, 1], [150, 0]);

    return (
        <main className="w-full min-h-screen bg-black">
            {/* Sticky Hero Container - Keep it fixed behind while next section slides over */}
            <div className="sticky top-0 h-screen overflow-hidden">
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

            {/*
        Wrapper for all subsequent content.
        bg-white: Acts as a base layer for the main content sections.
        Individual sections with different backgrounds (like ServicesSection) will layer on top of this.
      */}
            <div className="relative z-10 bg-white mb-0">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <TrustBar />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <PrioritySection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <WhyDrixSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ServicesSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <QuoteSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <PricingSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ProcessSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1.5 }}
                >
                    <TestimonialsSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <FAQSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 bg-white"
                >
                    <EyeSection />
                </motion.div>
            </div>

            {/* Spacer to show the hidden footer - Now OUTSIDE the white container */}
            <div className="h-[600px] pointer-events-none" />

            {/* Sticky Footer Container - Converse of Hero - Now FIXED at bottom */}
            <div className="fixed bottom-0 left-0 w-full h-[600px] overflow-hidden z-0 pointer-events-none group-hover:pointer-events-auto">
                <motion.div
                    style={{
                        opacity: footerOpacity,
                        y: footerY
                    }}
                    className="w-full h-full pointer-events-auto"
                >
                    <Footer />
                </motion.div>
            </div>
        </main>
    );
};

export default Home;
