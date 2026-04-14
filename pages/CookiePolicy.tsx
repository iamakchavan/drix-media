import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const premiumEasing = [0.16, 1, 0.3, 1];

const LegalHero = ({ title, subtitle, lastUpdated }: { title: string; subtitle: string; lastUpdated: string }) => (
    <section className="relative w-full bg-[#050505] pt-[160px] md:pt-[200px] pb-16 md:pb-24 overflow-hidden">
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
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#AFFF00]/60">{number}</span>
            <h2 className="text-[1.3rem] md:text-[1.5rem] mona-sans-condensed-medium text-white tracking-tight leading-snug uppercase">
                {title}
            </h2>
        </div>
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-5 text-white/45 text-[14px] md:text-[15px] leading-[1.8] poppins-regular">
            {children}
        </div>
    </motion.div>
);

// Cookie type card
const CookieTypeCard = ({ name, purpose, duration, isEssential }: { name: string; purpose: string; duration: string; isEssential?: boolean }) => (
    <div className="flex flex-col gap-3 p-5 md:p-6 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 group"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)" }}
    >
        <div className="flex items-center justify-between">
            <span className="text-white/70 text-[13px] poppins-semibold tracking-tight">{name}</span>
            {isEssential && (
                <span className="text-[9px] poppins-bold tracking-[0.2em] uppercase text-[#AFFF00]/80 bg-[#AFFF00]/10 px-3 py-1">
                    Required
                </span>
            )}
        </div>
        <p className="text-white/35 text-[13px] leading-relaxed poppins-regular">{purpose}</p>
        <span className="text-[10px] font-mono text-white/20 tracking-wider">Duration: {duration}</span>
    </div>
);

const CookiePolicy: React.FC = () => {
    return (
        <main className="w-full min-h-screen bg-[#050505] overflow-x-hidden">
            <Navbar />
            
            <LegalHero
                title="Cookie Policy"
                subtitle="This policy explains how Drix Media uses cookies and similar technologies to recognize you when you visit our website."
                lastUpdated="April 15, 2025"
            />

            <div className="w-full bg-[#050505] selection:bg-[#AFFF00] selection:text-black">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-32">

                    <Section number="01" title="What Are Cookies">
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.
                        </p>
                        <p>
                            Cookies allow a website to recognize your device and remember information about your visit, such as your preferred language, font size, and other display preferences. This can simplify the process of recording your personal information and make your next visit easier and the site more useful to you.
                        </p>
                    </Section>

                    <Section number="02" title="Types of Cookies We Use">
                        <p className="mb-2">We use the following categories of cookies on our website:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CookieTypeCard
                                name="Essential Cookies"
                                purpose="These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure area access, and form submissions."
                                duration="Session / 1 year"
                                isEssential
                            />
                            <CookieTypeCard
                                name="Analytics Cookies"
                                purpose="Help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this to improve our site's performance."
                                duration="Up to 2 years"
                            />
                            <CookieTypeCard
                                name="Functional Cookies"
                                purpose="Allow the website to remember choices you make (such as your preferred language or region) and provide enhanced, more personalized features."
                                duration="Up to 1 year"
                            />
                            <CookieTypeCard
                                name="Marketing Cookies"
                                purpose="Used to track visitors across websites to display relevant advertisements. They also limit the number of times you see an ad and help measure campaign effectiveness."
                                duration="Up to 2 years"
                            />
                        </div>
                    </Section>

                    <Section number="03" title="Third-Party Cookies">
                        <p>
                            In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and provide other services. These include:
                        </p>
                        <ul className="list-none flex flex-col gap-3 ml-0">
                            {[
                                "Google Analytics — for measuring website traffic and user behavior patterns",
                                "Google Fonts — for loading custom typography used across the site",
                                "Social media platforms — for enabling sharing functionality and measuring referral traffic",
                                "Hosting providers — for performance monitoring and security",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-1 h-1 bg-[#AFFF00] rounded-full mt-2.5 shrink-0"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section number="04" title="Managing Cookies">
                        <p>
                            Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies, delete cookies, or alert you when cookies are being sent. The methods for doing so vary from browser to browser — consult your browser's help menu for instructions.
                        </p>
                        <p>
                            Please note that disabling cookies may affect the functionality of our website and other websites you visit. Some features and services may not function properly if cookies are disabled.
                        </p>
                        <div className="bg-white/[0.03] border border-white/[0.06] p-6 mt-2"
                            style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)" }}
                        >
                            <p className="text-white/50 text-[13px] leading-relaxed poppins-regular mb-4">
                                Common browser settings:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['Chrome', 'Firefox', 'Safari', 'Edge'].map((browser) => (
                                    <span key={browser} className="text-[11px] poppins-medium tracking-[0.1em] text-white/30 border border-white/[0.08] px-4 py-2 hover:text-[#AFFF00] hover:border-[#AFFF00]/20 transition-colors duration-300 cursor-default">
                                        {browser}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Section>

                    <Section number="05" title="Cookie Consent">
                        <p>
                            When you first visit our website, you will be shown a cookie consent banner. By clicking "Accept" or continuing to browse the site, you consent to our use of cookies as described in this policy.
                        </p>
                        <p>
                            You can withdraw your consent at any time by clearing cookies from your browser or by adjusting your cookie preferences. Essential cookies cannot be disabled as they are required for the basic operation of our website.
                        </p>
                    </Section>

                    <Section number="06" title="Updates to This Policy">
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated revision date.
                        </p>
                        <p>
                            We encourage you to review this policy periodically. Your continued use of our website after any changes to this policy constitutes your acceptance of those changes.
                        </p>
                    </Section>

                    <Section number="07" title="Further Information">
                        <p>
                            If you have questions about our use of cookies or other technologies, please contact us. For more information about how we handle your personal data, please refer to our <Link to="/privacy" className="text-[#AFFF00] hover:text-[#AFFF00]/70 transition-colors underline underline-offset-4 decoration-[#AFFF00]/30">Privacy Policy</Link>.
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

export default CookiePolicy;
