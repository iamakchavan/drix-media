import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogData';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <main className="w-full min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 pt-40">
          <p className="text-black/30 poppins-regular text-sm">Article not found.</p>
          <Link to="/blog" className="text-sm poppins-semibold text-black hover:text-[#476D07] transition-colors">Back to Journal</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const others = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <main className="w-full min-h-screen bg-white poppins-regular selection:bg-[#AFFF00] selection:text-black">
      <Navbar />

      {/* Full-bleed hero */}
      <div className="w-full h-[60vh] md:h-[75vh] relative overflow-hidden bg-black">
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Article container */}
      <div className="max-w-[720px] mx-auto px-6 md:px-0">

        {/* Back */}
        <div className="pt-10 pb-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase poppins-semibold text-black/30 hover:text-black transition-colors duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Journal
          </Link>
        </div>

        {/* Category + Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#476D07] block mb-4">{post.category}</span>
          <h1 className="text-[2.4rem] md:text-[3.5rem] mona-sans-condensed-medium tracking-tight text-black leading-[1.0] mb-6">{post.title}</h1>
          <p className="text-lg md:text-xl text-black/50 leading-relaxed mb-8">{post.excerpt}</p>
        </motion.div>

        {/* Meta */}
        <div className="flex items-center gap-6 border-t border-b border-black/[0.07] py-4 mb-12">
          <span className="text-[13px] poppins-regular font-semibold text-black">{post.author}</span>
          <span className="text-black/20">·</span>
          <span className="text-[12px] text-black/35 poppins-regular">{post.date}</span>
          <span className="text-black/20">·</span>
          <span className="text-[12px] text-black/35 poppins-regular">{post.readTime}</span>
        </div>

        {/* Body */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col gap-5 pb-20 md:pb-32">
          {post.content.map((block, i) => {
            if (block.type === 'h2') return (
              <h2 key={i} className="text-[1.6rem] md:text-[2rem] mona-sans-condensed-medium tracking-tight text-black leading-tight mt-8 mb-1">{block.text}</h2>
            );
            if (block.type === 'h3') return (
              <h3 key={i} className="text-[1.2rem] md:text-[1.4rem] mona-sans-condensed-medium tracking-tight text-black leading-tight mt-4">{block.text}</h3>
            );
            if (block.type === 'quote') return (
              <blockquote key={i} className="border-l-[3px] border-[#AFFF00] pl-5 my-4">
                <p className="text-xl md:text-2xl mona-sans-condensed-medium text-black/60 leading-snug tracking-tight">"{block.text}"</p>
              </blockquote>
            );
            return (
              <p key={i} className="text-[16px] md:text-[17px] text-black/60 leading-[1.85] poppins-regular">{block.text}</p>
            );
          })}
        </motion.div>
      </div>

      {/* More articles */}
      {others.length > 0 && (
        <section className="border-t border-black/[0.07] px-6 md:px-12 py-16 md:py-24 bg-[#FAFAFA]">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <span className="text-[10px] tracking-[0.35em] uppercase poppins-semibold text-black/30">More Articles</span>
              <Link to="/blog" className="text-[10px] tracking-[0.25em] uppercase poppins-semibold text-black/30 hover:text-black transition-colors">All posts →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {others.map(p => (
                <Link key={p.id} to={`/blog/${p.id}`} className="group flex flex-col gap-3">
                  <div className="aspect-[16/10] overflow-hidden bg-black/5">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#476D07] poppins-regular">{p.category}</span>
                  <h3 className="text-[1rem] mona-sans-condensed-medium text-black tracking-tight leading-snug group-hover:text-[#476D07] transition-colors duration-300">{p.title}</h3>
                  <span className="text-[10px] text-black/25 poppins-regular">{p.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default BlogDetail;
