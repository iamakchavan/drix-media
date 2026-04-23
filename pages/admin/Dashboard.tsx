import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../../data/blogData';

const stats = [
  { label: 'Total Posts', value: blogPosts.length, suffix: '' },
  { label: 'Contact Forms', value: 0, suffix: '' },
  { label: 'Categories', value: [...new Set(blogPosts.map(p => p.category))].length, suffix: '' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white poppins-regular selection:bg-[#AFFF00] selection:text-black">

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(175,255,0,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-[240px] bg-[#080808] border-r border-white/[0.05] flex flex-col z-20 hidden md:flex">
        <div className="px-6 py-8 border-b border-white/[0.05]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 85" className="h-[16px] w-auto mb-4">
            <path fill="white" d="M98.4,42.5c0,27-18,39.7-38.6,39.7H2.2V2.8h57.6c20.5,0,38.6,12.7,38.6,39.7ZM78,42.5c0-19.3-10.4-22.6-25.9-22.6h-29.5v45.2h29.5c15.4,0,25.9-3.3,25.9-22.6Z"/>
            <path fill="white" d="M181.3,58.6l14.6,23.6h-24.1l-12.8-21.2h-32.9v21.2h-20.4V2.8h62.4c18,0,30.4,11.5,30.4,29.2s-6.6,22.5-17.2,26.7ZM126.2,43.9h36.3c6.1,0,15.7,0,15.7-11.9s-9.5-12-15.7-12h-36.3v23.9Z"/>
            <path fill="white" d="M225.7,82.2h-20.4V25.5h20.4v56.7Z"/>
            <path fill="white" d="M276.4,42.5L231.7,2.8h28.1l30.4,27.2,30.3-27.2h28.3l-44.7,39.7,44.7,39.7h-28.3l-30.3-27.2-30.4,27.2h-28.1l44.7-39.7Z"/>
            <path fill="#afff00" d="M225.7,19.9l-20.4-17.1h20.4v17.1Z"/>
          </svg>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#AFFF00]"></span>
            <span className="text-[9px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase">Admin</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {[
            { label: 'Dashboard', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>, active: true },
            { label: 'Blog Posts', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, active: false },
            { label: 'Contact Forms', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, active: false },
          ].map(item => (
            <button key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 text-[13px] rounded-sm transition-all duration-200 w-full text-left
                ${item.active ? 'bg-white/[0.06] text-white' : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'}`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-white/[0.05]">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-[13px] text-white/20 hover:text-red-400/70 transition-colors w-full">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="md:ml-[240px] relative z-10">

        {/* Top bar */}
        <header className="border-b border-white/[0.05] px-6 md:px-10 py-5 flex items-center justify-between bg-[#050505]/80 backdrop-blur sticky top-0 z-10">
          <div>
            <h1 className="text-[1.1rem] mona-sans-condensed-medium tracking-tight text-white">Dashboard</h1>
            <p className="text-white/25 text-[11px] mt-0.5">Welcome back — here's what's happening.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/blog" target="_blank"
              className="flex items-center gap-2 text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase">
              View Site
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </Link>
            <button onClick={handleLogout}
              className="md:hidden flex items-center gap-2 text-[11px] text-white/20 hover:text-red-400/60 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </header>

        <div className="px-6 md:px-10 py-10 flex flex-col gap-10">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/[0.02] border border-white/[0.05] p-5 md:p-7"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
              >
                <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mb-3">{stat.label}</p>
                <p className="text-[2rem] md:text-[2.5rem] mona-sans-condensed-medium text-white leading-none">
                  {stat.value}<span className="text-[#AFFF00]">{stat.suffix}</span>
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-4">Quick Actions</p>
            <div className="flex flex-wrap gap-3">
              <button
                className="flex items-center gap-3 bg-[#AFFF00] text-black px-6 py-3 text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors duration-300"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New Post
              </button>
              <button
                className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] text-white/60 px-6 py-3 text-[12px] tracking-[0.2em] uppercase hover:bg-white/[0.07] hover:text-white transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                View Contacts
              </button>
            </div>
          </div>

          {/* Recent posts */}
          <div>
            <div className="flex items-center justify-between mb-5 border-b border-white/[0.05] pb-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">Recent Posts</p>
              <span className="text-[10px] text-white/15 uppercase tracking-widest">{blogPosts.length} total</span>
            </div>
            <div className="flex flex-col gap-px bg-white/[0.03]">
              {blogPosts.slice(0, 6).map((post, i) => (
                <motion.div key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between bg-[#050505] hover:bg-white/[0.02] transition-colors duration-200 px-5 py-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-8 h-8 rounded-sm overflow-hidden shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                      <img src={post.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] text-white/70 group-hover:text-white transition-colors truncate">{post.title}</p>
                      <p className="text-[10px] text-white/20 mt-0.5">{post.date} · {post.readTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className="hidden sm:block text-[9px] font-bold tracking-[0.3em] uppercase text-[#AFFF00]/50 border border-[#AFFF00]/20 px-2 py-1">
                      {post.category}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/10 group-hover:text-white/40 transition-colors">
                      <path d="M7 17l9.2-9.2M17 17V7H7"/>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact forms placeholder */}
          <div>
            <div className="flex items-center justify-between mb-5 border-b border-white/[0.05] pb-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">Contact Submissions</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.04] border-dashed p-10 flex flex-col items-center justify-center gap-3 text-center"
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/10">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <p className="text-white/20 text-[12px]">Contact submissions will appear here once Supabase is connected.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
