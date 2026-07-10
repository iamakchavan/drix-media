import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: any;
  category: string;
  author: string;
  read_time: string;
  cover_image: string;
  created_at: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

const BlogDetail: React.FC = () => {
  const { id: slug } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [others, setOthers] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*, categories(name)')
        .eq('slug', slug)
        .single();
      
      if (data) {
        setPost({
          ...data,
          category: data.categories?.name || 'Uncategorized'
        });
        
        // Fetch 3 other posts
        const { data: otherData } = await supabase
          .from('posts')
          .select('*, categories(name)')
          .eq('status', 'published')
          .neq('id', data.id)
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (otherData) {
          setOthers(otherData.map((p: any) => ({
            ...p,
            category: p.categories?.name || 'Uncategorized'
          })));
        }
      }
      setLoading(false);
    };
    
    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-40">
           <div className="w-8 h-8 border-2 border-black/10 border-t-[#AFFF00] rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

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

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Function to render Editor.js blocks safely
  const renderBlock = (block: any, i: number) => {
    switch (block.type) {
      case 'header':
        if (block.data.level === 2) {
          return <h2 key={i} className="text-[1.6rem] md:text-[2rem] mona-sans-condensed-medium tracking-tight text-black leading-tight mt-8 mb-1" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
        }
        return <h3 key={i} className="text-[1.2rem] md:text-[1.4rem] mona-sans-condensed-medium tracking-tight text-black leading-tight mt-4" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
      case 'paragraph':
        return <p key={i} className="text-[16px] md:text-[17px] text-black/60 leading-[1.85] poppins-regular" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
      case 'quote':
        return (
          <blockquote key={i} className="border-l-[3px] border-[#AFFF00] pl-5 my-4">
            <p className="text-xl md:text-2xl mona-sans-condensed-medium text-black/60 leading-snug tracking-tight" dangerouslySetInnerHTML={{ __html: block.data.text }} />
            {block.data.caption && <cite className="text-sm text-black/40 mt-2 block not-italic">— {block.data.caption}</cite>}
          </blockquote>
        );
      case 'list':
        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
        const listClass = block.data.style === 'ordered' ? 'list-decimal' : 'list-disc';
        return (
          <ListTag key={i} className={`${listClass} pl-5 text-[16px] md:text-[17px] text-black/60 leading-[1.85] poppins-regular space-y-2`}>
            {block.data.items.map((item: any, j: number) => {
              const content = typeof item === 'string' ? item : (item.content || '');
              return <li key={j} dangerouslySetInnerHTML={{ __html: content }} />;
            })}
          </ListTag>
        );
      case 'checklist':
        return (
          <div key={i} className="flex flex-col gap-3 my-4">
            {block.data.items.map((item: any, j: number) => (
              <div key={j} className="flex items-start gap-3">
                <div className={`mt-1.5 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${item.checked ? 'bg-[#AFFF00] border-[#AFFF00]' : 'border-black/20'}`}>
                  {item.checked && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </div>
                <span className={`text-[16px] md:text-[17px] leading-relaxed poppins-regular ${item.checked ? 'text-black/30 line-through' : 'text-black/60'}`} dangerouslySetInnerHTML={{ __html: item.text }} />
              </div>
            ))}
          </div>
        );
      case 'image':
        return (
          <figure key={i} className="my-8">
            <img src={block.data.file.url} alt={block.data.caption || 'Blog image'} className="w-full h-auto object-cover bg-black/5" />
            {block.data.caption && <figcaption className="text-center text-xs text-black/30 mt-3">{block.data.caption}</figcaption>}
          </figure>
        );
      case 'delimiter':
        return <div key={i} className="w-12 h-[2px] bg-[#AFFF00] mx-auto my-12" />;
      default:
        console.log('Unknown block type', block.type);
        return null;
    }
  };

  return (
    <main className="w-full min-h-screen bg-white poppins-regular selection:bg-[#AFFF00] selection:text-black">
      <Helmet>
        <title>{post.seo_title || post.title} | Drix Media</title>
        <meta name="description" content={post.seo_description || post.excerpt} />
        {post.seo_keywords && <meta name="keywords" content={post.seo_keywords} />}
        
        <meta property="og:title" content={post.seo_title || post.title} />
        <meta property="og:description" content={post.seo_description || post.excerpt} />
        <meta property="og:image" content={post.cover_image} />
        <meta property="og:type" content="article" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo_title || post.title} />
        <meta name="twitter:description" content={post.seo_description || post.excerpt} />
        <meta name="twitter:image" content={post.cover_image} />
      </Helmet>

      <Navbar />

      {/* Full-bleed hero */}
      <div className="w-full h-[75vh] md:h-[85vh] relative overflow-hidden bg-black flex items-end">
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          src={post.cover_image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="max-w-[800px]"
          >
            <span className="inline-block text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-[#AFFF00] mb-6 md:mb-8 poppins-medium bg-black/40 backdrop-blur-md px-4 py-1.5 border border-white/5" 
                  style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
              {post.category}
            </span>
            <h1 className="text-[2.8rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] mona-sans-condensed-bold tracking-[-0.03em] text-white leading-[0.9] mb-8 uppercase">
              {post.title}
            </h1>
            <p className="text-[15px] md:text-[18px] text-white/50 leading-relaxed max-w-2xl poppins-regular">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Article container */}
      <div className="max-w-[720px] mx-auto px-6 md:px-0">

        {/* Header Actions & Meta */}
        <div className="pt-12 md:pt-20 flex flex-col gap-10 md:gap-12">
          {/* Back */}
          <Link to="/blog" className="group inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase poppins-bold text-black/25 hover:text-black transition-all duration-300">
            <div className="w-8 h-8 border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </div>
            Journal Index
          </Link>

          {/* Meta Info Strip */}
          <div className="flex items-center gap-6 border-t border-b border-black/[0.05] py-5 overflow-x-auto no-scrollbar">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-black/20 uppercase tracking-widest font-bold">Author</span>
              <span className="text-[13px] poppins-semibold text-black">{post.author}</span>
            </div>
            <div className="w-px h-6 bg-black/[0.05]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-black/20 uppercase tracking-widest font-bold">Published</span>
              <span className="text-[13px] poppins-medium text-black/50">{formattedDate}</span>
            </div>
            <div className="w-px h-6 bg-black/[0.05]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-black/20 uppercase tracking-widest font-bold">Read Time</span>
              <span className="text-[13px] poppins-medium text-black/50">{post.read_time}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col gap-5 pb-20 md:pb-32">
          {post.content?.blocks ? post.content.blocks.map((block: any, i: number) => renderBlock(block, i)) : null}
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
                <Link key={p.id} to={`/blog/${p.slug}`} className="group flex flex-col gap-3">
                  <div className="aspect-[16/10] overflow-hidden bg-black/5">
                    <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#476D07] poppins-regular">{p.category}</span>
                  <h3 className="text-[1rem] mona-sans-condensed-medium text-black tracking-tight leading-snug group-hover:text-[#476D07] transition-colors duration-300">{p.title}</h3>
                  <span className="text-[10px] text-black/25 poppins-regular">{p.read_time}</span>
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
