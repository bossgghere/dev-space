
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../constants';
import { Quote, MessageSquare, Star, Clock } from 'lucide-react';

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.offsetWidth || 0;
      const windowWidth = window.innerWidth;
      
      gsap.to(scrollRef.current, {
        x: -(scrollWidth - windowWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Reveal title
      gsap.from(".testimonials-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden flex flex-col justify-center py-20 transition-colors duration-500"
    >
      {/* Background Cinematic Grid */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="px-6 md:px-12 mb-16 md:mb-24 relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-4 testimonials-title">
          <div className="flex items-center gap-3">
             <MessageSquare size={14} className="text-zinc-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 dark:text-zinc-500">Quality Assurance</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white font-serif leading-none">
            Director's <span className="italic font-normal text-zinc-300 dark:text-zinc-700">Notes</span>
          </h2>
        </div>
      </div>

      <div className="relative flex items-center grow">
        <div 
          ref={scrollRef}
          className="flex gap-8 px-6 md:px-12 items-center"
          style={{ width: 'max-content' }}
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ y: -10 }}
              className="relative w-[350px] md:w-[450px] p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] group overflow-hidden"
            >
              {/* Card HUD Elements */}
              <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1 opacity-20">
                  <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">TC: 00:0{idx}:12:00</span>
                  <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={6} fill="currentColor" className="text-zinc-400" />)}
                  </div>
              </div>

              <Quote className="text-zinc-100 dark:text-zinc-800 absolute -top-4 -left-4 w-32 h-32 -z-10 group-hover:text-zinc-200 dark:group-hover:text-zinc-800/50 transition-colors" />

              <div className="flex flex-col gap-8">
                <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 font-serif leading-relaxed italic relative z-10">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 border-t border-zinc-50 dark:border-zinc-800/50 pt-8">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-zinc-200 dark:border-zinc-800">
                    <img src={testimonial.avatar} alt={testimonial.clientName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">{testimonial.clientName}</span>
                    <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{testimonial.role}</span>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <Clock size={10} className="text-zinc-300" />
                        <span className="text-[8px] font-mono text-zinc-300 uppercase tracking-tighter">REF: {testimonial.projectRef}</span>
                    </div>
                    <div className="h-1 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                            animate={{ x: [-48, 48] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="w-1/2 h-full bg-zinc-400"
                        />
                    </div>
                </div>
              </div>

              {/* Cinematic Corner Accents */}
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-zinc-200 dark:border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}

          {/* Terminal Archive Link Card */}
          <div className="w-[300px] md:w-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-6 text-center opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-pointer group">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare size={24} className="text-zinc-400" />
                  </div>
                  <div>
                      <h4 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-900 dark:text-white">Join the Roster</h4>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-2">Start your production today</p>
                  </div>
              </div>
          </div>
        </div>
      </div>

      {/* Progress Bar for the Horizontal Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden hidden md:block">
          <motion.div 
            className="h-full bg-zinc-900 dark:bg-white origin-left"
            style={{ 
              scaleX: useTransform(
                useScroll({ target: containerRef }).scrollYProgress, 
                [0, 1], 
                [0, 1]
              ) 
            }}
          />
      </div>
    </section>
  );
};

export default Testimonials;
