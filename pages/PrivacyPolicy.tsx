import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const premiumEasing = [0.16, 1, 0.3, 1];

const LegalHero = ({ title, subtitle, lastUpdated }: { title: string; subtitle: string; lastUpdated: string }) => (
    <section className="relative w-full bg-[#050505] pt-[160px] md:pt-[200px] pb-16 md:pb-24 overflow-hidden">
        {/* Subtle aurora */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(175,255,0,0.08) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(9,75,40,0.2) 0%, transparent 65%)', filter: 'blur(100px)' }} />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: premiumEasing }}
                className="flex flex-col gap-6"
            >
                <div className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 bg-[#AFFF00]"></span>
                    <span className="text-[10px] poppins-bold tracking-[0.4em] uppercase text-[#AFFF00]">Legal</span>
                </div>
                <h1 className="text-[3rem] md:text-[5rem] lg:text-[6.5rem] mona-sans-condensed-bold text-white tracking-tighter leading-[0.9]">
                    {title}
                </h1>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-2">
                    <p className="text-white/40 text-sm md:text-base poppins-regular max-w-lg leading-relaxed">
                        {subtitle}
                    </p>
                    <span className="text-[10px] poppins-medium tracking-[0.2em] uppercase text-white/20 md:ml-auto shrink-0">
                        Last updated: {lastUpdated}
                    </span>
                </div>
            </motion.div>
        </div>
    </section>
);

interface SectionProps {
    number: string;
    title: string;
    children: React.ReactNode;
    delay?: number;
}

const Section: React.FC<SectionProps> = ({ number, title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay, ease: premiumEasing }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-14 border-t border-white/[0.06]"
    >
        {/* Left column — section header */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#AFFF00]/60">{number}</span>
            <h2 className="text-[1.3rem] md:text-[1.5rem] mona-sans-condensed-medium text-white tracking-tight leading-snug uppercase">
                {title}
            </h2>
        </div>
        {/* Right column — content */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-5 text-white/45 text-[14px] md:text-[15px] leading-[1.8] poppins-regular">
            {children}
        </div>
    </motion.div>
);

const PrivacyPolicy: React.FC = () => {
    return (
        <main className="w-full min-h-screen bg-[#050505] overflow-x-hidden">
            <Navbar />
            
            <LegalHero
                title="Privacy Policy"
                subtitle="Your privacy matters to us. This policy outlines how Drix Media collects, uses, and protects your personal information."
                lastUpdated="April 15, 2025"
            />

            <div className="w-full bg-[#050505] selection:bg-[#AFFF00] selection:text-black">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-32">

                    <Section number="01" title="Information We Collect">
                        <p>
                            We collect information you provide directly when you fill out forms on our website, subscribe to our newsletter, request a quote, or communicate with us via email or other channels. This may include your name, email address, phone number, company name, and project details.
                        </p>
                        <p>
                            We also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits. This data is collected through cookies and similar tracking technologies.
                        </p>
                    </Section>

                    <Section number="02" title="How We Use Your Information">
                        <p>We use the information we collect for the following purposes:</p>
                        <ul className="list-none flex flex-col gap-3 ml-0">
                            {[
                                "To provide, maintain, and improve our services",
                                "To communicate with you about projects, inquiries, and proposals",
                                "To send periodic newsletters and marketing communications (with your consent)",
                                "To analyze website usage and optimize user experience",
                                "To comply with legal obligations and protect our rights",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-1 h-1 bg-[#AFFF00] rounded-full mt-2.5 shrink-0"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section number="03" title="Information Sharing">
                        <p>
                            We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting business, or servicing you, so long as those parties agree to keep this information confidential.
                        </p>
                        <p>
                            We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
                        </p>
                    </Section>

                    <Section number="04" title="Cookies & Tracking">
                        <p>
                            Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how visitors interact with our site. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until they expire or you delete them).
                        </p>
                        <p>
                            You can choose to disable cookies through your browser settings. However, this may affect the functionality of certain features on our website. For more details, please see our <Link to="/cookies" className="text-[#AFFF00] hover:text-[#AFFF00]/70 transition-colors underline underline-offset-4 decoration-[#AFFF00]/30">Cookie Policy</Link>.
                        </p>
                    </Section>

                    <Section number="05" title="Data Security">
                        <p>
                            We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secured networks accessible only by a limited number of persons who have special access rights and are required to keep the information confidential.
                        </p>
                        <p>
                            All sensitive information is transmitted via Secure Socket Layer (SSL) technology and encrypted upon storage. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </Section>

                    <Section number="06" title="Your Rights">
                        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                        <ul className="list-none flex flex-col gap-3 ml-0">
                            {[
                                "Right to access — Request a copy of the personal data we hold about you",
                                "Right to rectification — Request correction of inaccurate or incomplete data",
                                "Right to erasure — Request deletion of your personal data under certain conditions",
                                "Right to restrict processing — Request limitation of how we use your data",
                                "Right to data portability — Request transfer of your data to another service",
                                "Right to object — Object to our processing of your personal data",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-1 h-1 bg-[#AFFF00] rounded-full mt-2.5 shrink-0"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section number="07" title="Third-Party Links">
                        <p>
                            Our website may contain links to third-party websites. These external sites are not operated by us, and we have no control over their content, privacy policies, or practices. We encourage you to review the privacy policy of every site you visit. We do not accept any responsibility or liability for the privacy practices of any third-party sites.
                        </p>
                    </Section>

                    <Section number="08" title="Children's Privacy">
                        <p>
                            Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us and we will take steps to delete such information.
                        </p>
                    </Section>

                    <Section number="09" title="Changes to This Policy">
                        <p>
                            We reserve the right to update or modify this Privacy Policy at any time. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
                        </p>
                    </Section>

                    <Section number="10" title="Contact Us">
                        <p>
                            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                        </p>
                        <div className="flex flex-col gap-2 mt-2">
                            <a href="mailto:hello@drixmedia.com" className="text-[#AFFF00] hover:text-[#AFFF00]/70 transition-colors">
                                hello@drixmedia.com
                            </a>
                            <a href="tel:5108956500" className="text-white/30 hover:text-white/50 transition-colors">
                                (510) 895-6500
                            </a>
                        </div>
                    </Section>

                </div>
            </div>

            <Footer />
        </main>
    );
};

export default PrivacyPolicy;
