
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: onComplete
        });
      }
    });

    // Initial state
    gsap.set([recRef.current, bracketsRef.current, textRef.current, lineRef.current], { opacity: 0 });
    gsap.set(bracketsRef.current, { scale: 1.2 });

    // Animation sequence
    tl.to(lineRef.current, { opacity: 0.2, duration: 0.5 })
      .to(bracketsRef.current, { opacity: 1, scale: 1, duration: 1, ease: "expo.out" }, "+=0.2")
      .to(recRef.current, { opacity: 1, duration: 0.3 }, "-=0.5")
      .to(textRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
      // Pulsing REC dot
      .to(recRef.current, { opacity: 0.4, duration: 0.6, repeat: 3, yoyo: true, ease: "none" }, "-=0.5")
      // Final reveal
      .to([bracketsRef.current, recRef.current, textRef.current], { 
        scale: 1.1, 
        opacity: 0, 
        duration: 0.8, 
        ease: "expo.inOut",
        stagger: 0.1 
      }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-white dark:bg-zinc-950 flex items-center justify-center overflow-hidden transition-colors duration-700"
    >
      {/* Background Grid Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Scanline Effect */}
      <div ref={lineRef} className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-500/5 to-transparent h-20 w-full -translate-y-full animate-[scanline_4s_linear_infinite] pointer-events-none"></div>

      <div className="relative flex flex-col items-center">
        {/* Cinematic Brackets */}
        <div ref={bracketsRef} className="absolute -inset-16 md:-inset-24 border-zinc-200 dark:border-zinc-800 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-zinc-900 dark:border-white"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-zinc-900 dark:border-white"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-zinc-900 dark:border-white"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-zinc-900 dark:border-white"></div>
        </div>

        {/* REC Indicator */}
        <div ref={recRef} className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
          <span className="text-[10px] font-black text-zinc-900 dark:text-white uppercase tracking-[0.5em]">REC // SYNCING</span>
        </div>

        {/* Central Text */}
        <div ref={textRef} className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-zinc-900 dark:text-white font-serif italic mb-2">
            DEV JENA
          </h2>
          <div className="flex items-center justify-center gap-4">
             <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800"></span>
             <span className="text-[8px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.4em]">POST-PRODUCTION</span>
             <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800"></span>
          </div>
        </div>

        {/* Technical Ticker Bottom */}
        <div className="absolute bottom-[-100px] flex gap-8 whitespace-nowrap opacity-20 dark:opacity-40">
           <span className="text-[7px] font-mono font-bold text-zinc-900 dark:text-white">FRM: 00024</span>
           <span className="text-[7px] font-mono font-bold text-zinc-900 dark:text-white">BUF: 100%</span>
           <span className="text-[7px] font-mono font-bold text-zinc-900 dark:text-white">RES: 3840x2160</span>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          from { transform: translateY(-100%); }
          to { transform: translateY(1000%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
