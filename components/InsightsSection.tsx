import React from 'react';

const InsightsSection: React.FC = () => {
  const posts = [
    {
      id: 1,
      date: "Nov 18, 2024",
      title: "Why your website’s user experience is its greatest asset",
      image: "https://framerusercontent.com/images/eLsR49HoCXz2B9KTFAhtjD454Dw.jpg",
      link: "./blog/why-your-website-s-user-experience-is-its-greatest-asset"
    },
    {
      id: 2,
      date: "Nov 12, 2024",
      title: "Why Mobile-First Design is Crucial for Modern Websites",
      image: "https://framerusercontent.com/images/YwZXC7WBw8DhkeoDpMTFdnuDkUs.jpg",
      link: "./blog/why-mobile-first-design-is-crucial-for-modern-websites"
    },
    {
      id: 3,
      date: "Nov 9, 2024",
      title: "How to create a website that truly connects with your audience",
      image: "https://framerusercontent.com/images/ay4iyRplEAS9RmR0mwxFi39oVE.jpg",
      link: "./blog/how-to-create-a-website-that-truly-connects-with-your-audience"
    }
  ];

  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 font-sans border-t border-[#E5E5E5]">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="flex-1">
                <h2 className="text-5xl md:text-[5.5rem] leading-[0.9] font-bold tracking-tighter text-[#0C0C0C]">
                    Latest Insights
                </h2>
            </div>

            <div className="flex flex-col items-start gap-8 max-w-sm shrink-0">
                <p className="text-[#0C0C0C]/60 text-base leading-relaxed">
                    Explore industry news and creative strategies to keep your website ahead of the curve.
                </p>
                
                <a href="./blog" className="flex items-center gap-3 group">
                     <div className="text-[#F9452D] w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                        <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
                            <path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z"></path>
                        </svg>
                     </div>
                     <span className="font-medium text-base text-black group-hover:opacity-70 transition-opacity">Check out more</span>
                </a>
            </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* First Column (Big Post) */}
            <div className="flex flex-col h-full">
                 <ArticleCard post={posts[0]} isMain={true} />
            </div>

            {/* Second Column (Two Stacked Posts) */}
            <div className="flex flex-col gap-12 h-full">
                 <ArticleCard post={posts[1]} />
                 <ArticleCard post={posts[2]} />
            </div>
            
        </div>

      </div>
    </section>
  );
};

const ArticleCard = ({ post, isMain = false }: { post: any, isMain?: boolean }) => (
    <a href={post.link} className={`group flex flex-col h-full ${isMain ? 'gap-8' : 'gap-6'} cursor-pointer`}>
        {/* Image Wrapper */}
        <div className="relative w-full overflow-hidden bg-gray-100 aspect-[16/10]">
             <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             {/* Red Corner Accent */}
             {/* Snippet specifies border-bottom-width: 2px, border-right-width: 2px, rotated -90deg */}
             {/* This creates a top-right corner effect */}
             <div className="absolute top-6 right-6 z-10 w-4 h-4 border-b-[2px] border-r-[2px] border-[#F9452D] transform -rotate-90"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow items-start justify-between gap-6">
             <div className="flex flex-col gap-3">
                 <span className="text-[#0C0C0C]/60 text-sm font-medium">{post.date}</span>
                 <h3 className={`font-bold text-[#0C0C0C] tracking-tight leading-[1.1] ${isMain ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
                    {post.title}
                 </h3>
             </div>

             <div className="mt-auto">
                 <div className="px-5 py-2.5 border border-[#E5E5E5] rounded-full bg-white group-hover:bg-[#0C0C0C] group-hover:border-[#0C0C0C] transition-colors duration-300">
                    <span className="text-[11px] font-semibold tracking-wide uppercase text-[#0C0C0C] group-hover:text-white transition-colors duration-300">
                        Read more
                    </span>
                 </div>
             </div>
        </div>
    </a>
);

export default InsightsSection;