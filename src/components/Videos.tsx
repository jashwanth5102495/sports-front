import { motion } from 'framer-motion';
import { Play, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { videos as staticVideos } from '../data/videos';
import { getYouTubeId } from '../utils/youtube';

export default function Videos() {
  const [videoList, setVideoList] = useState<any[]>([]);
  const [playingId, setPlayingId] = useState<string | number | null>(null);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/videos`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setVideoList(data);
        } else {
          setVideoList(staticVideos);
        }
      })
      .catch(() => {
        setVideoList(staticVideos);
      });
  }, []);

  if (videoList.length === 0) return null;

  // Filter unique videos by youtubeUrl to prevent duplicate display in the UI
  const uniqueVideos: any[] = [];
  const seenUrls = new Set<string>();
  for (const video of videoList) {
    const url = (video.youtubeUrl || '').trim().toLowerCase();
    if (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      uniqueVideos.push(video);
    }
  }

  const listToRender = uniqueVideos.length > 0 ? uniqueVideos : videoList;
  const featuredVideo = listToRender.find(v => v.featured) || listToRender[0];
  const otherVideos = listToRender.filter(v => v.id !== featuredVideo.id);

  const getThumbnail = (video: any) => {
    if (video.thumbnail) return video.thumbnail;
    const ytId = getYouTubeId(video.youtubeUrl || '');
    if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    return 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200';
  };

  const renderVideoPlayer = (video: any, isLarge = false) => {
    const ytUrl = video.youtubeUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const ytId = getYouTubeId(ytUrl);
    const isPlaying = playingId === video.id;

    if (isPlaying && ytId) {
      return (
        <div className="w-full h-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
            title={video.title}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <div 
        onClick={() => setPlayingId(video.id)}
        className="w-full h-full aspect-video relative overflow-hidden bg-zinc-950 flex items-center justify-center cursor-pointer"
      >
        <img 
          src={getThumbnail(video)} 
          alt={video.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${isLarge ? 'w-20 h-20 pl-2' : 'w-12 h-12 pl-1'} bg-accent rounded-full flex items-center justify-center text-zinc-950 group-hover:scale-110 transition-transform duration-300`}>
            <Play size={isLarge ? 32 : 20} />
          </div>
        </div>
        {isLarge && (
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-zinc-950 to-transparent">
            {video.duration && <span className="text-accent font-semibold tracking-wider text-sm mb-2 block">{video.duration}</span>}
            <h3 className="text-3xl font-display font-bold text-white uppercase">{video.title}</h3>
          </div>
        )}
        {!isLarge && video.duration && (
          <div className="absolute bottom-2 right-2 bg-zinc-950/80 px-2 py-1 text-xs text-white font-medium z-10">
            {video.duration}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="pb-24 bg-zinc-900">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4 text-white">
            Watch The <span className="text-accent">Action</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative group border border-zinc-800"
          >
            {renderVideoPlayer(featuredVideo, true)}
          </motion.div>

          {/* Other Videos */}
          <div className="flex flex-col gap-8">
            {otherVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex flex-col sm:flex-row lg:flex-col gap-4 border border-zinc-800 p-4 bg-zinc-950 hover:border-zinc-600 transition-colors h-full"
              >
                <div className="relative aspect-video sm:w-1/2 lg:w-full overflow-hidden shrink-0">
                  {renderVideoPlayer(video, false)}
                </div>
                <div className="flex-1 flex items-center lg:items-start lg:pt-2">
                  <h4 className="text-lg font-display font-bold text-white uppercase group-hover:text-accent transition-colors leading-tight">
                    {video.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Admin Link Button */}
        <div className="mt-16 flex justify-start">
          <a 
            href="/admin" 
            className="flex items-center gap-2 text-zinc-600 hover:text-accent transition-colors text-xs font-semibold uppercase tracking-widest group border border-zinc-800/40 hover:border-accent/30 px-3 py-1.5 rounded bg-zinc-950/20"
            title="Admin Login"
          >
            <Lock size={12} className="group-hover:rotate-12 transition-transform" />
            <span>Admin Portal</span>
          </a>
        </div>
      </div>
    </section>
  );
}
