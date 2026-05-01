import { supabase } from '../../lib/supabase';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from './AdminLayout';

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Section { id: string; title: string; content: React.ReactNode; }

// â”€â”€ Reusable doc components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[1.1rem] mona-sans-condensed-medium text-white tracking-tight mt-8 mb-3 first:mt-0">{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[0.85rem] font-bold text-white/60 uppercase tracking-[0.2em] mt-6 mb-2">{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] text-white/45 leading-relaxed mb-3">{children}</p>
);
const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-white/[0.06] text-[#AFFF00]/80 px-1.5 py-0.5 text-[11px] font-mono rounded-sm">{children}</code>
);
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-[#0A0A0A] border border-white/[0.06] p-4 text-[11px] font-mono text-white/50 leading-relaxed overflow-x-auto mb-4 whitespace-pre-wrap"
    style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
    {children}
  </pre>
);
const Tag = ({ color, children }: { color: 'green' | 'yellow' | 'red' | 'blue'; children: React.ReactNode }) => {
  const cls = { green: 'text-green-400/70 border-green-400/20 bg-green-400/5', yellow: 'text-[#AFFF00]/70 border-[#AFFF00]/20 bg-[#AFFF00]/5', red: 'text-red-400/70 border-red-400/20 bg-red-400/5', blue: 'text-blue-400/70 border-blue-400/20 bg-blue-400/5' };
  return <span className={`text-[9px] font-bold tracking-[0.25em] uppercase px-2 py-0.5 border ${cls[color]} inline-block`}>{children}</span>;
};
const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-[13px] text-white/45 leading-relaxed mb-1.5">
    <span className="w-1 h-1 bg-[#AFFF00]/40 mt-2 shrink-0"></span>
    <span>{children}</span>
  </li>
);
const Divider = () => <div className="border-t border-white/[0.05] my-6" />;

