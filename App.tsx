import React from 'react';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import SelectedWorkSection from './components/SelectedWorkSection';
import ShowcaseSection from './components/ShowcaseSection';
import PrioritySection from './components/PrioritySection';
import QuoteSection from './components/QuoteSection';
import PartnersSection from './components/PartnersSection';
import TeamImageSection from './components/TeamImageSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import InsightsSection from './components/InsightsSection';
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
        <StatsSection />
        <ShowcaseSection />
        <PrioritySection />
        <SelectedWorkSection />
        <ServicesSection />
        <QuoteSection />
        <PartnersSection />
        <TeamImageSection />
        <PricingSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <InsightsSection />
        <EyeSection />
        <Footer />
      </div>
    </main>
  );
};

export default App;