import React from 'react';

const avatars = [
  "https://framerusercontent.com/images/ZXCpA0RMgk9zRirfK6axVANy0.jpg?width=80&height=80",
  "https://framerusercontent.com/images/WrKcjAfnmz73TNCDVcgUr6Xe1I.jpg?width=80&height=80",
  "https://framerusercontent.com/images/ayt0nYDzrIv9bDydrpvgxci9tQ.jpg?width=80&height=80",
  "https://framerusercontent.com/images/ZckrSs9on0I8ygbtlBrvICVxt0.jpg?width=80&height=80"
];

const stats = [
  { num: "3", title: "Creative thinkers", sub: "and strategists" },
  { num: "7", title: "Skilled developers with", sub: "attention to detail" },
  { num: "9", title: "Experienced designers", sub: "focused on user experience" }
];

const TeamImageSection: React.FC = () => {
  return (
    <section className="w-full bg-white relative">
      <div className="w-full min-h-[85vh] md:h-[110vh] lg:h-[95vh] relative overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div data-framer-background-image-wrapper="true" style={{ position: 'absolute', borderRadius: 'inherit', inset: '0px' }}>
            <img
              decoding="auto"
              loading="lazy"
              sizes="100vw"
              srcSet="https://framerusercontent.com/images/YlEKlxLXS5eEKd4QlVitTh30A.jpg?scale-down-to=512&width=1920&height=1274 512w,https://framerusercontent.com/images/YlEKlxLXS5eEKd4QlVitTh30A.jpg?scale-down-to=1024&width=1920&height=1274 1024w,https://framerusercontent.com/images/YlEKlxLXS5eEKd4QlVitTh30A.jpg?width=1920&height=1274 1920w"
              src="https://framerusercontent.com/images/YlEKlxLXS5eEKd4QlVitTh30A.jpg?width=1920&height=1274"
              alt="Three people sitting on a couch in a room looking at mobile devices"
              style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }}
            />
          </div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 py-10 md:px-12 md:py-16 text-white">

          {/* Top Bar */}
          <div className="flex justify-between items-start w-full">
            {/* Logo */}
            <div className="flex items-start">
              <span className="font-bebas text-[32px] md:text-[50px] leading-[0.85em] tracking-[-0.04em]">DRIX MEDIA</span>
              <span className="font-bebas text-[14px] md:text-[18px] leading-[0.85em] tracking-[-0.04em] ml-0.5 pt-1">®</span>
            </div>

            {/* Avatars */}
            <div className="flex items-center">
              {avatars.map((src, i) => (
                <div key={i} className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] rounded-full border-[3px] border-white overflow-hidden relative z-[1] -ml-3 md:-ml-4 first:ml-0">
                  <img src={src} className="w-full h-full object-cover" alt="Team member" />
                </div>
              ))}
              <div className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] rounded-full border-none bg-[#0C0C0C] flex items-center justify-center relative z-[5] -ml-3 md:-ml-4">
                <span className="text-white text-[13px] md:text-[15px] font-semibold">20+</span>
              </div>
            </div>
          </div>

          {/* Bottom Content Wrapper */}
          <div className="flex flex-col w-full mt-auto">

            {/* Heading Section */}
            <div className="mb-16 md:mb-24 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Meet our team</h2>
              <p className="text-lg md:text-xl leading-relaxed text-white/60 font-medium">
                A diverse group of <span className="text-white">creators, strategists, and developers</span> driven by a shared passion for crafting impactful digital experiences.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/20 mb-8 md:mb-10"></div>

            {/* Stats & CTA Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-0">

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full lg:w-auto">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col relative pt-2">
                    {/* Red Corner Accent */}
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-r-2 border-b-2 border-[#AFFF00] transform -rotate-90"></div>

                    <span className="text-5xl md:text-[54px] font-medium tracking-tighter leading-none mb-3">{stat.num}</span>
                    <div className="flex flex-col text-sm md:text-base leading-tight">
                      <span className="text-white font-medium">{stat.title}</span>
                      <span className="text-white/60">{stat.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a href="#" className="flex items-center gap-4 group mt-4 lg:mt-0 shrink-0">
                <div className="w-12 h-12 flex items-center justify-center text-[#AFFF00] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
                    <path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z"></path>
                  </svg>
                </div>
                <span className="text-white font-medium text-lg">Meet our team</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamImageSection;