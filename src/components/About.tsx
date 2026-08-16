import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { player } from '../data/player';

export default function About() {
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

  const bio = content['about_bio'] || player.bio;
  const playingStyle = content['about_playingStyle'] || player.playingStyle;
  const highSchool = content['about_highSchool'] || player.highSchool;
  const personal = content['about_personal'] || player.personal;

  return (
    <section id="about" className="py-24 bg-zinc-950 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <img src="/gal/wa_img_31.webp" alt="About Erin" className="w-full h-full object-cover rounded-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase leading-none mb-8">
              Built Through <br />
              <span className="text-accent">Discipline.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-zinc-400 mb-12">
              <p>{bio}</p>
              <p>{playingStyle}</p>

              <div className="mt-8 border-t border-white/10 pt-6">
                <h3 className="text-white font-display font-bold uppercase tracking-wider mb-2 text-xl">High School Highlights</h3>
                <p className="text-base leading-relaxed text-zinc-400">{highSchool}</p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <h3 className="text-white font-display font-bold uppercase tracking-wider mb-2 text-xl">Personal Background</h3>
                <p className="text-base leading-relaxed text-zinc-400">{personal}</p>
              </div>
            </div>

            {/* Info Panel */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Full Name</p>
                <p className="font-semibold text-white uppercase">{player.name}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Position</p>
                <p className="font-semibold text-white uppercase">{player.position}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Current Team</p>
                <p className="font-semibold text-accent uppercase">{player.currentTeam}</p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