// â”€â”€ Sections data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const sections: Section[] = [
  {
    id: 'overview',
    title: 'Overview',
    content: (
      <>
        <P>Welcome to the Drix Media admin dashboard. This is your central hub for managing all content on the website â€” blog posts, projects, and contact form submissions.</P>
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag color="green">Live</Tag>
          <Tag color="green">Backend Connected</Tag>
          <Tag color="blue">Auth: Supabase</Tag>
        </div>
        <H3>What you can do here</H3>
        <ul className="mb-4">
          <Li>Write, edit, and publish blog posts using the rich text editor</Li>
          <Li>Add and manage portfolio projects with images and details</Li>
          <Li>View and respond to contact form submissions from your website</Li>
          <Li>Track stats â€” total posts, projects, and new inquiries at a glance</Li>
        </ul>
        <H3>Navigation</H3>
        <ul className="mb-4">
          <Li>Dashboard â€” overview of recent activity and quick actions</Li>
          <Li>Blog Posts â€” manage all your articles</Li>
          <Li>Projects â€” manage your portfolio work</Li>
          <Li>Contact Forms â€” view messages from potential clients</Li>
          <Li>Docs â€” this guide</Li>
        </ul>
      </>
    )
  },
  {
    id: 'auth',
    title: 'Logging In',
    content: (
      <>
        <H2>Accessing the Dashboard</H2>
        <P>Go to <Code>/admin</Code> on your website. Enter your email and password to log in. Your session stays active until you log out or close the browser.</P>
        <H2>Logging Out</H2>
        <P>Click the logout icon in the bottom-left corner of the sidebar at any time to securely sign out.</P>
        <H2>Forgot Your Password?</H2>
        <P>Contact your developer to reset your admin password through the Supabase dashboard. Password self-reset can be enabled on request.</P>
      </>
    )
  },
  {
    id: 'blog',
    title: 'Blog Posts',
    content: (
      <>
        <H2>Creating a New Post</H2>
        <P>From the Dashboard, click "New Post" â€” or go to Blog Posts and click the + button in the top right. This opens the post editor.</P>
        <H3>Writing your content</H3>
        <ul className="mb-4">
          <Li>Click anywhere in the editor area and start typing</Li>
          <Li>Press <Code>/</Code> or click the + icon on the left to insert a block â€” heading, quote, list, image, divider, or embed</Li>
          <Li>Highlight any text to get the inline toolbar for bold, italic, and links</Li>
          <Li>Drag blocks up or down to reorder them</Li>
        </ul>
        <H3>Filling in the sidebar</H3>
        <ul className="mb-4">
          <Li>Title â€” the post headline shown on the blog listing and detail page</Li>
          <Li>Excerpt â€” a short summary shown on the blog card (keep it under 2 sentences)</Li>
          <Li>Category â€” used for filtering on the blog page</Li>
          <Li>Author â€” your name or team member's name</Li>
          <Li>Read Time â€” e.g. "5 min read"</Li>
          <Li>Cover Image â€” drag a file, click to upload, or paste an image URL</Li>
        </ul>
        <H3>SEO fields</H3>
        <P>Expand the SEO section in the sidebar to set a custom page title, meta description, and keywords. These are used by search engines and social sharing previews.</P>
        <Divider />
        <H2>Saving and Publishing</H2>
        <ul className="mb-4">
          <Li>Click "Save Draft" to save without making it public</Li>
          <Li>Click "Publish" to make the post live on the website immediately</Li>
          <Li>You can come back and edit a published post at any time â€” changes go live on save</Li>
        </ul>
        <Divider />
        <H2>Managing Posts</H2>
        <P>The Blog Posts page shows all your articles. You can search by title, filter by category, and see draft vs published status at a glance.</P>
        <ul className="mb-4">
          <Li>Click the edit icon on any post to open it in the editor</Li>
          <Li>Click the delete icon to permanently remove a post â€” this cannot be undone</Li>
        </ul>
      </>
    )
  },
  {
    id: 'projects',
    title: 'Projects',
    content: (
      <>
        <H2>Adding a New Project</H2>
        <P>Go to Projects in the sidebar and click the + button. Choose a project type first â€” Design or Marketing â€” as this determines which fields are shown.</P>
        <H3>Common fields (all projects)</H3>
        <ul className="mb-4">
          <Li>Title â€” the project name shown on the portfolio page</Li>
          <Li>Category â€” e.g. Branding, Web Design, Social Media</Li>
          <Li>Description â€” a short overview of the project</Li>
          <Li>The Problem â€” what challenge the client was facing</Li>
          <Li>Brand Problems â€” bullet points of specific issues (add as many as needed)</Li>
          <Li>What We Did â€” bullet points of your approach and deliverables</Li>
          <Li>Thumbnail â€” the image shown on the portfolio grid</Li>
          <Li>Hero Image â€” the large banner image on the project detail page</Li>
          <Li>Year and Live URL â€” optional metadata</Li>
        </ul>
        <H3>Design projects</H3>
        <ul className="mb-4">
          <Li>Sketches â€” early concept images</Li>
          <Li>Color Palette â€” add swatches with name and hex code</Li>
          <Li>Typography â€” font pairings with name, font family, and usage note</Li>
          <Li>Mockups â€” final presentation images</Li>
        </ul>
        <H3>Marketing projects</H3>
        <ul className="mb-4">
          <Li>Stats â€” key results with label, value, and optional trend (e.g. +42%)</Li>
          <Li>Collaterals â€” campaign asset images</Li>
        </ul>
        <Divider />
        <H2>Uploading Images</H2>
        <P>Every image field supports three methods: drag and drop a file onto the zone, click to browse your files, or paste a direct image URL into the input below the zone.</P>
        <Divider />
        <H2>Editing and Deleting</H2>
        <P>From the Projects page, hover a project card to see the Edit and Delete buttons. Edits go live immediately on save. Deletion is permanent.</P>
      </>
    )
  },
  {
    id: 'contacts',
    title: 'Contact Forms',
    content: (
      <>
        <H2>Viewing Submissions</H2>
        <P>Every time someone fills out the contact form on your website, their message appears here automatically. New submissions are highlighted and counted on the Dashboard.</P>
        <H3>Filtering and searching</H3>
        <ul className="mb-4">
          <Li>Use the status tabs at the top to filter by New, Read, or Replied</Li>
          <Li>Use the search bar to find a submission by name, email, or service</Li>
        </ul>
        <Divider />
        <H2>Managing a Submission</H2>
        <P>Click any row to open the detail drawer on the right. From there you can:</P>
        <ul className="mb-4">
          <Li>Read the full message and see all contact details</Li>
          <Li>Click "Mark as Read" once you've reviewed it</Li>
          <Li>Click "Mark as Replied" after you've responded to the client</Li>
          <Li>Click "Delete" to permanently remove the submission</Li>
          <Li>Click the email address to open your mail client with a pre-filled reply</Li>
        </ul>
        <Divider />
        <H2>Status Guide</H2>
        <ul className="mb-4">
          <Li>New â€” just came in, hasn't been opened yet</Li>
          <Li>Read â€” you've reviewed it but haven't replied</Li>
          <Li>Replied â€” you've responded to the client</Li>
        </ul>
      </>
    )
  },
  {
    id: 'tips',
    title: 'Tips & Best Practices',
    content: (
      <>
        <H2>Writing Good Blog Posts</H2>
        <ul className="mb-4">
          <Li>Keep your title clear and specific — it's the first thing readers see</Li>
          <Li>Write the excerpt as if it's a tweet — short, punchy, makes people want to read more</Li>
          <Li>Use headings to break up long posts into scannable sections</Li>
          <Li>Add a cover image — posts with images get significantly more engagement</Li>
          <Li>Fill in the SEO description — it's what shows up in Google search results</Li>
        </ul>
        <Divider />
        <H2>Presenting Projects Well</H2>
        <ul className="mb-4">
          <Li>Use high-quality images — the thumbnail is the first impression on the portfolio grid</Li>
          <Li>Be specific in "What We Did" — concrete deliverables are more convincing than vague descriptions</Li>
          <Li>For marketing projects, include real stats if you have them — numbers build trust</Li>
          <Li>Keep descriptions concise — potential clients skim, they don't read</Li>
        </ul>
        <Divider />
        <H2>General</H2>
        <ul className="mb-4">
          <Li>Save drafts often — the editor doesn't auto-save</Li>
          <Li>Deletions are permanent — there's no trash or undo</Li>
          <Li>Changes go live immediately on publish — double-check before hitting that button</Li>
          <Li>Keep your login credentials private — don't share them</Li>
        </ul>
      </>
    )
  },
  {
    id: 'vercel',
    title: 'Vercel Setup',
    content: (
      <>
        <H2>Environment Variables to Add in Vercel</H2>
        <P>These need to be added by your developer in the Vercel project settings before deploying. Go to Vercel → Your Project → Settings → Environment Variables and add the following:</P>

        <div className="flex flex-col gap-3 mb-6">
          {[
            {
              key: 'VITE_SUPABASE_URL',
              value: 'https://your-project-id.supabase.co',
              where: 'Supabase Dashboard → Project Settings → API → Project URL',
              required: true,
            },
            {
              key: 'VITE_SUPABASE_ANON_KEY',
              value: 'eyJ...',
              where: 'Supabase Dashboard → Project Settings → API → anon / public key',
              required: true,
            },
          ].map(v => (
            <div key={v.key} className="p-4 bg-white/[0.02] border border-white/[0.04]"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <code className="text-[#AFFF00]/80 text-[12px] font-mono">{v.key}</code>
                {v.required && <span className="text-[9px] font-bold tracking-[0.25em] uppercase px-1.5 py-0.5 border text-[#AFFF00]/60 border-[#AFFF00]/20 bg-[#AFFF00]/5">Required</span>}
              </div>
              <p className="text-[11px] text-white/25 leading-relaxed">Found in: {v.where}</p>
            </div>
          ))}
        </div>

        <H3>Steps</H3>
        <div className="flex flex-col gap-3 mb-4">
          {[
            { num: '01', text: 'Log in to vercel.com and open your project' },
            { num: '02', text: 'Go to Settings → Environment Variables' },
            { num: '03', text: 'Add VITE_SUPABASE_URL — set it to your Supabase project URL' },
            { num: '04', text: 'Add VITE_SUPABASE_ANON_KEY — set it to your Supabase anon key' },
            { num: '05', text: 'Make sure both are enabled for Production, Preview, and Development environments' },
            { num: '06', text: 'Trigger a new deployment (or redeploy) for the variables to take effect' },
          ].map(s => (
            <div key={s.num} className="flex gap-3 items-start">
              <span className="text-[#AFFF00]/30 text-[11px] font-mono tracking-widest shrink-0 mt-0.5">{s.num}</span>
              <p className="text-[13px] text-white/45 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 bg-[#AFFF00]/5 border border-[#AFFF00]/15 p-4"
          style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#AFFF00]/60 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-[12px] text-white/40 leading-relaxed">
            <span className="text-[#AFFF00]/70 font-semibold">Never share these keys publicly.</span> The anon key is safe to use in the frontend — it's designed for that. But don't share your Supabase service role key anywhere in the codebase.
          </p>
        </div>
      </>
    )
  },
  {
    id: 'pages',
    title: 'Page Reference',
    content: (
      <>
        <H2>Admin Pages</H2>
        <ul>
          <Li>Dashboard — overview with stats, recent posts, and recent contact submissions</Li>
          <Li>Blog Posts — full list of all articles with search and category filter</Li>
          <Li>Post Editor — rich text editor for writing and publishing blog posts</Li>
          <Li>Projects — portfolio grid with add, edit, and delete</Li>
          <Li>Project Editor — structured form for adding or editing a project</Li>
          <Li>Contact Forms — all contact submissions with status management</Li>
          <Li>Docs — this guide</Li>
        </ul>
        <H2>Your Website Pages</H2>
        <ul>
          <Li>/ — Home page</Li>
          <Li>/about — About page</Li>
          <Li>/services — Services page</Li>
          <Li>/projects — Portfolio grid (pulls from Projects you manage here)</Li>
          <Li>/blog — Blog listing (pulls from Blog Posts you manage here)</Li>
          <Li>/contact — Contact form (submissions appear in Contact Forms)</Li>
        </ul>
      </>
    )
  }
];

// ── Main component ────────────────────────────────────────────────────────────
const Docs: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        sessionStorage.removeItem('admin_auth');
        navigate('/admin');
      }
    });
  }, [navigate]);

  const handleSection = (id: string) => {
    const currentIdx = sections.findIndex(s => s.id === active);
    const nextIdx = sections.findIndex(s => s.id === id);
    setDirection(nextIdx > currentIdx ? 1 : -1);
    setActive(id);
  };

  const current = sections.find(s => s.id === active)!;

  return (
    <AdminLayout active="docs">
      {/* Section nav — fixed to viewport, never scrolls */}
      <aside className="hidden lg:flex flex-col w-[200px] fixed top-0 bottom-0 border-r border-white/[0.05] bg-[#050505] py-8 px-4 z-10" style={{ left: '220px' }}>
        <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/20 px-3 mb-4">Sections</p>
        <div className="flex flex-col gap-0.5 overflow-y-auto admin-scroll flex-1">
          {sections.map(s => (
            <button key={s.id} onClick={() => handleSection(s.id)}
              className={`text-left px-3 py-2 text-[12px] transition-all duration-200 rounded-sm relative
                ${active === s.id ? 'text-white' : 'text-white/25 hover:text-white/50 hover:bg-white/[0.03]'}`}>
              {active === s.id && (
                <motion.div layoutId="doc-active" className="absolute inset-0 bg-white/[0.06] rounded-sm" />
              )}
              <span className="relative z-10">{s.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Mobile section picker */}
      <div className="lg:hidden px-6 pt-6">
        <select value={active} onChange={e => handleSection(e.target.value)}
          className="w-full bg-[#111] border border-white/[0.07] px-4 py-2.5 text-white text-[13px] focus:outline-none appearance-none mb-6"
          style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
          {sections.map(s => <option key={s.id} value={s.id} className="bg-[#111]">{s.title}</option>)}
        </select>
      </div>

      {/* Scrollable content — offset by section nav width on desktop */}
      <div className="lg:ml-[200px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={active}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 md:px-10 py-8 max-w-[760px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-1.5 h-1.5 bg-[#AFFF00]"></span>
              <h1 className="text-[1.6rem] mona-sans-condensed-medium text-white tracking-tight">{current.title}</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {current.content}
            </motion.div>

            {/* Prev / Next */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/[0.05]">
              {sections.findIndex(s => s.id === active) > 0 ? (
                <button onClick={() => handleSection(sections[sections.findIndex(s => s.id === active) - 1].id)}
                  className="flex items-center gap-2 text-[11px] text-white/25 hover:text-white/60 transition-colors uppercase tracking-widest">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  {sections[sections.findIndex(s => s.id === active) - 1].title}
                </button>
              ) : <div />}
              {sections.findIndex(s => s.id === active) < sections.length - 1 ? (
                <button onClick={() => handleSection(sections[sections.findIndex(s => s.id === active) + 1].id)}
                  className="flex items-center gap-2 text-[11px] text-white/25 hover:text-white/60 transition-colors uppercase tracking-widest">
                  {sections[sections.findIndex(s => s.id === active) + 1].title}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              ) : <div />}
            </div>
          </motion.main>
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default Docs;
