
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize2 } from 'lucide-react';
import { Project } from '../types';

interface WorkCardProps {
  project: Project;
  isActive: boolean;
  onClick: (project: Project) => void;
  index: number;
}

const WorkCard: React.FC<WorkCardProps> = ({ 
  project, 
  isActive, 
  onClick
}) => {
  const brightness = isActive ? 1 : 0.3;
  const grayscale = isActive ? 0 : 0.8;

  return (
    <motion.div
      onClick={() => onClick(project)}
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ 
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`shrink-0 w-64 md:w-80 h-[360px] md:h-[440px] cursor-pointer rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)] group relative overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-colors duration-500`}
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Animated Cinematic Border */}
        {isActive && (
          <motion.div 
            layoutId="activeBorder"
            className="absolute inset-0 z-40 border-[3px] border-zinc-900/10 dark:border-white/20 rounded-[2.5rem] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <motion.img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
              filter: `brightness(${brightness}) grayscale(${grayscale})`,
              scale: isActive ? 1.08 : 1
          }}
          transition={{ duration: 1.2, ease: "circOut" }}
        />

        {/* HUD Overlays - Top */}
        <div className="absolute top-0 inset-x-0 z-20 p-6 flex justify-between items-start pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="flex flex-col gap-1">
              <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.4em]">Encoding</span>
              <span className="text-[9px] font-bold text-white uppercase tracking-tighter">H.265 / 10-BIT</span>
           </div>
           <div className="flex flex-col items-end gap-1">
              <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.4em]">Resolution</span>
              <span className="text-[9px] font-bold text-white uppercase tracking-tighter">4K RAW</span>
           </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60'}`} />

        {/* Content - Bottom */}
        <div className="absolute inset-x-0 bottom-0 z-30 p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[7px] font-black bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded uppercase tracking-widest border border-white/10">Master Edit</span>
            </div>
            <h3 className="text-white text-2xl md:text-3xl font-bold truncate tracking-tighter font-serif italic">{project.title}</h3>
            <div className="flex items-center gap-2 opacity-60">
                <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-white/40"></span>
                <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Center Action (Watch Button) */}
        <motion.div 
          animate={{ 
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.8
          }}
          className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
        >
            <div className="bg-white text-zinc-900 px-6 py-3 rounded-full flex items-center gap-3 transition-transform duration-500 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] pointer-events-auto group-hover:scale-110 active:scale-95">
                <Play size={14} fill="currentColor" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Open Case</span>
            </div>
        </motion.div>

        {/* Corners HUD - Only when active */}
        <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 ${isActive ? 'opacity-40' : 'opacity-0'}`}>
            <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/40"></div>
            <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/40"></div>
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/40"></div>
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/40"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;
