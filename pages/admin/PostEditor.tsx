import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from './ImageUpload';
import EditorJS, { OutputData } from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import ImageTool from '@editorjs/image';
// @ts-ignore
import Embed from '@editorjs/embed';
import { supabase } from '../../lib/supabase';

const categories = ['Strategy', 'Branding', 'Digital', 'Culture', 'Production'];

interface PostMeta {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  status: 'draft' | 'published';
  slug?: string;
}

const defaultMeta: PostMeta = {
  title: '',
  excerpt: '',
  category: categories[0],
  author: '',
  readTime: '',
  coverImage: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  status: 'draft',
};

// ── Sidebar field component ──────────────────────────────────────────────────
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">{label}</label>
    {children}
  </div>
);

const inputCls = "bg-white/[0.03] border border-white/[0.07] px-4 py-2.5 text-white text-[13px] poppins-regular placeholder:text-white/15 focus:outline-none focus:border-[#AFFF00]/30 focus:bg-white/[0.05] transition-all duration-300 w-full";
const selectCls = "bg-[#111] border border-white/[0.07] px-4 py-2.5 text-white text-[13px] poppins-regular focus:outline-none focus:border-[#AFFF00]/30 transition-all duration-300 w-full appearance-none cursor-pointer";
const clipSm = { clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' };

const PostEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id && id !== 'new');

  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const [meta, setMeta] = useState<PostMeta>(defaultMeta);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(isEdit);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        sessionStorage.removeItem('admin_auth');
        navigate('/admin');
      }
    });
  }, [navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isEdit) {
        setTimeout(() => initEditor(), 100);
        return;
      }
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
        
      if (data) {
        setMeta({
          title: data.title || '',
          excerpt: data.excerpt || '',
          category: data.category || categories[0],
          author: data.author || '',
          readTime: data.read_time || '',
          coverImage: data.cover_image || '',
          seoTitle: data.seo_title || '',
          seoDescription: data.seo_description || '',
          seoKeywords: data.seo_keywords || '',
          status: data.status,
          slug: data.slug,
        });
        setTimeout(() => initEditor(data.content), 100);
      } else {
        console.error('Error fetching post', error);
        setTimeout(() => initEditor(), 100);
      }
      setLoading(false);
    };

    fetchPost();

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [id, isEdit]);

  const calculateWordCount = (blocks: any[]) => {
    if (!blocks) return 0;
    const text = blocks
      .map((b: any) => b.data?.text || b.data?.items?.join(' ') || '')
      .join(' ');
    return text.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(Boolean).length;
  };

  const initEditor = (initialData?: any) => {
    if (!holderRef.current || editorRef.current) return;

    if (initialData?.blocks) {
      setWordCount(calculateWordCount(initialData.blocks));
    }

    editorRef.current = new EditorJS({
      holder: holderRef.current,
      data: initialData,
      autofocus: true,
      placeholder: 'Start writing your post…',
      tools: {
        header: {
          class: Header,
          config: { levels: [2, 3, 4], defaultLevel: 2 },
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: { quotePlaceholder: 'Enter a quote', captionPlaceholder: 'Quote author' },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: { defaultStyle: 'unordered' },
        },
        delimiter: Delimiter,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file: File) => {
                const ext = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
                const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file);
                
                if (error) {
                  console.error('Upload failed:', error);
                  return { success: 0 };
                }
                
                const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);
                return { success: 1, file: { url: publicUrl } };
              },
              uploadByUrl: async (url: string) => {
                return { success: 1, file: { url } };
              },
            },
          },
        },
        embed: {
          class: Embed,
          config: { services: { youtube: true, vimeo: true, twitter: true } },
        },
      },
      onChange: async () => {
        if (!editorRef.current) return;
        const data = await editorRef.current.save();
        setWordCount(calculateWordCount(data.blocks));
      },
    });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!editorRef.current) return;
    const content: OutputData = await editorRef.current.save();
    
    const slugToUse = meta.slug || generateSlug(meta.title) || `post-${Date.now()}`;
    
    const postData = {
      title: meta.title,
      slug: slugToUse,
      excerpt: meta.excerpt,
      category: meta.category,
      author: meta.author,
      read_time: meta.readTime,
      cover_image: meta.coverImage,
      seo_title: meta.seoTitle,
      seo_description: meta.seoDescription,
      seo_keywords: meta.seoKeywords,
      status: status,
      content: content
    };

    if (isEdit) {
      const { error } = await supabase.from('posts').update(postData).eq('id', id);
      if (!error) {
        set('status', status);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else console.error(error);
    } else {
      const { data, error } = await supabase.from('posts').insert(postData).select().single();
      if (!error && data) {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          navigate(`/admin/posts/${data.id}`, { replace: true });
        }, 1500);
      } else console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!id || !isEdit) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) {
      navigate('/admin/posts', { replace: true });
    } else {
      console.error('Error deleting post:', error);
    }
  };

  const set = (key: keyof PostMeta, val: string) => setMeta(p => ({ ...p, [key]: val }));

  return (
    <div className="min-h-screen bg-[#050505] text-white poppins-regular flex flex-col selection:bg-[#AFFF00] selection:text-black">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-white/[0.05] bg-[#050505]/90 backdrop-blur px-6 md:px-10 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="text-white/20 hover:text-white/60 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-[12px] text-white/30 tracking-widest uppercase">{isEdit ? 'Edit Post' : 'New Post'}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Delete Button */}
          {isEdit && (
            <button onClick={() => setShowDeleteModal(true)}
              className="p-2 text-red-500/60 hover:text-red-400 hover:bg-red-500/10 transition-all mr-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            </button>
          )}

          {/* Word count */}
          <span className="hidden sm:block text-[10px] text-white/15 tracking-widest">{wordCount} words</span>

          {/* Status badge */}
          <span className={`text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1 border ${meta.status === 'published' ? 'border-[#AFFF00]/30 text-[#AFFF00]/70' : 'border-white/10 text-white/20'}`}>
            {meta.status}
          </span>

          <button onClick={() => handleSave('draft')}
            className="text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white/70 border border-white/[0.08] hover:border-white/20 px-4 py-2 transition-all duration-200"
            style={clipSm}>
            Save Draft
          </button>

          <motion.button onClick={() => handleSave('published')}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-[#AFFF00] text-black px-5 py-2 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors duration-300"
            style={clipSm}>
            Publish
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </motion.button>
        </div>
      </header>

      {/* ── Saved toast ─────────────────────────────────────────────────── */}
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

      <div className="flex flex-1 overflow-hidden">

        {/* ── Main editor area ─────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[780px] mx-auto px-6 md:px-10 py-10 flex flex-col gap-6">

            {/* Cover image preview */}
            {meta.coverImage && (
              <div className="w-full aspect-[16/7] overflow-hidden relative"
                style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)' }}>
                <img src={meta.coverImage} alt="Cover" className="w-full h-full object-cover opacity-80" />
                <button onClick={() => set('coverImage', '')}
                  className="absolute top-3 right-6 bg-black/60 text-white/60 hover:text-white px-3 py-1 text-[10px] uppercase tracking-widest transition-colors">
                  Remove
                </button>
              </div>
            )}
            {/* Title */}
            <textarea
              value={meta.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Post title…"
              rows={2}
              className="w-full bg-transparent text-[2.2rem] md:text-[2.8rem] mona-sans-condensed-medium text-white placeholder:text-white/10 focus:outline-none resize-none leading-tight tracking-tight"
            />

            {/* Excerpt */}
            <textarea
              value={meta.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              placeholder="Short excerpt / subtitle…"
              rows={2}
              className="w-full bg-transparent text-[15px] text-white/40 placeholder:text-white/10 focus:outline-none resize-none leading-relaxed border-b border-white/[0.05] pb-6"
            />

            {/* Editor.js mount point */}
            <div
              ref={holderRef}
              id="editorjs"
              className="min-h-[400px] prose-editor"
            />
          </div>
        </main>

        {/* ── Right sidebar ────────────────────────────────────────────── */}
        <aside className="w-[300px] shrink-0 border-l border-white/[0.05] bg-[#080808] hidden lg:flex flex-col overflow-y-auto">

          {/* Tabs */}
          <div className="flex border-b border-white/[0.05]">
            {(['content', 'seo'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3.5 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${activeTab === tab ? 'text-white border-b-2 border-[#AFFF00]' : 'text-white/20 hover:text-white/40'}`}>
                {tab === 'content' ? 'Post Details' : 'SEO'}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5 p-5">
            {activeTab === 'content' ? (
              <>
                {/* Status */}
                <Field label="Status">
                  <div className="flex gap-2">
                    {(['draft', 'published'] as const).map(s => (
                      <button key={s} onClick={() => set('status', s)}
                        className={`flex-1 py-2 text-[10px] font-bold tracking-[0.2em] uppercase border transition-all duration-200
                          ${meta.status === s ? 'bg-[#AFFF00] text-black border-[#AFFF00]' : 'border-white/[0.08] text-white/30 hover:border-white/20'}`}
                        style={clipSm}>
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Category */}
                <Field label="Category">
                  <select value={meta.category} onChange={e => set('category', e.target.value)}
                    className={selectCls} style={clipSm}>
                    {categories.map(c => <option key={c} value={c} className="bg-[#111] text-white">{c}</option>)}
                  </select>
                </Field>

                {/* Author */}
                <Field label="Author">
                  <input value={meta.author} onChange={e => set('author', e.target.value)}
                    placeholder="e.g. Alex Rivera" className={inputCls} style={clipSm} />
                </Field>

                {/* Read time */}
                <Field label="Read Time">
                  <div className="relative">
                    <input 
                      type="text"
                      inputMode="numeric"
                      value={meta.readTime.replace(/\D/g, '')} 
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, '');
                        set('readTime', val ? `${val} min read` : '');
                      }}
                      placeholder="5" 
                      className={inputCls.replace('px-4', 'pl-4 pr-24')} 
                      style={clipSm} 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase pointer-events-none">
                      Min Read
                    </span>
                  </div>
                </Field>

                {/* Cover image */}
                <Field label="Cover Image">
                  <ImageUpload
                    value={meta.coverImage}
                    onChange={v => set('coverImage', v)}
                    aspect="aspect-video"
                    placeholder="https://… or upload"
                  />
                </Field>

                {/* Divider */}
                <div className="border-t border-white/[0.05]" />

                {/* Word count info */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest">Word Count</span>
                  <span className="text-[13px] text-white/40 mona-sans-condensed-medium">{wordCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest">Est. Read Time</span>
                  <span className="text-[13px] text-white/40 mona-sans-condensed-medium">{Math.max(1, Math.ceil(wordCount / 200))} min</span>
                </div>
              </>
            ) : (
              <>
                <Field label="SEO Title">
                  <input value={meta.seoTitle} onChange={e => set('seoTitle', e.target.value)}
                    placeholder="Page title for search engines" className={inputCls} style={clipSm} />
                  <p className={`text-[10px] ${meta.seoTitle.length > 60 ? 'text-red-400/60' : 'text-white/15'}`}>
                    {meta.seoTitle.length}/60 chars
                  </p>
                </Field>

                <Field label="Meta Description">
                  <textarea value={meta.seoDescription} onChange={e => set('seoDescription', e.target.value)}
                    placeholder="Brief description for search results…" rows={3}
                    className={inputCls + " resize-none"} style={clipSm} />
                  <p className={`text-[10px] ${meta.seoDescription.length > 160 ? 'text-red-400/60' : 'text-white/15'}`}>
                    {meta.seoDescription.length}/160 chars
                  </p>
                </Field>

                <Field label="Keywords">
                  <input value={meta.seoKeywords} onChange={e => set('seoKeywords', e.target.value)}
                    placeholder="branding, strategy, design…" className={inputCls} style={clipSm} />
                  <p className="text-[10px] text-white/15">Comma separated</p>
                </Field>

                {/* SEO preview */}
                <div className="border-t border-white/[0.05] pt-4">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 mb-3">Search Preview</p>
                  <div className="bg-white/[0.02] border border-white/[0.05] p-4 flex flex-col gap-1"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
                    <p className="text-[#AFFF00]/70 text-[13px] truncate">{meta.seoTitle || meta.title || 'Post Title'}</p>
                    <p className="text-green-400/40 text-[10px]">drixmedia.com/blog/…</p>
                    <p className="text-white/25 text-[11px] leading-relaxed line-clamp-2">
                      {meta.seoDescription || meta.excerpt || 'Meta description will appear here…'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center px-6">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              className="bg-[#0D0D0D] border border-white/[0.08] p-8 max-w-sm w-full flex flex-col gap-6"
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}>
              <div>
                <p className="text-white mona-sans-condensed-medium text-[1.2rem]">Delete this post?</p>
                <p className="text-white/30 text-[13px] mt-2">This action cannot be undone. It will be permanently removed.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteModal(false)}
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

      {/* Editor.js custom styles */}
      <style>{`
        .prose-editor .ce-block__content,
        .prose-editor .ce-toolbar__content {
          max-width: 100% !important;
        }
        .prose-editor .codex-editor {
          color: rgba(255,255,255,0.75);
        }
        .prose-editor .ce-paragraph {
          font-size: 16px;
          line-height: 1.85;
          color: rgba(255,255,255,0.65);
          font-family: inherit;
        }
        .prose-editor .ce-header {
          color: #ffffff;
          font-family: 'Mona Sans', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .prose-editor h2.ce-header { font-size: 1.8rem; }
        .prose-editor h3.ce-header { font-size: 1.4rem; }
        .prose-editor .cdx-quote__text {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.5);
          border-left: 3px solid #AFFF00;
          padding-left: 1rem;
          font-style: italic;
        }
        .prose-editor .cdx-list__item {
          color: rgba(255,255,255,0.65);
          font-size: 15px;
          line-height: 1.7;
        }
        .prose-editor .ce-delimiter::before {
          color: rgba(175,255,0,0.4);
        }
        .prose-editor .ce-toolbar__plus,
        .prose-editor .ce-toolbar__settings-btn {
          color: rgba(255,255,255,0.3);
          background: transparent;
        }
        .prose-editor .ce-toolbar__plus:hover,
        .prose-editor .ce-toolbar__settings-btn:hover {
          color: #AFFF00;
          background: rgba(175,255,0,0.08);
        }
        .prose-editor .ce-inline-toolbar,
        .prose-editor .ce-conversion-toolbar,
        .prose-editor .ce-settings {
          background: #1a1a1a !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.8) !important;
          border-radius: 4px !important;
        }
        .prose-editor .ce-inline-tool,
        .prose-editor .ce-conversion-tool,
        .prose-editor .cdx-settings-button {
          color: rgba(255,255,255,0.7) !important;
          background: transparent !important;
        }
        .prose-editor .ce-inline-tool:hover,
        .prose-editor .ce-conversion-tool:hover,
        .prose-editor .cdx-settings-button:hover,
        .prose-editor .ce-inline-tool--active {
          color: #AFFF00 !important;
          background: rgba(175,255,0,0.1) !important;
        }
        /* Conversion toolbar type selector */
        .prose-editor .ce-conversion-tool__icon {
          background: rgba(255,255,255,0.05) !important;
        }
        .prose-editor .ce-conversion-tool__label {
          color: rgba(255,255,255,0.7) !important;
        }
        /* Toolbar plus button */
        .prose-editor .ce-toolbar__plus,
        .prose-editor .ce-toolbar__settings-btn {
          color: rgba(255,255,255,0.5) !important;
          background: #1a1a1a !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
        }
        .prose-editor .ce-toolbar__plus:hover,
        .prose-editor .ce-toolbar__settings-btn:hover {
          color: #AFFF00 !important;
          background: rgba(175,255,0,0.08) !important;
          border-color: rgba(175,255,0,0.2) !important;
        }
        /* Popover / block tunes */
        .prose-editor .ce-popover,
        .prose-editor .ce-popover__container {
          background: #1a1a1a !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.8) !important;
        }
        .prose-editor .ce-popover-item__title {
          color: rgba(255,255,255,0.7) !important;
        }
        .prose-editor .ce-popover-item:hover,
        .prose-editor .ce-popover-item--active {
          background: rgba(175,255,0,0.08) !important;
        }
        .prose-editor .ce-popover-item:hover .ce-popover-item__title,
        .prose-editor .ce-popover-item--active .ce-popover-item__title {
          color: #AFFF00 !important;
        }
        .prose-editor .ce-popover-item__icon {
          background: rgba(255,255,255,0.05) !important;
          color: rgba(255,255,255,0.5) !important;
        }
        /* Search input in popover */
        .prose-editor .ce-popover__search .cdx-search-field__input {
          background: rgba(255,255,255,0.05) !important;
          color: white !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
        .prose-editor .cdx-block {
          padding: 0.4em 0;
        }
        .prose-editor .image-tool__image {
          border-radius: 0;
        }
        .prose-editor .image-tool__caption {
          color: rgba(255,255,255,0.25);
          font-size: 12px;
          text-align: center;
        }
        .prose-editor [contenteditable]:focus {
          outline: none;
        }
        .prose-editor .ce-block--selected .ce-block__content {
          background: rgba(175,255,0,0.04);
        }
      `}</style>
    </div>
  );
};

export default PostEditor;
