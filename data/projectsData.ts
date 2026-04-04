export interface ProjectDetail {
    id: string;
    title: string;
    category: string;
    description: string;
    problem: string;
    brandProblems: string[];
    whatWeDid: string[];
    thumbnail: string;
    heroImage: string;
    // For Design Projects
    designAssets?: {
        sketches: string[];
        colorPalette: { name: string; hex: string }[];
        typography: { name: string; font: string; usage: string }[];
        mockups: string[];
    };
    // For Marketing/Production Projects
    marketingAssets?: {
        stats: { label: string; value: string; trend?: string }[];
        collaterals: string[];
    };
}

export const projectsData: ProjectDetail[] = [
    {
        id: 'radiant-skincare',
        title: 'Radiant Skincare',
        category: 'Branding',
        description: 'A premium skincare brand focused on organic ingredients and minimalistic elegance.',
        problem: 'The organic skincare market is oversaturated with generic "green" branding that fails to convey luxury and efficacy.',
        brandProblems: [
            'Low brand recall among premium consumers',
            'Lack of visual distinction from budget organic brands',
            'Inconsistent messaging across digital touchpoints'
        ],
        whatWeDid: ['Brand Identity', 'Packaging Design', 'Visual Strategy', 'Creative Direction'],
        thumbnail: '/projects/brand-campaign.png',
        heroImage: '/projects/brand-campaign.png',
        designAssets: {
            sketches: [
                'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop'
            ],
            colorPalette: [
                { name: 'Pearl White', hex: '#F9F9F9' },
                { name: 'Dusty Rose', hex: '#D4A373' },
                { name: 'Deep Sage', hex: '#606C38' }
            ],
            typography: [
                { name: 'Cormorant Garamond', font: 'Serif', usage: 'Headings' },
                { name: 'Montserrat', font: 'Sans-serif', usage: 'Body Text' }
            ],
            mockups: [
                'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2000&auto=format&fit=crop'
            ]
        }
    },
    {
        id: 'nexus-platform',
        title: 'Nexus Platform',
        category: 'Web Design',
        description: 'An enterprise-grade SaaS platform for seamless team collaboration and project tracking.',
        problem: 'Enterprise tools are often clunky and difficult to navigate, leading to low adoption rates and decreased productivity.',
        brandProblems: [
            'Complex user interface with high learning curve',
            'Lack of mobile responsiveness',
            'Outdated visual aesthetic'
        ],
        whatWeDid: ['UI/UX Design', 'Web Development', 'Design System Architecture', 'User Testing'],
        thumbnail: '/projects/web-design.png',
        heroImage: '/projects/web-design.png',
        designAssets: {
            sketches: [
                'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop'
            ],
            colorPalette: [
                { name: 'Nexus Blue', hex: '#0066FF' },
                { name: 'Space Grey', hex: '#1A1A1A' },
                { name: 'Cyan Accent', hex: '#00F0FF' }
            ],
            typography: [
                { name: 'Inter', font: 'Sans-serif', usage: 'General Interface' },
                { name: 'JetBrains Mono', font: 'Monospace', usage: 'Code snippets/Data' }
            ],
            mockups: [
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2000&auto=format&fit=crop'
            ]
        }
    },
    {
        id: 'vero-campaign',
        title: 'Vero Campaign',
        category: 'Creative Production',
        description: 'A high-impact marketing campaign for a disruptive fashion tech startup.',
        problem: 'The client needed to break through the noise during Fashion Week without a massive traditional advertising budget.',
        brandProblems: [
            'Limited organic reach on social media',
            'Difficulty in communicating technical features of fashion-tech',
            'Small window of opportunity for peak relevance'
        ],
        whatWeDid: ['Campaign Strategy', 'Video Production', 'Social Media Marketing', 'Performance Tracking'],
        thumbnail: '/projects/film-production.png',
        heroImage: '/projects/film-production.png',
        marketingAssets: {
            stats: [
                { label: 'Instagram Reach', value: '1.2M+', trend: '+45%' },
                { label: 'Conversion Rate', value: '4.8%', trend: '+12%' },
                { label: 'Ad Engagement', value: '8.2%', trend: '+22%' }
            ],
            collaterals: [
                'https://images.unsplash.com/photo-1539109132314-c6d9917d4826?q=80&w=2000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop'
            ]
        }
    },
    {
        id: 'bloom-social',
        title: 'Bloom Social',
        category: 'Content Strategy',
        description: 'Content-driven growth strategy for a modern lifestyle community.',
        problem: 'Engagement rates were plateauing despite consistent posting, indicating a mismatch between content and audience interests.',
        brandProblems: [
            'Static content format becoming repetitive',
            'Inconsistent brand voice across platforms',
            'Low community interaction'
        ],
        whatWeDid: ['Content Calendar Design', 'Brand Voice Development', 'Community Management', 'Video Strategy', 'Platform Specific Optimization', 'Influencer Outreach', 'Analytic Deep-dives'],
        thumbnail: '/projects/social-media.png',
        heroImage: '/projects/social-media.png',
        marketingAssets: {
            stats: [
                { label: 'Community Growth', value: '85K', trend: '+120%' },
                { label: 'Avg Comments/Post', value: '450', trend: '+300%' },
                { label: 'Save Rate', value: '15%', trend: '+80%' },
                { label: 'Organic Reach', value: '1.4M', trend: '+45%' },
                { label: 'ROI (Ad Spend)', value: '12.5x', trend: '+200%' },
                { label: 'Video Engagement', value: '62%', trend: '+85%' }
            ],
            collaterals: [
                'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1000&auto=format&fit=crop'
            ]
        }
    },
    {
        id: 'noir-collection',
        title: 'Noir Collection',
        category: 'Branding',
        description: 'Luxury timepiece collection branding emphasizing heritage and precision.',
        problem: 'A new heritage brand entering a market dominated by centuries-old giants needed instant credibility and allure.',
        brandProblems: [
            'Initial perception as a "fashion watch" rather than an investment piece',
            'Lack of established brand heritage',
            'Need for high-end retail presence'
        ],
        whatWeDid: ['Luxury Branding', 'Identity Design', 'Packaging Design', 'Photography Direction'],
        thumbnail: '/projects/packaging-design.png',
        heroImage: '/projects/packaging-design.png',
        designAssets: {
            sketches: [
                'https://images.unsplash.com/photo-1544511916-0148ccdeb877?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1000&auto=format&fit=crop'
            ],
            colorPalette: [
                { name: 'Obsidian Black', hex: '#050505' },
                { name: 'Champagne Gold', hex: '#C5A059' },
                { name: 'Slate Grey', hex: '#707070' }
            ],
            typography: [
                { name: 'Playfair Display', font: 'Serif', usage: 'Headings' },
                { name: 'Nunito Sans', font: 'Sans-serif', usage: 'Supporting Text' }
            ],
            mockups: [
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2000&auto=format&fit=crop'
            ]
        }
    },
    {
        id: 'pulse-motion',
        title: 'Pulse Motion',
        category: 'Creative Production',
        description: 'Dynamic motion identity for a high-frequency trading platform.',
        problem: 'The platform brand felt static and disconnected from the high-speed reality of digital finance.',
        brandProblems: [
            'Visual identity felt "slow" and dated',
            'Complex data points were hard to visualize for users',
            'Need for seamless transitions across UI elements'
        ],
        whatWeDid: ['Motion Identity', 'UI Animation', 'Product Video Production', 'Sound Design'],
        thumbnail: '/projects/motion-graphics.png',
        heroImage: '/projects/motion-graphics.png',
        marketingAssets: {
            stats: [
                { label: 'Video Watch Time', value: '85%', trend: '+25%' },
                { label: 'Platform Retention', value: '92%', trend: '+15%' },
                { label: 'CTR on Motion Ads', value: '12.5%', trend: '+40%' }
            ],
            collaterals: [
                'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1558494949-ef8b565b1cd5?q=80&w=1000&auto=format&fit=crop'
            ]
        }
    }
];
