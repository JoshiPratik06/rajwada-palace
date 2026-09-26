import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0f1f3d] flex flex-col items-center justify-center">

      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />

      {/* Logo group */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        {/* Crown icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'backOut' }}
          className="mb-4"
        >
          <Crown size={42} className="text-[#c5a059]" strokeWidth={1.4} />
        </motion.div>

        {/* Hotel name */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="text-[#c5a059] text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "'Cinzel', 'Palatino Linotype', serif" }}
        >
          RAJWADA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-gray-400 text-[0.55rem] tracking-[0.5em] uppercase mt-1"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          PALACE HOTEL
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: 'easeInOut' }}
          className="mt-5 mb-7 w-24 h-px bg-gradient-to-r from-transparent via-[#c5a059] to-transparent origin-center"
        />

        {/* Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="relative w-10 h-10"
        >
          {/* Outer ring */}
          <span className="absolute inset-0 rounded-full border-2 border-[#c5a059]/20" />
          {/* Spinning arc */}
          <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c5a059] animate-spin" />
          {/* Inner dot */}
          <span className="absolute inset-[35%] rounded-full bg-[#c5a059] animate-pulse" />
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gray-500 text-[0.65rem] tracking-[0.3em] uppercase mt-5"
        >
          Loading your experience…
        </motion.p>
      </motion.div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
    </div>
  );
};

export default LoadingPage;
