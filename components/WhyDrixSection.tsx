import React from 'react';

const WhyDrixSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFAFA] py-24 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-6">
          Why Brands Choose Drix Media
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Integrated Approach */}
        <div className="bg-white border border-gray-200 p-10 md:p-12 flex flex-col justify-between min-h-[400px] relative overflow-hidden group hover:border-gray-300 transition-colors duration-300">
          {/* Number Badge */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
            01
          </div>
          
          {/* Icon */}
          <div className="mb-8">
            <div className="w-16 h-16 flex items-center justify-center text-[#F9452D]">
              <svg width="48" height="48" viewBox="0 0 256 256" fill="currentColor">
                <path d="M245.83,121.63a15.53,15.53,0,0,0-9.52-7.33,73.51,73.51,0,0,0-22.17-2.22c4-19.85,1-35.55-2.06-44.86a16.15,16.15,0,0,0-18.79-10.88,85.53,85.53,0,0,0-28.55,12.12,94.58,94.58,0,0,0-27.11-33.25,16.05,16.05,0,0,0-19.26,0A94.48,94.48,0,0,0,91.26,68.46,85.53,85.53,0,0,0,62.71,56.34,16.15,16.15,0,0,0,43.92,67.22c-3,9.31-6,25-2.06,44.86a73.51,73.51,0,0,0-22.17,2.22,15.53,15.53,0,0,0-9.52,7.33,16,16,0,0,0-1.6,12.27c3.39,12.57,13.8,36.48,45.33,55.32S113.13,208,128,208s42.67,0,74.2-18.78c31.53-18.84,41.94-42.75,45.33-55.32A16,16,0,0,0,245.83,121.63ZM59.14,72.14a.2.2,0,0,1,.23-.15A70.43,70.43,0,0,1,85.18,83.66,118.65,118.65,0,0,0,80,119.17c0,18.74,3.77,34,9.11,46.28A123.59,123.59,0,0,1,69.57,140C51.55,108.62,55.33,84,59.14,72.14Zm3,103.35C35.47,159.57,26.82,140.05,24,129.7a59.82,59.82,0,0,1,22.5-1.17,129.08,129.08,0,0,0,9.15,19.41,142.28,142.28,0,0,0,34,39.56A114.92,114.92,0,0,1,62.1,175.49ZM128,190.4c-9.33-6.94-32-28.23-32-71.23C96,76.7,118.38,55.24,128,48c9.62,7.26,32,28.72,32,71.19C160,162.17,137.33,183.46,128,190.4Zm66.49-2.91a142.28,142.28,0,0,0,34-39.56,129.08,129.08,0,0,0,9.15-19.41A59.82,59.82,0,0,1,260.08,129.7c-2.86,10.35-11.51,29.87-38.18,45.79A114.92,114.92,0,0,1,194.46,187.49Zm-8-47.52c5.34-12.26,9.11-27.54,9.11-46.28a118.65,118.65,0,0,0-5.18-35.51,70.43,70.43,0,0,1,25.81-11.67.2.2,0,0,1,.23.15C200.67,84,204.45,108.62,186.43,140Z"></path>
              </svg>
            </div>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">
              Integrated Approach
            </h3>
            <p className="text-[#0C0C0C]/70 text-base md:text-lg leading-relaxed">
              We do not hand you off between departments. Your strategist, designer, and content creator work together from day one. The result? A brand that feels consistent everywhere it shows up.
            </p>
          </div>
        </div>

        {/* Card 2: Business-First Thinking */}
        <div className="bg-black p-10 md:p-12 flex flex-col justify-between min-h-[400px] relative overflow-hidden group">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
          </div>

          {/* Number Badge */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#F9452D] text-white flex items-center justify-center text-lg font-bold shadow-[0_0_30px_rgba(249,69,45,0.4)]">
            02
          </div>
          
          {/* Icon */}
          <div className="mb-8 relative z-10">
            <div className="w-16 h-16 flex items-center justify-center text-white">
              <svg width="48" height="48" viewBox="0 0 256 256" fill="currentColor">
                <path d="M240,120h-8V88a16,16,0,0,0-16-16H176V64a16,16,0,0,0-16-16H96A16,16,0,0,0,80,64v8H40A16,16,0,0,0,24,88v32H16a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H80v8a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16v-8h40a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM96,64h64v8H96ZM40,88H216v32H192v-8a16,16,0,0,0-16-16H80a16,16,0,0,0-16,16v8H40Zm40,32h96v32H80Zm80,72H96v-8h64ZM216,168H176v-8a16,16,0,0,0-16-16H96a16,16,0,0,0-16,16v8H40V136H64v8a16,16,0,0,0,16,16h96a16,16,0,0,0,16-16v-8h24Z"></path>
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Business-First Thinking
            </h3>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              We are not here to make pretty things. We are here to drive results. Every creative decision connects to a business goal. Every campaign is built to perform.
            </p>
          </div>
        </div>

        {/* Card 3: End-to-End Execution */}
        <div className="bg-gradient-to-br from-[#F9452D] to-[#E63920] p-10 md:p-12 flex flex-col justify-between min-h-[400px] relative overflow-hidden group">
          {/* Decorative Circle */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          
          {/* Number Badge */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
            03
          </div>
          
          {/* Icon */}
          <div className="mb-8 relative z-10">
            <div className="w-16 h-16 flex items-center justify-center text-white">
              <svg width="48" height="48" viewBox="0 0 256 256" fill="currentColor">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Zm88,0a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h24V72a8,8,0,0,1,16,0v32A8,8,0,0,1,128,112Z"></path>
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              End-to-End Execution
            </h3>
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              From brand strategy to final campaign delivery, we handle it all. You get one team, one process, one point of contact.
            </p>
          </div>
        </div>

        {/* Card 4: No Guessing, Just Data */}
        <div className="bg-white border border-gray-200 p-10 md:p-12 flex flex-col justify-between min-h-[400px] relative overflow-hidden group hover:border-gray-300 transition-colors duration-300">
          {/* Dot Pattern Background */}
          <div className="absolute inset-0 opacity-[0.08]" 
               style={{ backgroundImage: 'radial-gradient(circle, #0C0C0C 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>

          {/* Number Badge */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
            04
          </div>
          
          {/* Icon */}
          <div className="mb-8 relative z-10">
            <div className="w-16 h-16 flex items-center justify-center text-[#F9452D]">
              <svg width="48" height="48" viewBox="0 0 256 256" fill="currentColor">
                <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31l-56,56V200H224A8,8,0,0,1,232,208Z"></path>
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">
              No Guessing, Just Data
            </h3>
            <p className="text-[#0C0C0C]/70 text-base md:text-lg leading-relaxed">
              We track what works. We optimize what does not. Every project comes with clear metrics so you know exactly what you are getting.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyDrixSection;
