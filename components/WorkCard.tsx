
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
  const brightness = isActive ? 1 : 0.4;
  const grayscale = isActive ? 0 : 0.8;

  return (
    <motion.div
      onClick={() => onClick(project)}
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`shrink-0 w-72 md:w-80 h-[440px] md:h-[480px] cursor-pointer rounded-[2rem] shadow-xl dark:shadow-2xl group relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-colors duration-500`}
    >
      <div className="absolute inset-0 w-full h-full">
        <motion.img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
              filter: `brightness(${brightness}) grayscale(${grayscale})`,
              scale: isActive ? 1.05 : 1
          }}
          transition={{ duration: 1 }}
        />

        {/* HUD Overlays */}
        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                 <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.4em]">Resolution</span>
                 <span className="text-[9px] font-bold text-white uppercase tracking-tighter">4K RAW</span>
              </div>
              <Maximize2 size={14} className="text-white/40" />
           </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60'}`} />

        {/* Content */}
        <div className="absolute inset-0 z-30 p-8 flex flex-col justify-end">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-black bg-white text-black px-2 py-0.5 rounded uppercase tracking-widest">Master Edit</span>
            </div>
            <h3 className="text-white text-2xl font-bold truncate tracking-tighter font-serif italic">{project.title}</h3>
          </div>
        </div>

        {/* Play Action */}
        {isActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
            >
                <div className="bg-white text-zinc-900 px-6 py-3 rounded-full flex items-center gap-3 scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl pointer-events-auto">
                    <Play size={14} fill="currentColor" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Watch</span>
                </div>
            </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkCard;
