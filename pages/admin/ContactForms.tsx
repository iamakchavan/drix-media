import { supabase } from '../../lib/supabase';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from './AdminLayout';

interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
}

const statusColor: Record<string, string> = {
  new: 'text-[#AFFF00]/70 border-[#AFFF00]/30 bg-[#AFFF00]/5',
  read: 'text-white/30 border-white/10 bg-white/[0.02]',
  replied: 'text-blue-400/60 border-blue-400/20 bg-blue-400/5',
  archived: 'text-white/10 border-white/5 bg-transparent',
};

const ContactForms: React.FC = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setInquiries(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setInquiries(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (!error) {
      setInquiries(prev => prev.filter(inv => inv.id !== id));
      setSelected(null);
    }
  };

  const filtered = inquiries.filter(c => {
    const matchStatus = filter === 'all' || c.status === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company || '').toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    all: inquiries.length,
    new: inquiries.filter(c => c.status === 'new').length,
    read: inquiries.filter(c => c.status === 'read').length,
    replied: inquiries.filter(c => c.status === 'replied').length,
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout active="contacts">
      <div className="px-6 md:px-10 py-10 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[1.4rem] mona-sans-condensed-medium text-white tracking-tight">Contact Submissions</h1>
            <p className="text-white/25 text-[12px] mt-1">
              {counts.new > 0 && <span className="text-[#AFFF00]/70">{counts.new} new · </span>}
              {inquiries.length} total submissions
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['all', 'new', 'read', 'replied'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`p-4 border text-left transition-all duration-200 ${filter === s ? 'border-[#AFFF00]/30 bg-[#AFFF00]/5' : 'border-white/[0.05] bg-white/[0.02] hover:border-white/10'}`}
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
              <p className="text-[1.6rem] mona-sans-condensed-medium text-white leading-none">{counts[s]}</p>
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/25 mt-1 capitalize">{s}</p>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, company…"
            className="w-full bg-white/[0.03] border border-white/[0.07] pl-10 pr-4 py-2.5 text-white text-[13px] poppins-regular placeholder:text-white/15 focus:outline-none focus:border-[#AFFF00]/30 transition-all duration-300"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }} />
        </div>

        {/* List */}
        <div className="flex flex-col gap-px bg-white/[0.03]">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-[#080808]">
            {['Contact', 'Service', 'Date', 'Status', ''].map(h => (
              <span key={h} className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20">{h}</span>
            ))}
          </div>

          <AnimatePresence>
            {loading ? (
              <div className="bg-[#050505] px-5 py-16 text-center text-white/20 text-[13px]">Fetching data...</div>
            ) : filtered.length === 0 ? (
              <div className="bg-[#050505] px-5 py-16 text-center text-white/20 text-[13px]">No submissions found.</div>
            ) : filtered.map((contact, i) => (
              <motion.div key={contact.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                onClick={() => { setSelected(contact); if (contact.status === 'new') updateStatus(contact.id, 'read'); }}
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 bg-[#050505] hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 shrink-0 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[13px] font-bold mona-sans-condensed-medium ${contact.status === 'new' ? 'text-[#AFFF00]' : 'text-white/20'}`}>
                    {contact.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[13px] ${contact.status === 'new' ? 'text-white font-medium' : 'text-white/70'} group-hover:text-white transition-colors`}>{contact.name}</p>
                    <p className="text-[10px] text-white/20 truncate">{contact.email}</p>
                  </div>
                </div>
                <span className="text-[11px] text-white/30">{contact.service}</span>
                <span className="text-[11px] text-white/20 font-mono">{formatDate(contact.created_at)}</span>
                <span className={`text-[9px] font-bold tracking-[0.25em] uppercase px-2 py-1 border w-fit ${statusColor[contact.status]}`}>
                  {contact.status}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-white/10 group-hover:text-white/40 transition-colors hidden md:block">
                  <path d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-[#0D0D0D] border-l border-white/[0.06] z-50 flex flex-col overflow-y-auto admin-scroll"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#AFFF00] text-black flex items-center justify-center text-[14px] font-bold mona-sans-condensed-medium">
                    {selected.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-[14px] font-semibold">{selected.name}</p>
                    <p className="text-white/30 text-[11px]">{selected.company || 'Private Individual'}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/20 hover:text-white/60 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              <div className="flex flex-col gap-6 px-8 py-8">
                {/* Status */}
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 border ${statusColor[selected.status]}`}>
                    {selected.status}
                  </span>
                  <span className="text-white/20 text-[11px]">{new Date(selected.created_at).toLocaleString()}</span>
                </div>

                {/* Details */}
                {[
                  { label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                  { label: 'Company', value: selected.company || '—' },
                  { label: 'Service Interested In', value: selected.service },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20">{label}</span>
                    {href ? (
                      <a href={href} className="text-[13px] text-[#AFFF00]/60 hover:text-[#AFFF00] transition-colors">{value}</a>
                    ) : (
                      <span className="text-[13px] text-white/60">{value}</span>
                    )}
                  </div>
                ))}

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20">Message</span>
                  <p className="text-[14px] text-white/50 leading-relaxed bg-white/[0.02] border border-white/[0.05] p-5 whitespace-pre-wrap"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}>
                    {selected.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2 border-t border-white/[0.05]">
                  <a href={`mailto:${selected.email}?subject=Re: Inquiry for ${selected.service}`}
                    onClick={() => updateStatus(selected.id, 'replied')}
                    className="flex items-center justify-center gap-2 bg-[#AFFF00] text-black py-3 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors duration-300"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Reply via Email
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => updateStatus(selected.id, 'read')}
                      className="py-2.5 border border-white/[0.08] text-white/30 hover:text-white/60 text-[10px] tracking-[0.2em] uppercase transition-colors"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}>
                      Mark Read
                    </button>
                    <button onClick={() => updateStatus(selected.id, 'replied')}
                      className="py-2.5 border border-white/[0.08] text-white/30 hover:text-blue-400/60 text-[10px] tracking-[0.2em] uppercase transition-colors"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}>
                      Mark Replied
                    </button>
                  </div>
                  <button onClick={() => deleteInquiry(selected.id)}
                    className="py-2.5 border border-red-500/20 text-red-400/40 hover:text-red-400/70 hover:border-red-500/40 text-[10px] tracking-[0.2em] uppercase transition-colors"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}>
                    Delete Submission
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default ContactForms;
