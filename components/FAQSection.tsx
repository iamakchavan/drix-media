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

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-b border-[#E5E5E5] last:border-b-0 py-8 cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg md:text-xl font-medium text-[#0C0C0C] leading-tight select-none pr-8">
          {question}
        </h3>
        <div className={`text-[#476D07] transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          {/* Plus Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
            <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
          </svg>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-[#0C0C0C]/60 text-base leading-relaxed pt-4 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 font-sans border-t border-[#E5E5E5]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col items-start pt-4">
          <h2 className="text-5xl md:text-[5rem] leading-[0.9] font-bold tracking-tighter mb-8 text-[#0C0C0C]">
            FAQ
          </h2>
          <p className="text-[#0C0C0C]/60 text-base md:text-lg leading-relaxed mb-12 max-w-sm">
            We’ve heard it all. Here’s everything you need to know before working with us.
          </p>

          <a href="./contact" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#476D07] transition-all duration-300 group-hover:bg-[#AFFF00] group-hover:text-black group-hover:border-[#AFFF00]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-5 h-5">
                <path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z"></path>
              </svg>
            </div>
            <span className="font-medium text-lg text-black">Ask a question</span>
          </a>
        </div>

        {/* Right Column - FAQ List */}
        <div className="lg:col-span-7 flex flex-col w-full border-t border-[#E5E5E5]">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;