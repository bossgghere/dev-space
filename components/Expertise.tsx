
import React from 'react';
import { motion } from 'framer-motion';
import { SPECIALIZATIONS, TOOLS } from '../constants';
import { ArrowRight, Layers } from 'lucide-react';

const Expertise: React.FC = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col gap-24 py-24 md:py-40 transition-colors duration-500">
      {/* Refined Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-8 border-b border-zinc-100 dark:border-zinc-800 pb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-12 h-[1px] bg-zinc-900 dark:bg-white"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 dark:text-zinc-500">Service Stack</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white font-serif leading-none">
            Expertise<span className="italic font-normal text-zinc-200 dark:text-zinc-800">.</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            Crafting cinematic narratives through precise cutting, color science, and rhythmic storytelling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Specializations - Clean List */}
        <div className="lg:col-span-6 space-y-2">
          {SPECIALIZATIONS.map((spec, i) => (
            <motion.div 
              key={spec.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group py-8 border-b border-zinc-50 dark:border-zinc-900 flex flex-col gap-2 hover:px-2 transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white transition-all group-hover:italic">
                  {spec.title}
                </h3>
                <ArrowRight size={20} className="text-zinc-200 dark:text-zinc-800 group-hover:text-zinc-900 dark:group-hover:text-white transition-all -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 max-w-sm leading-relaxed">
                {spec.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* The Arsenal - Minimalist Grid */}
        <div className="lg:col-span-6">
          <div className="sticky top-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Layers size={14} className="text-zinc-300 dark:text-zinc-700" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-900 dark:text-white">The Arsenal</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {TOOLS.map((tool, i) => (
                  <motion.div 
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-5 p-2 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-black text-sm shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                      {tool.short}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">{tool.name}</span>
                      <span className="text-[9px] font-black text-zinc-300 dark:text-zinc-600 uppercase tracking-widest">{tool.category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-zinc-100 dark:border-zinc-900">
               <p className="text-[10px] font-bold text-zinc-300 dark:text-zinc-700 uppercase leading-loose tracking-[0.2em] max-w-xs">
                 Optimized workflows for high-fidelity 4K output across all major social and commercial platforms.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
