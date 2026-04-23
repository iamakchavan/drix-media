import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
          <Li><Code>@editorjs/image</Code> — image blocks (currently local blob preview)</Li>
          <Li><Code>@editorjs/embed</Code> — YouTube, Vimeo, Twitter embeds</Li>
        </ul>
        <P>The editor saves data as Editor.js JSON output. The sidebar has two tabs: Post Details (status, category, author, read time, cover image, word count) and SEO (title, meta description, keywords, live search preview).</P>
        <P>Currently <Code>handleSave()</Code> only logs to console. Nothing is persisted.</P>
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
        <P>The editor (<Code>pages/admin/ProjectEditor.tsx</Code>) is a structured form — no rich text needed. It has a project type toggle (Design vs Marketing) that shows the relevant asset fields. Live image previews update as URLs are pasted. A card preview in the sidebar shows exactly how the project will appear on the projects page.</P>
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
          <CheckLi done={false}>Migrate existing static blogData.ts and projectsData.ts to Supabase via insert script</CheckLi>
          <CheckLi done={false}>Test full flow: create post → publish → visible on /blog</CheckLi>
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

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') navigate('/admin');
  }, [navigate]);

  const current = sections.find(s => s.id === active)!;

  return (
    <AdminLayout active="docs">
      <div className="flex h-full min-h-screen">

        {/* Doc nav */}
        <aside className="hidden lg:flex flex-col w-[200px] shrink-0 border-r border-white/[0.05] py-8 px-4 sticky top-0 h-screen overflow-y-auto">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/20 px-3 mb-4">Sections</p>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`text-left px-3 py-2 text-[12px] transition-all duration-200 rounded-sm mb-0.5
                ${active === s.id ? 'bg-white/[0.06] text-white' : 'text-white/25 hover:text-white/50 hover:bg-white/[0.03]'}`}>
              {s.title}
            </button>
          ))}
        </aside>

        {/* Mobile section picker */}
        <div className="lg:hidden px-6 pt-6 w-full">
          <select value={active} onChange={e => setActive(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.07] px-4 py-2.5 text-white text-[13px] focus:outline-none appearance-none mb-6"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
            {sections.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>

        {/* Content */}
        <main className="flex-1 px-6 md:px-10 py-8 max-w-[760px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 bg-[#AFFF00]"></span>
            <h1 className="text-[1.6rem] mona-sans-condensed-medium text-white tracking-tight">{current.title}</h1>
          </div>
          <div>{current.content}</div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default Docs;
