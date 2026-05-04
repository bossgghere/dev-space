
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Mouse movement for 3D Tilt & Lens Flare
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  // Parallax & Depth Transforms
  const yTextBack = useTransform(scrollY, [0, 800], [0, -150]);
  const yTextFront = useTransform(scrollY, [0, 800], [0, -250]);
  const yImageCenter = useTransform(scrollY, [0, 800], [0, -80]);
  const yImageSides = useTransform(scrollY, [0, 800], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.9]);

  // Mouse Tilt Logic
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 2 } });

      tl.from(".hero-text-back", { opacity: 0, scale: 0.9, duration: 2.5 })
        .from(".hero-portrait-main", { y: 100, opacity: 0, scale: 0.95 }, "-=2")
        .from(".hero-portrait-side", { y: 150, opacity: 0, stagger: 0.2 }, "-=1.8")
        .from(".hero-text-front", { y: 50, opacity: 0 }, "-=1.5")
        .from(".hero-hud-element", { opacity: 0, x: (i) => i % 2 === 0 ? -20 : 20, stagger: 0.1 }, "-=1.2")
        .from(".hero-scroll-indicator", { opacity: 0, y: -20 }, "-=1");
    }, contentRef);

    return () => ctx.revert();
  }, []);

  // Technical Ticker Data
  const [techData, setTechData] = useState({ iso: 400, shutter: '1/50', k: 5600 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTechData({
        iso: Math.floor(Math.random() * (800 - 320) + 320),
        shutter: Math.random() > 0.5 ? '1/50' : '1/48',
        k: Math.floor(Math.random() * (5800 - 5400) + 5400)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[110vh] flex items-center justify-center bg-white dark:bg-zinc-950 overflow-hidden select-none transition-colors duration-700"
    >
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply dark:mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
      </div>

      {/* Main Composition Stage */}
      <motion.div 
        ref={contentRef}
        style={{ 
          opacity, 
          scale,
          rotateX,
          rotateY,
          perspective: 1200
        }}
        className="relative w-full max-w-[1440px] h-[80vh] flex items-center justify-center"
      >
        
        {/* BACKGROUND TEXT LAYER */}
        <motion.div 
          style={{ y: yTextBack }}
          className="hero-text-back absolute inset-0 flex items-center justify-center z-10"
        >
          <h1 className="text-[18vw] font-black tracking-[-0.08em] text-zinc-100 dark:text-zinc-900/40 leading-none select-none">
            DEV JENA
          </h1>
        </motion.div>

        {/* PORTRAIT COMPOSITION (3-PANEL SPLIT) */}
        <div className="relative z-20 flex items-center justify-center gap-4 md:gap-8 h-full w-full max-w-4xl px-6">
          {/* Side Panel Left */}
          <motion.div 
            style={{ y: yImageSides }}
            className="hero-portrait-side hidden md:block w-1/4 h-[40%] rounded-3xl overflow-hidden grayscale opacity-40 blur-[2px] border border-zinc-200 dark:border-zinc-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover scale-150"
              alt="Portrait detail"
            />
          </motion.div>

          {/* Main Center Portrait */}
          <motion.div 
            style={{ y: yImageCenter }}
            className="hero-portrait-main relative w-full md:w-1/2 h-[70%] md:h-[85%] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-[12px] border-white dark:border-zinc-900 group"
          >
            <div className="absolute inset-0 bg-zinc-900/10 dark:bg-zinc-900/40 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Dev Jena Portrait"
            />
            
            {/* Inner HUD Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                     <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">Rendering</span>
                     <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div animate={{ x: [-48, 48] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-1/2 h-full bg-white" />
                     </div>
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase font-mono">24.00 FPS</span>
               </div>
            </div>
          </motion.div>

          {/* Side Panel Right */}
          <motion.div 
            style={{ y: yImageSides }}
            className="hero-portrait-side hidden md:block w-1/4 h-[40%] rounded-3xl overflow-hidden grayscale opacity-40 blur-[2px] border border-zinc-200 dark:border-zinc-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover scale-150 translate-x-10"
              alt="Portrait detail"
            />
          </motion.div>
        </div>

        {/* FRONT TEXT LAYER (INTERWOVEN) */}
        <motion.div 
          style={{ y: yTextFront }}
          className="hero-text-front absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
        >
          <div className="relative text-center">
            <h1 className="text-[18vw] font-black tracking-[-0.08em] text-zinc-900 dark:text-white leading-none mix-blend-normal">
              DEV JENA
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-zinc-900/10 dark:bg-white/10"></div>
          </div>
        </motion.div>

        {/* FLOATING HUD ELEMENTS */}
        <div className="absolute inset-0 z-40 p-12 pointer-events-none hidden lg:flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <div className="space-y-6 hero-hud-element">
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.4em]">Lens Configuration</span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase">35MM ANAMORPHIC // T2.8</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.4em]">Color Space</span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase">ARRI LOG-C4</span>
                 </div>
              </div>

              <div className="hero-hud-element flex flex-col items-end gap-1">
                 <div className="w-32 h-12 flex items-end gap-1 pb-2">
                    {[0.2, 0.5, 0.8, 0.4, 0.9, 0.3, 0.6].map((h, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: [`${h*100}%`, `${(1-h)*100}%`, `${h*100}%`] }}
                        transition={{ repeat: Infinity, duration: 1 + i*0.2 }}
                        className="flex-1 bg-zinc-900 dark:bg-white/20 rounded-full"
                      />
                    ))}
                 </div>
                 <span className="text-[8px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.4em]">Audio Master (L/R)</span>
              </div>
           </div>

           <div className="flex justify-between items-end">
              <div className="hero-hud-element flex gap-12">
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.4em]">ISO</span>
                    <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">{techData.iso}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.4em]">Shutter</span>
                    <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">{techData.shutter}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.4em]">Temp</span>
                    <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">{techData.k}K</span>
                 </div>
              </div>
              
              <div className="hero-hud-element text-right">
                <span className="text-[8px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.4em] block mb-1">Portfolio v2.5.0</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase">Post-Production Director</span>
              </div>
           </div>
        </div>
      </motion.div>

      {/* CURSOR FLARE EFFECT */}
      <motion.div 
        style={{ 
          x: useTransform(springX, [-0.5, 0.5], [-200, 200]),
          y: useTransform(springY, [-0.5, 0.5], [-100, 100]),
        }}
        className="absolute inset-0 z-50 pointer-events-none opacity-20 dark:opacity-40"
      >
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-sm"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="hero-scroll-indicator absolute bottom-12 flex flex-col items-center gap-4 z-40"
      >
        <div className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-700 rotate-90 origin-center mb-8">SCROLL</div>
        <div className="w-px h-16 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
           <motion.div 
             animate={{ y: [-64, 64] }}
             transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
             className="absolute top-0 left-0 w-full h-1/2 bg-zinc-900 dark:bg-white"
           />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
