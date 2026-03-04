import React from 'react';

const EyeSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center py-24 px-6 md:px-12">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
             <img
                decoding="auto"
                loading="lazy"
                src="https://framerusercontent.com/images/rp4zyOdeyfzpa7PQUF4DNepU80.jpg"
                alt="Eye background"
                className="w-full h-full object-cover opacity-50" 
             />
             {/* Gradient overlay to ensure text readability */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
        </div>

        {/* Top Right Label */}
        <div className="absolute top-10 right-6 md:right-12 z-20 flex items-center gap-3">
             <div className="w-2.5 h-2.5 border-t-[2px] border-r-[2px] border-[#F9452D]"></div>
             <span className="text-white text-xs font-bold uppercase tracking-widest">Contact Us</span>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1600px] w-full flex flex-col justify-center items-start h-full pt-20">
            
            {/* Headline */}
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] xl:text-[8rem] font-bold tracking-tighter text-white mb-24 md:mb-32 leading-[0.85] text-left">
                Ready to Build Something That Works?
            </h2>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-32 items-end w-full">
                
                {/* Left Column: Info */}
                <div className="flex flex-col max-w-lg">
                    <p className="text-white/60 text-lg md:text-xl leading-relaxed font-medium mb-12">
                        Book a free strategy call and let's talk about where your brand can go.
                    </p>
                </div>

                {/* Right Column: Form */}
                <form className="flex flex-col gap-6 w-full" onSubmit={(e) => e.preventDefault()}>
                    {/* Name */}
                    <div className="group relative">
                        <input 
                            type="text" 
                            required 
                            placeholder="Name *" 
                            className="w-full bg-transparent border-b border-white/30 py-4 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors duration-300 text-lg"
                        />
                    </div>
                    {/* Email */}
                    <div className="group relative">
                        <input 
                            type="email" 
                            required 
                            placeholder="E-mail *" 
                            className="w-full bg-transparent border-b border-white/30 py-4 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors duration-300 text-lg"
                        />
                    </div>
                    {/* Message */}
                    <div className="group relative">
                        <textarea 
                            placeholder="Message (Tell us about your project)" 
                            className="w-full bg-transparent border-b border-white/30 py-4 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors duration-300 text-lg resize-none h-[60px] min-h-[60px]"
                        />
                    </div>

                    {/* Button */}
                    <div className="mt-8">
                        <button type="submit" className="flex items-center gap-4 group text-white hover:text-[#F9452D] transition-colors">
                             <div className="w-5 h-5 text-[#F9452D] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
                                    <path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z"></path>
                                </svg>
                             </div>
                             <span className="font-bold text-lg">Get in touch</span>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </section>
  );
};

export default EyeSection;
