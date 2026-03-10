import React from 'react';

const Footer: React.FC = () => {
   return (
      <footer id="footer" className="w-full bg-white text-black pt-16 md:pt-20 pb-8 px-6 md:px-12 font-sans overflow-hidden border-t border-black/5 min-h-[600px] flex flex-col">
         <div className="max-w-[1600px] mx-auto w-full flex-grow flex flex-col">

            {/* TOP CONTENT WRAPPER - GROW TO PUSH LEGAL DOWN */}
            <div className="flex-grow">
               {/* LOGO SECTION - ELEGANT & COMPACT */}
               <div className="mb-10">
                  <div className="flex items-start leading-[0.82] select-none group cursor-default">
                     <h1 className="font-bebas text-[32px] md:text-[36px] lg:text-[42px] tracking-[-0.04em] text-black group-hover:text-[#476D07] transition-colors duration-500">DRIX MEDIA</h1>
                     <span className="font-bebas text-[10px] md:text-[12px] mt-1 md:mt-1.5 ml-1 tracking-[-0.04em]">®</span>
                  </div>
               </div>

               {/* TOP GRID: INFO - LINKS - NEWSLETTER */}
               <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-32 border-b border-black/5">

                  {/* 1. Description & Contact (Col 1-4) */}
                  <div className="md:col-span-4 flex flex-col justify-between">
                     <div className="max-w-sm">
                        <p className="text-black/50 text-sm md:text-base leading-relaxed mb-8">
                           With DRIX MEDIA, your company gets more than just a website. We design experiences that resonate with your customers and drive meaningful engagement.
                        </p>

                        <div className="flex flex-col gap-1.5">
                           <span className="text-[10px] font-black tracking-widest text-black/20 uppercase mb-1">Get in touch</span>
                           <a href="tel:5108956500" className="text-lg font-bold hover:text-[#476D07] transition-colors leading-none">(510) 895-6500</a>
                           <a href="mailto:hello@drixmedia.com" className="text-lg font-bold hover:text-[#476D07] transition-colors leading-none mt-1">hello@drixmedia.com</a>
                        </div>
                     </div>
                  </div>

                  {/* 2. Links & Socials (Col 5-8) */}
                  <div className="md:col-span-4 grid grid-cols-2 gap-8 lg:px-12">
                     <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-black tracking-widest text-black/20 uppercase mb-1">Explore</span>
                        {['About', 'Services', 'Careers', 'Projects', 'Blog', 'Contact'].map(link => (
                           <a key={link} href={`./${link.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-bold hover:text-[#476D07] transition-colors opacity-80 hover:opacity-100">
                              {link}
                           </a>
                        ))}
                     </div>
                     <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-black tracking-widest text-black/20 uppercase mb-1">Social</span>
                        {['Twitter', 'Behance', 'Instagram', 'Dribbble'].map(link => (
                           <a key={link} href="#" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-[#476D07] transition-colors opacity-80 hover:opacity-100">
                              {link}
                           </a>
                        ))}
                     </div>
                  </div>

                  {/* 3. Newsletter (Col 9-12) */}
                  <div className="md:col-span-4 flex flex-col">
                     <span className="text-[10px] font-black tracking-widest text-black/20 uppercase mb-6">Connect</span>
                     <div className="flex flex-col gap-2 mb-8">
                        <h3 className="font-bold text-base tracking-tight">Stay connected</h3>
                        <p className="text-black/40 text-xs md:text-sm leading-relaxed max-w-xs">
                           Join our newsletter and stay updated on the latest trends in digital design
                        </p>
                     </div>

                     <form className="relative w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
                        <input
                           type="email"
                           placeholder="E-mail"
                           className="w-full bg-white border-b border-black/10 py-3 text-black placeholder-black/20 focus:outline-none focus:border-black transition-colors font-medium text-sm"
                        />
                        <button
                           type="submit"
                           className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#AFFF00] rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-sm"
                           aria-label="Subscribe"
                        >
                           <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor">
                              <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
                           </svg>
                        </button>
                     </form>
                  </div>
               </div>
            </div>

            {/* BOTTOM: LEGAL - PUSHED TO ABSOLUTE BOTTOM */}
            <div className="py-2 flex justify-between items-center opacity-30 mt-auto">
               <span className="text-[9px] font-black tracking-widest uppercase">Privacy Policy</span>
               <span className="text-[9px] font-black tracking-widest uppercase">© {new Date().getFullYear()} DRIX</span>
               <span className="text-[9px] font-black tracking-widest uppercase">Terms of Service</span>
            </div>
         </div>
      </footer>
   );
};

export default Footer;