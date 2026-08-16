import { sponsors } from '../data/sponsors';

export default function Sponsors() {
  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-2">Powered By</h2>
          <h3 className="text-3xl font-display font-bold uppercase text-white">Great <span className="text-accent">Partners.</span></h3>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="w-32 md:w-48 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer">
              <img src={sponsor.logo} alt={sponsor.name} className="w-full h-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
