import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="w-full bg-white text-[#0C0C0C] py-24 px-6 md:px-12 font-sans border-t border-[#E5E5E5]">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-24">
        
        {/* TOP SECTION */}
        <div className="flex flex-col xl:flex-row justify-between gap-16 xl:gap-0">
          
          {/* 1. Logo Section (Left) */}
          <div className="flex-shrink-0">
             <div className="flex items-start leading-[0.82] select-none">
                <h1 className="font-bebas text-[90px] md:text-[130px] xl:text-[150px] tracking-[-0.04em] text-[#0B0B0C]">DRIX MEDIA</h1>
                <span className="font-bebas text-[18px] md:text-[24px] mt-6 md:mt-8 ml-2 tracking-[-0.04em]">®</span>
             </div>
          </div>

          {/* 2. Newsletter & Links Wrapper (Right) */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-32 w-full xl:w-auto xl:justify-end">
             
             {/* Newsletter */}
             <div className="flex flex-col gap-6 max-w-sm w-full">
                <div className="flex flex-col gap-2">
                   <h3 className="font-semibold text-lg tracking-tight">Stay connected</h3>
                   <p className="text-[#0C0C0C]/60 text-sm leading-relaxed">
                      Join our newsletter and stay updated on the latest trends in digital design
                   </p>
                </div>
                
                <form className="relative w-full flex items-center" onSubmit={(e) => e.preventDefault()}>
                    <input 
                      type="email" 
                      placeholder="E-mail" 
                      className="w-full bg-transparent border-b-2 border-black/10 py-3 text-[#0C0C0C] placeholder-black/40 focus:outline-none focus:border-black transition-colors"
                    />
                    <button 
                      type="submit"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#F9452D] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                      aria-label="Subscribe"
                    >
                       <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                          <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
                       </svg>
                    </button>
                </form>
             </div>

             {/* Links */}
             <div className="flex gap-16 md:gap-24">
                {/* Nav */}
                <div className="flex flex-col gap-3">
                   {['About', 'Projects', 'Blog', 'Contact', 'Privacy Policy', 'Terms of Service', '404'].map(link => (
                      <a key={link} href={`./${link.toLowerCase().replace(/ /g, '-')}`} className="text-[#0C0C0C] hover:text-[#F9452D] transition-colors font-medium text-sm md:text-base">
                        {link}
                      </a>
                   ))}
                </div>
                {/* Socials */}
                <div className="flex flex-col gap-3">
                   {['Twitter', 'Behance', 'Instagram', 'Dribbble'].map(link => (
                      <a key={link} href="#" target="_blank" rel="noopener noreferrer" className="text-[#0C0C0C] hover:text-[#F9452D] transition-colors font-medium text-sm md:text-base">
                        {link}
                      </a>
                   ))}
                </div>
             </div>

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 xl:gap-0 pt-0">
           
           {/* Contact */}
           <div className="flex flex-col gap-1">
              <a href="tel:555-666-7777" className="text-[#0C0C0C] font-medium text-lg hover:text-[#F9452D] transition-colors">(510) 895-6500</a>
              <a href="mailto:hello@drixmedia.com" className="text-[#0C0C0C] font-semibold text-2xl md:text-3xl tracking-tight hover:text-[#F9452D] transition-colors">hello@drixmedia.com</a>
           </div>

           {/* Description */}
           <div className="max-w-md xl:mx-auto xl:text-center">
              <p className="text-[#0C0C0C]/60 text-sm md:text-base leading-relaxed">
                 With DRIX MEDIA, your company gets more than just a website. We design experiences that resonate with your customers and drive meaningful engagement.
              </p>
           </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;