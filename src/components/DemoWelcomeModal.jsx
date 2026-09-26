import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  Mail,
  Copy,
  Check,
  X,
  ExternalLink,
  Info,
  ArrowRight,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function DemoWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the alert during this session
    const hasSeen = sessionStorage.getItem('joshiwada_demo_alert_seen');
    if (!hasSeen) {
      // Small timeout for smooth initial page entrance
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('joshiwada_demo_alert_seen', 'true');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pratikjoshi0068@gmail.com');
    setCopied(true);
    toast.success('Email copied: pratikjoshi0068@gmail.com');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Floating Demo Info Reopen Button (bottom-left) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-[#0f1f3d]/90 hover:bg-[#0f1f3d] text-white px-3.5 py-2 rounded-full border border-[#c5a059]/40 shadow-xl backdrop-blur-md transition-all text-xs font-medium cursor-pointer group"
        title="View Project Demo Notice by Pratik Joshi"
      >
        <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
        <span className="text-[#c5a059] font-semibold">Demo Notice</span>
        <span className="text-gray-400 group-hover:text-white transition-colors">Pratik Joshi</span>
      </motion.button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleDismiss}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#fdfaf1] rounded-3xl shadow-2xl border border-[#c5a059]/30 overflow-hidden z-10 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Royal Top Accent Bar */}
              <div className="h-2 bg-gradient-to-r from-[#0f1f3d] via-[#c5a059] to-[#0f1f3d]" />

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-700 flex items-center justify-center transition-all shadow-sm border border-gray-200 cursor-pointer"
                aria-label="Close alert"
              >
                <X size={18} />
              </button>

              <div className="p-6 sm:p-8">
                {/* Header Badge & Title */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c5a059] to-[#9a7b38] flex items-center justify-center text-white shadow-lg shadow-[#c5a059]/30 mb-3 border border-white/40">
                    <Sparkles size={26} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[3px] text-[#c5a059] mb-1">
                    Portfolio Project Showcase
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#0f1f3d] leading-tight"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Welcome to JoshiWada Palace
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    A Demo Project by <strong className="text-[#0f1f3d] font-semibold">Pratik Joshi</strong>
                  </p>
                </div>

                {/* Information Sections */}
                <div className="space-y-3.5 mb-6 text-sm">
                  {/* Item 1: Demo Notice */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#c5a059]/20 shadow-xs">
                    <div className="p-2 rounded-xl bg-[#c5a059]/10 text-[#c5a059] shrink-0 mt-0.5">
                      <Info size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f1f3d] text-sm mb-0.5">Demo Project Notice</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        This website is an interactive demo of <strong>Pratik Joshi&apos;s</strong> portfolio project, designed with a royal luxury hotel and dining theme.
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Safe Local Storage */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#c5a059]/20 shadow-xs">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f1f3d] text-sm mb-0.5">Local Storage Only</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        If you log in, sign up, book a room, or order food, all your data is stored locally in <strong>your browser system</strong>. Nothing is shared with external servers.
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Feedback & Email */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#c5a059]/20 shadow-xs">
                    <div className="p-2 rounded-xl bg-[#0f1f3d]/10 text-[#0f1f3d] shrink-0 mt-0.5">
                      <Mail size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#0f1f3d] text-sm mb-0.5">Feedback & Reviews</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2">
                        Please explore this user-friendly website and share your valuable reviews with me:
                      </p>
                      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-gray-50 border border-gray-200">
                        <span className="text-xs font-semibold text-[#0f1f3d] truncate">
                          pratikjoshi0068@gmail.com
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-gray-300 hover:border-[#c5a059] text-gray-700 hover:text-[#c5a059] transition-all flex items-center gap-1 cursor-pointer"
                          >
                            {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                            <span>{copied ? 'Copied' : 'Copy'}</span>
                          </button>
                          <a
                            href="mailto:pratikjoshi0068@gmail.com?subject=Feedback%20for%20JoshiWada%20Hotel%20Project"
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#0f1f3d] text-white hover:bg-[#1a3260] transition-all flex items-center gap-1"
                          >
                            <ExternalLink size={12} />
                            <span>Mail</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thank You Note */}
                <div className="text-center pt-1 pb-4">
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    Appreciate your visit to my website. Feel free to explore! <Heart size={12} className="text-red-500 fill-red-500 inline" />
                  </p>
                  <p
                    className="text-base font-bold text-[#0f1f3d] mt-1 tracking-wider"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Thank You, Pratik Joshi
                  </p>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full btn-primary py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a059]/25 hover:shadow-xl hover:shadow-[#c5a059]/35 transition-all"
                >
                  <span>Explore Website</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
