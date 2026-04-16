import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    title: '1. What Are Cookies',
    content: ['Cookies are small text files stored on your device when you visit a website. They help improve your browsing experience by remembering your preferences and understanding how you use the site.'],
    list: false,
  },
  {
    title: '2. How We Use Cookies',
    content: [
      'Ensure the website functions properly',
      'Understand how visitors interact with our website',
      'Improve performance and user experience',
      'Analyze traffic and usage patterns',
    ],
    list: true,
  },
  {
    title: '3. Types of Cookies We Use',
    subsections: [
      { label: 'a. Essential Cookies', text: 'These are necessary for the website to function correctly and cannot be disabled.' },
      { label: 'b. Performance Cookies', text: 'These help us understand how users interact with our website, so we can improve it.' },
      { label: 'c. Functional Cookies', text: 'These remember your preferences and provide a more personalized experience.' },
    ],
  },
  {
    title: '4. Third-Party Cookies',
    content: ['We may use third-party tools (such as analytics services) that place cookies on your device to help us understand website performance and user behavior.'],
    list: false,
  },
  {
    title: '5. Managing Cookies',
    content: [
      'View cookies stored on your device',
      'Delete cookies',
      'Block cookies altogether',
      'Please note that disabling cookies may affect how the website functions.',
    ],
    list: true,
    prefix: 'You can choose to accept or decline cookies through your browser settings. Most browsers allow you to:',
  },
  {
    title: '6. Updates to This Policy',
    content: ['We may update this Cookies Policy from time to time. Any changes will be reflected on this page.'],
    list: false,
  },
  {
    title: '7. Contact Us',
    content: ['If you have any questions about our Cookies Policy, you can contact us at drixbackoffice@gmail.com.'],
    list: false,
  },
];

const CookiePolicy: React.FC = () => (
  <main className="w-full min-h-screen bg-[#050505] text-white poppins-regular">
    <Navbar />

    {/* Hero */}
    <div className="pt-40 md:pt-52 pb-16 md:pb-24 px-6 md:px-12 max-w-[1000px] mx-auto">
      <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AFFF00]/60 mb-6 block">Legal</span>
      <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[7rem] mona-sans-condensed-medium tracking-tighter leading-[0.9] text-white mb-6">
        Cookies<br /><span className="text-white/25">Policy</span>
      </h1>
      <div className="h-px bg-white/10 w-full mt-10" />
    </div>

    {/* Intro */}
    <div className="px-6 md:px-12 max-w-[1000px] mx-auto pb-8">
      <p className="text-white/50 text-base md:text-lg leading-relaxed">
        This Cookies Policy explains how Drix Entertainment uses cookies and similar technologies when you visit our website.
      </p>
    </div>

    {/* Sections */}
    <div className="px-6 md:px-12 max-w-[1000px] mx-auto pb-24 md:pb-40 flex flex-col gap-0">
      {sections.map((s: any, i) => (
        <div key={i} className="border-t border-white/[0.07] py-8 md:py-10">
          <h2 className="text-lg md:text-xl mona-sans-condensed-medium text-white mb-4 tracking-tight">{s.title}</h2>
          {'prefix' in s && s.prefix && (
            <p className="text-white/45 text-sm md:text-base leading-relaxed mb-3">{s.prefix}</p>
          )}
          {'subsections' in s && s.subsections ? (
            <div className="flex flex-col gap-4">
              {s.subsections.map((sub: any, j: number) => (
                <div key={j}>
                  <span className="text-white/70 text-sm font-semibold block mb-1">{sub.label}</span>
                  <p className="text-white/45 text-sm md:text-base leading-relaxed">{sub.text}</p>
                </div>
              ))}
            </div>
          ) : s.list ? (
            <ul className="flex flex-col gap-2">
              {s.content.map((item: string, j: number) => (
                <li key={j} className="flex items-start gap-3 text-white/45 text-sm md:text-base leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-[#AFFF00]/50 shrink-0 mt-[7px]" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-3">
              {s.content.map((item: string, j: number) => (
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

export default CookiePolicy;
