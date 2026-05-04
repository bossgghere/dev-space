
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_DATA } from '../constants';
import { MessageCircle, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const socialCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Title & Email
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
        }
      });

      // Stagger Social Cards
      socialCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
          }
        });
      });

      // Footer reveal
      gsap.from(".footer-brand > *", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-brand",
          start: "top 98%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { name: 'Instagram', url: CONTACT_DATA.instagram, icon: Instagram, color: 'hover:bg-pink-50 dark:hover:bg-pink-900/10' },
    { name: 'LinkedIn', url: CONTACT_DATA.linkedin, icon: Linkedin, color: 'hover:bg-blue-50 dark:hover:bg-blue-900/10' },
    { name: 'WhatsApp', url: CONTACT_DATA.whatsapp, icon: MessageCircle, color: 'hover:bg-green-50 dark:hover:bg-green-900/10' },
  ];

  return (
    <div ref={containerRef} className="max-w-7xl w-full mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-center justify-center text-center transition-colors duration-500 overflow-hidden">
      <div ref={titleRef} className="mb-12 md:mb-24 w-full">
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] text-zinc-300 dark:text-zinc-700 mb-6 md:mb-8 block">Ready to sculpt?</span>
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white font-serif leading-[1.1] md:leading-none mb-8 md:mb-12">
          Get in <br className="hidden sm:block" /><span className="italic text-zinc-400 dark:text-zinc-600 font-normal">Touch</span>
        </h2>
        
        <div className="flex justify-center w-full px-4">
          <a 
            href={`mailto:${CONTACT_DATA.email}`}
            className="group relative inline-flex items-center gap-2 md:gap-4 text-sm sm:text-xl md:text-3xl font-medium text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors border-b border-zinc-100 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white pb-2 break-all sm:break-normal max-w-full text-center"
          >
            {CONTACT_DATA.email} 
            <ArrowUpRight size={20} className="shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Social Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl">
        {socials.map((social, idx) => (
          <a
            key={social.name}
            ref={el => socialCardsRef.current[idx] = el}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-4 p-5 md:p-8 rounded-2xl md:rounded-[3rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-all duration-500 group ${social.color} hover:-translate-y-2`}
          >
            <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl sm:bg-transparent sm:p-0 transition-colors">
              <social.icon size={24} className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors md:w-7 md:h-7" />
            </div>
            <div className="flex flex-col sm:items-center text-left sm:text-center">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">{social.name}</span>
              <span className="text-[9px] font-bold text-zinc-300 dark:text-zinc-700 uppercase tracking-tighter sm:hidden group-hover:text-zinc-400 dark:group-hover:text-zinc-500">Connect Now</span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="footer-brand mt-24 md:mt-40 pt-12 md:pt-16 border-t border-zinc-100 dark:border-zinc-900 w-full flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 dark:text-zinc-700 mb-2">Based In</p>
          <p className="text-xs font-bold text-zinc-900 dark:text-white">Odisha, India (IST)</p>
        </div>
        
        <div className="flex flex-col items-center gap-3 order-1 md:order-2">
            <div className="flex items-center gap-2">
                <span className="text-xs font-black text-zinc-900 dark:text-white tracking-tighter">DEV JENA</span>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse"></div>
            </div>
            <span className="text-[9px] font-bold text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.3em] whitespace-nowrap">© 2025 ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-right order-3 md:order-3">
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 dark:text-zinc-700 mb-2">Discord</p>
          <p className="text-xs font-bold text-zinc-900 dark:text-white">gamer__dev</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
