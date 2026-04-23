import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../../data/blogData';
import AdminLayout from './AdminLayout';

const stats = [
  { label: 'Total Posts', value: blogPosts.length },
  { label: 'Contact Forms', value: 5 },
  { label: 'Categories', value: [...new Set(blogPosts.map(p => p.category))].length },
  { label: 'New Inquiries', value: 2 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') navigate('/admin');
  }, [navigate]);

  return (
    <AdminLayout active="dashboard">
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
                {stat.value}
                {stat.label === 'New Inquiries' && <span className="text-[#AFFF00]">!</span>}
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

        {/* Recent posts */}
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-4">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Recent Posts</p>
            <Link to="/admin/posts" className="text-[9px] uppercase tracking-[0.3em] text-white/15 hover:text-white/40 transition-colors">View all</Link>
          </div>
          <div className="flex flex-col gap-px bg-white/[0.03]">
            {blogPosts.slice(0, 5).map((post, i) => (
              <motion.div key={post.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                className="flex items-center justify-between bg-[#050505] hover:bg-white/[0.02] transition-colors px-5 py-3.5 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 shrink-0 overflow-hidden opacity-50 group-hover:opacity-80 transition-opacity">
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] text-white/60 group-hover:text-white transition-colors truncate">{post.title}</p>
                    <p className="text-[10px] text-white/20 mt-0.5">{post.date} · {post.readTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="hidden sm:block text-[9px] font-bold tracking-[0.25em] uppercase text-[#AFFF00]/50 border border-[#AFFF00]/20 px-2 py-0.5">{post.category}</span>
                  <Link to={`/admin/posts/${post.id}`} className="text-white/10 hover:text-white/50 transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent contacts */}
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-4">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Recent Contact Submissions</p>
            <Link to="/admin/contacts" className="text-[9px] uppercase tracking-[0.3em] text-white/15 hover:text-white/40 transition-colors">View all</Link>
          </div>
          {[
            { name: 'Jordan Lee', company: 'Apex Studio', service: 'Brand Identity', status: 'new' },
            { name: 'Priya Sharma', company: 'GrowthCo', service: 'UI/UX Design', status: 'read' },
          ].map((c, i) => (
            <Link to="/admin/contacts" key={i}
              className="flex items-center justify-between bg-[#050505] hover:bg-white/[0.02] transition-colors px-5 py-3.5 group border-b border-white/[0.03] last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#AFFF00]/50 text-[11px] font-bold">
                  {c.name[0]}
                </div>
                <div>
                  <p className="text-[13px] text-white/60 group-hover:text-white transition-colors">{c.name} · <span className="text-white/30">{c.company}</span></p>
                  <p className="text-[10px] text-white/20">{c.service}</p>
                </div>
              </div>
              <span className={`text-[9px] font-bold tracking-[0.25em] uppercase px-2 py-0.5 border ${c.status === 'new' ? 'text-[#AFFF00]/70 border-[#AFFF00]/30' : 'text-white/20 border-white/10'}`}>
                {c.status}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
