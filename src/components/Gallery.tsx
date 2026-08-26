import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { gallery as staticGallery } from '../data/gallery';

export default function Gallery() {
  const [gallery, setGallery] = useState<any[]>(staticGallery);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/images`)
      .then(res => res.json())
      .then(data => {
        // Map backend data to match the static gallery format
        const dynamicImages = data.map((img: any) => ({
          id: img.id,
          title: img.title || '',
          category: 'UPLOADED',
          url: img.base64Data
        }));
        setGallery([...dynamicImages, ...staticGallery]);
      })
      .catch(err => console.error("Error fetching images:", err));
  }, []);

  return (
    <section id="gallery" className="pb-24 bg-zinc-900">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4 text-white">
              HIGH<span className="text-accent">LIGHTS</span>
            </h2>
          </div>
        </motion.div>

        {gallery.length === 0 ? (
          <p className="text-white/50">No images uploaded yet. Please check back later.</p>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-zinc-950"
              >
                <img 
                  src={item.url} 
                  alt={item.title || 'Gallery Image'} 
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                />
                {item.category === 'UPLOADED' && item.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-display text-xl font-bold uppercase">{item.title}</h3>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}


      </div>
    </section>
  );
}
