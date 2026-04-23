import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ActivePage = 'dashboard' | 'posts' | 'contacts' | 'projects' | 'docs';

const navItems = [
  { key: 'dashboard' as ActivePage, label: 'Dashboard', path: '/admin/dashboard', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { key: 'posts' as ActivePage, label: 'Blog Posts', path: '/admin/posts', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { key: 'projects' as ActivePage, label: 'Projects', path: '/admin/projects', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
  { key: 'contacts' as ActivePage, label: 'Contact Forms', path: '/admin/contacts', badge: '2', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { key: 'docs' as ActivePage, label: 'Docs', path: '/admin/docs', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> },
];

const FullLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 85" className="h-[15px] w-auto">
    <path fill="white" d="M98.4,42.5c0,27-18,39.7-38.6,39.7H2.2V2.8h57.6c20.5,0,38.6,12.7,38.6,39.7ZM78,42.5c0-19.3-10.4-22.6-25.9-22.6h-29.5v45.2h29.5c15.4,0,25.9-3.3,25.9-22.6Z"/>
    <path fill="white" d="M181.3,58.6l14.6,23.6h-24.1l-12.8-21.2h-32.9v21.2h-20.4V2.8h62.4c18,0,30.4,11.5,30.4,29.2s-6.6,22.5-17.2,26.7ZM126.2,43.9h36.3c6.1,0,15.7,0,15.7-11.9s-9.5-12-15.7-12h-36.3v23.9Z"/>
    <path fill="white" d="M225.7,82.2h-20.4V25.5h20.4v56.7Z"/>
    <path fill="white" d="M276.4,42.5L231.7,2.8h28.1l30.4,27.2,30.3-27.2h28.3l-44.7,39.7,44.7,39.7h-28.3l-30.3-27.2-30.4,27.2h-28.1l44.7-39.7Z"/>
    <path fill="#afff00" d="M225.7,19.9l-20.4-17.1h20.4v17.1Z"/>
  </svg>
);

const IconLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 85" className="h-[22px] w-[22px]">
    <path fill="#afff00" d="M42.5,0L0,42.5L42.5,85L85,42.5L42.5,0Z"/>
    <path fill="black" d="M28,26h18c9,0,15,5.5,15,16.5S55,59,46,59H28V26ZM36,52h9c5,0,9-2.5,9-9.5S50,33,41,33h-5V52Z"/>
  </svg>
);

const Tooltip = ({ label }: { label: string }) => (
  <span className="absolute left-full ml-3 bg-[#111] border border-white/[0.08] text-white text-[11px] px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 rounded-sm">
    {label}
  </span>
);

const AdminLayout: React.FC<{ children: React.ReactNode; active: ActivePage }> = ({ children, active }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { sessionStorage.removeItem('admin_auth'); navigate('/admin'); };

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => {
    const isCollapsed = collapsed && !mobile;
    return (
      <>
        {/* Header */}
        <div className={`flex items-center h-[57px] border-b border-white/[0.05] px-4 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {isCollapsed ? <IconLogo /> : <FullLogo />}
          {!mobile && (
            <button onClick={() => setCollapsed(v => !v)} className="text-white/20 hover:text-white/60 transition-colors p-1 shrink-0 ml-2">
              {collapsed
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              }
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5 overflow-hidden">
          {navItems.map(item => (
            <Link key={item.key} to={item.path} onClick={() => setMobileOpen(false)}
              className={`relative group flex items-center gap-3 px-2.5 py-2.5 text-[13px] transition-all duration-150 rounded-sm
                ${isCollapsed ? 'justify-center' : ''}
                ${active === item.key ? 'bg-white/[0.06] text-white' : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'}`}>
              <span className="shrink-0">{item.icon}</span>
              {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
              {!isCollapsed && item.badge && (
                <span className="text-[9px] font-bold bg-[#AFFF00]/20 text-[#AFFF00]/70 px-1.5 py-0.5 shrink-0">{item.badge}</span>
              )}
              {isCollapsed && item.badge && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#AFFF00] rounded-full" />}
              {isCollapsed && <Tooltip label={item.label} />}
            </Link>
          ))}

          <div className="border-t border-white/[0.05] mt-3 pt-3 flex flex-col gap-0.5">
            {[{ to: '/admin/posts/new', label: 'New Post' }, { to: '/admin/projects/new', label: 'New Project' }].map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                className={`relative group flex items-center gap-3 px-2.5 py-2.5 text-[13px] text-[#AFFF00]/50 hover:text-[#AFFF00]/80 hover:bg-[#AFFF00]/[0.04] transition-all duration-150 rounded-sm ${isCollapsed ? 'justify-center' : ''}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                {!isCollapsed && <span className="truncate">{label}</span>}
                {isCollapsed && <Tooltip label={label} />}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-2 py-4 border-t border-white/[0.05] flex flex-col gap-0.5">
          <Link to="/blog" target="_blank"
            className={`relative group flex items-center gap-3 px-2.5 py-2.5 text-[13px] text-white/20 hover:text-white/50 transition-colors rounded-sm ${isCollapsed ? 'justify-center' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            {!isCollapsed && <span>View Site</span>}
            {isCollapsed && <Tooltip label="View Site" />}
          </Link>
          <button onClick={handleLogout}
            className={`relative group flex items-center gap-3 px-2.5 py-2.5 text-[13px] text-white/20 hover:text-red-400/60 transition-colors w-full rounded-sm ${isCollapsed ? 'justify-center' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            {!isCollapsed && <span>Sign Out</span>}
            {isCollapsed && <Tooltip label="Sign Out" />}
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white poppins-regular flex selection:bg-[#AFFF00] selection:text-black">

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 60 : 220 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed top-0 left-0 h-full bg-[#080808] border-r border-white/[0.05] flex-col z-20 overflow-visible"
        style={{ minWidth: collapsed ? 60 : 220 }}
      >
        <NavContent />
      </motion.aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#080808] border-b border-white/[0.05] px-5 h-[57px] flex items-center justify-between">
        <FullLogo />
        <button onClick={() => setMobileOpen(v => !v)} className="text-white/40 hover:text-white/70 transition-colors">
          {mobileOpen
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} className="md:hidden fixed inset-0 bg-black/60 z-40" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-0 left-0 h-full w-[240px] bg-[#080808] border-r border-white/[0.05] flex flex-col z-50">
              <NavContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop main — shifts with sidebar */}
      <motion.main
        animate={{ marginLeft: collapsed ? 60 : 220 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={`hidden md:block flex-1 overflow-y-auto min-h-screen admin-scroll`}
      >
        {children}
      </motion.main>

      {/* Mobile main */}
      <main className="md:hidden flex-1 mt-[57px] overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
