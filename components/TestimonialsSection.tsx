import React from 'react';

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
    <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
  </svg>
);

const Stars = ({ dark }: { dark?: boolean }) => (
  <div className={`flex gap-1 mb-6 ${dark ? 'text-[#AFFF00]' : 'text-black'}`}>
    {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
  </div>
);

const testimonials = [
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
const TestimonialCard = ({ t, dark }: { t: typeof testimonials[0]; dark: boolean }) => (
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
  return (
    <section className="w-full bg-white py-16 md:py-20 px-6 md:px-12 font-sans border-t border-[#E5E5E5]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Card 1: Intro — White */}
        <div className="relative flex flex-col justify-between p-8 border border-[#E5E5E5] bg-white min-h-[500px] xl:min-h-[600px]">
          <div className="absolute top-8 right-8 w-2.5 h-2.5 border-t-2 border-r-2 border-[#AFFF00]" />
          <div>
            <div className="flex items-start mb-16 text-[#0C0C0C]">
              <span className="font-bebas text-[35px] leading-[0.85em] tracking-[-0.04em]">DRIX MEDIA</span>
              <span className="font-bebas text-[14px] leading-[0.85em] tracking-[-0.04em] ml-0.5 pt-0.5">®</span>
            </div>
            <h2 className="text-5xl md:text-[3.5rem] xl:text-[4rem] font-bold tracking-tighter leading-[0.9] text-[#0C0C0C]">
              Success<br />stories
            </h2>
          </div>
          <p className="text-[#0C0C0C]/60 text-base md:text-lg leading-relaxed text-right mt-auto max-w-[200px] ml-auto">
            Our work speaks for itself, but our clients say it even better.
          </p>
        </div>

        {/* Cards 2–4: alternating Black, White, Black */}
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} dark={i % 2 === 0} />
        ))}

      </div>
    </section>
  );
};

export default TestimonialsSection;
