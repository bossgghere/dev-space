
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Activity, LayoutGrid } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (project) {
        setIsPlaying(true);
        setIsMuted(false);
        setIsLoaded(false);
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
  }, [project]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl p-4 md:p-12 overflow-y-auto no-scrollbar transition-colors duration-500"
      >
        <div className="absolute inset-0" onClick={onClose} />
        
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 md:top-12 md:right-12 p-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-110 transition-transform z-[1100] shadow-2xl flex items-center justify-center"
        >
          <X size={24} />
        </button>

        <div className="w-full max-w-7xl relative z-10 flex flex-col gap-8 py-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-8 px-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <LayoutGrid size={12} className="text-zinc-300 dark:text-zinc-700" />
                 <span className="text-[10px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.4em]">{project.category} // {project.year}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white font-serif italic">{project.title}</h2>
            </div>
            <div className="flex items-center gap-4 text-right">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Quality Score</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-white">{project.rating}</span>
                </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            className="relative w-full aspect-video bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] group transition-colors duration-500"
            onMouseMove={handleMouseMove}
          >
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-0">
                  <div className="w-12 h-12 border-2 border-zinc-100 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin" />
                  <span className="text-[9px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.3em]">Decoding Streams...</span>
              </div>
            )}

            <video 
              ref={videoRef}
              src={project.videoUrl} 
              autoPlay 
              loop 
              onLoadedData={() => setIsLoaded(true)}
              muted={isMuted}
              onClick={togglePlay}
              className={`w-full h-full object-contain cursor-pointer transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            <AnimatePresence>
              {showControls && isLoaded && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                >
                  <div className="flex items-center justify-between pointer-events-auto">
                      <div className="flex items-center gap-4">
                          <button 
                            onClick={togglePlay}
                            className="p-5 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:scale-110 transition-transform shadow-xl"
                          >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                          </button>
                          <button onClick={() => setIsMuted(!isMuted)} className="p-4 rounded-full bg-black/20 dark:bg-white/10 text-white dark:text-white hover:bg-black/40 dark:hover:bg-white/20 backdrop-blur-md transition-all">
                              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                          </button>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-black/20 dark:bg-zinc-900/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 dark:border-white/5">
                          <Activity size={14} className="text-red-500 animate-pulse" />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Buffer Optimized</span>
                      </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-6"
          >
             <div className="lg:col-span-8">
                <h4 className="text-[10px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.5em] mb-4">Project Narrative</h4>
                <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-serif leading-relaxed italic">
                  "{project.description}"
                </p>
             </div>
             <div className="lg:col-span-4 space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.5em] mb-4">Focus Modules</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.episodes?.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-lg text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;
