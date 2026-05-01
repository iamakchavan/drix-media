export interface Project {
  id: string; // The slug
  title: string;
  category: string;
  description: string;
  problem: string;
  challenge_title: string;
  gallery_layout: 'bento' | 'carousel';
  hero_image: string;
  thumbnail: string;
  brand_problems: string[];
  services: string[];
  assets: {
    mockups: string[];
    stats: { label: string; value: string; trend?: string }[];
    palette: { name: string; hex: string }[];
    typography: { name: string; font: string; usage: string }[];
    sketches: string[];
  };
  order_index: number;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
}
