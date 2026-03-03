import React from 'react';

const ShowcaseSection: React.FC = () => {
  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white relative h-screen overflow-hidden flex flex-col justify-center items-center">
      
      {/* Centered Image - Sized to match reference */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[28vw] aspect-[3/4] z-10 overflow-hidden bg-[#E5E5E5]">
             <img 
                src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1000&auto=format&fit=crop" 
                alt="Cosmetic Bottle" 
                className="w-full h-full object-cover object-center grayscale opacity-90"
            />
      </div>

      {/* Typography Layer - Mix Blend Mode Difference */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center mix-blend-difference text-white pointer-events-none select-none -mt-16 md:-mt-20">
            <h2 className="text-[12vw] md:text-[9.5vw] leading-[0.9] font-bold tracking-tighter whitespace-nowrap">
                From ordinary
            </h2>
            <h2 className="text-[12vw] md:text-[9.5vw] leading-[0.9] font-bold tracking-tighter whitespace-nowrap">
                to extraordinary
            </h2>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end pb-12 z-30 pointer-events-auto">
        
        {/* Text and Logo Group */}
        <div className="flex flex-col items-center gap-2 mb-10">
            {/* Description Text */}
            <p className="text-[15px] font-medium text-center leading-relaxed tracking-wide max-w-xs md:max-w-md mx-auto" style={{ color: 'rgba(12, 12, 12, 0.6)' }}>
                Design that’s built to last and grow with your business
            </p>

            {/* Logo */}
            <div className="flex items-start text-[#0C0C0C] leading-none">
                 <span className="font-bebas text-[50px] tracking-[-0.04em]">
                    DRIX MEDIA
                 </span>
                 <span className="font-bebas text-[18px] tracking-[-0.04em] ml-1 mt-1">
                    ®
                 </span>
            </div>
        </div>

        {/* Arrow Button */}
        <button 
            onClick={scrollToFooter}
            className="w-16 h-16 bg-[#0C0C0C] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-xl"
            aria-label="Scroll down"
        >
            <div className="w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
                    <path d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z"></path>
                </svg>
            </div>
        </button>

      </div>
    </section>
  );
};

export default ShowcaseSection;