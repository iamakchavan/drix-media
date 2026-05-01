import { supabase } from '../../lib/supabase';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from './AdminLayout';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Section { id: string; title: string; content: React.ReactNode; }

// ── Reusable doc components ───────────────────────────────────────────────────
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
const CheckLi = ({ done, children }: { done: boolean; children: React.ReactNode }) => (
  <li className="flex items-start gap-2.5 text-[13px] leading-relaxed mb-2">
    <span className={`mt-0.5 shrink-0 ${done ? 'text-[#AFFF00]/70' : 'text-white/15'}`}>
      {done
        ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
        : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
      }
    </span>
    <span className={done ? 'text-white/50' : 'text-white/25'}>{children}</span>
  </li>
);
const Divider = () => <div className="border-t border-white/[0.05] my-6" />;

// ── Sections data ─────────────────────────────────────────────────────────────
const sections: Section[] = [
  {
    id: 'overview',
    title: 'Overview',
    content: (
      <>
        <P>This admin dashboard is built for Drix Media to manage blog posts, projects, and contact form submissions. The UI is fully complete. The backend (Supabase) is not yet connected — all data currently reads from local static files.</P>
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag color="green">UI Complete</Tag>
          <Tag color="yellow">Backend Pending</Tag>
          <Tag color="blue">Auth: Session-based (temp)</Tag>
        </div>
        <H3>Tech Stack</H3>
        <ul className="mb-4">
          <Li>React + TypeScript + Vite</Li>
          <Li>Tailwind CSS for styling</Li>
          <Li>Framer Motion for animations</Li>
          <Li>React Router v6 for routing</Li>
          <Li>Editor.js for blog post rich text editing</Li>
          <Li>Supabase (planned) — PostgreSQL + Storage + Auth</Li>
        </ul>
      </>
    )
  },
  {
    id: 'auth',
    title: 'Authentication',
    content: (
      <>
        <H2>Current Setup (Temporary)</H2>
        <P>Login is handled with a hardcoded password check in <Code>pages/admin/Login.tsx</Code>. On success, it sets <Code>sessionStorage.setItem('admin_auth', 'true')</Code>. Every protected page checks this on mount and redirects to <Code>/admin</Code> if not set.</P>
        <Block>{`// Login.tsx
const ADMIN_PASSWORD = 'DrixMedia';
if (password === ADMIN_PASSWORD) {
  sessionStorage.setItem('admin_auth', 'true');
  navigate('/admin/dashboard');
}`}</Block>
        <P>This is intentionally temporary. It clears on tab close (sessionStorage) and has no real security.</P>
        <Divider />
        <H2>What Needs to Be Done</H2>
        <ul>
          <Li>Create a Supabase project at <Code>supabase.com</Code></Li>
          <Li>Enable Email Auth in Supabase Dashboard → Authentication → Providers</Li>
          <Li>Create one admin user manually in Supabase Dashboard → Authentication → Users</Li>
          <Li>Install Supabase client: <Code>npm install @supabase/supabase-js</Code></Li>
          <Li>Create <Code>lib/supabase.ts</Code> with your project URL and anon key</Li>
          <Li>Replace the hardcoded login with <Code>supabase.auth.signInWithPassword()</Code></Li>
          <Li>Replace sessionStorage checks with <Code>supabase.auth.getSession()</Code></Li>
          <Li>Add a <Code>supabase.auth.signOut()</Code> call to the logout button</Li>
        </ul>
        <Block>{`// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Login.tsx replacement
const { error } = await supabase.auth.signInWithPassword({
  email: 'admin@drixmedia.com',
  password: password,
});`}</Block>
      </>
    )
  },
  {
    id: 'blog',
    title: 'Blog Posts',
    content: (
      <>
        <H2>Current Setup</H2>
        <P>Blog posts are stored in <Code>data/blogData.ts</Code> as a static TypeScript array. The <Code>BlogPost</Code> interface defines the shape:</P>
        <Block>{`interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;        // cover image URL
  readTime: string;
  content: {
    type: 'p' | 'h2' | 'h3' | 'quote';
    text: string;
  }[];
}`}</Block>
        <P>The editor (<Code>pages/admin/PostEditor.tsx</Code>) uses Editor.js with the following tools installed:</P>
        <ul>
          <Li><Code>@editorjs/header</Code> — H2, H3, H4 headings</Li>
          <Li><Code>@editorjs/paragraph</Code> — body text with inline toolbar</Li>
          <Li><Code>@editorjs/quote</Code> — pull quotes with author caption</Li>
          <Li><Code>@editorjs/list</Code> — bullet and numbered lists</Li>
          <Li><Code>@editorjs/delimiter</Code> — section dividers</Li>
          <Li><Code>@editorjs/image</Code> — image blocks with file upload (local blob) + URL paste. Swap uploader for Supabase Storage when ready.</Li>
          <Li><Code>@editorjs/embed</Code> — YouTube, Vimeo, Twitter embeds</Li>
        </ul>
        <P>The cover image field in the sidebar uses the shared <Code>ImageUpload</Code> component — drag-and-drop, click-to-upload, or paste a URL. Currently uses <Code>URL.createObjectURL()</Code> for local preview. Replace with Supabase Storage upload when backend is connected.</P>
        <Divider />
        <H2>Supabase Table Required</H2>
        <Block>{`-- Run in Supabase SQL Editor
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  category text,
  author text,
  read_time text,
  cover_image text,
  content jsonb,          -- Editor.js OutputData
  seo_title text,
  seo_description text,
  seo_keywords text,
  status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table posts enable row level security;
create policy "Admin only" on posts
  using (auth.role() = 'authenticated');`}</Block>
        <H2>What Needs to Be Done</H2>
        <ul>
          <Li>Create the <Code>posts</Code> table above in Supabase</Li>
          <Li>In <Code>PostEditor.tsx</Code>, replace <Code>console.log</Code> in <Code>handleSave()</Code> with <Code>supabase.from('posts').upsert(post)</Code></Li>
          <Li>In <Code>BlogPosts.tsx</Code>, replace <Code>blogPosts</Code> import with <Code>supabase.from('posts').select('*')</Code></Li>
          <Li>In <Code>pages/Blog.tsx</Code> and <Code>pages/BlogDetail.tsx</Code>, replace <Code>blogData.ts</Code> imports with Supabase queries</Li>
          <Li>For image upload in the editor, configure <Code>@editorjs/image</Code> uploader to use <Code>supabase.storage.from('blog-images').upload()</Code></Li>
          <Li>Delete action in <Code>BlogPosts.tsx</Code> should call <Code>supabase.from('posts').delete().eq('id', id)</Code></Li>
        </ul>
        <Block>{`// PostEditor.tsx — save handler replacement
const handleSave = async (status: 'draft' | 'published') => {
  const content = await editorRef.current.save();
  const { error } = await supabase.from('posts').upsert({
    id: existingId || undefined,
    title: meta.title,
    slug: meta.title.toLowerCase().replace(/\\s+/g, '-'),
    excerpt: meta.excerpt,
    category: meta.category,
    author: meta.author,
    read_time: meta.readTime,
    cover_image: meta.coverImage,
    content,
    seo_title: meta.seoTitle,
    seo_description: meta.seoDescription,
    seo_keywords: meta.seoKeywords,
    status,
    updated_at: new Date().toISOString(),
  });
};`}</Block>
      </>
    )
  },
  {
    id: 'projects',
    title: 'Projects',
    content: (
      <>
        <H2>Current Setup</H2>
        <P>Projects are stored in <Code>data/projectsData.ts</Code> as a static array. The <Code>ProjectDetail</Code> interface supports two project types:</P>
        <Block>{`interface ProjectDetail {
  id: string;           // used as URL slug
  title: string;
  category: string;
  description: string;
  problem: string;
  brandProblems: string[];
  whatWeDid: string[];
  thumbnail: string;
  heroImage: string;
  // Design projects
  designAssets?: {
    sketches: string[];
    colorPalette: { name: string; hex: string }[];
    typography: { name: string; font: string; usage: string }[];
    mockups: string[];
  };
  // Marketing/Production projects
  marketingAssets?: {
    stats: { label: string; value: string; trend?: string }[];
    collaterals: string[];
  };
}`}</Block>
        <P>The editor (<Code>pages/admin/ProjectEditor.tsx</Code>) is a structured form — no rich text needed. It has a project type toggle (Design vs Marketing) that shows the relevant asset fields.</P>
        <P>All image fields use the shared <Code>ImageUpload</Code> component (<Code>pages/admin/ImageUpload.tsx</Code>) — drag-and-drop zone, click-to-upload, URL paste, and live preview with remove button. Thumbnail, hero image, sketches, mockups, and collaterals all support file upload. Currently uses <Code>URL.createObjectURL()</Code> — swap for Supabase Storage when ready.</P>
        <Divider />
        <H2>Supabase Table Required</H2>
        <Block>{`create table projects (
  id text primary key,          -- slug, e.g. 'radiant-skincare'
  title text not null,
  category text,
  description text,
  problem text,
  brand_problems jsonb,         -- string[]
  what_we_did jsonb,            -- string[]
  thumbnail text,
  hero_image text,
  year text,
  live_url text,
  project_type text,            -- 'design' | 'marketing'
  design_assets jsonb,          -- designAssets object
  marketing_assets jsonb,       -- marketingAssets object
  created_at timestamptz default now()
);

alter table projects enable row level security;
create policy "Admin only" on projects
  using (auth.role() = 'authenticated');`}</Block>
        <H2>What Needs to Be Done</H2>
        <ul>
          <Li>Create the <Code>projects</Code> table above</Li>
          <Li>In <Code>ProjectEditor.tsx</Code>, replace <Code>console.log</Code> in <Code>handleSave()</Code> with <Code>supabase.from('projects').upsert(project)</Code></Li>
          <Li>In <Code>AdminProjects.tsx</Code>, replace <Code>projectsData</Code> import with a Supabase query</Li>
          <Li>In <Code>pages/Projects.tsx</Code> and <Code>pages/ProjectDetail.tsx</Code>, replace <Code>projectsData.ts</Code> imports with Supabase queries</Li>
          <Li>For image uploads, use Supabase Storage bucket <Code>project-images</Code></Li>
          <Li>Migrate existing static data by running an insert script once</Li>
        </ul>
      </>
    )
  },
  {
    id: 'contacts',
    title: 'Contact Forms',
    content: (
      <>
        <H2>Current Setup</H2>
        <P>Contact submissions are currently mocked with hardcoded data in <Code>pages/admin/ContactForms.tsx</Code>. The UI is fully built — list view with status filters, search, stats cards, and a slide-in detail drawer with Reply/Mark Read/Mark Replied/Delete actions.</P>
        <P>The contact form on the public site is in <Code>pages/Contact.tsx</Code>. It currently has no backend connection — form submissions go nowhere.</P>
        <Divider />
        <H2>Supabase Table Required</H2>
        <Block>{`create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  service text,
  message text,
  status text default 'new',   -- 'new' | 'read' | 'replied'
  created_at timestamptz default now()
);

alter table contacts enable row level security;
-- Public can insert (submit form), only admin can read
create policy "Public insert" on contacts
  for insert with check (true);
create policy "Admin read" on contacts
  for select using (auth.role() = 'authenticated');
create policy "Admin update" on contacts
  for update using (auth.role() = 'authenticated');
create policy "Admin delete" on contacts
  for delete using (auth.role() = 'authenticated');`}</Block>
        <H2>What Needs to Be Done</H2>
        <ul>
          <Li>Create the <Code>contacts</Code> table above</Li>
          <Li>In <Code>pages/Contact.tsx</Code> form submit handler, replace with <Code>supabase.from('contacts').insert({"{...formData}"})</Code></Li>
          <Li>In <Code>ContactForms.tsx</Code>, replace mock data with <Code>supabase.from('contacts').select('*').order('created_at', {"{ ascending: false }"})</Code></Li>
          <Li>Wire "Mark Read" button to <Code>supabase.from('contacts').update({"{ status: 'read' }"}).eq('id', id)</Code></Li>
          <Li>Wire "Mark Replied" button similarly with <Code>status: 'replied'</Code></Li>
          <Li>Wire "Delete" button to <Code>supabase.from('contacts').delete().eq('id', id)</Code></Li>
          <Li>Optionally set up a Supabase Edge Function to send an email notification when a new contact is submitted</Li>
        </ul>
      </>
    )
  },
  {
    id: 'storage',
    title: 'Image Storage',
    content: (
      <>
        <H2>Current Setup</H2>
        <P>Images in the blog editor use <Code>URL.createObjectURL(file)</Code> — a temporary local blob URL that disappears on page refresh. Project images use pasted URLs only. No real upload is wired yet.</P>
        <Divider />
        <H2>What Needs to Be Done</H2>
        <ul>
          <Li>In Supabase Dashboard → Storage, create two buckets: <Code>blog-images</Code> and <Code>project-images</Code></Li>
          <Li>Set both buckets to Public so images are accessible without auth</Li>
          <Li>In <Code>PostEditor.tsx</Code>, update the <Code>@editorjs/image</Code> uploader:</Li>
        </ul>
        <Block>{`// PostEditor.tsx — image uploader replacement
uploader: {
  uploadByFile: async (file: File) => {
    const filename = \`\${Date.now()}-\${file.name}\`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filename, file);
    if (error) return { success: 0 };
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filename);
    return { success: 1, file: { url: publicUrl } };
  },
  uploadByUrl: async (url: string) => {
    return { success: 1, file: { url } };
  },
}`}</Block>
        <ul>
          <Li>For project images, add a file input alongside the URL input in <Code>ProjectEditor.tsx</Code> that uploads to <Code>project-images</Code> bucket and sets the URL field automatically</Li>
        </ul>
      </>
    )
  },
  {
    id: 'migration',
    title: 'Data Migration',
    content: (
      <>
        <H2>Why the Editor Opens Blank</H2>
        <P>When you open an existing post from the Blog Posts list and click Edit, the editor is completely empty. This is because <Code>PostEditor.tsx</Code> currently has no logic to load existing post data — it only initialises a blank Editor.js instance. The same applies to the Project Editor.</P>
        <P>This will be fully resolved once Supabase is connected. The editor will fetch the post by ID from the <Code>posts</Code> table and populate both the Editor.js content and the sidebar meta fields on mount.</P>
        <Divider />
        <H2>The Problem with the Current Content Format</H2>
        <P>The existing posts in <Code>data/blogData.ts</Code> store content as a simple array of typed blocks:</P>
        <Block>{`content: [
  { type: 'p', text: 'Some paragraph text.' },
  { type: 'h2', text: 'A Heading' },
  { type: 'quote', text: 'A pull quote.' },
]`}</Block>
        <P>Editor.js stores content in its own JSON format called <Code>OutputData</Code>:</P>
        <Block>{`{
  "time": 1713000000000,
  "blocks": [
    { "type": "paragraph", "data": { "text": "Some paragraph text." } },
    { "type": "header", "data": { "text": "A Heading", "level": 2 } },
    { "type": "quote", "data": { "text": "A pull quote.", "caption": "" } }
  ],
  "version": "2.31.6"
}`}</Block>
        <P>These two formats are different. Before migrating, you must convert the existing <Code>blogData.ts</Code> content array into Editor.js <Code>OutputData</Code> format. The mapping is straightforward:</P>
        <Block>{`// Conversion mapping
'p'     → { type: 'paragraph', data: { text } }
'h2'    → { type: 'header',    data: { text, level: 2 } }
'h3'    → { type: 'header',    data: { text, level: 3 } }
'quote' → { type: 'quote',     data: { text, caption: '' } }`}</Block>
        <Divider />
        <H2>Step 1 — Convert blogData.ts to Supabase Format</H2>
        <P>Write a one-time migration script. Run it locally, it outputs SQL INSERT statements or calls the Supabase API directly.</P>
        <Block>{`// scripts/migrateBlogPosts.ts
// Run with: npx ts-node scripts/migrateBlogPosts.ts
import { createClient } from '@supabase/supabase-js';
import { blogPosts } from '../data/blogData';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use service role for migration
);

const convertContent = (blocks: typeof blogPosts[0]['content']) => ({
  time: Date.now(),
  version: '2.31.6',
  blocks: blocks.map(b => {
    if (b.type === 'p')     return { type: 'paragraph', data: { text: b.text } };
    if (b.type === 'h2')    return { type: 'header',    data: { text: b.text, level: 2 } };
    if (b.type === 'h3')    return { type: 'header',    data: { text: b.text, level: 3 } };
    if (b.type === 'quote') return { type: 'quote',     data: { text: b.text, caption: '' } };
    return { type: 'paragraph', data: { text: b.text } };
  })
});

async function migrate() {
  for (const post of blogPosts) {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { error } = await supabase.from('posts').insert({
      title: post.title,
      slug,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      read_time: post.readTime,
      cover_image: post.image,
      content: convertContent(post.content),
      status: 'published',
      created_at: new Date(post.date).toISOString(),
    });
    if (error) console.error('Failed:', post.title, error.message);
    else console.log('Migrated:', post.title);
  }
}

migrate();`}</Block>
        <P>Note: Use the <Code>SUPABASE_SERVICE_ROLE_KEY</Code> (not the anon key) for the migration script so it bypasses RLS. Never expose this key in the frontend.</P>
        <Divider />
        <H2>Step 2 — Convert projectsData.ts to Supabase Format</H2>
        <P>Projects use a structured object format — no content conversion needed, just map the fields directly.</P>
        <Block>{`// scripts/migrateProjects.ts
import { createClient } from '@supabase/supabase-js';
import { projectsData } from '../data/projectsData';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migrate() {
  for (const project of projectsData) {
    const { error } = await supabase.from('projects').insert({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      problem: project.problem,
      brand_problems: project.brandProblems,
      what_we_did: project.whatWeDid,
      thumbnail: project.thumbnail,
      hero_image: project.heroImage,
      year: '2024',
      project_type: project.designAssets ? 'design' : 'marketing',
      design_assets: project.designAssets || null,
      marketing_assets: project.marketingAssets || null,
    });
    if (error) console.error('Failed:', project.title, error.message);
    else console.log('Migrated:', project.title);
  }
}

migrate();`}</Block>
        <Divider />
        <H2>Step 3 — Load Existing Post into Editor on Edit</H2>
        <P>After migration, when a user opens an existing post in the editor, the editor must be pre-populated. Add this to <Code>PostEditor.tsx</Code>:</P>
        <Block>{`// PostEditor.tsx — load existing post on mount
useEffect(() => {
  if (!id || !editorRef.current) return;

  const loadPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return;

    // Populate sidebar meta fields
    setMeta({
      title: data.title,
      excerpt: data.excerpt || '',
      category: data.category || categories[0],
      author: data.author || '',
      readTime: data.read_time || '',
      coverImage: data.cover_image || '',
      seoTitle: data.seo_title || '',
      seoDescription: data.seo_description || '',
      seoKeywords: data.seo_keywords || '',
      status: data.status || 'draft',
    });

    // Populate Editor.js with saved content
    if (data.content && editorRef.current) {
      await editorRef.current.render(data.content);
    }
  };

  loadPost();
}, [id, editorRef.current]);`}</Block>
        <P>The key call is <Code>editorRef.current.render(data.content)</Code> — this loads the saved Editor.js JSON back into the editor. Without this, the editor always opens blank.</P>
        <Divider />
        <H2>Step 4 — Load Existing Project into Editor on Edit</H2>
        <P>Same pattern for <Code>ProjectEditor.tsx</Code>. Add a <Code>useEffect</Code> that fetches the project by ID and sets all state fields:</P>
        <Block>{`// ProjectEditor.tsx — load existing project on mount
useEffect(() => {
  if (!id) return;

  const loadProject = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return;

    setTitle(data.title);
    setSlug(data.id);
    setCategory(data.category);
    setDescription(data.description || '');
    setProblem(data.problem || '');
    setYear(data.year || '2024');
    setLink(data.live_url || '');
    setBrandProblems(data.brand_problems || ['']);
    setWhatWeDid(data.what_we_did || ['']);
    setThumbnail(data.thumbnail || '');
    setHeroImage(data.hero_image || '');
    setProjectType(data.project_type || 'design');

    if (data.design_assets) {
      setSketches(data.design_assets.sketches || ['']);
      setMockups(data.design_assets.mockups || ['']);
      setColorPalette(data.design_assets.colorPalette || [{ name: '', hex: '#000000' }]);
      setTypography(data.design_assets.typography || [{ name: '', font: '', usage: '' }]);
    }
    if (data.marketing_assets) {
      setStats(data.marketing_assets.stats || [{ label: '', value: '', trend: '' }]);
      setCollaterals(data.marketing_assets.collaterals || ['']);
    }
  };

  loadProject();
}, [id]);`}</Block>
        <Divider />
        <H2>Step 5 — Update Public Pages to Read from Supabase</H2>
        <P>After migration, the public-facing pages must read from Supabase instead of the static files. Here is the exact replacement for each page:</P>
        <H3>Blog.tsx — replace blogData import</H3>
        <Block>{`// Replace: import { blogPosts } from '../data/blogData';
// With:
const [blogPosts, setBlogPosts] = useState([]);
useEffect(() => {
  supabase.from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .then(({ data }) => setBlogPosts(data || []));
}, []);`}</Block>
        <H3>BlogDetail.tsx — replace static find with Supabase query</H3>
        <Block>{`// Replace: const post = blogPosts.find(p => p.id === Number(id));
// With:
const [post, setPost] = useState(null);
useEffect(() => {
  supabase.from('posts')
    .select('*')
    .eq('slug', id)   // id param is now the slug
    .single()
    .then(({ data }) => setPost(data));
}, [id]);

// Also update BlogDetail content renderer to handle Editor.js blocks:
// block.type === 'paragraph' instead of 'p'
// block.type === 'header' instead of 'h2'/'h3'
// block.data.text instead of block.text
// block.data.level for heading level`}</Block>
        <H3>Projects.tsx — replace projectsData import</H3>
        <Block>{`const [projects, setProjects] = useState([]);
useEffect(() => {
  supabase.from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .then(({ data }) => setProjects(data || []));
}, []);`}</Block>
        <H3>ProjectDetail.tsx — replace static find</H3>
        <Block>{`const [project, setProject] = useState(null);
useEffect(() => {
  supabase.from('projects')
    .select('*')
    .eq('id', id)
    .single()
    .then(({ data }) => setProject(data));
}, [id]);

// Map snake_case DB fields back to camelCase for the existing component:
// data.brand_problems → brandProblems
// data.what_we_did → whatWeDid
// data.hero_image → heroImage
// data.design_assets → designAssets
// data.marketing_assets → marketingAssets`}</Block>
        <Divider />
        <H2>Step 6 — Update BlogDetail Content Renderer</H2>
        <P>The current <Code>BlogDetail.tsx</Code> renders content blocks using the old format (<Code>block.type === 'p'</Code>, <Code>block.text</Code>). After migration to Editor.js format, update the renderer:</P>
        <Block>{`// BlogDetail.tsx — updated content renderer
{post.content.blocks.map((block: any, i: number) => {
  if (block.type === 'header') return (
    block.data.level === 2
      ? <h2 key={i} className="...">{block.data.text}</h2>
      : <h3 key={i} className="...">{block.data.text}</h3>
  );
  if (block.type === 'quote') return (
    <blockquote key={i} className="border-l-[3px] border-[#AFFF00] pl-5 my-4">
      <p className="...">{block.data.text}</p>
      {block.data.caption && <cite className="...">{block.data.caption}</cite>}
    </blockquote>
  );
  if (block.type === 'list') return (
    <ul key={i} className="...">
      {block.data.items.map((item: string, j: number) => (
        <li key={j} className="...">{item}</li>
      ))}
    </ul>
  );
  if (block.type === 'image') return (
    <figure key={i} className="my-6">
      <img src={block.data.file.url} alt={block.data.caption || ''} className="w-full" />
      {block.data.caption && <figcaption className="text-center text-sm text-black/40 mt-2">{block.data.caption}</figcaption>}
    </figure>
  );
  if (block.type === 'delimiter') return <hr key={i} className="border-black/10 my-8" />;
  // Default: paragraph
  return <p key={i} className="text-[16px] text-black/60 leading-[1.85] poppins-regular" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
})}`}</Block>
        <P>Note the use of <Code>dangerouslySetInnerHTML</Code> for paragraphs — Editor.js stores inline formatting (bold, italic, links) as HTML strings inside the text field.</P>
      </>
    )
  },
  {
    id: 'env',
    title: 'Environment Setup',
    content: (
      <>
        <H2>Required Environment Variables</H2>
        <P>Create a <Code>.env</Code> file in the project root (never commit this):</P>
        <Block>{`VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`}</Block>
        <P>Get these from Supabase Dashboard → Project Settings → API.</P>
        <H2>Supabase Client File</H2>
        <P>Create <Code>lib/supabase.ts</Code>:</P>
        <Block>{`import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);`}</Block>
        <P>Import this wherever Supabase is needed: <Code>import {"{ supabase }"} from '../../lib/supabase'</Code></P>
      </>
    )
  },
  {
    id: 'checklist',
    title: 'Backend Checklist',
    content: (
      <>
        <H2>Complete this in order</H2>
        <ul className="mt-2">
          <CheckLi done={false}>Create Supabase project at supabase.com</CheckLi>
          <CheckLi done={false}>Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env</CheckLi>
          <CheckLi done={false}>Create lib/supabase.ts with the client</CheckLi>
          <CheckLi done={false}>Run SQL: create posts table</CheckLi>
          <CheckLi done={false}>Run SQL: create projects table</CheckLi>
          <CheckLi done={false}>Run SQL: create contacts table with RLS policies</CheckLi>
          <CheckLi done={false}>Create Storage buckets: blog-images, project-images (public)</CheckLi>
          <CheckLi done={false}>Enable Email Auth in Supabase, create admin user</CheckLi>
          <CheckLi done={false}>Replace Login.tsx hardcoded auth with supabase.auth.signInWithPassword()</CheckLi>
          <CheckLi done={false}>Replace sessionStorage checks with supabase.auth.getSession()</CheckLi>
          <CheckLi done={false}>Wire PostEditor.tsx save to supabase.from('posts').upsert()</CheckLi>
          <CheckLi done={false}>Wire BlogPosts.tsx list to supabase.from('posts').select()</CheckLi>
          <CheckLi done={false}>Wire Blog.tsx and BlogDetail.tsx to read from Supabase</CheckLi>
          <CheckLi done={false}>Wire ProjectEditor.tsx save to supabase.from('projects').upsert()</CheckLi>
          <CheckLi done={false}>Wire AdminProjects.tsx list to supabase.from('projects').select()</CheckLi>
          <CheckLi done={false}>Wire Projects.tsx and ProjectDetail.tsx to read from Supabase</CheckLi>
          <CheckLi done={false}>Wire Contact.tsx form submit to supabase.from('contacts').insert()</CheckLi>
          <CheckLi done={false}>Wire ContactForms.tsx to supabase.from('contacts').select()</CheckLi>
          <CheckLi done={false}>Wire status update and delete actions in ContactForms.tsx</CheckLi>
          <CheckLi done={false}>Update image uploader in PostEditor.tsx to use Supabase Storage</CheckLi>
          <CheckLi done={false}>Run migration script: convert blogData.ts → Supabase posts table (convert content format from simple blocks to Editor.js OutputData)</CheckLi>
          <CheckLi done={false}>Run migration script: convert projectsData.ts → Supabase projects table</CheckLi>
          <CheckLi done={false}>Add useEffect in PostEditor.tsx to load existing post data + call editorRef.current.render(data.content) on edit</CheckLi>
          <CheckLi done={false}>Add useEffect in ProjectEditor.tsx to load existing project data on edit</CheckLi>
          <CheckLi done={false}>Update BlogDetail.tsx content renderer to handle Editor.js block format (paragraph/header/quote/list/image/delimiter)</CheckLi>
          <CheckLi done={false}>Update Blog.tsx route params — use slug instead of numeric id for post lookup</CheckLi>
          <CheckLi done={false}>Test full flow: create post → publish → visible on /blog</CheckLi>
          <CheckLi done={false}>Test edit flow: open existing post in editor → content loads → save → updates on /blog</CheckLi>
          <CheckLi done={false}>Test full flow: submit contact form → appears in admin dashboard</CheckLi>
        </ul>
      </>
    )
  },
  {
    id: 'files',
    title: 'File Reference',
    content: (
      <>
        <H2>Admin Pages</H2>
        <ul>
          <Li><Code>pages/admin/Login.tsx</Code> — Login page with hardcoded password (DrixMedia)</Li>
          <Li><Code>pages/admin/AdminLayout.tsx</Code> — Shared sidebar layout used by all admin pages</Li>
          <Li><Code>pages/admin/Dashboard.tsx</Code> — Overview with stats, recent posts, recent contacts</Li>
          <Li><Code>pages/admin/BlogPosts.tsx</Code> — Blog post list with search, category filter, edit/delete</Li>
          <Li><Code>pages/admin/PostEditor.tsx</Code> — Full Editor.js post editor with SEO sidebar</Li>
          <Li><Code>pages/admin/AdminProjects.tsx</Code> — Project card grid with edit/view/delete</Li>
          <Li><Code>pages/admin/ProjectEditor.tsx</Code> — Structured project form (design or marketing type)</Li>
          <Li><Code>pages/admin/ContactForms.tsx</Code> — Contact submissions list with detail drawer</Li>
          <Li><Code>pages/admin/ImageUpload.tsx</Code> — Shared image upload component (drag-drop + URL + preview). Used in PostEditor cover image, ProjectEditor thumbnail/hero/sketches/mockups/collaterals. Replace <Code>URL.createObjectURL()</Code> with Supabase Storage upload when backend is ready.</Li>
          <Li><Code>pages/admin/Docs.tsx</Code> — This documentation page</Li>
        </ul>
        <H2>Data Files (to be replaced by Supabase)</H2>
        <ul>
          <Li><Code>data/blogData.ts</Code> — Static blog posts array, currently used by Blog.tsx and BlogDetail.tsx</Li>
          <Li><Code>data/projectsData.ts</Code> — Static projects array, currently used by Projects.tsx and ProjectDetail.tsx</Li>
        </ul>
        <H2>Public Pages that Need Supabase Wiring</H2>
        <ul>
          <Li><Code>pages/Blog.tsx</Code> — reads from blogData.ts → replace with Supabase query</Li>
          <Li><Code>pages/BlogDetail.tsx</Code> — reads from blogData.ts → replace with Supabase query</Li>
          <Li><Code>pages/Projects.tsx</Code> — reads from projectsData.ts → replace with Supabase query</Li>
          <Li><Code>pages/ProjectDetail.tsx</Code> — reads from projectsData.ts → replace with Supabase query</Li>
          <Li><Code>pages/Contact.tsx</Code> — form submits nowhere → wire to Supabase contacts table</Li>
        </ul>
        <H2>Routes</H2>
        <Block>{`/admin                  → Login
/admin/dashboard        → Dashboard
/admin/posts            → Blog Posts list
/admin/posts/new        → New post editor
/admin/posts/:id        → Edit post editor
/admin/projects         → Projects list
/admin/projects/new     → New project editor
/admin/projects/:id     → Edit project editor
/admin/contacts         → Contact submissions
/admin/docs             → This page`}</Block>
      </>
    )
  }
];

// ── Main component ────────────────────────────────────────────────────────────
const Docs: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [prev, setPrev] = useState('overview');
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
    setPrev(active);
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
