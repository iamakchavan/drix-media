CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    problem TEXT,
    challenge_title TEXT DEFAULT 'Objective included addressing fundamental challenges such as',
    gallery_layout TEXT DEFAULT 'bento',
    hero_image TEXT,
    thumbnail TEXT,
    brand_problems JSONB DEFAULT '[]',
    services JSONB DEFAULT '[]',
    assets JSONB DEFAULT '{ "mockups": [], "stats": [], "palette": [], "typography": [] }',
    order_index INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access' AND tablename = 'projects') THEN
        CREATE POLICY "Public Read Access" ON public.projects FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin All Access' AND tablename = 'projects') THEN
        CREATE POLICY "Admin All Access" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;
