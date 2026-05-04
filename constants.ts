
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Zomato Founder',
    category: 'Podcast Edit',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'A high-energy podcast edit featuring Deepinder Goyal. Focused on multi-cam synchronization, rapid-fire pacing, and crisp audio cleanup using Audacity.',
    rating: '9.8/10',
    episodes: ['PR: Seamless Cutting', 'AD: Voice Isolation', 'MG: Dynamic Titles']
  },
  {
    id: '2',
    title: "Zoro's One Piece",
    category: 'Anime Edit',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description: "Intense combat flow and cinematic color grading for the Straw Hat's swordsman. Leveraged After Effects for frame-perfect VFX and Resolve for grading.",
    rating: '9.9/10',
    episodes: ['AE: VFX Compositing', 'DR: Grading', 'PR: Rhythm & Flow']
  },
  {
    id: '3',
    title: 'The Unseen Path',
    category: 'Documentary',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Story-driven documentary editing. Balanced narrative pacing with atmospheric soundscapes to create a deeply emotional viewer experience.',
    rating: '9.7/10',
    episodes: ['Narrative Pacing', 'Sound Design', 'Visual Storytelling']
  },
  {
    id: '4',
    title: 'iShowSpeed Chaos',
    category: 'Creator Edit',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description: 'High-retention editing for digital creators. Utilizing fast cuts, zoom-ins, and meme-style motion graphics to maintain peak engagement.',
    rating: '9.8/10',
    episodes: ['Retention Optimization', 'Motion Graphics', 'Audacity Cleanup']
  },
  {
    id: '5',
    title: 'Visual Symphony',
    category: 'Music Video',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Synchronizing visual metaphors with musical beats. A masterclass in rhythm-based editing and stylistic transition work.',
    rating: '9.9/10',
    episodes: ['Beat Sync', 'Stylistic Transitions', 'Mood Grading']
  },
  {
    id: '6',
    title: 'Brand Story',
    category: 'Commercial',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description: 'Professional commercial edit focused on brand identity. Short, punchy, and impactful storytelling for modern advertising.',
    rating: '9.6/10',
    episodes: ['Brand Tone', 'Pacing', 'Motion Graphics']
  },
  {
    id: '7',
    title: 'Cyberpunk 2077',
    category: 'Game Trailer',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1605898399783-1820b735e127?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Fast-paced gaming montage with heavy glitch effects and neon color grading. Designed to match high-tempo electronic music.',
    rating: '9.8/10',
    episodes: ['Glitch VFX', 'Neon Grading', 'Speed Ramping']
  },
  {
    id: '8',
    title: 'Urban Explorer',
    category: 'Vlog Edit',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description: 'Atmospheric vlog editing for urban explorers. Focuses on cinematic sound design and smooth transition flow between locations.',
    rating: '9.7/10',
    episodes: ['Sound Design', 'Flow Transitions', 'Color Matching']
  },
  {
    id: '9',
    title: 'Tech Review 2.0',
    category: 'Corporate',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Sleek and professional tech product review. Features clean lower thirds, minimalist motion graphics, and crisp B-roll integration.',
    rating: '9.5/10',
    episodes: ['Clean Graphics', 'B-Roll Sync', 'Professional Tone']
  },
  {
    id: '10',
    title: 'The Grand Canyon',
    category: 'Travel Film',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1474487056435-c52905c632bc?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description: 'Wide-angle landscape cinematography edit. Focused on epic scale, natural color palettes, and sweeping visual narratives.',
    rating: '9.9/10',
    episodes: ['Epic Pacing', 'Nature Grading', 'Drone B-Roll']
  }
];

export const SPECIALIZATIONS = [
  {
    title: 'Commercial Ads',
    description: 'High-impact edits designed for conversions and brand recall.',
    tag: 'Punchy'
  },
  {
    title: 'Podcast Editing',
    description: 'Clean cuts, multi-cam switching, and professional audio isolation.',
    tag: 'Clarity'
  },
  {
    title: 'Anime Edits',
    description: 'Frame-perfect synchronization and high-end visual effects.',
    tag: 'VFX'
  },
  {
    title: 'Documentaries',
    description: 'Narrative-driven storytelling with immersive sound design.',
    tag: 'Emotion'
  },
  {
    title: 'Creator Edits',
    description: 'Fast-paced, high-retention editing for the modern algorithm.',
    tag: 'Growth'
  }
];

export const TOOLS = [
  { name: 'Premiere Pro', short: 'PR', level: '95', category: 'Core Engine' },
  { name: 'After Effects', short: 'AE', level: '85', category: 'VFX & Motion' },
  { name: 'DaVinci Resolve', short: 'DR', level: '90', category: 'Color Grade' },
  { name: 'Audacity', short: 'AD', level: '80', category: 'Audio' },
  { name: 'Photoshop', short: 'PS', level: '75', category: 'Design' },
  { name: 'Motion Graphics', short: 'MG', level: '85', category: 'VFX & Motion' }
];

export const CONTACT_DATA = {
  name: 'DJ',
  email: 'workwithdev.editzz@gmail.com',
  phone: '+91 8260811319',
  instagram: 'https://instagram.com/gamer__dev',
  linkedin: 'https://www.linkedin.com/in/dev-jena',
  discord: 'https://discord.com/users/gamer__dev',
  whatsapp: 'https://wa.me/918260811319'
};

export const TESTIMONIALS = [
  {
    id: '1',
    clientName: 'Alex Rivera',
    role: 'Creative Director @ CineShift',
    content: "Dev's ability to understand the rhythm of a story is unmatched. He doesn't just cut clips; he builds tension and emotion where you didn't know it existed.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    projectRef: 'Brand Story'
  },
  {
    id: '2',
    clientName: 'Sarah Chen',
    role: 'Independent Filmmaker',
    content: "The color science Dev applied to my documentary was breathtaking. He transformed raw Log footage into a cinematic masterpiece that won 'Best Visuals' at our local festival.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    projectRef: 'The Unseen Path'
  },
  {
    id: '3',
    clientName: 'Marcus Thorne',
    role: 'Lead Editor @ GamingHub',
    content: "Fast, precise, and incredibly technically proficient. Dev handled a complex 4-camera multicam edit with glitch VFX and had a draft ready in 24 hours. Incredible.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    projectRef: 'Cyberpunk 2077'
  },
  {
    id: '4',
    clientName: 'Elena Volkov',
    role: 'Head of Content @ Streamline',
    content: "Working with Dev Jena is like having a secret weapon in post-production. His motion graphics are clean, modern, and elevate the entire brand identity of our channel.",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    projectRef: 'iShowSpeed Chaos'
  }
];
