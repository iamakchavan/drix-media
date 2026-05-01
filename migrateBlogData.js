import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Using the same credentials from .env
const supabaseUrl = 'https://bwgsbcklmqmhtblxkcnt.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3Z3NiY2tsbXFtaHRibHhrY250Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU2MDk2NiwiZXhwIjoyMDkzMTM2OTY2fQ.aGd_qzxSGs7Xqis9o4j3Ade-pqCTBJA7Jy1swglYdNM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const blogPosts = [
  {
    id: 1,
    title: 'The Anatomy of a Cult Brand',
    category: 'Branding',
    author: 'Alex Rivera',
    date: 'March 15, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Why some brands inspire religious devotion while others are forgotten in seconds. A deep dive into the psychology of modern brand building.',
    content: [
      { type: 'p', text: 'In today\'s hyper-saturated market, having a good product is no longer a competitive advantage; it\'s the bare minimum required to play the game. The brands that are winning aren\'t just selling products—they are building belief systems.' },
      { type: 'h2', text: 'The Shift from Transaction to Transformation' },
      { type: 'p', text: 'Look at brands like Liquid Death or MSCHF. They aren\'t selling water or shoes; they are selling a perspective on the world. Cult brands understand that consumers are looking for identity markers. When someone buys your product, they are casting a vote for the type of person they want to be.' },
      { type: 'quote', text: 'A brand is no longer what we tell the consumer it is—it is what consumers tell each other it is.' },
      { type: 'h3', text: 'The Three Pillars of Cult Status' },
      { type: 'p', text: '1. A clear enemy (status quo, boredom, inefficiency).\n2. A distinct language and aesthetic.\n3. An insider community.' }
    ]
  },
  {
    id: 2,
    title: 'Designing for the Spatial Web',
    category: 'Digital',
    author: 'Sarah Chen',
    date: 'March 10, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
    excerpt: 'As interfaces move beyond the screen, how do we design digital experiences that feel native to a three-dimensional world?',
    content: [
      { type: 'p', text: 'The transition from flat screens to spatial computing is the biggest paradigm shift in design since the introduction of the smartphone.' },
      { type: 'h2', text: 'Beyond the Rectangle' },
      { type: 'p', text: 'For decades, our digital experiences have been confined to glowing rectangles. We\'ve become experts at organizing information in 2D planes. But when the environment becomes the interface, traditional UX patterns break down.' },
      { type: 'quote', text: 'In spatial computing, the environment isn\'t just a background; it is the canvas.' },
      { type: 'p', text: 'We must start thinking about depth, volume, and physics. How does UI respond to ambient light? How do elements sound when interacted with in a 3D space? These are the new frontiers of product design.' }
    ]
  },
  {
    id: 3,
    title: 'The Death of the Traditional Agency',
    category: 'Strategy',
    author: 'Marcus Vance',
    date: 'March 02, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Bloated retainers and slow turnarounds are dying. The future belongs to lean, specialized teams operating as embedded partners.',
    content: [
      { type: 'p', text: 'The traditional agency model is fundamentally broken. It was built for an era of broadcast television and six-month campaign cycles.' },
      { type: 'h2', text: 'Speed is the New Currency' },
      { type: 'p', text: 'Today\'s cultural moments happen in hours, not months. A brand\'s ability to react, adapt, and create at the speed of the internet dictates its relevance.' },
      { type: 'quote', text: 'Agility isn\'t a methodology; it\'s a survival requirement.' },
      { type: 'p', text: 'We are seeing the rise of the "micro-agency"—hyper-specialized teams of 3-5 elite creatives who embed themselves directly into the client\'s workflow, bypassing account managers and bloated overhead.' }
    ]
  },
  {
    id: 4,
    title: 'Engineering Serendipity',
    category: 'Culture',
    author: 'Alex Rivera',
    date: 'February 24, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1974&auto=format&fit=crop',
    excerpt: 'How we structure our physical and digital workspaces to foster the accidental collisions that lead to breakthrough ideas.',
    content: [
      { type: 'p', text: 'Remote work solved the productivity equation, but it severely damaged the serendipity equation. You can schedule a Zoom meeting to review a deliverable, but you can\'t schedule the random hallway conversation that sparks a new product line.' },
      { type: 'h2', text: 'Designing for Collisions' },
      { type: 'p', text: 'Whether physical or digital, we need to intentionally design spaces where cross-pollination happens.' },
      { type: 'p', text: 'At Drix, we treat our Slack channels and office layout with the same architectural rigor we apply to our client projects.' }
    ]
  },
  {
    id: 5,
    title: 'AI is a Tool, Not a Strategy',
    category: 'Production',
    author: 'David Kim',
    date: 'February 18, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
    excerpt: 'Cutting through the hype to understand how generative AI actually impacts creative workflows and production economics.',
    content: [
      { type: 'p', text: 'Every agency is rushing to slap an "AI" label on their services. But using Midjourney to generate moodboards isn\'t a strategy—it\'s just an updated workflow.' },
      { type: 'h2', text: 'The Amplification of Taste' },
      { type: 'p', text: 'AI democratizes execution, which means the premium shifts from the ability to *make* something to the ability to know *what* to make. Taste becomes the ultimate differentiator.' },
      { type: 'quote', text: 'When everyone has a magic wand, the wizard who knows which spell to cast wins.' }
    ]
  }
];

// Helper to convert simple blocks to Editor.js format
const convertToEditorJS = (blocks) => {
  return {
    time: Date.now(),
    blocks: blocks.map(block => {
      if (block.type === 'h2') {
        return { type: 'header', data: { text: block.text, level: 2 } };
      }
      if (block.type === 'h3') {
        return { type: 'header', data: { text: block.text, level: 3 } };
      }
      if (block.type === 'quote') {
        return { type: 'quote', data: { text: block.text, caption: '', alignment: 'left' } };
      }
      // default to paragraph
      return { type: 'paragraph', data: { text: block.text } };
    }),
    version: '2.31.6'
  };
};

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

async function migrate() {
  console.log('Starting migration...');
  
  for (const post of blogPosts) {
    const slug = generateSlug(post.title);
    
    const postData = {
      slug: slug,
      title: post.title,
      excerpt: post.excerpt,
      content: convertToEditorJS(post.content),
      category: post.category,
      author: post.author,
      read_time: post.readTime,
      cover_image: post.image,
      status: 'published' // Publish all existing posts
    };

    console.log(`Migrating: ${post.title}...`);
    
    const { data, error } = await supabase
      .from('posts')
      .upsert(postData, { onConflict: 'slug' });

    if (error) {
      console.error(`Error migrating ${post.title}:`, error);
    } else {
      console.log(`Success: ${post.title}`);
    }
  }
  console.log('Migration complete!');
}

migrate();
