
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  rating: string;
  episodes?: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  content: string;
  avatar: string;
  projectRef: string;
}

export enum Section {
  HERO = 'hero',
  WORK = 'work'
}
