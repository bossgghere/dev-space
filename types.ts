
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

export enum Section {
  HERO = 'hero',
  WORK = 'work'
}
