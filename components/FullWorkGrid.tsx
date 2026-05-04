
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { X, Play, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface FullWorkGridProps {
  onClose: () => void;
  onProjectSelect: (project: Project) => void;
}

const FullWorkGrid: React.FC<FullWorkGridProps> = ({ onClose, onProjectSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".grid-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
      });
      
      gsap.from(".grid-header", {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] bg-white dark:bg-zinc-950 overflow-y-auto no-scrollbar pt-32 pb-20 px-6 md:px-12"
      ref={containerRef}
      data-lenis-prevent
    >
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid-header flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-zinc-100 dark:border-zinc-800 pb-12">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 dark:text-zinc-600 mb-4 block">Archive v1.0</span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white font-serif leading-none">
              All <span className="italic font-normal text-zinc-300 dark:text-zinc-700">Work</span>
            </h2>
          </div>
          
          <button 
            onClick={onClose}
            className="group flex items-center gap-4 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-transform active:scale-95"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Close Archive</span>
            <X size={16} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className="grid-item group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
            >
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">{project.year}</span>
                  <ArrowUpRight size={20} className="text-white/40 group-hover:text-white transition-colors" />
                </div>
                
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 block">{project.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-serif italic tracking-tighter">{project.title}</h3>
                  
                  <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <div className="p-3 rounded-full bg-white text-zinc-900">
                      <Play size={12} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">View Case</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer in Grid View */}
        <div className="mt-32 pt-12 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <p className="text-[10px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.5em]">End of Archive</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FullWorkGrid;
