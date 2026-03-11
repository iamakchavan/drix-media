import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    title: "Integrated Approach",
    description: "We do not hand you off between departments. Your strategist, designer, and content creator work together from day one. The result? A brand that feels consistent everywhere it shows up.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
        <path d="M245.83,121.63a15.53,15.53,0,0,0-9.52-7.33,73.51,73.51,0,0,0-22.17-2.22c4-19.85,1-35.55-2.06-44.86a16.15,16.15,0,0,0-18.79-10.88,85.53,85.53,0,0,0-28.55,12.12,94.58,94.58,0,0,0-27.11-33.25,16.05,16.05,0,0,0-19.26,0A94.48,94.48,0,0,0,91.26,68.46,85.53,85.53,0,0,0,62.71,56.34,16.15,16.15,0,0,0,43.92,67.22c-3,9.31-6,25-2.06,44.86a73.51,73.51,0,0,0-22.17,2.22,15.53,15.53,0,0,0-9.52,7.33,16,16,0,0,0-1.6,12.27c3.39,12.57,13.8,36.48,45.33,55.32S113.13,208,128,208s42.67,0,74.2-18.78c31.53-18.84,41.94-42.75,45.33-55.32A16,16,0,0,0,245.83,121.63ZM59.14,72.14a.2.2,0,0,1,.23-.15A70.43,70.43,0,0,1,85.18,83.66,118.65,118.65,0,0,0,80,119.17c0,18.74,3.77,34,9.11,46.28A123.59,123.59,0,0,1,69.57,140C51.55,108.62,55.33,84,59.14,72.14Zm3,103.35C35.47,159.57,26.82,140.05,24,129.7a59.82,59.82,0,0,1,22.5-1.17,129.08,129.08,0,0,0,9.15,19.41,142.28,142.28,0,0,0,34,39.56A114.92,114.92,0,0,1,62.1,175.49ZM128,190.4c-9.33-6.94-32-28.23-32-71.23C96,76.7,118.38,55.24,128,48c9.62,7.26,32,28.72,32,71.19C160,162.17,137.33,183.46,128,190.4Zm66.49-2.91a142.28,142.28,0,0,0,34-39.56,129.08,129.08,0,0,0,9.15-19.41A59.82,59.82,0,0,1,260.08,129.7c-2.86,10.35-11.51,29.87-38.18,45.79A114.92,114.92,0,0,1,194.46,187.49Zm-8-47.52c5.34-12.26,9.11-27.54,9.11-46.28a118.65,118.65,0,0,0-5.18-35.51,70.43,70.43,0,0,1,25.81-11.67.2.2,0,0,1,.23.15C200.67,84,204.45,108.62,186.43,140Z"></path>
      </svg>
    )
  },
  {
    title: "Business-First Thinking",
    description: "We are not here to make pretty things. We are here to drive results. Every creative decision connects to a business goal. Every campaign is built to perform.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
        <path d="M240,120h-8V88a16,16,0,0,0-16-16H176V64a16,16,0,0,0-16-16H96A16,16,0,0,0,80,64v8H40A16,16,0,0,0,24,88v32H16a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H80v8a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16v-8h40a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM96,64h64v8H96ZM40,88H216v32H192v-8a16,16,0,0,0-16-16H80a16,16,0,0,0-16,16v8H40Zm40,32h96v32H80Zm80,72H96v-8h64ZM216,168H176v-8a16,16,0,0,0-16-16H96a16,16,0,0,0-16,16v8H40V136H64v8a16,16,0,0,0,16,16h96a16,16,0,0,0,16-16v-8h24Z"></path>
      </svg>
    )
  },
  {
    title: "End-to-End Execution",
    description: "From brand strategy to final campaign delivery, we handle it all. You get one team, one process, one point of contact.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Zm88,0a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h24V72a8,8,0,0,1,16,0v32A8,8,0,0,1,128,112Z"></path>
      </svg>
    )
  },
  {
    title: "No Guessing, Just Data",
    description: "We track what works. We optimize what does not. Every project comes with clear metrics so you know exactly what you are getting.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
        <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31l-56,56V200H224A8,8,0,0,1,232,208Z"></path>
      </svg>
    )
  }
];

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
      className="group relative flex items-center justify-center bg-transparent border border-black/20 h-[50px] md:h-[56px] px-8 md:px-10 transition-colors duration-500 overflow-hidden"
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


const WhyDrixSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Dynamically computes the perfect horizontal scroll distance for ANY screen size
  // Framer Motion automatically interpolates these matched string formats
  const x = useTransform(scrollYProgress, [0, 1], ["calc(0% - 0vw)", "calc(-100% + 100vw)"]);

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-white text-black selection:bg-black selection:text-[#AFFF00]">
      {/* Container that sticks to the viewport while you scroll through height */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-16 md:pt-20 pb-4 md:pb-6">
        
        {/* UPPER SECTION: The Title and Controls */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 mb-2 md:mb-4 flex flex-col shrink-0">
            
            <div className="flex flex-col items-start gap-4 lg:gap-6">
              <h2 className="text-[10vh] md:text-[12vh] lg:text-[14vh] font-medium tracking-tight leading-[0.9] text-black">
                Why Brands<br className="hidden md:block"/>
                <span className="inline-flex items-center mt-1">
                  Choose Drix
                  <svg className="ml-3 md:ml-4 w-[6vh] h-[6vh] text-black transform translate-y-1 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="10 15 15 20 20 15"/>
                    <path d="M4 4h7a4 4 0 0 1 4 4v12"/>
                  </svg>
                </span>
              </h2>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 w-full max-w-4xl pt-2">
                  <div className="w-max shrink-0 scale-90 md:scale-100 origin-left">
                     <ScrambleButtonSecondary href="#about" text="About Us" />
                  </div>
                  
                  <p className="text-black/40 text-[10px] md:text-[12px] font-bold tracking-[0.2em] uppercase leading-[1.6]">
                     Design, Develop And Run Any Media Strategy You Need.
                  </p>
              </div>

            </div>
        </div>

        {/* LOWER SECTION: The horizontally scrolling track containing the cards */}
        <div className="w-full h-full flex items-center overflow-visible mt-auto pt-6 min-h-[300px]">
          <motion.div 
              style={{ x }} 
              className="flex gap-6 md:gap-8 w-max pl-6 md:pl-[35vw] lg:pl-[42vw] xl:pl-[46vw]"
          >
            {/* Scrolling Cards */}
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="w-[85vw] sm:w-[400px] md:w-[450px] lg:w-[480px] flex-shrink-0 bg-[#FAFAFA] rounded-none p-6 md:p-8 flex flex-col justify-between h-[45vh] min-h-[260px] border border-black/10 transition-colors duration-500 hover:bg-white group"
              >
                {/* Top: Title */}
                <h3 className="text-[3vh] md:text-[3.5vh] font-medium tracking-tight text-black leading-[1.1] pr-4 mb-2">
                  {feature.title}
                </h3>

                {/* Bottom: Line, Desc, Icon */}
                <div className="flex flex-col items-start mt-auto">
                  <div className="w-6 h-[2px] bg-black/10 mb-3 md:mb-4 shrink-0"></div>
                  <p className="text-[1.8vh] md:text-[2vh] text-black/50 leading-relaxed font-medium mb-4 md:mb-6 line-clamp-3 shrink-0">
                    {feature.description}
                  </p>
                  <div className="w-[5vh] h-[5vh] min-w-[32px] min-h-[32px] rounded-lg bg-[#f0f0f0] flex items-center justify-center text-black/70 group-hover:bg-[#AFFF00] group-hover:text-black transition-colors shrink-0">
                    {feature.icon}
                  </div>
                </div>
              </div>
            ))}

            {/* Decorative padding block at the end */}
            <div className="w-[10vw]"></div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhyDrixSection;
