import React, { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, tags, className }) => {
  return (
    <div className={`flex flex-col group cursor-pointer ${className}`}>
      {/* Image Container */}
      <div className="w-full aspect-[4/3] bg-[#F3F3F3] rounded-sm overflow-hidden mb-6 relative z-10">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Optional overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start z-10 bg-white/0">
        <h3 className="text-2xl font-bold text-black mb-2 tracking-tight">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-md">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 rounded-full border border-gray-200 text-[10px] font-bold uppercase tracking-wider text-black bg-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SelectedWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerTransform, setHeaderTransform] = useState({ opacity: 1, scale: 1 });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress based on how far the section has scrolled up
      // We start fading when the section top is at viewport top (0)
      // and continue until some point (e.g., 50% of viewport height scrolled)
      
      // rect.top is position of section top relative to viewport.
      // It starts positive (below view), becomes 0 (at top), then negative (scrolled past).
      
      // We want the effect to trigger as we scroll INTO the section (sticky phase).
      if (rect.top <= 0) {
        const scrolled = Math.abs(rect.top);
        const fadeDistance = viewportHeight * 0.8; // Distance over which fade occurs
        
        const progress = Math.min(scrolled / fadeDistance, 1);
        
        // Scale down slightly (1 -> 0.85)
        const scale = 1 - (progress * 0.15);
        // Fade opacity (1 -> 0.2) - don't fully disappear so it can be seen behind
        const opacity = 1 - (progress * 0.8);
        
        setHeaderTransform({ opacity, scale });
      } else {
         setHeaderTransform({ opacity: 1, scale: 1 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white">
        {/* Sticky Header Wrapper */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-0 pointer-events-none">
             <div 
                className="relative flex flex-col items-center text-center transition-transform duration-75 ease-linear will-change-transform"
                style={{ 
                    opacity: headerTransform.opacity, 
                    transform: `scale(${headerTransform.scale})` 
                }}
             >
                {/* Top Label */}
                <div className="flex items-center gap-2 mb-6">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-black">
                        <path d="M2 12h20M16 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">Selected Work</span>
                </div>

                {/* Main Title */}
                <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter text-black leading-[0.95] z-10">
                    Selected Work
                </h2>

                {/* 2K24 Floating Badge */}
                <span className="absolute top-[60%] right-[0%] md:right-[-10%] translate-x-full md:translate-x-0 text-xl md:text-2xl font-bold text-gray-300 select-none z-0">
                    2K24
                </span>
            </div>
        </div>

        {/* Content Wrapper - Grid */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-32 -mt-[20vh]">
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                
                {/* Left Column */}
                <div className="flex flex-col gap-24 pt-24 md:pt-0">
                    <ProjectCard 
                        image="https://images.unsplash.com/photo-1542393545-facac3a5097f?q=80&w=1600&auto=format&fit=crop"
                        title="Radiant skincare branding"
                        description="Radiant skincare is offering a user-centric, ad-free platform for beauty enthusiasts."
                        tags={['Branding', 'Web Design']}
                    />
                    
                    <ProjectCard 
                        image="https://images.unsplash.com/photo-1589254065878-42c9da9e2f58?q=80&w=1600&auto=format&fit=crop"
                        title="Vero app development"
                        description="Vero aimed to distinguish itself in a competitive social media landscape."
                        tags={['Branding', 'Development', 'Web Design']}
                    />

                     <ProjectCard 
                        image="https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1600&auto=format&fit=crop"
                        title="Stoyo branding"
                        description="Visual identity and packaging design for a Stoyo brand."
                        tags={['Branding', 'Support']}
                    />
                </div>

                {/* Right Column - Staggered */}
                <div className="flex flex-col gap-24 md:pt-40">
                    <ProjectCard 
                        image="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=1600&auto=format&fit=crop"
                        title="Apex clothing Co. rebrand"
                        description="Bold new look for an eco-conscious apparel brand."
                        tags={['Branding', 'Development']}
                    />

                    <ProjectCard 
                        image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop"
                        title="Timeless Impressions redesign"
                        description="Redesigning the digital presence for a luxury watch retailer."
                        tags={['Web Design', 'Support']}
                    />

                    {/* All Cases Link */}
                    <div className="flex justify-end md:justify-start pt-12">
                        <a href="#" className="flex items-center gap-4 group">
                            <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300 bg-white">
                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-black group-hover:text-white transition-colors duration-300">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className="text-3xl md:text-5xl font-medium tracking-tight text-black">
                                All cases
                            </span>
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </section>
  );
};

export default SelectedWorkSection;