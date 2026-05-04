
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { X, Mail, Phone, MapPin, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuBgRef = useRef<SVGPathElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const infoRef = useRef<HTMLDivElement>(null);

  const svgWidth = 1131;
  const svgHeight = 861;
  const centerX = svgWidth / 2;

  const OPEN_HIDDEN = `M${svgWidth},0 Q${centerX},0 0,0 L0,0 L${svgWidth},0 Z`;
  const OPEN_BULGE = `M${svgWidth},345 Q${centerX},620 0,345 L0,0 L${svgWidth},0 Z`;
  const OPEN_FULL = `M${svgWidth},${svgHeight} Q${centerX},${svgHeight} 0,${svgHeight} L0,0 L${svgWidth},0 Z`;
  const CLOSE_START = `M${svgWidth},0 Q${centerX},0 0,0 L0,${svgHeight} L${svgWidth},${svgHeight} Z`;
  const CLOSE_BULGE = `M${svgWidth},350 Q${centerX},130 0,350 L0,${svgHeight} L${svgWidth},${svgHeight} Z`;
  const CLOSE_HIDDEN = `M${svgWidth},${svgHeight} Q${centerX},${svgHeight} 0,${svgHeight} L0,${svgHeight} L${svgWidth},${svgHeight} Z`;

  useEffect(() => {
    if (menuBgRef.current) {
      gsap.set(menuBgRef.current, { attr: { d: OPEN_HIDDEN } });
    }
  }, []);

  const toggleMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (!isOpen) {
      setIsOpen(true);
      openAnimation();
    } else {
      closeAnimation();
    }
  };

  const openAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    tl.to(menuBgRef.current, {
      duration: 0.5,
      attr: { d: OPEN_BULGE },
      ease: "power4.in",
    }).to(menuBgRef.current, {
      duration: 0.5,
      attr: { d: OPEN_FULL },
      ease: "power4.out"
    });

    // Animate Links
    linksRef.current.forEach((link, i) => {
      if (!link) return;
      const chars = link.querySelectorAll('.menu-char');
      tl.to(chars, {
        duration: 1.2,
        x: "0%",
        opacity: 1,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.01
      }, 0.4 + i * 0.05);
    });

    // Animate Info
    if (infoRef.current) {
        tl.to(infoRef.current.children, {
            duration: 0.75,
            opacity: 1,
            y: 0,
            ease: "power3.out",
            stagger: 0.1
        }, "-=0.5");
    }
  };

  const closeAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        setIsAnimating(false);
        // Reset states for next open
        gsap.set(menuBgRef.current, { attr: { d: OPEN_HIDDEN } });
        gsap.set(linksRef.current, { opacity: 1, y: 0 });
        if (infoRef.current) {
            gsap.set(infoRef.current.children, { opacity: 0, y: 32 });
        }
        linksRef.current.forEach(link => {
            if (link) {
                gsap.set(link.querySelectorAll('.menu-char'), { 
                    x: "500%", 
                    opacity: 0 
                });
            }
        });
      }
    });

    gsap.set(menuBgRef.current, { attr: { d: CLOSE_START } });

    tl.to([linksRef.current, infoRef.current], {
      duration: 0.4,
      opacity: 0,
      y: 40,
      ease: "power2.in"
    });

    tl.to(menuBgRef.current, {
      duration: 0.5,
      attr: { d: CLOSE_BULGE },
      ease: "power3.in"
    }).to(menuBgRef.current, {
      duration: 0.5,
      attr: { d: CLOSE_HIDDEN },
      ease: "power3.out"
    }, "-=0.1");
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Work', href: '#work' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Director Notes', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="menu-char inline-block translate-x-[500%] opacity-0 pointer-events-none">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeAnimation();
    const element = document.querySelector(href);
    if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
        }, 600);
    }
  };

  return (
    <>
      {/* Nav Toggle Button */}
      <button 
        onClick={toggleMenu}
        className="fixed top-8 left-8 z-[600] flex items-center gap-3 px-6 py-4 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl group transition-all active:scale-95"
      >
        <div className="relative w-4 h-4">
            <motion.div 
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="absolute top-0 left-0 w-full h-[1.5px] bg-zinc-900 dark:bg-white"
            />
            <motion.div 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="absolute top-[7px] left-0 w-full h-[1.5px] bg-zinc-900 dark:bg-white"
            />
            <motion.div 
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zinc-900 dark:bg-white"
            />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-white">
          {isOpen ? 'Close' : 'Index'}
        </span>
      </button>

      {/* Menu Overlay */}
      <div 
        ref={menuRef}
        className={`fixed inset-0 z-[550] flex flex-col md:flex-row pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-[-1]"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={menuBgRef}
            fill="currentColor"
            className="text-zinc-50 dark:text-zinc-900"
            d={OPEN_HIDDEN}
          />
        </svg>

        <div className={`relative flex flex-col md:flex-row w-full h-full p-8 md:p-24 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Left Col: Info */}
            <div ref={infoRef} className="flex-1 flex flex-col justify-end gap-12 md:pb-12">
                <div className="space-y-4 opacity-0 translate-y-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Collaborate</p>
                    <h3 className="text-2xl md:text-4xl font-serif italic text-zinc-900 dark:text-white">{CONTACT_DATA.email}</h3>
                    <h3 className="text-xl md:text-2xl font-mono text-zinc-500">{CONTACT_DATA.phone}</h3>
                </div>

                <div className="flex gap-6 opacity-0 translate-y-8">
                    <a href={CONTACT_DATA.instagram} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        <Instagram size={20} />
                    </a>
                    <a href={CONTACT_DATA.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href={CONTACT_DATA.whatsapp} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        <MessageCircle size={20} />
                    </a>
                </div>

                <div className="space-y-1 opacity-0 translate-y-8">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">Odisha, India</h6>
                    <p className="text-[9px] text-zinc-400 font-mono tracking-tighter">Availability: Q2 2025</p>
                </div>
            </div>

            {/* Right Col: Links */}
            <div className="flex-[1.5] flex flex-col justify-end md:items-end gap-4">
                {navLinks.map((link, i) => (
                    <a 
                        key={link.label}
                        ref={el => linksRef.current[i] = el}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="group text-5xl md:text-8xl font-serif font-bold italic tracking-tighter text-zinc-900 dark:text-white leading-none hover:text-zinc-400 dark:hover:text-zinc-500 transition-colors flex items-center gap-4"
                    >
                        <span className="text-xs font-mono font-normal not-italic text-zinc-300 dark:text-zinc-700 mt-4">0{i+1}</span>
                        <div className="overflow-hidden flex">
                            {splitText(link.label)}
                        </div>
                    </a>
                ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
