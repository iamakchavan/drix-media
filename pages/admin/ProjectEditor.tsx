import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../../data/projectsData';
import AdminLayout from './AdminLayout';
import ImageUpload from './ImageUpload';

const categories = ['Branding', 'Web Design', 'Creative Production', 'Content Strategy', 'UI/UX', 'Motion'];
const clipSm = { clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' };
const inputCls = "bg-white/[0.03] border border-white/[0.07] px-4 py-2.5 text-white text-[13px] poppins-regular placeholder:text-white/15 focus:outline-none focus:border-[#AFFF00]/30 focus:bg-white/[0.05] transition-all duration-300 w-full";

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between">
      <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">{label}</label>
      {hint && <span className="text-[9px] text-white/15">{hint}</span>}
    </div>
    {children}
  </div>
);

// ── Reusable array field (brandProblems, whatWeDid, image arrays) ─────────────
const ArrayField = ({ label, values, onChange, placeholder, hint }: {
  label: string; values: string[]; onChange: (v: string[]) => void;
  placeholder?: string; hint?: string;
}) => {
  const update = (i: number, val: string) => { const n = [...values]; n[i] = val; onChange(n); };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const add = () => onChange([...values, '']);
  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input value={v} onChange={e => update(i, e.target.value)} placeholder={placeholder}
              className={inputCls} style={clipSm} />
            <button onClick={() => remove(i)} className="px-3 text-white/20 hover:text-red-400/60 border border-white/[0.07] hover:border-red-400/20 transition-colors shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        ))}
        <button onClick={add} className="flex items-center gap-2 text-[10px] text-[#AFFF00]/50 hover:text-[#AFFF00]/80 transition-colors w-fit mt-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add item
        </button>
      </div>
    </Field>
  );
};

// ── Image array field with upload per item ────────────────────────────────────
const ImageArrayField = ({ label, values, onChange, hint }: {
  label: string; values: string[]; onChange: (v: string[]) => void; hint?: string;
}) => {
  const update = (i: number, val: string) => { const n = [...values]; n[i] = val; onChange(n); };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const add = () => onChange([...values, '']);
  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-4">
        {values.map((v, i) => (
          <div key={i} className="relative">
            <ImageUpload value={v} onChange={val => update(i, val)} aspect="aspect-video" placeholder="https://… or upload" />
            {values.length > 1 && (
              <button onClick={() => remove(i)}
                className="absolute -top-1 -right-1 z-10 bg-[#0D0D0D] border border-white/[0.08] text-white/20 hover:text-red-400/60 p-1 transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
        ))}
        <button onClick={add} className="flex items-center gap-2 text-[10px] text-[#AFFF00]/50 hover:text-[#AFFF00]/80 transition-colors w-fit">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add image
        </button>
      </div>
    </Field>
  );
};

// ── Image preview grid ────────────────────────────────────────────────────────
const ImageGrid = ({ images }: { images: string[] }) => {  const valid = images.filter(Boolean);
  if (!valid.length) return null;
  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {valid.map((src, i) => (
        <div key={i} className="aspect-video overflow-hidden bg-white/[0.03] border border-white/[0.05]">
          <img src={src} alt="" className="w-full h-full object-cover opacity-70" onError={e => (e.currentTarget.style.display = 'none')} />
        </div>
      ))}
    </div>
  );
};

