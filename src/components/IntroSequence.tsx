import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const totalFrames = 224;
  const fps = 30;
  const frameDuration = 1000 / fps;

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = () => {
      let loadedCount = 0;
      let hasStarted = false;
      const imgs: HTMLImageElement[] = [];

      for (let i = 1; i <= totalFrames; i++) {
        const frameNumber = i.toString().padStart(5, '0');
        const src = `/frames/frame_${frameNumber}.webp`;
        
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalFrames) * 100));
          
          // Start playback after a small buffer to make loading near-instant
          if (loadedCount > 15 && !hasStarted) {
            hasStarted = true;
            setIsLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalFrames) * 100));
        };
        img.src = src;
        imgs.push(img);
      }
      setImages(imgs);
    };

    loadImages();
  }, []);

  // Playback loop
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentFrame = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    // Set canvas dimensions to match window or first image
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawFrame = (time: number) => {
      if (currentFrame >= images.length) {
        // Finished playing
        setTimeout(() => onComplete(), 500);
        return;
      }

      const deltaTime = time - lastTime;

      if (deltaTime >= frameDuration) {
        const img = images[currentFrame];
        
        // Only progress if the next frame has finished downloading
        if (img && img.complete) {
          ctx.fillStyle = '#09090b'; // zinc-950
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width / 2) - (img.width / 2) * scale;
          const y = (canvas.height / 2) - (img.height / 2) * scale;
          
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          
          currentFrame++;
        }
        
        lastTime = time;
      }

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    animationFrameId = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isLoaded, images, onComplete]);

  return (
    <div className="fixed inset-0 bg-zinc-950 z-[9999] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute flex flex-col items-center justify-center z-10"
          >
            <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4 relative">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-zinc-500 text-xs font-display uppercase tracking-widest">
              Loading Experience {progress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <canvas 
        ref={canvasRef} 
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
