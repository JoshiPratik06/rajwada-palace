import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, BedDouble } from 'lucide-react';
import { usePageTitle } from '../hooks/index.js';

export default function NotFound() {
  usePageTitle('404 — Page Not Found');

  return (
    <div className="min-h-screen bg-[#0f1f3d] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/4 left-1/4 w-72 h-72 border border-[#c5a059]/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-[#c5a059]/5 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(197,160,89,0.05) 0%, transparent 70%)' }}
      />

      {/* Scattered gold dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#c5a059]/30"
          style={{
            top: `${10 + (i * 7) % 80}%`,
            left: `${5 + (i * 13) % 90}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'backOut' }}
        >
          <h1
            className="text-[180px] md:text-[220px] font-bold leading-none select-none"
            style={{
              fontFamily: 'Cinzel, serif',
              color: 'transparent',
              WebkitTextStroke: '2px #c5a059',
              textShadow: '0 0 60px rgba(197,160,89,0.2)',
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-[2px] w-24 bg-[#c5a059] mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white font-[Cinzel,serif] mb-4"
        >
          Page Not Found
        </motion.h2>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-gray-400 text-lg mb-3 max-w-md mx-auto"
        >
          The page you are looking for seems to have checked out.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-gray-500 text-sm mb-10"
        >
          It may have been moved, deleted, or perhaps never existed. Let's guide you back.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home size={18} /> Back to Home
          </Link>
          <Link
            to="/rooms"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <BedDouble size={18} /> Browse Rooms
          </Link>
        </motion.div>

        {/* Hotel Name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 text-[#c5a059]/50 text-xs tracking-[0.4em] uppercase font-[Cinzel,serif]"
        >
          Rajwada Palace Hotel · Indore
        </motion.p>
      </div>
    </div>
  );
}
