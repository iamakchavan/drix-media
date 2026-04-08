import React from 'react';

const StarIcon = ({ color, ...props }: { color: string, [key: string]: any }) => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill={color} className="w-4 h-4 md:w-5 md:h-5" {...props}>
      <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
   </svg>
);

const TestimonialsSection: React.FC = () => {
   return (
      <section className="w-full bg-white py-16 md:py-20 px-6 md:px-12 font-sans border-t border-[#E5E5E5]">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* Card 1: Intro */}
            <div className="relative flex flex-col justify-between p-8 border border-[#E5E5E5] bg-white min-h-[500px] xl:min-h-[600px]">
               {/* Top Right Corner Accent */}
               <div className="absolute top-8 right-8 w-2.5 h-2.5 border-t-2 border-r-2 border-[#AFFF00]"></div>

               <div>
                  {/* Logo */}
                  <div className="flex items-start mb-16 text-[#0C0C0C]">
                     <span className="font-bebas text-[35px] leading-[0.85em] tracking-[-0.04em]">DRIX MEDIA</span>
                     <span className="font-bebas text-[14px] leading-[0.85em] tracking-[-0.04em] ml-0.5 pt-0.5">®</span>
                  </div>

                  {/* Heading */}
                  <h2 className="text-5xl md:text-[3.5rem] xl:text-[4rem] font-bold tracking-tighter leading-[0.9] text-[#0C0C0C]">
                     Success<br />stories
                  </h2>
               </div>

               {/* Description */}
               <p className="text-[#0C0C0C]/60 text-base md:text-lg leading-relaxed text-right mt-auto max-w-[200px] ml-auto">
                  Our work speaks for itself, but our clients say it even better.
               </p>
            </div>

            {/* Card 2: Sarah Morgan (Image Background) */}
            <div className="relative flex flex-col justify-end p-8 min-h-[500px] xl:min-h-[600px] group overflow-hidden bg-gray-900">
               {/* Background Image */}
               <div className="absolute inset-0 z-0">
                  <img
                     src="https://framerusercontent.com/images/LXqiw60wOK1vHnGm0uYyST90q5A.jpg"
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     alt="Sarah Morgan"
                  />
                  {/* Dark-to-Lime Gradient Overlay for brand alignment */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#AFFF00]/20 to-transparent"></div>
               </div>

               <div className="relative z-10 flex flex-col">
                  <blockquote className="text-white text-xl md:text-2xl font-medium tracking-tight leading-tight mb-8">
                     "They helped us shape our brand identity from scratch, giving us a website that perfectly reflects our values."
                  </blockquote>

                  <div className="flex flex-col border-t border-white/40 pt-6">
                     <cite className="not-italic text-white font-bold text-lg tracking-tight">Sarah Morgan</cite>
                     <span className="text-white/80 text-sm font-medium">Founder of a Tech Startup</span>
                  </div>
               </div>
            </div>

            {/* Card 3: Anna Karenina (Black Card) */}
            <div className="relative flex flex-col justify-between p-8 bg-[#0C0C0C] min-h-[500px] xl:min-h-[600px]">
               <div className="flex flex-col h-full justify-between">
                  <div>
                     {/* Stars */}
                     <div className="flex gap-1 text-[#AFFF00] mb-8">
                        {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} color="currentColor" />)}
                     </div>

                     <blockquote className="text-white text-xl md:text-2xl font-medium tracking-tight leading-tight mb-8">
                        "We needed a full rebranding, and this agency delivered beyond our expectations. From the new logo to the website design, everything feels cohesive and professional."
                     </blockquote>
                  </div>

                  <div className="mt-auto">
                     {/* Stats Row */}
                     <div className="flex gap-8 mb-10 border-t border-white/10 pt-8">
                        <div className="flex flex-col">
                           <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">+28%</span>
                           <span className="text-white/60 text-xs md:text-sm font-medium mt-1">Customer retention</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">+61%</span>
                           <span className="text-white/60 text-xs md:text-sm font-medium mt-1">Conversion rate</span>
                        </div>
                     </div>

                     {/* Author */}
                     <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                        <div className="w-[48px] h-[48px] rounded-full overflow-hidden shrink-0 bg-gray-800">
                           <img src="https://framerusercontent.com/images/aWcD3Iz6LWFQERknQy3rwYGQBI.jpg?width=134&height=134" className="w-full h-full object-cover" alt="Anna Karenina" />
                        </div>
                        <div className="flex flex-col">
                           <cite className="not-italic text-white font-bold text-base tracking-tight">Anna Karenina</cite>
                           <span className="text-white/60 text-xs font-medium">Owner of a clothing E-commerce store</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Card 4: Andy Styles (Stats) */}
            <div className="relative flex flex-col justify-between p-8 bg-[#F5F5F5] min-h-[500px] xl:min-h-[600px]">
               <div className="flex flex-col h-full justify-between">
                  <div>
                     {/* Stars */}
                     <div className="flex gap-1 text-[#0C0C0C] mb-8">
                        {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} color="currentColor" />)}
                     </div>

                     <blockquote className="text-[#0C0C0C] text-xl md:text-2xl font-medium tracking-tight leading-tight mb-8">
                        "Working with this team was a pleasure! Our sales increased by 30% in the first month. Thank you for the amazing job!"
                     </blockquote>
                  </div>

                  <div className="mt-auto">
                     {/* Stats Row */}
                     <div className="flex gap-8 mb-10 border-t border-black/10 pt-8">
                        <div className="flex flex-col">
                           <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#0C0C0C]">+11%</span>
                           <span className="text-[#0C0C0C]/60 text-xs md:text-sm font-medium mt-1">Customer retention</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#0C0C0C]">+52%</span>
                           <span className="text-[#0C0C0C]/60 text-xs md:text-sm font-medium mt-1">Conversion rate</span>
                        </div>
                     </div>

                     {/* Author */}
                     <div className="flex items-center gap-4 pt-6 border-t border-black/10">
                        <div className="w-[48px] h-[48px] rounded-full overflow-hidden shrink-0 bg-gray-300">
                           <img src="https://framerusercontent.com/images/nDtXYMMvDJ6YMQxXZSaJjxXSb8c.jpg" className="w-full h-full object-cover" alt="Andy Styles" />
                        </div>
                        <div className="flex flex-col">
                           <cite className="not-italic text-[#0C0C0C] font-bold text-base tracking-tight">Andy Styles</cite>
                           <span className="text-[#0C0C0C]/60 text-xs font-medium">Founder of a Tech Startup</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </section>
   );
};

export default TestimonialsSection;