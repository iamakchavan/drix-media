import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What’s your process for designing and developing a new website?",
    answer: "I start by understanding your brand and goals, then create a tailored design that reflects your vision. Once the design is approved, I develop the site with clean, scalable code and ensure it’s fully tested before launch."
  },
  {
    question: "What if I need to make changes or add features in the future?",
    answer: "I design with scalability in mind, making it easy to add new features as your business grows. I also offer ongoing support packages if you’d like me to handle updates for you."
  },
  {
    question: "Do you offer SEO services?",
    answer: "Yes, I incorporate SEO best practices into every website I build to help improve your search visibility from the start. For more advanced SEO strategies, I also offer customized SEO packages."
  },
  {
    question: "How long does it typically take to see results from my brand’s new website?",
    answer: "Most clients start seeing results within a few months as search engines index the site and new visitors discover the brand. However, results can vary depending on factors like industry and marketing efforts."
  },
  {
    question: "How do you ensure the website is mobile-friendly?",
    answer: "I use responsive design techniques and thoroughly test on various devices and screen sizes. This ensures your site looks great and works well for all users, no matter how they access it."
  }
];

const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="group flex flex-col border-b border-black/10 cursor-pointer overflow-hidden transition-colors duration-500 hover:bg-[#FAFAFA]"
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Row Header */}
      <div className="flex justify-between items-start md:items-center py-6 md:py-10 px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 lg:gap-24 w-full pr-8">
          <span className="text-black/30 font-bold tracking-[0.2em] text-[13px] md:text-sm transition-colors duration-500 group-hover:text-black/50">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={`text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.1] mona-sans-condensed-medium tracking-tight transition-colors duration-500 ${isOpen ? 'text-[#AFFF00]' : 'text-black group-hover:text-black/70'}`}>
            {question}
          </h3>
        </div>
        
        {/* Toggle Icon */}
        <div className="relative shrink-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 mt-1 md:mt-0 overflow-hidden">
           <motion.div 
             animate={{ rotate: isOpen ? 45 : 0 }}
             transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
             className={`absolute inset-0 flex items-center justify-center transition-colors duration-500 ${isOpen ? 'text-[#AFFF00]' : 'text-black/30 group-hover:text-black'}`}
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
               <line x1="12" y1="5" x2="12" y2="19"></line>
               <line x1="5" y1="12" x2="19" y2="12"></line>
             </svg>
           </motion.div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-12 pb-10 md:pb-12 pt-2 ml-0 md:ml-20 lg:ml-32">
              <p className="text-base md:text-xl text-black/60 leading-relaxed poppins-medium max-w-3xl">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ScrambleButtonSecondary = ({ text, href }: { text: string; href: string }) => {
  return (
    <motion.a
      href={href}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 0%)" },
        hover: { clipPath: "polygon(16px 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 16px)", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
      }}
      className="group relative w-max flex items-center justify-center bg-transparent border border-black/20 h-[50px] md:h-[56px] px-8 md:px-10 transition-colors duration-500 overflow-hidden"
    >
      <motion.div 
        variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 bg-black w-full h-full"
      />
      
      <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
        <div className="opacity-0 pointer-events-none flex items-center gap-3 text-[13px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">
          <span>{text}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </div>
        
        <motion.div
          variants={{
            initial: { y: "0%" },
            hover: { y: "-100%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] tracking-[0.2em] uppercase font-bold text-black whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] group-hover:rotate-45 transition-transform duration-500 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
        
        <motion.div
          variants={{
            initial: { y: "100%" },
            hover: { y: "0%", transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
          }}
          className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-[13px] tracking-[0.2em] uppercase font-bold text-white whitespace-nowrap"
        >
          <span>{text}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[2px] -rotate-45 group-hover:rotate-0 transition-transform duration-500 delay-75 ease-[0.19,1,0.22,1]"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
        </motion.div>
      </div>
    </motion.a>
  );
};

const FAQSection: React.FC = () => {
  return (
    <section className="w-full bg-white text-black poppins-regular selection:bg-black selection:text-[#AFFF00] pt-24 md:pt-40">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col items-start border-t border-black/10">
        
        {/* Superior Split Layout */}
        <div className="flex flex-col lg:flex-row w-full relative">
            
            {/* Left Column: Sticky Header */}
            <div className="w-full lg:w-[35%] py-16 px-6 md:px-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-start">
               {/* Label */}
               <div className="flex items-center gap-3 mb-10 md:mb-16">
                    <span className="w-2 h-2 bg-black shadow-[0_0_10px_rgba(0,0,0,0.2)]"></span>
                    <span className="text-black text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase">
                       Knowledge Base
                    </span>
               </div>
               
               {/* Title */}
               <h2 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] mona-sans-condensed-medium tracking-tight mb-8 md:mb-12">
                 FAQ
               </h2>
               
               {/* Subtitle */}
               <p className="text-black/50 text-lg md:text-xl poppins-medium leading-relaxed max-w-xs mb-12">
                 We’ve heard it all. Here’s everything you need to know before working with us.
               </p>

               {/* Ask Question Button */}
               <ScrambleButtonSecondary text="Ask a question" href="/contact" />
            </div>

            {/* Right Column: Expansive Accordion */}
            <div className="w-full lg:w-[65%] flex flex-col border-l border-black/10">
               {faqs.map((faq, index) => (
                 <FAQItem key={index} index={index} question={faq.question} answer={faq.answer} />
               ))}
               
               {/* Spacer padding block at the bottom for scrolling gracefully */}
               <div className="h-32"></div>
            </div>

        </div>

      </div>
    </section>
  );
};

export default FAQSection;
