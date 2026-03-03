import React from 'react';

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "Choose the plan that best fits your needs. From a solid foundation to a fully optimized solution"
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description: "Our designers bring your vision to life with wireframes and prototypes, focusing on an engaging user experience."
  },
  {
    number: "03",
    title: "Development & Integration",
    description: "Choose the plan that best fits your needs. From a solid foundation to a fully optimized solution."
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "After testing and final approvals, we launch the site and provide ongoing support."
  }
];

const ProcessSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 text-[#0C0C0C] font-sans">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column - Intro */}
        <div className="lg:col-span-5 flex flex-col items-start pt-4">
          <h2 className="text-5xl md:text-[5rem] leading-[0.9] font-bold tracking-tighter mb-8">Our process</h2>
          <p className="text-[#0C0C0C]/60 text-base md:text-lg leading-relaxed mb-12 max-w-sm">
            Our four-step process keeps you informed and involved at every stage, ensuring the final result meets your goals and resonates with your audience.
          </p>
          
          <a href="#" className="flex items-center gap-4 group">
             {/* Red L-shaped Arrow Icon */}
             <div className="w-5 h-5 text-[#F9452D] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M4 4V13C4 16.866 7.13401 20 11 20H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                    <path d="M16 16L20 20L16 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="bevel"/>
                </svg>
             </div>
             <span className="font-medium text-lg text-black">Schedule a consultation</span>
          </a>
        </div>

        {/* Right Column - Steps List */}
        <div className="lg:col-span-7 flex flex-col w-full">
            {steps.map((step, i) => (
                <div key={i} className="relative flex flex-col md:flex-row gap-6 md:gap-10 py-12 border-t border-[#E5E5E5] group">
                    {/* Corner Accent - Top Right */}
                    <div className="absolute top-[-1px] right-0 w-2.5 h-2.5 border-r-[2px] border-b-[2px] border-[#F9452D] transform -rotate-90"></div>

                    {/* Number Badge */}
                    <div className="shrink-0">
                        <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full border border-[#E5E5E5] text-[16px] font-semibold text-[#0B0B0C] bg-white">
                            {step.number}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col pt-0.5 max-w-xl">
                        <h3 className="text-2xl md:text-[28px] font-bold mb-3 tracking-tight text-black leading-tight">
                            {step.title}
                        </h3>
                        <p className="text-[#0C0C0C]/60 text-base leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;