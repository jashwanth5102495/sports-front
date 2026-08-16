import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { career } from '../data/career';

const DEFAULT_JOURNEY = "From the time she picked up a lacrosse stick at just 3 years old, Erin's passion for the game was clear. She progressed through youth, club, and high school lacrosse, ultimately becoming one of the most accomplished players in Northwestern University's history. Erin continued pursuing her dream at the professional level, competing in both the AU Pro Lacrosse League and the Women's Lacrosse League, inspiring the next generation of players through her dedication, talent, and love for the game.";

export default function CareerTimeline() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [journeyDesc, setJourneyDesc] = useState(DEFAULT_JOURNEY);

  useEffect(() => {
    fetch(`${API_URL}/api/site-content`)
      .then(res => res.json())
      .then((data: any[]) => {
        const item = data.find((d: any) => d.sectionKey === 'journey_description');
        if (item) setJourneyDesc(item.content);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="career" className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4 text-white">
            The <span className="text-accent">Journey</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl">{journeyDesc}</p>
        </motion.div>

        <div className="relative border-l border-zinc-700 ml-4 md:ml-0 md:border-none">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-zinc-700" />
          
          <div className="space-y-12 md:space-y-24">
            {career.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image and Timeline Dot Container */}
                <div className="absolute -left-[21px] md:static md:w-1/2 flex items-center justify-center z-10 md:transform-none">
                  
                  {/* The Timeline Dot (Absolute in the center on desktop) */}
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border-2 border-accent flex items-center justify-center relative md:absolute md:left-1/2 md:-translate-x-1/2 z-20">
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  </div>

                  {/* The Image (Hidden on mobile) */}
                  <div className={`hidden md:block w-full ${index % 2 === 0 ? 'pl-16' : 'pr-16'}`}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className={`w-full h-[280px] object-cover ${item.position || 'object-center'} rounded-xl border border-zinc-800 shadow-2xl transition-transform duration-500 hover:scale-[1.02]`}
                    />
                  </div>
                </div>

                {/* Text Box Container */}
                <div className="pl-8 md:pl-0 md:w-1/2 w-full pt-2 md:pt-0">
                  <div className={`bg-zinc-950 p-8 border border-zinc-800 hover:border-zinc-700 transition-colors ${index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}`}>
                    <span className="text-accent font-display text-xl md:text-2xl font-bold tracking-wider mb-2 block">{item.year}</span>
                    <h3 className="text-2xl font-display font-bold text-white uppercase mb-1">{item.title}</h3>
                    <p className="text-zinc-500 text-sm uppercase tracking-wider mb-4">{item.team} • {item.competition}</p>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

