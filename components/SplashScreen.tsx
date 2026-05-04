
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: 0.6,
          ease: "expo.inOut",
          onComplete: onComplete
        });
      }
    });

    // Fast loading counter simulation
    const counterObj = { value: 0 };
    gsap.to(counterObj, {
      value: 100,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => setCounter(Math.floor(counterObj.value))
    });

    // Animation sequence
    tl.set(textRef.current, { opacity: 0, skewX: 20 })
      .to(textRef.current, { opacity: 1, skewX: 0, duration: 0.4, ease: "power4.out" })
      .to(barRef.current, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0)
      .to(textRef.current, { 
        opacity: 0, 
        duration: 0.1, 
        repeat: 3, 
        yoyo: true, 
        delay: 0.5 
      })
      .to(containerRef.current, { 
        filter: "brightness(2)", 
        duration: 0.2 
      }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic Noise Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative flex flex-col items-center gap-8">
        <div ref={textRef} className="flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white font-serif italic mb-2">
                DJ / 2026
            </h2>
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">System Boot // Post-Production</span>
            </div>
        </div>

        {/* Progress System */}
        <div className="w-64 md:w-80 h-[2px] bg-zinc-900 relative overflow-hidden">
            <div 
                ref={barRef} 
                className="absolute top-0 left-0 h-full w-full bg-white origin-left scale-x-0"
            />
        </div>

        <div className="flex flex-col items-center gap-1">
            <span className="text-[40px] font-black text-white font-mono leading-none">
                {counter.toString().padStart(3, '0')}
            </span>
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.5em]">Sequence Initializing</span>
        </div>
      </div>

      {/* Edge Data */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 opacity-20">
         <span className="text-[8px] font-mono text-white tracking-tighter">RENDER_ENGINE: V2.5</span>
         <span className="text-[8px] font-mono text-white tracking-tighter">BUFFER_STATE: OPTIMIZED</span>
      </div>

      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-1 opacity-20 text-right">
         <span className="text-[8px] font-mono text-white tracking-tighter">TC: 00:00:00:24</span>
         <span className="text-[8px] font-mono text-white tracking-tighter">FPS: 60.00</span>
      </div>
    </div>
  );
};

export default SplashScreen;
