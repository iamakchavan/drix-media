import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';

// ── Welcome Modal ─────────────────────────────────────────────────────────────
const WelcomeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-8 pointer-events-auto"
      data-lenis-prevent
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[600px] bg-[#0D0D0D] border border-white/[0.08] flex flex-col max-h-[90vh]"
        style={{ clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)' }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-white/[0.06] flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#AFFF00]"></span>
              <span className="text-[9px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase">Setup Required</span>
            </div>
            <h2 className="text-[1.5rem] mona-sans-condensed-medium text-white tracking-tight leading-tight">
              Before you start,<br />the backend needs setup.
            </h2>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white/60 transition-colors mt-1 shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Body */}
        <div data-lenis-prevent className="px-8 py-6 overflow-y-auto flex flex-col gap-5 custom-scrollbar min-h-0" style={{ overscrollBehavior: 'contain' }}>
          <p className="text-[13px] text-white/40 leading-relaxed">
            The admin UI is fully built. However, <span className="text-white/70">nothing is connected to a database yet.</span> Posts, projects, and contact forms are all reading from static local files. To make this dashboard fully functional, Supabase needs to be set up first.
          </p>

          {/* Steps */}
          <div className="flex flex-col gap-3">
            {[
              { num: '01', title: 'Create a Supabase project', desc: 'Go to supabase.com, create a new project, and copy your Project URL and Anon Key.' },
              { num: '02', title: 'Add environment variables', desc: 'Create a .env file in the project root with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' },
              { num: '03', title: 'Create the database tables', desc: 'Run the SQL for posts, projects, and contacts tables. Full SQL is in the Docs → Blog Posts / Projects / Contact Forms sections.' },
              { num: '04', title: 'Enable Auth & create admin user', desc: 'Enable Email Auth in Supabase Dashboard, create one admin user, then replace the hardcoded login with supabase.auth.signInWithPassword().' },
              { num: '05', title: 'Migrate existing data', desc: 'Run the migration scripts to move blogData.ts and projectsData.ts into Supabase. Content format must be converted to Editor.js OutputData — see Docs → Data Migration.' },
              { num: '06', title: 'Wire save & load in editors', desc: 'Connect PostEditor and ProjectEditor to Supabase. Add the useEffect to load existing content so editors don\'t open blank.' },
              { num: '07', title: 'Update public pages', desc: 'Replace static data imports in Blog.tsx, BlogDetail.tsx, Projects.tsx, ProjectDetail.tsx, and Contact.tsx with Supabase queries.' },
              { num: '08', title: 'Set up image storage', desc: 'Create blog-images and project-images buckets in Supabase Storage (public), then update the ImageUpload component uploader.' },
            ].map(step => (
              <div key={step.num} className="flex gap-4 p-4 bg-white/[0.02] border border-white/[0.04]"
                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
                <span className="text-[#AFFF00]/40 text-[11px] font-mono tracking-widest shrink-0 mt-0.5">{step.num}</span>
                <div>
                  <p className="text-[13px] text-white/70 font-semibold mb-0.5">{step.title}</p>
                  <p className="text-[12px] text-white/30 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Docs note */}
          <div className="flex items-start gap-3 bg-[#AFFF00]/5 border border-[#AFFF00]/15 p-4"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#AFFF00]/60 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p className="text-[12px] text-white/40 leading-relaxed">
              <span className="text-[#AFFF00]/70 font-semibold">Docs are for reference only.</span> They contain all the SQL, code snippets, and migration scripts you need — but the actual setup must be done manually by a developer. Check the full Backend Checklist in Docs for the complete ordered task list.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/[0.06] flex items-center justify-between gap-4 shrink-0">
          <Link to="/admin/docs" onClick={onClose}
            className="flex items-center gap-2 text-[11px] text-[#AFFF00]/60 hover:text-[#AFFF00]/90 transition-colors tracking-widest uppercase">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
            Open Docs
          </Link>
          <button onClick={onClose}
            className="flex items-center gap-2 bg-[#AFFF00] text-black px-6 py-2.5 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors duration-300"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
            Got it, continue
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(() => !sessionStorage.getItem('modal_seen'));
  const [posts, setPosts] = useState<any[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const closeModal = () => {
    sessionStorage.setItem('modal_seen', 'true');
    setShowModal(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        sessionStorage.removeItem('admin_auth');
        navigate('/admin');
      }
    });

    const fetchAllData = async () => {
      setLoading(true);
      
      const [postsRes, projectsRes, inquiriesRes] = await Promise.all([
        supabase.from('posts').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
      ]);

      if (postsRes.data) setPosts(postsRes.data);
      if (projectsRes.count !== null) setProjectCount(projectsRes.count);
      if (inquiriesRes.data) setInquiries(inquiriesRes.data);
      
      setLoading(false);
    };

    fetchAllData();
  }, [navigate]);

  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  const stats = [
    { label: 'Total Posts', value: posts.length, loading: loading },
    { label: 'Total Projects', value: projectCount, loading: loading },
    { label: 'Categories', value: [...new Set(posts.map(p => p.category))].filter(Boolean).length, loading: loading },
    { label: 'New Inquiries', value: newInquiriesCount, loading: loading },
  ];

  return (
    <AdminLayout active="dashboard">
      {showModal && <WelcomeModal onClose={closeModal} />}
      <div className="px-6 md:px-10 py-10 flex flex-col gap-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[1.4rem] mona-sans-condensed-medium text-white tracking-tight">Dashboard</h1>
            <p className="text-white/25 text-[12px] mt-1">Welcome back — here's what's happening.</p>
          </div>
          <Link to="/blog" target="_blank"
            className="hidden sm:flex items-center gap-2 text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase">
            View Site
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.02] border border-white/[0.05] p-5 md:p-6"
              style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
              <p className="text-white/25 text-[9px] uppercase tracking-[0.3em] mb-3">{stat.label}</p>
              <p className="text-[2.2rem] mona-sans-condensed-medium text-white leading-none">
                {stat.loading ? '-' : stat.value}
                {stat.label === 'New Inquiries' && stat.value > 0 && <span className="text-[#AFFF00]">!</span>}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick actions */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-4">Quick Actions</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/posts/new"
              className="flex items-center gap-2 bg-[#AFFF00] text-black px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors duration-300"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Post
            </Link>
            <Link to="/admin/contacts"
              className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white/50 px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase hover:bg-white/[0.07] hover:text-white transition-all duration-300"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              View Contacts
            </Link>
            <Link to="/admin/posts"
              className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white/50 px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase hover:bg-white/[0.07] hover:text-white transition-all duration-300"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              All Posts
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Recent posts */}
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-4">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Recent Posts</p>
              <Link to="/admin/posts" className="text-[9px] uppercase tracking-[0.3em] text-white/15 hover:text-white/40 transition-colors">View all</Link>
            </div>
            <div className="flex flex-col gap-px bg-white/[0.03]">
              {loading ? (
                <div className="px-5 py-8 text-center text-white/30 text-[12px] poppins-regular">Loading...</div>
              ) : posts.length === 0 ? (
                <div className="px-5 py-8 text-center text-white/30 text-[12px] poppins-regular">No posts found.</div>
              ) : (
                posts.slice(0, 5).map((post, i) => (
                  <motion.div key={post.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                    className="flex items-center justify-between bg-[#050505] hover:bg-white/[0.02] transition-colors px-5 py-3.5 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 shrink-0 overflow-hidden opacity-50 group-hover:opacity-80 transition-opacity">
                        {post.cover_image ? (
                          <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-white/5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] text-white/60 group-hover:text-white transition-colors truncate">{post.title || 'Untitled'}</p>
                        <p className="text-[10px] text-white/20 mt-0.5">
                          {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <Link to={`/admin/posts/${post.id}`} className="text-white/10 hover:text-white/50 transition-colors shrink-0 ml-4">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Recent inquiries */}
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-4">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Recent Inquiries</p>
              <Link to="/admin/contacts" className="text-[9px] uppercase tracking-[0.3em] text-white/15 hover:text-white/40 transition-colors">View all</Link>
            </div>
            <div className="flex flex-col gap-px bg-white/[0.03]">
              {loading ? (
                <div className="px-5 py-8 text-center text-white/30 text-[12px] poppins-regular">Loading...</div>
              ) : inquiries.length === 0 ? (
                <div className="px-5 py-8 text-center text-white/30 text-[12px] poppins-regular">No inquiries found.</div>
              ) : (
                inquiries.slice(0, 5).map((inquiry, i) => (
                  <Link to="/admin/contacts" key={inquiry.id}
                    className="flex items-center justify-between bg-[#050505] hover:bg-white/[0.02] transition-colors px-5 py-3.5 group border-b border-white/[0.03] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[11px] font-bold ${inquiry.status === 'new' ? 'text-[#AFFF00]' : 'text-white/20'}`}>
                        {inquiry.name[0]}
                      </div>
                      <div>
                        <p className={`text-[13px] ${inquiry.status === 'new' ? 'text-white' : 'text-white/60'} group-hover:text-white transition-colors`}>{inquiry.name}</p>
                        <p className="text-[10px] text-white/20 truncate">{inquiry.service}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.25em] uppercase px-2 py-0.5 border ${inquiry.status === 'new' ? 'text-[#AFFF00]/70 border-[#AFFF00]/30' : 'text-white/10 border-white/5'}`}>
                      {inquiry.status}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
