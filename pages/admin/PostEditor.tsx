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
const clipSm = { clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' };

const PostEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const [meta, setMeta] = useState<PostMeta>(defaultMeta);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [wordCount, setWordCount] = useState(0);

  // Auth guard
  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') navigate('/admin');
  }, [navigate]);

  // Init Editor.js
  useEffect(() => {
    if (!holderRef.current || editorRef.current) return;

    editorRef.current = new EditorJS({
      holder: holderRef.current,
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
            // URL upload — swap for Supabase Storage later
            uploader: {
              uploadByFile: async (file: File) => {
                const url = URL.createObjectURL(file);
                return { success: 1, file: { url } };
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
        // rough word count
        const text = data.blocks
          .map((b: any) => b.data?.text || b.data?.items?.join(' ') || '')
          .join(' ');
        setWordCount(text.split(/\s+/).filter(Boolean).length);
      },
    });

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSave = async (status: 'draft' | 'published') => {
    if (!editorRef.current) return;
    const content: OutputData = await editorRef.current.save();
    const post = { ...meta, status, content, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) };
    console.log('Post saved (Supabase pending):', post);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
        <aside className="w-[300px] shrink-0 border-l border-white/[0.05] bg-[#080808] overflow-y-auto hidden lg:flex flex-col">

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
                    className={inputCls + " appearance-none cursor-pointer"} style={clipSm}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>

                {/* Author */}
                <Field label="Author">
                  <input value={meta.author} onChange={e => set('author', e.target.value)}
                    placeholder="e.g. Alex Rivera" className={inputCls} style={clipSm} />
                </Field>

                {/* Read time */}
                <Field label="Read Time">
                  <input value={meta.readTime} onChange={e => set('readTime', e.target.value)}
                    placeholder="e.g. 5 min read" className={inputCls} style={clipSm} />
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
          background: #111 !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6) !important;
        }
        .prose-editor .ce-inline-tool,
        .prose-editor .ce-conversion-tool,
        .prose-editor .cdx-settings-button {
          color: rgba(255,255,255,0.5) !important;
        }
        .prose-editor .ce-inline-tool:hover,
        .prose-editor .ce-conversion-tool:hover,
        .prose-editor .cdx-settings-button:hover,
        .prose-editor .ce-inline-tool--active {
          color: #AFFF00 !important;
          background: rgba(175,255,0,0.08) !important;
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
