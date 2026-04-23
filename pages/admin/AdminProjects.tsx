import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../../data/projectsData';
import AdminLayout from './AdminLayout';

const AdminProjects: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') navigate('/admin');
  }, [navigate]);

  const filtered = projectsData.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout active="projects">
      <div className="px-6 md:px-10 py-10 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[1.4rem] mona-sans-condensed-medium text-white tracking-tight">Projects</h1>
            <p className="text-white/25 text-[12px] mt-1">{projectsData.length} projects total</p>
          </div>
          <Link to="/admin/projects/new"
            className="flex items-center gap-2 bg-[#AFFF00] text-black px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors duration-300 w-fit"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Project
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects…"
            className="w-full bg-white/[0.03] border border-white/[0.07] pl-10 pr-4 py-2.5 text-white text-[13px] poppins-regular placeholder:text-white/15 focus:outline-none focus:border-[#AFFF00]/30 transition-all duration-300"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div key={project.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all duration-300 flex flex-col overflow-hidden"
                style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}>

                {/* Thumbnail */}
                <div className="aspect-[16/9] overflow-hidden relative bg-white/[0.03]">
                  <img src={project.thumbnail} alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.25em] uppercase text-[#AFFF00]/70 border border-[#AFFF00]/20 px-2 py-0.5 bg-black/40">
                    {project.category}
                  </span>
                  <span className="absolute top-3 right-3 text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 border border-white/10 px-2 py-0.5 bg-black/40">
                    {project.designAssets ? 'Design' : 'Marketing'}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    <p className="text-[14px] text-white/70 group-hover:text-white transition-colors font-medium">{project.title}</p>
                    <p className="text-[11px] text-white/25 mt-1 line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {project.whatWeDid.slice(0, 3).map(s => (
                      <span key={s} className="text-[9px] text-white/20 border border-white/[0.06] px-2 py-0.5">{s}</span>
                    ))}
                    {project.whatWeDid.length > 3 && (
                      <span className="text-[9px] text-white/15 px-1">+{project.whatWeDid.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex border-t border-white/[0.05]">
                  <Link to={`/admin/projects/${project.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-[10px] text-white/30 hover:text-white/70 hover:bg-white/[0.03] transition-all uppercase tracking-widest">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Edit
                  </Link>
                  <div className="w-px bg-white/[0.05]" />
                  <Link to={`/projects/${project.id}`} target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-[10px] text-white/30 hover:text-white/70 hover:bg-white/[0.03] transition-all uppercase tracking-widest">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    View
                  </Link>
                  <div className="w-px bg-white/[0.05]" />
                  <button onClick={() => setDeleteId(project.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-[10px] text-white/30 hover:text-red-400/60 hover:bg-red-400/[0.04] transition-all uppercase tracking-widest">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-6">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              className="bg-[#0D0D0D] border border-white/[0.08] p-8 max-w-sm w-full flex flex-col gap-6"
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}>
              <div>
                <p className="text-white mona-sans-condensed-medium text-[1.2rem]">Delete this project?</p>
                <p className="text-white/30 text-[13px] mt-2">This cannot be undone once Supabase is connected.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 border border-white/[0.08] text-white/40 hover:text-white/70 text-[11px] tracking-[0.2em] uppercase transition-colors">
                  Cancel
                </button>
                <button onClick={() => setDeleteId(null)}
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

export default AdminProjects;
