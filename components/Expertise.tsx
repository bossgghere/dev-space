
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SPECIALIZATIONS, TOOLS } from '../constants';
import { ArrowUpRight, Cpu, Layers, Workflow } from 'lucide-react';

const Expertise: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.from(row, {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row,
            start: "top 95%",
          }
        });
      });

      // Background floating icons parallax
      gsap.to(".floating-tool", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-white dark:bg-zinc-950 py-32 md:py-48 transition-colors duration-500 overflow-hidden">
      {/* Background HUD Graphics */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.05]">
          <span className="absolute top-20 -left-20 text-[20vw] font-black tracking-tighter uppercase whitespace-nowrap select-none">Technical Architecture</span>
          <span className="absolute bottom-40 -right-20 text-[20vw] font-black tracking-tighter uppercase whitespace-nowrap select-none">Creative Suite</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col gap-4 mb-24 md:mb-32">
          <div className="flex items-center gap-3">
             <Cpu size={14} className="text-zinc-400 dark:text-zinc-600" />
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 dark:text-zinc-500">Processing Capabilities</span>
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white font-serif leading-none">
            Tech <span className="italic font-normal text-zinc-200 dark:text-zinc-800">Stack</span>
          </h2>
        </div>

        <div className="flex flex-col border-t border-zinc-100 dark:border-zinc-900">
          {SPECIALIZATIONS.map((spec, i) => (
            <div 
              key={spec.title}
              ref={el => rowRefs.current[i] = el}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group relative w-full py-12 md:py-16 border-b border-zinc-100 dark:border-zinc-900 flex flex-col gap-6 md:gap-0 md:flex-row md:items-center justify-between cursor-default hover:px-4 transition-all duration-500"
            >
              {/* Background Reveal on Hover */}
              <div className="absolute inset-0 bg-zinc-50/50 dark:bg-zinc-900/30 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 -z-10" />

              <div className="flex items-center gap-8 md:gap-16">
                <span className="text-xs font-black text-zinc-200 dark:text-zinc-800 font-mono tracking-widest">0{i + 1}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white transition-all group-hover:italic group-hover:translate-x-2 duration-500">
                    {spec.title}
                  </h3>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <Layers size={10} className="text-zinc-400" />
                      <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em]">{spec.tag} Mode</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-6 max-w-md w-full md:w-auto">
                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed md:text-right">
                  {spec.description}
                </p>
                
                {/* Arsenal Chips Reveal */}
                <div className="flex flex-wrap md:justify-end gap-2">
                  {TOOLS.filter(t => 
                    (spec.title.includes('Commercial') && ['PR', 'DR', 'PS'].includes(t.short)) ||
                    (spec.title.includes('Podcast') && ['PR', 'AD'].includes(t.short)) ||
                    (spec.title.includes('Anime') && ['AE', 'DR', 'MG'].includes(t.short)) ||
                    (spec.title.includes('Documentaries') && ['PR', 'DR', 'AD'].includes(t.short)) ||
                    (spec.title.includes('Creator') && ['PR', 'AE', 'MG'].includes(t.short))
                  ).map((tool) => (
                    <span 
                      key={tool.short}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-[8px] font-black text-zinc-900 dark:text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                    >
                      {tool.name}
                    </span>
                  ))}
                  <div className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white group-hover:rotate-45 transition-transform duration-500 hidden md:flex">
                     <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Tools Marquee Footer */}
        <div className="mt-40 md:mt-60 pt-20 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-12">
            <div className="flex items-center gap-3">
              <Workflow size={14} className="text-zinc-400 dark:text-zinc-600" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-900 dark:text-white">Hardware & Latency Optimized Archive</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {TOOLS.map((tool) => (
                    <div key={tool.name} className="flex flex-col gap-3">
                        <span className="text-xs font-black text-zinc-900 dark:text-white tracking-tighter uppercase">{tool.name}</span>
                        <div className="w-full h-[1px] bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                            <motion.div 
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "0%" }}
                                transition={{ duration: 1.5, delay: 0.2 }}
                                className="absolute inset-0 bg-zinc-900 dark:bg-white origin-left"
                                style={{ width: `${tool.level}%` }}
                            />
                        </div>
                        <span className="text-[8px] font-mono font-bold text-zinc-300 dark:text-zinc-600 uppercase tracking-widest">Perf: {tool.level}%</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
