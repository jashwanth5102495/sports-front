import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const DEFAULT_EMPTY_MESSAGE = 'Updates will be posted here. Check back soon for upcoming events and appearances.';

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(DEFAULT_EMPTY_MESSAGE);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScrolling(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    Promise.all([
      fetch(`${API_URL}/api/events`).then(res => res.json()),
      fetch(`${API_URL}/api/site-content`).then(res => res.json()),
    ])
      .then(([eventsData, contentData]) => {
        if (Array.isArray(eventsData)) {
          setEvents(eventsData);
        }
        if (Array.isArray(contentData)) {
          const msgEntry = contentData.find((item: any) => item.sectionKey === 'events_empty_message');
          if (msgEntry?.content) {
            setEmptyMessage(msgEntry.content);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="events" className="py-24 bg-[#05080D] relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex justify-between items-end"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white">
            Upcoming <span className="text-accent">Events</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="text-white text-center py-12">Loading events...</div>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16 px-8 border border-zinc-800 bg-zinc-900/50 rounded-xl"
          >
            <Calendar size={48} className="mx-auto text-zinc-600 mb-6" />
            <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
              {emptyMessage}
            </p>
          </motion.div>
        ) : (
          <div className="overflow-hidden relative">
            <div 
              className={`flex gap-8 w-max ${isScrolling ? 'animate-marquee' : ''} hover:pause-animation`}
            >
              {[...events, ...events].map((event, index) => (
                <motion.article
                  key={`${event.id || index}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % events.length) * 0.1, duration: 0.6 }}
                  className="group flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors w-[350px] shrink-0 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700">
                        <Calendar size={48} />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-accent text-zinc-950 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      UPCOMING EVENT
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm mb-3 font-medium tracking-wide">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-white uppercase mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-zinc-400 mb-6 line-clamp-3">
                      {event.description}
                    </p>
                    <button className="flex items-center gap-2 text-white hover:text-accent transition-colors uppercase tracking-wider text-sm font-semibold mt-auto">
                      Event Details <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-950 border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl flex flex-col relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-accent text-white p-2 rounded-full transition backdrop-blur-sm"
              >
                <X size={20} />
              </button>
              
              {selectedEvent.image && (
                <div className="w-full h-64 sm:h-80 relative">
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                </div>
              )}
              
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-accent text-zinc-950 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    UPCOMING EVENT
                  </span>
                  <span className="text-zinc-400 font-medium tracking-wide flex items-center gap-2">
                    <Calendar size={16} /> {selectedEvent.date}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase mb-6 leading-tight">
                  {selectedEvent.title}
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
