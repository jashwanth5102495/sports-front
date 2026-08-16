import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data/achievements';

export default function Achievements() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${API_URL}/api/site-content`)
      .then(res => res.json())
      .then((data: any[]) => {
        const map: Record<string, string> = {};
        data.forEach((item: any) => { map[item.sectionKey] = item.content; });
        setContent(map);
      })
      .catch(() => {});
  }, []);

  const sectionDesc = content['achievements_description'] || 'A testament to excellence and consistent performance at the highest level of the sport.';
  const featuredYear = content['featured_year'] || '2026';
  const featuredTitle = content['featured_title'] || 'Championship Series Winner';
  const featuredDesc = content['featured_description'] || 'Won the prestigious 2026 Championship series.';

  return (
    <section id="achievements" className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4 text-white">
              <span className="text-accent">Achievements</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl">{sectionDesc}</p>
          </div>
        </motion.div>

        {/* Featured Achievement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative overflow-hidden group border border-zinc-800 bg-zinc-950 flex flex-col lg:flex-row"
        >
          <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto">
            <img 
              src="/ac.webp" 
              alt={`${featuredYear} ${featuredTitle}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-accent font-display text-2xl font-bold mb-4 block">{featuredYear}</span>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-6 leading-tight">
              {featuredTitle}
            </h3>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
              {featuredDesc}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group bg-zinc-950 p-8 border border-zinc-800 hover:border-accent transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <Icon size={120} />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-zinc-900 text-accent flex items-center justify-center rounded-lg mb-6 border border-zinc-800 group-hover:border-accent transition-colors">
                    <Icon size={24} />
                  </div>
                  <span className="text-accent font-display text-xl font-bold mb-2 block">{item.year}</span>
                  <h3 className="text-2xl font-display font-bold text-white uppercase mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-4 font-semibold">{item.competition}</p>
                  <p className="text-zinc-400 mt-auto">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

