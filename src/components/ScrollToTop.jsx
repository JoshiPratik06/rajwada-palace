import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollTop } from '../hooks/index.js';

const ScrollToTop = () => {
  const { visible, scrollToTop } = useScrollTop();

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-5 sm:bottom-8 sm:right-6 z-40 w-11 h-11 rounded-full bg-[#c5a059] text-white shadow-lg shadow-[#c5a05960] flex items-center justify-center cursor-pointer border-2 border-[#b08d45] hover:bg-[#b08d45] transition-colors duration-200"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
