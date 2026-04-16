import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    title: '1. Use of Services',
    content: ['Drix Entertainment provides marketing, creative, and digital services. By engaging with us, you agree to use our services for lawful purposes only and not for any activity that may harm our business or reputation.'],
    list: false,
  },
  {
    title: '2. Intellectual Property',
    content: [
      'All content on this website, including text, graphics, logos, and designs, is the property of Drix Entertainment unless stated otherwise.',
      'You may not copy, reproduce, or use any content without prior written permission.',
    ],
    list: false,
  },
  {
    title: '3. Client Responsibilities',
    content: [
      'Provide accurate and complete information',
      'Review and approve deliverables within agreed timelines',
      'Ensure that any materials shared with us do not violate third-party rights',
    ],
    list: true,
  },
  {
    title: '4. Payments & Pricing',
    content: [
      'All services are subject to agreed pricing and payment terms.',
      'Payments must be made as per the agreed schedule',
      'Delays in payment may affect project timelines',
      'All fees are non-refundable unless stated otherwise',
    ],
    list: true,
  },
  {
    title: '5. Revisions & Deliverables',
    content: [
      'We aim to deliver high-quality work aligned with your requirements.',
      'Revisions will be provided as per the agreed scope',
      'Additional changes beyond scope may incur extra charges',
    ],
    list: true,
  },
  {
    title: '6. Limitation of Liability',
    content: [
      'Any indirect or consequential losses',
      'Business losses resulting from the use of our services',
      'Delays caused by external factors beyond our control',
    ],
    list: true,
    prefix: 'Drix Entertainment is not liable for:',
  },
  {
    title: '7. Third-Party Services',
    content: ['We may use or integrate third-party tools, platforms, or services. We are not responsible for their performance, policies, or issues.'],
    list: false,
  },
  {
    title: '8. Termination',
    content: [
      'There is a breach of these terms',
      'Payments are not made as agreed',
      'There is misuse of our services',
    ],
    list: true,
    prefix: 'We reserve the right to suspend or terminate services if:',
  },
  {
    title: '9. Changes to Terms',
    content: ['We may update these Terms & Conditions from time to time. Continued use of our services implies acceptance of the updated terms.'],
    list: false,
  },
  {
    title: '10. Governing Law',
    content: ['These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of the relevant courts.'],
    list: false,
  },
  {
    title: '11. Contact Us',
    content: ['For any questions regarding these Terms & Conditions, contact us at drixbackoffice@gmail.com.'],
    list: false,
  },
];

const TermsConditions: React.FC = () => (
  <main className="w-full min-h-screen bg-[#050505] text-white poppins-regular">
    <Navbar />

    {/* Hero */}
    <div className="pt-40 md:pt-52 pb-16 md:pb-24 px-6 md:px-12 max-w-[1000px] mx-auto">
      <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AFFF00]/60 mb-6 block">Legal</span>
      <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[7rem] mona-sans-condensed-medium tracking-tighter leading-[0.9] text-white mb-6">
        Terms &<br /><span className="text-white/25">Conditions</span>
      </h1>
      <div className="h-px bg-white/10 w-full mt-10" />
    </div>

    {/* Intro */}
    <div className="px-6 md:px-12 max-w-[1000px] mx-auto pb-8">
      <p className="text-white/50 text-base md:text-lg leading-relaxed">
        By accessing or using our website and services, you agree to the following terms and conditions. Please read them carefully.
      </p>
    </div>

    {/* Sections */}
    <div className="px-6 md:px-12 max-w-[1000px] mx-auto pb-24 md:pb-40 flex flex-col gap-0">
      {sections.map((s, i) => (
        <div key={i} className="border-t border-white/[0.07] py-8 md:py-10">
          <h2 className="text-lg md:text-xl mona-sans-condensed-medium text-white mb-4 tracking-tight">{s.title}</h2>
          {'prefix' in s && s.prefix && (
            <p className="text-white/45 text-sm md:text-base leading-relaxed mb-3">{s.prefix}</p>
          )}
          {s.list ? (
            <ul className="flex flex-col gap-2">
              {s.content.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-white/45 text-sm md:text-base leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-[#AFFF00]/50 shrink-0 mt-[7px]" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-3">
              {s.content.map((item, j) => (
                <p key={j} className="text-white/45 text-sm md:text-base leading-relaxed">{item}</p>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="border-t border-white/[0.07]" />
    </div>

    <Footer />
  </main>
);

export default TermsConditions;
