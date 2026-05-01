import { supabase } from '../../lib/supabase';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Project } from '../../types/project';
import AdminLayout from './AdminLayout';
import ImageUpload from './ImageUpload';

const categories = ['Branding', 'Web Design', 'Creative Production', 'Content Strategy', 'UI/UX', 'Motion'];
const clipSm = { clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' };
const inputCls = "bg-white/[0.03] border border-white/[0.07] px-4 py-2.5 text-white text-[13px] poppins-regular placeholder:text-white/15 focus:outline-none focus:border-[#AFFF00]/30 focus:bg-white/[0.05] transition-all duration-300 w-full";
const selectCls = "bg-[#111] border border-white/[0.07] px-4 py-2.5 text-white text-[13px] poppins-regular focus:outline-none focus:border-[#AFFF00]/30 transition-all duration-300 w-full appearance-none cursor-pointer";

const ReorderGroup = Reorder.Group as any;
const ReorderItem = Reorder.Item as any;

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between">
      <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">{label}</label>
      {hint && <span className="text-[9px] text-white/15">{hint}</span>}
    </div>
    {children}
  </div>
);

const ArrayField = ({ label, values, onChange, placeholder }: {
  label: string; values: string[]; onChange: (v: string[]) => void; placeholder?: string;
}) => {
  const update = (i: number, val: string) => { const n = [...values]; n[i] = val; onChange(n); };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const add = () => onChange([...values, '']);
  return (
    <div className="flex flex-col gap-2">
      {values.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input value={v} onChange={e => update(i, e.target.value)} placeholder={placeholder} className={inputCls} style={clipSm} />
          <button onClick={() => remove(i)} className="px-3 text-white/20 hover:text-red-400/60 border border-white/[0.07] transition-colors shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-2 text-[10px] text-[#AFFF00]/50 hover:text-[#AFFF00] transition-colors w-fit mt-1 uppercase tracking-widest font-bold">
        + Add {label}
      </button>
    </div>
  );
};

const Card = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/[0.02] border border-white/[0.05] flex flex-col ${className}`} style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}>
    <div className="px-6 py-4 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
      <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#AFFF00]/60">{title}</h3>
    </div>
    <div className="p-6 flex flex-col gap-5">
      {children}
    </div>
  </div>
);

const ProjectEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/admin'); }
    });
  }, [navigate]);

  // ── States ──
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [year, setYear] = useState('2024');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [challengeTitle, setChallengeTitle] = useState('Objective included addressing fundamental challenges such as');
  const [brandProblems, setBrandProblems] = useState<string[]>(['']);
  const [whatWeDid, setWhatWeDid] = useState<string[]>(['']);
  const [heroImage, setHeroImage] = useState('');
  const [galleryLayout, setGalleryLayout] = useState<'bento' | 'carousel'>('bento');
  const [gallery, setGallery] = useState<string[]>([]);
  const [orderIndex, setOrderIndex] = useState(0);

  // ── Fetch Existing Data ──
  useEffect(() => {
    if (!isEdit) return;

    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        setTitle(data.title);
        setSlug(data.id);
        setCategory(data.category);
        setDescription(data.description || '');
        setProblem(data.problem || '');
        setChallengeTitle(data.challenge_title);
        setBrandProblems(data.brand_problems?.length ? data.brand_problems : ['']);
        setWhatWeDid(data.services?.length ? data.services : ['']);
        setHeroImage(data.hero_image || '');
        setGalleryLayout(data.gallery_layout);
        setGallery(data.assets?.mockups || []);
        setOrderIndex(data.order_index || 0);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id, isEdit]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit) setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files) return;
    setUploading(true);
    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
      const { error } = await supabase.storage.from('project-images').upload(fileName, file);
      if (!error) {
        const { data: { publicUrl } } = supabase.storage.from('project-images').getPublicUrl(fileName);
        newUrls.push(publicUrl);
      }
    }
    setGallery(prev => [...prev, ...newUrls]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async () => {
    const projectData = {
      id: slug,
      title,
      category,
      description,
      problem,
      challenge_title: challengeTitle,
      gallery_layout: galleryLayout,
      hero_image: heroImage,
      thumbnail: heroImage,
      brand_problems: brandProblems.filter(Boolean),
      services: whatWeDid.filter(Boolean),
      assets: { 
        mockups: gallery, 
        sketches: [], 
        palette: [], 
        typography: [],
        stats: [] 
      },
      order_index: orderIndex,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('projects')
      .upsert(projectData);

    if (!error) {
      setSaved(true); 
      setTimeout(() => setSaved(false), 3000);
      if (!isEdit) navigate(`/admin/projects/${slug}`, { replace: true });
    } else {
      console.error('Error saving project:', error.message);
    }
  };

  const getBentoSpan = (i: number) => {
    const mod = i % 5;
    if (mod === 0) return "col-span-2 row-span-2";
    if (mod === 1) return "col-span-2 row-span-1";
    if (mod === 2 || mod === 3) return "col-span-1 row-span-1";
    if (mod === 4) return "col-span-2 row-span-1";
    return "col-span-1 row-span-1";
  };

  if (loading) return (
    <AdminLayout active="projects">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-2 border-white/5 border-t-[#AFFF00] rounded-full animate-spin" />
        <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Fetching Index...</span>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout active="projects">
      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#050505]/95 backdrop-blur-xl px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="text-white/20 hover:text-white/60 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase font-bold leading-none mb-1">{isEdit ? 'Edit' : 'Create'}</span>
            <span className="text-[14px] text-white mona-sans-condensed-bold uppercase tracking-tight leading-none">{title || 'Untitled Project'}</span>
          </div>
        </div>
        <motion.button onClick={handleSave} whileTap={{ scale: 0.97 }}
          className="bg-[#AFFF00] text-black px-6 py-2.5 text-[11px] tracking-[0.2em] uppercase font-black hover:bg-white transition-all duration-300"
          style={clipSm}>
          Save Changes
        </motion.button>
      </header>

      {/* ── Main Workspace ── */}
      <div className="p-6 md:p-10 flex flex-col gap-8 max-w-[1700px] mx-auto w-full">
        
        {/* Row 1: Identity & Narrative */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Col: Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card title="Project Identity">
              <Field label="URL Slug" hint="Unique ID">
                <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="radiant-skincare" className={inputCls} style={clipSm} />
              </Field>
              <Field label="Category">
                <select value={category} onChange={e => setCategory(e.target.value)} className={selectCls} style={clipSm}>
                  {categories.map(c => <option key={c} value={c} className="bg-[#111]">{c}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Year">
                  <input value={year} onChange={e => setYear(e.target.value)} placeholder="2024" className={inputCls} style={clipSm} />
                </Field>
                <Field label="Live URL">
                  <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://" className={inputCls} style={clipSm} />
                </Field>
              </div>
            </Card>

            <Card title="Project Assets">
              <Field label="Main Hero Image" hint="Used for both Page Hero & Gallery Card">
                <ImageUpload value={heroImage} onChange={setHeroImage} aspect="aspect-video" bucket="project-images" />
              </Field>
            </Card>
          </div>

          {/* Right Col: Narrative (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card title="The Project Narrative">
              <Field label="Project Title">
                <input value={title} onChange={e => handleTitleChange(e.target.value)} placeholder="Enter project name..." className="bg-transparent border-none text-white text-3xl mona-sans-condensed-bold uppercase p-0 focus:outline-none placeholder:text-white/10" />
              </Field>
              <Field label="Description">
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell the story..." rows={3} className={inputCls + " resize-none"} style={clipSm} />
              </Field>
              <Field label="The Challenge">
                <textarea value={problem} onChange={e => setProblem(e.target.value)} placeholder="What was the problem?" rows={2} className={inputCls + " resize-none"} style={clipSm} />
              </Field>
              <Field label="Objective Sentence" hint="Wraps the problems below">
                <input value={challengeTitle} onChange={e => setChallengeTitle(e.target.value)} placeholder="Objective included addressing challenges such as..." className={inputCls} style={clipSm} />
              </Field>
              <div className="grid grid-cols-2 gap-6">
                <Field label="Brand Problems">
                  <ArrayField label="Problem" values={brandProblems} onChange={setBrandProblems} placeholder="Point..." />
                </Field>
                <Field label="Services">
                  <ArrayField label="Service" values={whatWeDid} onChange={setWhatWeDid} placeholder="e.g. Branding" />
                </Field>
              </div>
            </Card>
          </div>
        </div>

        {/* Row 2: Master Gallery & Preview (Full Width) */}
        <div className="w-full">
          <Card title="Master Gallery & Live Preview">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between bg-white/[0.01] border-b border-white/[0.05] pb-6 -mx-6 px-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Presentation Mode</span>
                  <div className="flex bg-white/[0.05] p-1 rounded-sm" style={clipSm}>
                    {(['bento', 'carousel'] as const).map(l => (
                      <button key={l} onClick={() => setGalleryLayout(l)}
                        className={`px-6 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all ${galleryLayout === l ? 'bg-[#AFFF00] text-black' : 'text-white/30 hover:text-white/60'}`}
                        style={clipSm}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 self-end">
                  <input ref={fileInputRef} type="file" multiple onChange={handleBatchUpload} className="hidden" />
                  <button onClick={() => fileInputRef.current?.click()} className="px-6 py-2.5 bg-white/5 border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-colors" style={clipSm}>
                    {uploading ? 'Uploading...' : '+ Batch Upload Images'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Reorder List */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Project Sequence {gallery.length > 0 && `(${gallery.length})`}</span>
                  <div className="max-h-[800px] overflow-y-auto no-scrollbar pr-4">
                    <ReorderGroup axis="y" values={gallery} onReorder={setGallery}>
                      {gallery.map((url, i) => (
                        <ReorderItem key={url} value={url}>
                          <div className="group bg-white/[0.03] border border-white/[0.07] p-3 flex items-center gap-6 cursor-grab active:cursor-grabbing mb-3 hover:border-[#AFFF00]/20 transition-colors" style={clipSm}>
                             <div className="w-24 aspect-video bg-black shrink-0 overflow-hidden">
                               <img src={url} alt="" className="w-full h-full object-cover opacity-60" />
                             </div>
                             <div className="flex-1">
                               <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                                  Image #{i + 1} {galleryLayout === 'bento' && (i % 5 === 0 || i % 5 === 1 || i % 5 === 4) ? <span className="text-[#AFFF00]/40 ml-2">FEATURED</span> : ''}
                               </p>
                             </div>
                             <button onClick={() => setGallery(prev => prev.filter(u => u !== url))} className="px-3 text-white/10 hover:text-red-400 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                          </div>
                        </ReorderItem>
                      ))}
                    </ReorderGroup>
                  </div>
                  {gallery.length === 0 && <div className="py-20 border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-white/10 text-[10px] uppercase tracking-widest">No images yet</div>}
                </div>

                {/* Live Preview Viewport */}
                <div className="sticky top-2">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-4 block">Visual Preview ({galleryLayout})</span>
                  <div className="p-8 bg-black/40 border border-white/5" style={clipSm}>
                    {galleryLayout === 'bento' ? (
                      <div className="grid grid-cols-4 gap-1.5 auto-rows-[70px] grid-flow-dense">
                        {gallery.map((url, i) => (
                          <div key={i} className={`relative overflow-hidden bg-white/5 ${getBentoSpan(i)}`}>
                            <img src={url} alt="" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/20 font-bold">{i + 1}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                        {gallery.map((url, i) => (
                          <div key={i} className="shrink-0 w-[400px] aspect-video bg-white/5 relative overflow-hidden">
                            <img src={url} alt="" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute bottom-4 left-4 text-[10px] text-white/20 font-bold">#{i + 1}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 p-4 border-t border-white/[0.03]">
                    <p className="text-[9px] text-white/15 uppercase tracking-[0.3em] text-center italic">Drag images on the left to re-align the bento grid in real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Saved Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 right-10 z-[100] bg-[#AFFF00] text-black px-8 py-4 font-black uppercase tracking-widest text-[11px] shadow-2xl" style={clipSm}>
            Project Updated Successfully
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </AdminLayout>
  );
};

export default ProjectEditor;
