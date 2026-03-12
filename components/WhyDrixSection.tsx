import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    title: "Integrated Approach",
    description: "We do not hand you off between departments. Your strategist, designer, and content creator work together from day one. The result? A brand that feels consistent everywhere it shows up.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 501 501" fill="none" className="step-icon"><g clipPath="url(#clip0_592_23)"><path d="M501 236.583H430.832C424.041 147.906 353.094 76.9592 264.417 70.1678V0H236.583V70.1678C147.906 76.9592 76.9592 147.906 70.1678 236.583H0V264.417H70.1678C76.9592 353.094 147.906 424.041 236.583 430.832V501H264.417V430.832C353.094 424.041 424.041 353.094 430.832 264.417H501V236.583ZM402.915 236.583H396.625C323.729 236.583 264.417 177.27 264.417 104.375V98.0847C337.73 104.737 396.291 163.27 402.915 236.583ZM331.467 250.5C295.534 266.588 266.588 295.534 250.5 331.467C234.412 295.534 205.466 266.588 169.533 250.5C205.466 234.412 234.412 205.466 250.5 169.533C266.588 205.466 295.534 234.412 331.467 250.5ZM236.583 98.0847V104.375C236.583 177.27 177.27 236.583 104.375 236.583H98.0847C104.737 163.27 163.27 104.709 236.583 98.0847ZM98.0847 264.417H104.375C177.27 264.417 236.583 323.729 236.583 396.625V402.915C163.27 396.263 104.709 337.73 98.0847 264.417ZM264.417 402.915V396.625C264.417 323.729 323.729 264.417 396.625 264.417H402.915C396.263 337.73 337.73 396.291 264.417 402.915Z" fill="currentColor"></path></g><defs><clipPath id="clip0_592_23"><rect width="501" height="501" fill="currentColor"></rect></clipPath></defs></svg>
    )
  },
  {
    title: "Business-First Thinking",
    description: "We are not here to make pretty things. We are here to drive results. Every creative decision connects to a business goal. Every campaign is built to perform.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 501 501" fill="none" className="step-icon"><g clipPath="url(#clip0_592_18)"><path d="M208.75 236.583C158.873 236.583 118.292 196.002 118.292 146.125H90.4583C90.4583 182.392 106.88 214.873 132.654 236.583H0V264.417H132.654C106.88 286.127 90.4583 318.608 90.4583 354.875H118.292C118.292 304.998 158.873 264.417 208.75 264.417V236.583Z" fill="currentColor"></path><path d="M264.417 292.25H236.583C236.583 342.127 196.002 382.708 146.125 382.708V410.542C182.392 410.542 214.873 394.12 236.583 368.346V501H264.417V368.346C286.127 394.12 318.608 410.542 354.875 410.542V382.708C304.998 382.708 264.417 342.127 264.417 292.25Z" fill="currentColor"></path><path d="M236.583 208.75H264.417C264.417 158.873 304.998 118.292 354.875 118.292V90.4583C318.608 90.4583 286.127 106.88 264.417 132.654V0H236.583V132.626C214.873 106.852 182.392 90.4305 146.125 90.4305V118.264C196.002 118.264 236.583 158.845 236.583 208.722V208.75Z" fill="currentColor"></path><path d="M501 236.583H368.374C394.148 214.873 410.542 182.392 410.542 146.125H382.708C382.708 196.002 342.127 236.583 292.25 236.583V264.417C342.127 264.417 382.708 304.998 382.708 354.875H410.542C410.542 318.608 394.12 286.127 368.346 264.417H501V236.583Z" fill="currentColor"></path></g><defs><clipPath id="clip0_592_18"><rect width="501" height="501" fill="currentColor"></rect></clipPath></defs></svg>
    )
  },
  {
    title: "End-to-End Execution",
    description: "From brand strategy to final campaign delivery, we handle it all. You get one team, one process, one point of contact.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 501 501" fill="none" className="step-icon"><g clipPath="url(#clip0_592_7)"><path d="M389.667 0H361.833C361.833 61.4003 311.9 111.333 250.5 111.333H13.9166V139.167H55.6666V180.945H97.4166V139.167H250.5C311.9 139.167 361.833 189.1 361.833 250.5H389.667C389.667 189.1 439.6 139.167 501 139.167V111.333C439.6 111.333 389.667 61.4003 389.667 0ZM375.75 189.879C362.084 161.767 339.233 138.916 311.121 125.25C339.233 111.584 362.084 88.7327 375.75 60.621C389.416 88.7327 412.267 111.584 440.379 125.25C412.267 138.916 389.416 161.767 375.75 189.879Z" fill="currentColor"></path><path d="M55.6666 180.945H13.9166V222.695H55.6666V180.945Z" fill="currentColor"></path><path d="M139.167 180.945H97.4166V222.695H139.167V180.945Z" fill="currentColor"></path><path d="M487.083 389.667V361.833H250.5C189.1 361.833 139.167 311.9 139.167 250.5H111.333C111.333 311.9 61.4003 361.833 0 361.833V389.667C61.4003 389.667 111.333 439.6 111.333 501H139.167C139.167 439.6 189.1 389.667 250.5 389.667H403.583V431.444H445.333V389.667H487.083ZM125.25 440.379C111.584 412.267 88.7327 389.416 60.621 375.75C88.7327 362.084 111.584 339.233 125.25 311.121C138.916 339.233 161.767 362.084 189.879 375.75C161.767 389.416 138.916 412.267 125.25 440.379Z" fill="currentColor"></path><path d="M487.083 431.444H445.333V473.194H487.083V431.444Z" fill="currentColor"></path><path d="M403.583 431.444H361.833V473.194H403.583V431.444Z" fill="currentColor"></path></g><defs><clipPath id="clip0_592_7"><rect width="501" height="501" fill="currentColor"></rect></clipPath></defs></svg>
    )
  },
  {
    title: "No Guessing, Just Data",
    description: "We track what works. We optimize what does not. Every project comes with clear metrics so you know exactly what you are getting.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 501 501" fill="none" className="step-icon"><g clipPath="url(#clip0_592_16)"><path d="M410.542 118.403V76.0963C432.252 101.87 464.733 118.292 501 118.292V90.4583C451.123 90.4583 410.542 49.8773 410.542 0H382.708C382.708 49.8773 342.127 90.4583 292.25 90.4583V118.292C328.517 118.292 360.998 101.87 382.708 76.0963V118.403C382.708 314.016 223.557 473.167 27.9447 473.167H27.8612V0H0V473.167H27.8333V501H500.972V473.167H171.147C311.371 416.359 410.542 278.751 410.542 118.403Z" fill="currentColor"></path></g><defs><clipPath id="clip0_592_16"><rect width="501" height="501" fill="currentColor"></rect></clipPath></defs></svg>
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
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-16 md:pt-20 pb-10 md:pb-6">
        
        {/* UPPER SECTION: The Title and Controls */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 mb-2 md:mb-4 flex flex-col shrink-0">
            
            <div className="flex flex-col items-start gap-4 lg:gap-6">
              <h2 className="text-5xl md:text-[12vh] lg:text-[14vh] mona-sans-condensed-medium tracking-tight leading-[0.95] md:leading-[0.9] text-black">
                Why Brands<br className="hidden md:block"/>
                <span className="inline-flex items-center mt-1">
                  Choose Drix
                  <svg className="ml-2 md:ml-4 w-10 md:w-[6vh] h-10 md:h-[6vh] text-black transform translate-y-[18px] md:translate-y-[3vh] opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="miter">
                    <polyline points="10 16 16 22 22 16"/>
                    <path d="M0 4h16v18"/>
                  </svg>
                </span>
              </h2>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 w-full max-w-4xl pt-2">
                  <div className="w-max shrink-0 scale-90 md:scale-100 origin-left">
                     <ScrambleButtonSecondary href="#about" text="About Us" />
                  </div>
                  
                  <p className="text-black/40 text-[10px] md:text-[12px] poppins-bold tracking-[0.2em] uppercase leading-[1.6]">
                     Design, Develop And Run Any Media Strategy You Need.
                  </p>
              </div>

            </div>
        </div>

        {/* LOWER SECTION: The horizontally scrolling track containing the cards */}
        <div className="w-full h-full flex items-center overflow-visible mt-auto pt-6 min-h-[300px]">
          <motion.div 
              style={{ x }} 
              className="flex gap-6 md:gap-8 w-max pl-[85vw] md:pl-[50vw] lg:pl-[65vw] xl:pl-[75vw]"
          >
            {/* Scrolling Cards */}
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial="inactive"
                whileInView="active"
                viewport={{ margin: "0px -40% 0px -40%", amount: 0.5 }}
                variants={{
                  inactive: { backgroundColor: "#FAFAFA", borderColor: "rgba(0,0,0,0.05)" },
                  active: { backgroundColor: "#0A0A0A", borderColor: "#AFFF00" }
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-[75vw] sm:w-[320px] md:w-[360px] lg:w-[400px] aspect-square flex-shrink-0 rounded-none flex flex-col items-center justify-center border overflow-hidden cursor-default"
              >
                {/* Top Left Number */}
                <motion.span 
                  variants={{
                    inactive: { color: "rgba(0,0,0,0.4)" },
                    active: { color: "#AFFF00" }
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-6 left-6 text-[11px] font-bold tracking-[0.2em]"
                >
                  0{idx + 1}
                </motion.span>

                {/* Centered Content Wrapper (Crossfade) */}
                <div className="absolute inset-0 flex items-center justify-center w-full h-full px-6 md:px-10">
                  
                  {/* Default State: Icon & Title */}
                  <motion.div 
                    variants={{
                      inactive: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
                      active: { opacity: 0, y: -20, scale: 0.95, filter: "blur(4px)" },
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute flex flex-col items-center justify-center gap-5 md:gap-8 w-full"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-black/50 shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5]">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl poppins-medium tracking-tight text-black text-center leading-[1.2]">
                      {feature.title}
                    </h3>
                  </motion.div>

                  {/* Active State: Description (Now large and purely center stage) */}
                  <motion.div
                    variants={{
                      inactive: { opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" },
                      active: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                    className="absolute w-full px-4 md:px-6"
                  >
                    <p className="text-[15px] md:text-[1.1rem] lg:text-[1.2rem] text-white/90 leading-[1.6] md:leading-[1.7] font-medium text-center">
                      {feature.description}
                    </p>
                  </motion.div>
                </div>

                {/* Bottom Center Arrow (Disappears when Active) */}
                <motion.div 
                  variants={{
                    inactive: { opacity: 1, y: 0 },
                    active: { opacity: 0, y: 15 }
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-black/30"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </motion.div>
              </motion.div>
            ))}

            {/* Decorative padding block at the end */}
            <div className="w-[5vw] md:w-[15vw] lg:w-[25vw] xl:w-[40vw] shrink-0"></div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhyDrixSection;
