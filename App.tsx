import React from 'react';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ServicesSection from './components/ServicesSection';
import PrioritySection from './components/PrioritySection';
import WhyDrixSection from './components/WhyDrixSection';
import QuoteSection from './components/QuoteSection';
import PartnersSection from './components/PartnersSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import EyeSection from './components/EyeSection';

const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-black">
      <Hero />
      
      {/* 
        Wrapper for all subsequent content. 
        bg-white: Acts as a base layer for the main content sections.
        Individual sections with different backgrounds (like ServicesSection) will layer on top of this.
      */}
      <div className="relative z-10 bg-white">
        <TrustBar />
        <PrioritySection />
        <WhyDrixSection />
        <ServicesSection />
        <QuoteSection />
        <PricingSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <EyeSection />
        <Footer />
      </div>
    </main>
  );
};

export default App;