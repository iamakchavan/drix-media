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

const TermsConditions: React.FC = () => {
    return (
        <main className="w-full min-h-screen bg-[#050505] overflow-x-hidden">
            <Navbar />
            
            <LegalHero
                title="Terms & Conditions"
                subtitle="Please read these terms carefully before engaging with Drix Media. By using our services, you agree to be bound by these terms."
                lastUpdated="April 15, 2025"
            />

            <div className="w-full bg-[#050505] selection:bg-[#AFFF00] selection:text-black">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-32">

                    <Section number="01" title="Acceptance of Terms">
                        <p>
                            By accessing and using the Drix Media website or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.
                        </p>
                        <p>
                            These terms apply to all visitors, users, clients, and any others who access or use our services. We reserve the right to update these terms at any time, and your continued use of our services constitutes acceptance of any modifications.
                        </p>
                    </Section>

                    <Section number="02" title="Services">
                        <p>
                            Drix Media provides creative production, branding, design, content strategy, and digital marketing services. The specific scope, deliverables, timeline, and pricing of each engagement will be outlined in a separate Statement of Work (SOW) or project agreement signed by both parties.
                        </p>
                        <p>
                            We reserve the right to refuse or discontinue services at our discretion if a project conflicts with our values, exceeds our capacity, or if the client fails to meet their obligations under the agreed terms.
                        </p>
                    </Section>

                    <Section number="03" title="Intellectual Property">
                        <p>
                            All content on the Drix Media website — including text, graphics, logos, icons, images, audio clips, digital downloads, and software — is the property of Drix Media or its content suppliers and is protected by international copyright laws.
                        </p>
                        <p>
                            Upon full payment, clients receive ownership of the final deliverables as specified in the project agreement. Drix Media retains the right to showcase completed work in our portfolio, case studies, and marketing materials unless otherwise agreed in writing.
                        </p>
                        <p>
                            Preliminary concepts, unused designs, working files, and proprietary processes remain the intellectual property of Drix Media and may not be reproduced, distributed, or used without our express written consent.
                        </p>
                    </Section>

                    <Section number="04" title="Payment Terms">
                        <p>Payment terms are established in the project agreement. Unless otherwise specified:</p>
                        <ul className="list-none flex flex-col gap-3 ml-0">
                            {[
                                "A non-refundable deposit of 50% is required before work begins",
                                "The remaining balance is due upon project completion, before final files are delivered",
                                "Invoices are payable within 14 days of issuance",
                                "Late payments may incur a fee of 1.5% per month on the outstanding balance",
                                "All prices are quoted in USD unless otherwise specified",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-1 h-1 bg-[#AFFF00] rounded-full mt-2.5 shrink-0"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section number="05" title="Client Responsibilities">
                        <p>
                            Clients agree to provide timely feedback, approvals, and materials necessary for the successful completion of projects. Delays in client responses may result in adjusted timelines and, in some cases, additional charges.
                        </p>
                        <p>
                            The client is responsible for ensuring that all materials provided to Drix Media (including text, images, and brand assets) are owned by the client or properly licensed, and do not infringe on any third-party rights.
                        </p>
                    </Section>

                    <Section number="06" title="Revisions & Scope Changes">
                        <p>
                            Each project includes a defined number of revision rounds as specified in the project agreement. Additional revisions beyond the agreed scope will be billed at our standard hourly rate.
                        </p>
                        <p>
                            Significant changes to the project scope, deliverables, or timeline after work has commenced may require a revised Statement of Work and adjusted pricing. We will communicate any scope changes clearly and obtain written approval before proceeding.
                        </p>
                    </Section>

                    <Section number="07" title="Confidentiality">
                        <p>
                            Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the engagement. This obligation survives the termination of the business relationship.
                        </p>
                        <p>
                            Drix Media will not disclose client strategies, business data, or unpublished materials to third parties without explicit written consent, except where required by law.
                        </p>
                    </Section>

                    <Section number="08" title="Limitation of Liability">
                        <p>
                            Drix Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our services, website, or any content therein.
                        </p>
                        <p>
                            Our total liability for any claim arising from our services shall not exceed the total amount paid by the client for the specific project in question. We make no warranties, expressed or implied, regarding the expected results or outcomes from our services.
                        </p>
                    </Section>

                    <Section number="09" title="Termination">
                        <p>
                            Either party may terminate a project engagement with 30 days' written notice. Upon termination, the client is responsible for payment of all work completed up to the date of termination.
                        </p>
                        <p>
                            The initial deposit is non-refundable. If Drix Media terminates the engagement due to circumstances within our control, we will refund any payments for undelivered work on a prorated basis.
                        </p>
                    </Section>

                    <Section number="10" title="Governing Law">
                        <p>
                            These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved in the courts of Alameda County, California.
                        </p>
                    </Section>

                    <Section number="11" title="Contact">
                        <p>
                            For questions regarding these Terms and Conditions, please reach out:
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

export default TermsConditions;
