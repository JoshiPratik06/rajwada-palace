import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '912025501234';
const PRESET_MESSAGE = encodeURIComponent(
  'Hello! I am interested in booking a room at JoshiWada Palace Hotel, Pune. Could you please assist me?'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${PRESET_MESSAGE}`;

const WhatsAppCTA = () => {
  return (
    <div className="fixed bottom-6 left-5 sm:left-6 z-40" aria-label="Chat on WhatsApp">
      {/* Ripple / pulse rings */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping pointer-events-none" />
      <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping [animation-delay:0.4s] pointer-events-none" />

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.12, rotate: 8 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, scale: 0, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.2 }}
        className="relative w-13 h-13 w-[3.25rem] h-[3.25rem] rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/40 flex items-center justify-center transition-colors duration-200"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={2} fill="white" stroke="white" />
      </motion.a>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.4 }}
        className="absolute left-[3.75rem] top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0f1f3d] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow pointer-events-none hidden sm:block"
      >
        Chat with us
        <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-r-[6px] border-t-transparent border-b-transparent border-r-[#0f1f3d]" />
      </motion.div>
    </div>
  );
};

export default WhatsAppCTA;
