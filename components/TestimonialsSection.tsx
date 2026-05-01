import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StarIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
    <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
  </svg>
);

interface Testimonial {
  category: string;
  quote: string;
  stats: { value: string; label: string; }[];
  name: string;
  role: string;
  avatar: string | null;
}

const Stars = ({ dark }: { dark?: boolean }) => (
  <div className={`flex gap-1 mb-6 ${dark ? 'text-[#AFFF00]' : 'text-black'}`}>
    {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
  </div>
);

const testimonials: Testimonial[] = [
  {
    category: 'Marketing',
    quote: '"We needed more than visibility, we needed results. The strategy brought clarity, direction, and real growth. Every campaign felt purposeful and performance-driven."',
    stats: [{ value: '+32%', label: 'Lead Generation' }, { value: '+24%', label: 'Engagement Rate' }],
    name: 'Aman Singh Chauhan',
    role: 'Director, Central Square',
    avatar: null,
  },
  {
    category: 'Designing',
    quote: '"The design wasn\'t just aesthetic, it was intuitive. Clean, seamless, and built to convert. It completely changed how users interact with our brand."',
    stats: [{ value: '+35%', label: 'User Retention' }, { value: '+48%', label: 'Conversion Rate' }],
    name: 'Ankita',
    role: 'Director, AlphaQuark',
    avatar: null,
  },
  {
    category: 'Photography/Videography',
    quote: '"The visuals didn\'t just look good but they told a story. Every frame captured the brand perfectly and elevated our presence across platforms."',
    stats: [{ value: '+25%', label: 'Engagement on Visual Posts' }, { value: '1.5x', label: 'Saves on Reels' }],
    name: 'Aman Seth',
    role: 'Founder, Content Alley',
    avatar: null,
  },
];

// Card component — alternates bg based on index (0=white,1=black,2=white,3=black)
interface TestimonialCardProps {
  t: Testimonial;
  dark: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ t, dark }) => (
  <div className={`relative flex flex-col justify-between p-8 min-h-[500px] xl:min-h-[600px] ${dark ? 'bg-[#0C0C0C]' : 'bg-[#F5F5F5]'}`}>
    <div className="flex flex-col h-full justify-between">
      <div>
        <Stars dark={dark} />
        <span className={`text-[10px] font-mono tracking-[0.25em] uppercase mb-4 block ${dark ? 'text-white/30' : 'text-black/30'}`}>
          {t.category}
        </span>
        <blockquote className={`text-xl md:text-2xl font-medium tracking-tight leading-tight mb-8 ${dark ? 'text-white' : 'text-[#0C0C0C]'}`}>
          {t.quote}
        </blockquote>
      </div>

      <div className="mt-auto">
        {/* Stats */}
        <div className={`flex gap-8 mb-8 border-t pt-6 ${dark ? 'border-white/10' : 'border-black/10'}`}>
          {t.stats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className={`text-3xl md:text-4xl font-bold tracking-tight ${dark ? 'text-white' : 'text-[#0C0C0C]'}`}>{s.value}</span>
              <span className={`text-xs md:text-sm font-medium mt-1 ${dark ? 'text-white/50' : 'text-black/50'}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Author */}
        <div className={`flex items-center gap-3 pt-5 border-t ${dark ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${dark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
            {t.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <cite className={`not-italic font-bold text-base tracking-tight ${dark ? 'text-white' : 'text-[#0C0C0C]'}`}>{t.name}</cite>
            <span className={`text-xs font-medium ${dark ? 'text-white/50' : 'text-black/50'}`}>{t.role}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 font-sans border-t border-[#E5E5E5] overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* Card 1: Intro — Preserving Desktop 'Split' while keeping Mobile 'Tight' */}
                    <div className="relative flex flex-col justify-between p-7 md:p-8 border border-[#E5E5E5] bg-white min-h-0 md:min-h-[500px] xl:min-h-[600px]">
                        <div className="absolute top-7 md:top-8 right-7 md:right-8 w-2 h-2 md:w-2.5 md:h-2.5 border-t-2 border-r-2 border-[#AFFF00]" />
                        
                        <div className="flex flex-col gap-4 md:block">
                            <div className="flex items-start md:mb-16 text-[#0C0C0C]">
                                <span className="font-bebas text-[28px] md:text-[35px] leading-[0.85em] tracking-[-0.04em]">DRIX MEDIA</span>
                                <span className="font-bebas text-[11px] md:text-[14px] leading-[0.85em] tracking-[-0.04em] ml-0.5 pt-0.5">®</span>
                            </div>
                            <h2 className="text-[38px] sm:text-[42px] md:text-[3.5rem] xl:text-[4rem] font-bold tracking-tighter leading-[0.9] text-[#0C0C0C]">
                                Success<br />stories
                            </h2>
                            
                            {/* Mobile Tagline (Part of the group) */}
                            <p className="md:hidden text-[#0C0C0C]/50 text-[14px] leading-snug text-left">
                                Our work speaks for itself, but our clients say it even better.
                            </p>
                        </div>

                        {/* Desktop Tagline (Anchored to bottom) */}
                        <p className="hidden md:block text-[#0C0C0C]/60 text-lg leading-relaxed text-right md:max-w-[200px] md:ml-auto">
                            Our work speaks for itself, but our clients say it even better.
                        </p>
                    </div>

                    {/* Testimonials Container */}
                    <div className="xl:col-span-3">
                        {/* Desktop: Grid Display */}
                        <div className="hidden xl:grid grid-cols-3 gap-6 h-full">
                            {testimonials.map((t, i) => (
                                <TestimonialCard key={i} t={t} dark={i % 2 === 0} />
                            ))}
                        </div>

                        {/* Mobile/Tablet: Carousel Display */}
                        <div className="xl:hidden mt-8">
                            <div className="relative">
                                <motion.div
                                    className="flex gap-6 cursor-grab active:cursor-grabbing"
                                    drag="x"
                                    dragConstraints={{ right: 0, left: -((testimonials.length - 1) * 320) }}
                                    onDragEnd={(_, info) => {
                                        if (info.offset.x < -100 && currentIndex < testimonials.length - 1) {
                                            setCurrentIndex(currentIndex + 1);
                                        } else if (info.offset.x > 100 && currentIndex > 0) {
                                            setCurrentIndex(currentIndex - 1);
                                        }
                                    }}
                                >
                                    {testimonials.map((t, i) => (
                                        <div key={i} className="min-w-[300px] sm:min-w-[350px] w-full">
                                            <TestimonialCard t={t} dark={i % 2 === 0} />
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Pagination Dots */}
                                <div className="flex justify-center gap-2 mt-8">
                                    {testimonials.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-8 bg-black' : 'w-2 bg-black/10'}`}
                                        />
                                    ))}
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