// ── Section wrapper ───────────────────────────────────────────────────────────
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-5 bg-white/[0.02] border border-white/[0.05] p-6"
    style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}>
    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#AFFF00]/60 border-b border-white/[0.05] pb-3">{title}</p>
    {children}
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const ProjectEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existing = id ? projectsData.find(p => p.id === id) : null;

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') navigate('/admin');
  }, [navigate]);

  // ── Core fields ──
  const [title, setTitle] = useState(existing?.title || '');
  const [slug, setSlug] = useState(existing?.id || '');
  const [category, setCategory] = useState(existing?.category || categories[0]);
  const [description, setDescription] = useState(existing?.description || '');
  const [problem, setProblem] = useState(existing?.problem || '');
  const [year, setYear] = useState('2024');
  const [link, setLink] = useState('');
  const [brandProblems, setBrandProblems] = useState<string[]>(existing?.brandProblems || ['']);
  const [whatWeDid, setWhatWeDid] = useState<string[]>(existing?.whatWeDid || ['']);
  const [thumbnail, setThumbnail] = useState(existing?.thumbnail || '');
  const [heroImage, setHeroImage] = useState(existing?.heroImage || '');

  // ── Project type ──
  const [projectType, setProjectType] = useState<'design' | 'marketing'>(
    existing?.designAssets ? 'design' : 'marketing'
  );

  // ── Design assets ──
  const [sketches, setSketches] = useState<string[]>(existing?.designAssets?.sketches || ['']);
  const [mockups, setMockups] = useState<string[]>(existing?.designAssets?.mockups || ['']);
  const [colorPalette, setColorPalette] = useState(
    existing?.designAssets?.colorPalette || [{ name: '', hex: '#000000' }]
  );
  const [typography, setTypography] = useState(
    existing?.designAssets?.typography || [{ name: '', font: '', usage: '' }]
  );

  // ── Marketing assets ──
  const [stats, setStats] = useState(
    existing?.marketingAssets?.stats || [{ label: '', value: '', trend: '' }]
  );
  const [collaterals, setCollaterals] = useState<string[]>(existing?.marketingAssets?.collaterals || ['']);

  const [saved, setSaved] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit) setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const handleSave = () => {
    const project = {
      id: slug, title, category, description, problem, brandProblems: brandProblems.filter(Boolean),
      whatWeDid: whatWeDid.filter(Boolean), thumbnail, heroImage,
      ...(projectType === 'design' ? {
        designAssets: {
          sketches: sketches.filter(Boolean), mockups: mockups.filter(Boolean),
          colorPalette: colorPalette.filter(c => c.name),
          typography: typography.filter(t => t.name),
        }
      } : {
        marketingAssets: {
          stats: stats.filter(s => s.label),
          collaterals: collaterals.filter(Boolean),
        }
      })
    };
    console.log('Project saved (Supabase pending):', project);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout active="posts">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.05] bg-[#050505]/90 backdrop-blur px-6 md:px-10 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/projects" className="text-white/20 hover:text-white/60 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-[12px] text-white/30 tracking-widest uppercase">{isEdit ? 'Edit Project' : 'New Project'}</span>
        </div>
        <motion.button onClick={handleSave} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-[#AFFF00] text-black px-5 py-2 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors duration-300"
          style={clipSm}>
          Save Project
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </motion.button>
      </header>

      {/* Saved toast */}
      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-20 right-6 z-50 bg-[#AFFF00] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-3 flex items-center gap-2"
            style={clipSm}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            Saved
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 md:px-10 py-10 flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto w-full">

        {/* ── Left: main form ── */}
        <div className="flex-1 flex flex-col gap-6">

          <Section title="Core Info">
            <Field label="Project Title">
              <input value={title} onChange={e => handleTitleChange(e.target.value)}
                placeholder="e.g. Radiant Skincare" className={inputCls} style={clipSm} />
            </Field>
            <Field label="URL Slug" hint="Auto-generated">
              <input value={slug} onChange={e => setSlug(e.target.value)}
                placeholder="e.g. radiant-skincare" className={inputCls} style={clipSm} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select value={category} onChange={e => setCategory(e.target.value)}
                  className={inputCls + " appearance-none cursor-pointer"} style={clipSm}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Year">
                <input value={year} onChange={e => setYear(e.target.value)}
                  placeholder="2024" className={inputCls} style={clipSm} />
              </Field>
            </div>
            <Field label="Live URL" hint="Optional">
              <input value={link} onChange={e => setLink(e.target.value)}
                placeholder="https://…" className={inputCls} style={clipSm} />
            </Field>
          </Section>

          <Section title="Description & Problem">
            <Field label="Project Description">
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Brief overview of the project…" rows={3}
                className={inputCls + " resize-none"} style={clipSm} />
            </Field>
            <Field label="The Problem / Challenge">
              <textarea value={problem} onChange={e => setProblem(e.target.value)}
                placeholder="What problem did the client face?" rows={3}
                className={inputCls + " resize-none"} style={clipSm} />
            </Field>
            <ArrayField label="Brand Problems (bullet points)" values={brandProblems}
              onChange={setBrandProblems} placeholder="e.g. Low brand recall among premium consumers" />
            <ArrayField label="What We Did (services)" values={whatWeDid}
              onChange={setWhatWeDid} placeholder="e.g. Brand Identity" />
          </Section>

          {/* Project type toggle */}
          <Section title="Project Type & Assets">
            <Field label="Asset Type">
              <div className="flex gap-2">
                {(['design', 'marketing'] as const).map(t => (
                  <button key={t} onClick={() => setProjectType(t)}
                    className={`flex-1 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase border transition-all duration-200 capitalize
                      ${projectType === t ? 'bg-[#AFFF00] text-black border-[#AFFF00]' : 'border-white/[0.08] text-white/30 hover:border-white/20'}`}
                    style={clipSm}>
                    {t === 'design' ? '🎨 Design Project' : '📊 Marketing Project'}
                  </button>
                ))}
              </div>
            </Field>

            {projectType === 'design' ? (
              <>
                <ImageArrayField label="Sketch / Process Images" values={sketches}
                  onChange={setSketches} hint="Process shots" />
                <ImageArrayField label="Mockup Images" values={mockups}
                  onChange={setMockups} hint="Final renders" />

                {/* Color palette */}
                <Field label="Color Palette">
                  <div className="flex flex-col gap-2">
                    {colorPalette.map((c, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input type="color" value={c.hex}
                          onChange={e => { const n = [...colorPalette]; n[i] = { ...n[i], hex: e.target.value }; setColorPalette(n); }}
                          className="w-10 h-10 rounded-none border border-white/[0.07] bg-transparent cursor-pointer shrink-0" />
                        <input value={c.name} onChange={e => { const n = [...colorPalette]; n[i] = { ...n[i], name: e.target.value }; setColorPalette(n); }}
                          placeholder="Color name (e.g. Pearl White)" className={inputCls} style={clipSm} />
                        <button onClick={() => setColorPalette(colorPalette.filter((_, idx) => idx !== i))}
                          className="px-3 py-2.5 text-white/20 hover:text-red-400/60 border border-white/[0.07] transition-colors shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    ))}
                    <button onClick={() => setColorPalette([...colorPalette, { name: '', hex: '#000000' }])}
                      className="flex items-center gap-2 text-[10px] text-[#AFFF00]/50 hover:text-[#AFFF00]/80 transition-colors w-fit mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      Add color
                    </button>
                  </div>
                </Field>

                {/* Typography */}
                <Field label="Typography">
                  <div className="flex flex-col gap-2">
                    {typography.map((t, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2">
                        <input value={t.name} onChange={e => { const n = [...typography]; n[i] = { ...n[i], name: e.target.value }; setTypography(n); }}
                          placeholder="Font name" className={inputCls} style={clipSm} />
                        <input value={t.font} onChange={e => { const n = [...typography]; n[i] = { ...n[i], font: e.target.value }; setTypography(n); }}
                          placeholder="Type (Serif…)" className={inputCls} style={clipSm} />
                        <input value={t.usage} onChange={e => { const n = [...typography]; n[i] = { ...n[i], usage: e.target.value }; setTypography(n); }}
                          placeholder="Usage (Headings…)" className={inputCls} style={clipSm} />
                      </div>
                    ))}
                    <button onClick={() => setTypography([...typography, { name: '', font: '', usage: '' }])}
                      className="flex items-center gap-2 text-[10px] text-[#AFFF00]/50 hover:text-[#AFFF00]/80 transition-colors w-fit mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      Add typeface
                    </button>
                  </div>
                </Field>
              </>
            ) : (
              <>
                {/* Stats */}
                <Field label="Performance Stats">
                  <div className="flex flex-col gap-2">
                    {stats.map((s, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2">
                        <input value={s.label} onChange={e => { const n = [...stats]; n[i] = { ...n[i], label: e.target.value }; setStats(n); }}
                          placeholder="Label (e.g. Reach)" className={inputCls} style={clipSm} />
                        <input value={s.value} onChange={e => { const n = [...stats]; n[i] = { ...n[i], value: e.target.value }; setStats(n); }}
                          placeholder="Value (e.g. 1.2M+)" className={inputCls} style={clipSm} />
                        <input value={s.trend || ''} onChange={e => { const n = [...stats]; n[i] = { ...n[i], trend: e.target.value }; setStats(n); }}
                          placeholder="Trend (e.g. +45%)" className={inputCls} style={clipSm} />
                      </div>
                    ))}
                    <button onClick={() => setStats([...stats, { label: '', value: '', trend: '' }])}
                      className="flex items-center gap-2 text-[10px] text-[#AFFF00]/50 hover:text-[#AFFF00]/80 transition-colors w-fit mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      Add stat
                    </button>
                  </div>
                </Field>
                <ImageArrayField label="Collateral Images" values={collaterals}
                  onChange={setCollaterals} hint="Campaign visuals" />
              </>
            )}
          </Section>
        </div>

        {/* ── Right sidebar ── */}
        <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-5">
          <Section title="Cover Images">
            <Field label="Thumbnail">
              <ImageUpload value={thumbnail} onChange={setThumbnail} aspect="aspect-video" placeholder="https://… or /projects/…" />
            </Field>
            <Field label="Hero Image">
              <ImageUpload value={heroImage} onChange={setHeroImage} aspect="aspect-video" placeholder="https://… or /projects/…" />
            </Field>
          </Section>

          <Section title="Preview">
            <div className="flex flex-col gap-2">
              <div className="aspect-[3/4] overflow-hidden bg-white/[0.02] border border-white/[0.05] relative"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}>
                {thumbnail
                  ? <img src={thumbnail} alt="" className="w-full h-full object-cover opacity-60" />
                  : <div className="w-full h-full flex items-center justify-center text-white/10 text-[11px] uppercase tracking-widest">No image</div>
                }
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[9px] text-[#AFFF00]/60 uppercase tracking-widest mb-1">{category}</p>
                  <p className="text-white text-[1rem] mona-sans-condensed-bold uppercase leading-tight">{title || 'Project Title'}</p>
                </div>
              </div>
              <p className="text-[9px] text-white/15 text-center">Card preview</p>
            </div>
          </Section>
        </aside>
      </div>
    </AdminLayout>
  );
};

export default ProjectEditor;
