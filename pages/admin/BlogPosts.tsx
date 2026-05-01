import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';

const categories = ['All', 'Strategy', 'Branding', 'Digital', 'Culture', 'Production'];

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // We'll map created_at to date for display
  created_at: string;
  cover_image: string;
  status: string;
}

const BlogPosts: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        sessionStorage.removeItem('admin_auth');
        navigate('/admin');
      }
    });
    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, excerpt, category, author, created_at, cover_image, status')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else if (data) {
      setPosts(data as any[]);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from('posts').delete().eq('id', deleteId);
    if (!error) {
      setPosts(posts.filter(p => p.id !== deleteId));
    } else {
      console.error('Error deleting post:', error);
    }
    setDeleteId(null);
  };

  const filtered = posts.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.author && p.author.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <AdminLayout active="posts">
      <div className="px-6 md:px-10 py-10 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[1.4rem] mona-sans-condensed-medium text-white tracking-tight">Blog Posts</h1>
            <p className="text-white/25 text-[12px] mt-1">{posts.length} posts total</p>
          </div>
          <Link to="/admin/posts/new"
            className="flex items-center gap-2 bg-[#AFFF00] text-black px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors duration-300 w-fit"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Post
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search posts…"
              className="w-full bg-white/[0.03] border border-white/[0.07] pl-10 pr-4 py-2.5 text-white text-[13px] poppins-regular placeholder:text-white/15 focus:outline-none focus:border-[#AFFF00]/30 transition-all duration-300"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-2 text-[10px] font-bold tracking-[0.2em] uppercase border transition-all duration-200
                  ${category === c ? 'bg-[#AFFF00] text-black border-[#AFFF00]' : 'border-white/[0.08] text-white/30 hover:border-white/20 hover:text-white/50'}`}
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col gap-px bg-white/[0.03]">
          {/* Head */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-[#080808]">
            {['Title', 'Category', 'Author', 'Date', ''].map(h => (
              <span key={h} className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20">{h}</span>
            ))}
          </div>

          <AnimatePresence>
            {loading ? (
              <div className="bg-[#050505] px-5 py-16 text-center text-white/20 text-[13px]">Loading posts...</div>
            ) : filtered.length === 0 ? (
              <div className="bg-[#050505] px-5 py-16 text-center text-white/20 text-[13px]">No posts found.</div>
            ) : filtered.map((post, i) => (
              <motion.div key={post.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 bg-[#050505] hover:bg-white/[0.02] transition-colors group"
              >
                {/* Title + image */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 overflow-hidden opacity-50 group-hover:opacity-80 transition-opacity">
                    <img src={post.cover_image || ''} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] text-white/70 group-hover:text-white transition-colors truncate">{post.title}</p>
                      {post.status === 'draft' && <span className="text-[8px] uppercase tracking-widest text-yellow-500 border border-yellow-500/30 px-1 py-0.5">Draft</span>}
                    </div>
                    <p className="text-[10px] text-white/20 mt-0.5 truncate">{post.excerpt?.slice(0, 60)}…</p>
                  </div>
                </div>

                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#AFFF00]/50 border border-[#AFFF00]/20 px-2 py-1 w-fit">
                  {post.category || 'Uncategorized'}
                </span>

                <span className="text-[12px] text-white/30">{post.author || 'Unknown'}</span>

                <span className="text-[11px] text-white/20 font-mono">
                  {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link to={`/admin/posts/${post.id}`}
                    className="p-2 text-white/20 hover:text-white/60 hover:bg-white/[0.05] transition-all rounded-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </Link>
                  <Link to={`/blog/${post.id}`} target="_blank"
                    className="p-2 text-white/20 hover:text-white/60 hover:bg-white/[0.05] transition-all rounded-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </Link>
                  <button onClick={() => setDeleteId(post.id)}
                    className="p-2 text-white/20 hover:text-red-400/60 hover:bg-red-400/[0.05] transition-all rounded-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-6">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              className="bg-[#0D0D0D] border border-white/[0.08] p-8 max-w-sm w-full flex flex-col gap-6"
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}>
              <div>
                <p className="text-white mona-sans-condensed-medium text-[1.2rem]">Delete this post?</p>
                <p className="text-white/30 text-[13px] mt-2">This action cannot be undone. It will be permanently removed.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 border border-white/[0.08] text-white/40 hover:text-white/70 text-[11px] tracking-[0.2em] uppercase transition-colors">
                  Cancel
                </button>
                <button onClick={handleDelete}
                  className="flex-1 py-2.5 bg-red-500/80 hover:bg-red-500 text-white text-[11px] tracking-[0.2em] uppercase font-bold transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default BlogPosts;

