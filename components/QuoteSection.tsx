import React from 'react';

const QuoteSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 md:py-20 px-6 md:px-12 flex justify-center">
      <div className="max-w-[1200px] w-full flex flex-col md:flex-row gap-12 lg:gap-24 items-center">

        {/* Left Column: Image */}
        <div className="w-full md:w-5/12 relative">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <div data-framer-background-image-wrapper="true" style={{ position: 'absolute', borderRadius: 'inherit', inset: '0px' }}>
              <img
                src="https://framerusercontent.com/images/RuuVHScXn21DshuJ5CzY9yFPrU.jpg?width=645&height=908"
                alt="Black and white portrait of a smiling person with curly hair"
                className="block w-full h-full rounded-[inherit] object-center object-cover"
              />
            </div>
          </div>
          {/* Decorative Corner - Rotated -90deg */}
          <div className="absolute -bottom-3 -right-3 w-4 h-4 border-r-2 border-b-2 border-black transform -rotate-90"></div>
        </div>

        {/* Right Column: Content */}
        <div className="w-full md:w-7/12 flex flex-col justify-center">

          {/* Icon */}
          <div className="mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256" fill="currentColor" className="text-black">
              <path d="M100,60H44A12,12,0,0,0,32,72v56a12,12,0,0,0,12,12h45.51C83.74,169.53,62.88,189.67,36.26,198.81a8,8,0,1,0,5.19,15.13c33.36-11.45,60.67-37.47,69.58-77.57A12.54,12.54,0,0,0,112,128V72A12,12,0,0,0,100,60Zm112,0H156a12,12,0,0,0-12,12v56a12,12,0,0,0,12,12h45.51c-5.77,29.53-26.63,49.67-53.25,58.81a8,8,0,1,0,5.19,15.13c33.36-11.45,60.67-37.47,69.58-77.57A12.54,12.54,0,0,0,224,128V72A12,12,0,0,0,212,60Z"></path>
            </svg>
          </div>

          {/* Main Quote */}
          <h3 className="text-2xl md:text-3xl lg:text-[2rem] mona-sans-condensed-medium leading-[1.65] text-[#0C0C0C] mb-12 tracking-tight">
            DRIX MEDIA helps companies create visually stunning and strategically sound digital experiences that captivate audiences. Our team of experts works closely with you to ensure every detail aligns with your vision and goals.
          </h3>

          {/* Bottom Section */}
          <div className="flex flex-col gap-8 border-t border-gray-100 pt-8">
            <p className="text-[#0C0C0C]/60 text-base leading-relaxed max-w-2xl">
              From concept to launch, we craft digital solutions that not only look exceptional but also drive results, building connections that last.
            </p>

            {/* Founder Info */}
            <div className="flex flex-col">
              <span className="text-[#0C0C0C] font-bold text-lg tracking-tight">Annie Bassett</span>
              <span className="text-[#0C0C0C]/60 text-sm font-medium">Project manager and founder</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default QuoteSection;