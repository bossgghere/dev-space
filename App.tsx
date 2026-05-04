
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sun, Moon } from 'lucide-react';
import Hero from './components/Hero';
import WorkCard from './components/WorkCard';
import Expertise from './components/Expertise';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import { PROJECTS } from './constants';
import { Project } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'dark';
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const autoRotateRef = useRef<number | null>(null);

  const categories = useMemo(() => ['All', ...new Set(PROJECTS.map(p => p.category))], []);
  
  const filteredProjects = useMemo(() => {
    return filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (activeIndex >= filteredProjects.length) {
      setActiveIndex(Math.max(0, filteredProjects.length - 1));
    }
  }, [filteredProjects, activeIndex]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.96]);

  const startRotation = useCallback(() => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = window.setInterval(() => {
      if (!selectedProject && filteredProjects.length > 1) {
        setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
      }
    }, 5000);
  }, [selectedProject, filteredProjects.length]);

  useEffect(() => {
    startRotation();
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [startRotation]);

  const handleCardClick = (project: Project) => {
    const index = filteredProjects.findIndex(p => p.id === project.id);
    if (index === activeIndex) {
      setSelectedProject(project);
    } else {
      setActiveIndex(index);
      startRotation();
    }
  };

  const nextCard = () => {
    if (filteredProjects.length === 0) return;
    setSelectedProject(null);
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
    startRotation();
  };
  
  const prevCard = () => {
    if (filteredProjects.length === 0) return;
    setSelectedProject(null);
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    startRotation();
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div ref={containerRef} className="relative w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <ProjectDetail 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Floating Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="fixed top-8 right-8 z-[200] p-4 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl text-zinc-900 dark:text-white hover:scale-110 transition-transform"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="sticky top-0 z-0">
        <Hero />
      </motion.div>

      <section id="work" className="relative min-h-screen flex flex-col items-center justify-center py-32 overflow-hidden bg-white dark:bg-zinc-950 z-10">
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-7xl w-full px-4 text-center z-10 flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white font-serif leading-tight">
              Selected <span className="italic font-normal text-zinc-300 dark:text-zinc-700">Works</span>
            </h2>
            
            <div className="mt-12 flex flex-wrap justify-center gap-2 md:gap-4 px-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setFilter(cat); setActiveIndex(0); startRotation(); }}
                  className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                    filter === cat 
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl scale-110' 
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative w-full flex flex-col items-center gap-12">
            <div className="relative w-full max-w-5xl h-[500px] overflow-hidden">
              <motion.div 
                animate={{ x: `calc(50% - ${(activeIndex * 320) + 160}px)` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex items-center gap-8 h-full"
              >
                {filteredProjects.map((project, index) => (
                  <WorkCard 
                    key={`${filter}-${project.id}`}
                    project={project}
                    isActive={index === activeIndex}
                    onClick={handleCardClick}
                    index={index}
                  />
                ))}
              </motion.div>
            </div>
            
            {filteredProjects.length > 1 && (
              <div className="flex items-center gap-10">
                 <button 
                  onClick={(e) => { e.stopPropagation(); prevCard(); }} 
                  className="w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-900 dark:hover:bg-white text-zinc-900 dark:text-white hover:text-white dark:hover:text-zinc-900 transition-all shadow-xl hover:scale-110 active:scale-90"
                 >
                  <ArrowLeft size={20} strokeWidth={2} />
                </button>
                 <div className="flex items-center gap-2">
                    {filteredProjects.map((_, i) => (
                        <div 
                          key={i} 
                          onClick={() => { setActiveIndex(i); startRotation(); }}
                          className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === activeIndex ? 'w-10 bg-zinc-900 dark:bg-white' : 'w-1.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-600'}`} 
                        />
                    ))}
                 </div>
                 <button 
                  onClick={(e) => { e.stopPropagation(); nextCard(); }} 
                  className="w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-900 dark:hover:bg-white text-zinc-900 dark:text-white hover:text-white dark:hover:text-zinc-900 transition-all shadow-xl hover:scale-110 active:scale-90"
                 >
                  <ArrowRight size={20} strokeWidth={2} />
                </button>
              </div>
            )}
          </div>

          <div className="mt-16">
            <AnimatePresence mode="wait">
              {filteredProjects[activeIndex] && (
                <motion.div 
                  key={filteredProjects[activeIndex].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-[10px] font-black text-zinc-200 dark:text-zinc-800 tracking-[0.4em]">PROJECT {activeIndex + 1} / {filteredProjects.length}</span>
                    </div>
                    <h4 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white font-serif italic tracking-tighter">
                      {filteredProjects[activeIndex].title}
                    </h4>
                    <div className="flex items-center justify-center gap-4 mt-4">
                       <span className="w-12 h-[1px] bg-zinc-100 dark:bg-zinc-800"></span>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">{filteredProjects[activeIndex].category}</p>
                       <span className="w-12 h-[1px] bg-zinc-100 dark:bg-zinc-800"></span>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="expertise" className="relative z-10 bg-white dark:bg-zinc-950">
        <Expertise />
      </section>

      <section id="contact" className="relative z-10 bg-white dark:bg-zinc-950">
        <Contact />
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
