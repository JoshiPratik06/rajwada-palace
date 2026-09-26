import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { usePageTitle } from '../hooks/index.js';
import { galleryData, galleryCategoryFilters } from '../data/index.js';
import { useLockBodyScroll } from '../hooks/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function Gallery() {
  usePageTitle('Gallery');

  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === 'all'
      ? galleryData
      : galleryData.filter((img) => img.category === activeCategory);

  const isOpen = lightboxIndex !== null;
  useLockBodyScroll(isOpen);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i >= filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, prev, next]);

  // Reset lightbox when category changes
  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  const currentImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="bg-[#fdfaf1] min-h-screen">
      {/* Hero */}
      <section className="relative h-[380px] bg-[#0f1f3d] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[#0f1f3d]/80" />
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c5a059] font-medium tracking-[0.3em] uppercase text-sm mb-4"
          >
            Visual Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-6xl font-bold text-white font-[Cinzel,serif] mb-4"
          >
            Gallery
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] w-24 bg-[#c5a059] mx-auto"
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-amber-100 sticky top-0 z-30 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {galleryCategoryFilters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? 'bg-[#c5a059] text-white border-[#c5a059] shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#c5a059] hover:text-[#c5a059]'
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-70">
                  {cat.id === 'all' ? galleryData.length : galleryData.filter((g) => g.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding container-custom">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-2 md:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            {filtered.map((img, idx) => (
              <motion.div
                key={img.id}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                  style={{ minHeight: '180px', display: 'block' }}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-semibold">{img.title}</p>
                    <div className="bg-[#c5a059] rounded-full p-1.5">
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>
                  <span className="text-gray-300 text-xs capitalize mt-0.5">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No images in this category yet.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && currentImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 z-10 bg-white/10 hover:bg-[#c5a059] text-white rounded-full p-2 transition-all duration-200"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 z-10 bg-white/10 hover:bg-[#c5a059] text-white rounded-full p-3 transition-all duration-200"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl max-h-[80vh] mx-16 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentImage.image}
                  alt={currentImage.title}
                  className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
                />
                <div className="mt-5 text-center">
                  <p className="text-white font-semibold text-xl">{currentImage.title}</p>
                  <p className="text-[#c5a059] text-sm capitalize mt-1">{currentImage.category}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {lightboxIndex + 1} / {filtered.length} &nbsp;·&nbsp; Press ← → to navigate, Esc to close
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 z-10 bg-white/10 hover:bg-[#c5a059] text-white rounded-full p-3 transition-all duration-200"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
              {filtered.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                  className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    idx === lightboxIndex ? 'border-[#c5a059] opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
