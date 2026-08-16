import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { statistics as defaultStatistics } from '../data/statistics';

type StatItem = { label: string; value: number | string };

function AnimatedCounter({ value }: { value: number | string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isNumber = typeof value === 'number';
  const numericValue = isNumber ? value : parseFloat(value as string);
  const suffix = !isNumber ? (value as string).replace(/[0-9.]/g, '') : '';

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = numericValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {isNumber ? Math.floor(count) : (count % 1 === 0 ? Math.floor(count) : count.toFixed(1))}{suffix}
    </span>
  );
}

export default function Statistics() {
  const [statistics, setStatistics] = useState<StatItem[]>(defaultStatistics);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/site-content`)
      .then(res => res.json())
      .then((data: any[]) => {
        const statsEntry = data.find(item => item.sectionKey === 'statistics');
        if (statsEntry?.content) {
          try {
            const parsed = JSON.parse(statsEntry.content);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setStatistics(parsed);
            }
          } catch {
            // keep defaults
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="statistics" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full filter blur-[150px]" />
      </div>

      <div className="w-full relative z-10 flex overflow-hidden">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap items-center"
        >
          {[...statistics, ...statistics].map((stat, index) => (
            <div
              key={index}
              className="inline-block text-center mx-16 md:mx-24 flex-shrink-0"
            >
              <h4 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                <AnimatedCounter value={stat.value} />
              </h4>
              <p className="text-zinc-500 uppercase tracking-widest text-sm md:text-base font-semibold">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
