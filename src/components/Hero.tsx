import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { player } from '../data/player';
import { MapPin, Target } from 'lucide-react';

const DEFAULT_HERO_STATS = [
  { label: 'CAREER POINTS', value: 368 },
  { label: 'CAREER GOALS', value: 171 },
  { label: 'CAREER ASSISTS', value: 197 },
  { label: 'ALL-AMERICAN', value: 2 },
  { label: 'NCAA NATIONAL CHAMPION', value: 1 },
  { label: 'BIG TEN CHAMPIONSHIPS', value: 3 },
];

const heroImages = [
  { src: '/1.webp', duration: 5000 },
  { src: '/01.webp', duration: 4000 },
  { src: '/2.webp', duration: 4000 },
  { src: '/3.webp', duration: 4000 },
  { src: '/4.webp', duration: 4000 }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroStats, setHeroStats] = useState(DEFAULT_HERO_STATS);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/site-content`)
      .then(res => res.json())
      .then((data: any[]) => {
        const statsEntry = data.find(item => item.sectionKey === 'hero_stats');
        if (statsEntry?.content) {
          try {
            const parsed = JSON.parse(statsEntry.content);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setHeroStats(parsed);
            }
          } catch {
            // keep defaults
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, heroImages[currentImageIndex].duration);

    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  return (
    <section id="home" className="relative min-h-[120dvh] lg:min-h-0 lg:h-screen w-full flex items-center overflow-x-hidden lg:overflow-hidden bg-[#05080D]">
      {/* BACKGROUND IMAGE SYSTEM */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="w-full h-full relative">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex].src}
              alt={player.name}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-[70%_center] lg:object-center lg:mix-blend-lighten"
            />
          </AnimatePresence>
          {/* Blend gradient from left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05080D]/95 via-[#05080D]/70 to-transparent z-10 pointer-events-none hidden lg:block" />
          {/* Subtle bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080D] via-[#05080D]/60 to-transparent z-10 pointer-events-none lg:opacity-80" />
        </div>
      </div>
      
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-1/4 -left-10 opacity-5 pointer-events-none z-10 font-display text-[35vw] leading-none font-bold text-white select-none hidden lg:block">
        02
      </div>
      
      {/* CONTENT */}
      <div className="container relative z-20 mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-24 pb-12 max-w-[1920px]">
        
        <div className="flex flex-col lg:flex-row h-full w-full justify-between items-end pb-8">
          
          {/* LEFT COMPOSITION */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="max-w-4xl flex-1 flex flex-col justify-center h-full pt-[45vh] lg:pt-0 relative"
          >

            
            {/* Giant Typography */}
            <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} className="relative mb-6 mt-10 lg:mt-20">
              <h1 className="text-[clamp(2.8rem,8vw,9.5rem)] leading-[0.82] font-display font-bold text-white uppercase tracking-tighter flex flex-col drop-shadow-2xl">
                <span className="relative z-10">ERIN</span>
                <span className="relative z-10">COYKENDALL</span>
              </h1>
            </motion.div>

            {/* Role & Bio */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-10 max-w-[440px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg md:text-xl font-display uppercase tracking-[0.2em] text-white font-bold">ATTACKER</span>
                <span className="text-accent">•</span>
                <span className="text-lg md:text-xl font-display uppercase tracking-[0.2em] text-accent font-bold">#2</span>
              </div>
              <p className="text-[#AEB5C0] text-sm md:text-sm leading-relaxed font-sans">
                Driven by passion. Defined by purpose.<br/>
                Competing at the highest level and inspiring<br/>
                the next generation.
              </p>
            </motion.div>
            
            {/* Actions */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-4 mb-10 lg:mb-0">
              <a href="#career" className="px-10 py-[18px] bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.15em] transition-all duration-300 text-xs text-center w-[220px]">
                VIEW CAREER
              </a>
              <a href="#achievements" className="px-10 py-[18px] bg-transparent border border-white/20 hover:border-white text-white font-bold uppercase tracking-[0.15em] transition-all duration-300 text-xs text-center w-[220px]">
                ACHIEVEMENTS
              </a>
            </motion.div>

            {/* Info Cards (Bottom Left) */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-5 mt-auto pb-4">
              {/* Snapshot Card */}
              <div className="bg-[#05080D]/40 backdrop-blur-md border border-white/10 rounded-[4px] p-5 min-w-[200px]">
                <h3 className="text-accent text-[10px] uppercase font-bold tracking-[0.2em] mb-4">Player Snapshot</h3>
                <ul className="space-y-4 text-[11px] text-white/90 font-bold tracking-[0.1em] uppercase">
                  <li className="flex items-center gap-3"><Target size={14} className="text-white/50" /> ATTACKER</li>
                  <li className="flex items-center gap-3"><span className="text-white/50 text-base leading-none w-[14px] flex justify-center">#</span> 2</li>
                  <li className="flex items-center gap-3"><MapPin size={14} className="text-white/50" /> NEW YORK</li>
                  <li className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 border border-white/50 rounded-full flex items-center justify-center text-[7px] text-white/50">P</span> 
                    PRO ATHLETE
                  </li>
                </ul>
              </div>

              {/* Career Stats Card */}
              <div className="bg-[#05080D]/40 backdrop-blur-md border border-white/10 rounded-[4px] p-5 min-w-[260px] sm:min-w-[320px]">
                <h3 className="text-accent text-[10px] uppercase font-bold tracking-[0.2em] mb-4">Career Stats</h3>
                <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                  {heroStats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-[28px] font-display font-bold text-white leading-none mb-1.5">{stat.value}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#AEB5C0]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT COMPOSITION (QUOTE) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="hidden lg:block max-w-[400px] mb-12 mr-8 relative z-20"
          >
            <div className="text-6xl font-display text-white/40 absolute -top-10 -left-6 leading-none">“</div>
            <h3 className="text-lg md:text-xl font-sans italic font-medium text-white leading-relaxed mb-4 drop-shadow-xl relative z-10">
              She's definitely, without a doubt, the smartest lacrosse player we've ever had here. She's a coach on the field... She sees things most people don't see.
            </h3>
            <p className="text-accent font-bold text-sm tracking-widest uppercase drop-shadow-md">— Scott Hiller</p>
            <p className="text-white/60 text-xs mt-1">Assistant Coach, Northwestern Lacrosse</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
