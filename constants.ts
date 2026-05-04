
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
