import { motion } from 'framer-motion';
import { teams } from '../data/teams';

export default function Teams() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4 text-white">
            Clubs & <span className="text-accent">Teams</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {teams.map((team, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`flex flex-col md:flex-row gap-6 p-6 border ${team.current ? 'border-accent bg-zinc-900/50' : 'border-zinc-800 bg-zinc-950'} items-center md:items-start transition-colors hover:bg-zinc-900 group`}
            >
              <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-zinc-700 group-hover:border-accent transition-colors">
                <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-2xl font-display font-bold text-white uppercase">{team.name}</h3>
                  <span className="text-accent font-display text-lg tracking-wider">{team.years}</span>
                </div>
                <p className="text-zinc-300 font-semibold mb-3 uppercase tracking-wide text-sm">{team.role}</p>
                <p className="text-zinc-400">{team.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
