
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Hero from './components/Hero';
import WorkCard from './components/WorkCard';
import Expertise from './components/Expertise';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import SplashScreen from './components/SplashScreen';
import FullWorkGrid from './components/FullWorkGrid';
import Menu from './components/Menu';
import { PROJECTS } from './constants';
import { Project } from './types';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFullWork, setShowFullWork] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'dark';
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Horizontal Scroll Setup
  useEffect(() => {
    if (!isLoading && horizontalTrackRef.current) {
      const ctx = gsap.context(() => {
        const itemWidth = window.innerWidth >= 768 ? 320 : 288;
        const gap = 32;
        const itemSize = itemWidth + gap;
        // Include the "See Full Work" terminal card in total travel
        const totalTravel = PROJECTS.length * itemSize;

        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: "#work",
          start: "top top",
          end: () => `+=${totalTravel + window.innerHeight}`,
          pin: true,
          scrub: 1.5,
          snap: {
            snapTo: 1 / PROJECTS.length,
            duration: { min: 0.2, max: 0.8 },
            delay: 0.1,
            ease: "power2.inOut"
          },
          invalidateOnRefresh: true,
          animation: gsap.to(horizontalTrackRef.current, {
            x: -totalTravel,
            ease: "none"
          }),
          onUpdate: (self) => {
            const index = Math.round(self.progress * PROJECTS.length);
            if (index !== activeIndexRef.current) {
              activeIndexRef.current = index;
              setActiveIndex(index);
            }
          }
        });

        gsap.from(".gsap-reveal-work", {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".gsap-reveal-work",
            start: "top 85%",
          }
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  // Refresh ScrollTrigger after initial load
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleCardClick = (project: Project) => {
    const index = PROJECTS.findIndex(p => p.id === project.id);
    if (index === activeIndex) {
      setSelectedProject(project);
    } else {
      if (scrollTriggerRef.current && lenisRef.current) {
        const st = scrollTriggerRef.current;
        const targetProgress = index / PROJECTS.length;
        const targetScroll = st.start + ((st.end - st.start) * targetProgress);
        lenisRef.current.scrollTo(targetScroll, { duration: 1.5 });
      }
    }
  };

  const handleSeeFullWorkClick = () => {
    setShowFullWork(true);
    if (lenisRef.current) lenisRef.current.stop();
  };

  const closeFullWork = () => {
    setShowFullWork(false);
    if (lenisRef.current) {
      lenisRef.current.start();
      // Ensure ScrollTrigger recalculates after the modal closes
      ScrollTrigger.refresh();
    }
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.96]);

  return (
    <div ref={containerRef} className="relative w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-900 dark:bg-white z-[300] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence>
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFullWork && (
          <FullWorkGrid 
            onClose={closeFullWork} 
            onProjectSelect={(p) => { setSelectedProject(p); closeFullWork(); }} 
          />
        )}
      </AnimatePresence>

      <Menu />

      <button 
        onClick={toggleTheme}
        className="fixed top-8 right-8 z-[400] p-4 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl text-zinc-900 dark:text-white hover:scale-110 transition-transform"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {!isLoading && (
        <>
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="sticky top-0 z-0">
            <Hero />
          </motion.div>

          <section id="work" className="relative h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 z-[10] py-12 md:py-20">
            <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="max-w-7xl w-full px-4 text-center z-10 flex flex-col items-center h-full justify-between">
              <div className="gsap-reveal-work shrink-0">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white font-serif leading-none mb-4">
                  Selected <span className="italic font-normal text-zinc-300 dark:text-zinc-700">Works</span>
                </h2>
              </div>
              
              <div className="relative w-full flex flex-col items-start grow justify-center overflow-hidden">
                <div className="relative w-full h-[380px] md:h-[450px] flex items-center justify-start">
                  <div 
                    ref={horizontalTrackRef}
                    className="flex items-center gap-6 md:gap-8 h-full px-[calc(50vw-128px)] md:px-[calc(50vw-160px)]"
                  >
                    {PROJECTS.map((project, index) => (
                      <WorkCard 
                        key={project.id}
                        project={project}
                        isActive={index === activeIndex}
                        onClick={handleCardClick}
                        index={index}
                      />
                    ))}
                    
                    {/* TERMINAL CARD: SEE FULL WORK */}
                    <div className="shrink-0 w-64 md:w-80 h-[360px] md:h-[440px] flex items-center justify-center">
                        <motion.button
                           onClick={handleSeeFullWorkClick}
                           animate={{ 
                             scale: activeIndex === PROJECTS.length ? 1 : 0.85,
                             opacity: activeIndex === PROJECTS.length ? 1 : 0.4
                           }}
                           className="group relative w-full h-full rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-4 md:gap-6 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                        >
                            <div className="p-6 md:p-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 group-hover:scale-110 transition-transform">
                                <ArrowRight size={24} className="md:w-8 md:h-8" />
                            </div>
                            <div className="text-center">
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600 mb-1 md:mb-2 block">Viewing {PROJECTS.length} / {PROJECTS.length}</span>
                                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white font-serif italic">See Full <br/> Work</h3>
                            </div>
                        </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-20 md:h-28 shrink-0 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {activeIndex === PROJECTS.length ? (
                    <motion.div 
                      key="terminal"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-center"
                    >
                        <span className="text-[8px] md:text-[10px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.4em]">Ready for More?</span>
                        <h4 className="text-2xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white font-serif italic tracking-tighter mt-1 md:mt-2">Open the Archive</h4>
                    </motion.div>
                  ) : PROJECTS[activeIndex] && (
                    <motion.div 
                      key={PROJECTS[activeIndex].id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center"
                    >
                        <div className="flex items-center justify-center gap-2 md:gap-3 mb-1 md:mb-2">
                          <span className="text-[8px] md:text-[10px] font-black text-zinc-200 dark:text-zinc-800 tracking-[0.4em]">PROJECT {activeIndex + 1} / {PROJECTS.length}</span>
                        </div>
                        <h4 className="text-2xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white font-serif italic tracking-tighter leading-none">
                          {PROJECTS[activeIndex].title}
                        </h4>
                        <div className="flex items-center justify-center gap-3 md:gap-4 mt-2 md:mt-4">
                          <span className="w-8 md:w-12 h-[1px] bg-zinc-100 dark:bg-zinc-800"></span>
                          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">{PROJECTS[activeIndex].category}</p>
                          <span className="w-8 md:w-12 h-[1px] bg-zinc-100 dark:bg-zinc-800"></span>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          <section id="expertise" className="relative z-[20] bg-white dark:bg-zinc-950">
            <Expertise />
          </section>

          <section id="testimonials" className="relative z-[30] bg-white dark:bg-zinc-950">
            <Testimonials />
          </section>

          <section id="contact" className="relative z-[40] bg-white dark:bg-zinc-950">
            <Contact />
          </section>
        </>
      )}

      <ProjectDetail 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default App;
