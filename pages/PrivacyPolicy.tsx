import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      'Personal details such as name, email address, phone number',
      'Business information if you engage with our services',
      'Website usage data such as IP address, browser type, and pages visited',
      'Any information you voluntarily provide through forms, emails, or inquiries',
    ],
    list: true,
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'Respond to your inquiries and provide our services',
      'Improve our website, services, and user experience',
      'Communicate updates, offers, or relevant information',
      'Maintain internal records and analytics',
    ],
    list: true,
  },
  {
    title: '3. Data Sharing',
    content: [
      'We do not sell, trade, or rent your personal information to third parties.',
      'Your information may only be shared with trusted service providers who assist in operating our website or delivering services, and only when necessary.',
    ],
    list: false,
  },
  {
    title: '4. Data Security',
    content: [
      'We take appropriate measures to protect your data from unauthorized access, loss, or misuse. However, no online transmission is completely secure, and we cannot guarantee absolute security.',
    ],
    list: false,
  },
  {
    title: '5. Cookies & Tracking',
    content: [
      'Our website may use cookies to enhance your browsing experience. These help us understand user behavior and improve our services. You can choose to disable cookies through your browser settings.',
    ],
    list: false,
  },
  {
    title: '6. Third-Party Links',
    content: [
      'Our website may contain links to external sites. We are not responsible for the privacy practices or content of those websites.',
    ],
    list: false,
  },
  {
    title: '7. Your Rights',
    content: [
      'Request access to your personal data',
      'Ask for corrections or updates',
      'Request deletion of your data, where applicable',
      'To exercise these rights, you can contact us using the details below.',
    ],
    list: true,
  },
  {
    title: '8. Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time. Any changes will be reflected on this page.',
    ],
    list: false,
  },
  {
    title: '9. Contact Us',
    content: [
      'If you have any questions regarding this Privacy Policy, you can reach out to us at drixbackoffice@gmail.com.',
    ],
    list: false,
  },
];

const PrivacyPolicy: React.FC = () => (
  <main className="w-full min-h-screen bg-[#050505] text-white poppins-regular">
    <Navbar />

    {/* Hero */}
    <div className="pt-40 md:pt-52 pb-16 md:pb-24 px-6 md:px-12 max-w-[1000px] mx-auto">
      <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AFFF00]/60 mb-6 block">Legal</span>
      <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[7rem] mona-sans-condensed-medium tracking-tighter leading-[0.9] text-white mb-6">
        Privacy<br /><span className="text-white/25">Policy</span>
      </h1>
      <div className="h-px bg-white/10 w-full mt-10" />
    </div>

    {/* Intro */}
    <div className="px-6 md:px-12 max-w-[1000px] mx-auto pb-8">
      <p className="text-white/50 text-base md:text-lg leading-relaxed">
        At Drix Entertainment, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard any data you share with us.
      </p>
    </div>

    {/* Sections */}
    <div className="px-6 md:px-12 max-w-[1000px] mx-auto pb-24 md:pb-40 flex flex-col gap-0">
      {sections.map((s, i) => (
        <div key={i} className="border-t border-white/[0.07] py-8 md:py-10">
          <h2 className="text-lg md:text-xl mona-sans-condensed-medium text-white mb-4 tracking-tight">{s.title}</h2>
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

export default PrivacyPolicy;
