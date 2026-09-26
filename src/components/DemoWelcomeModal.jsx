import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    const hasSeen = sessionStorage.getItem('rajwada_demo_alert_seen');
    if (!hasSeen) {
      // Hide navbar and lock scroll immediately
      document.body.classList.add('demo-modal-open');
      document.documentElement.classList.add('demo-modal-open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.dispatchEvent(
        new CustomEvent('rajwada_demo_state_change', { detail: { isOpen: true } })
      );

      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, []);

  // Sync scroll lock and navbar hidden state whenever isOpen changes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('demo-modal-open');
      document.documentElement.classList.add('demo-modal-open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.dispatchEvent(
        new CustomEvent('rajwada_demo_state_change', { detail: { isOpen: true } })
      );
    } else {
      document.body.classList.remove('demo-modal-open');
      document.documentElement.classList.remove('demo-modal-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.dispatchEvent(
        new CustomEvent('rajwada_demo_state_change', { detail: { isOpen: false } })
      );
    }

    return () => {
      document.body.classList.remove('demo-modal-open');
      document.documentElement.classList.remove('demo-modal-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.dispatchEvent(
        new CustomEvent('rajwada_demo_state_change', { detail: { isOpen: false } })
      );
    };
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('rajwada_demo_alert_seen', 'true');
    document.body.classList.remove('demo-modal-open');
    document.documentElement.classList.remove('demo-modal-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    window.dispatchEvent(
      new CustomEvent('rajwada_demo_state_change', { detail: { isOpen: false } })
    );
  };

  const handleOpen = () => {
    setIsOpen(true);
    document.body.classList.add('demo-modal-open');
    document.documentElement.classList.add('demo-modal-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.dispatchEvent(
      new CustomEvent('rajwada_demo_state_change', { detail: { isOpen: true } })
    );
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
        onClick={handleOpen}
        style={{ zIndex: 9999 }}
        className="fixed bottom-6 left-6 flex items-center gap-2 bg-[#0f1f3d]/95 hover:bg-[#0f1f3d] text-white px-3.5 py-2 rounded-full border border-[#c5a059]/40 shadow-2xl backdrop-blur-md transition-all text-xs font-medium cursor-pointer group"
        title="View Project Demo Notice by Pratik Joshi"
      >
        <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
        <span className="text-[#c5a059] font-semibold">Demo Notice</span>
        <span className="text-gray-300 group-hover:text-white transition-colors">Pratik Joshi</span>
      </motion.button>

      {/* Modal Dialog rendered directly into document.body to escape any parent stacking context */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
                style={{ zIndex: 9999999 }}
              >
                {/* Backdrop Blur & Dark Overlay (fully covers entire screen) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={handleDismiss}
                  className="fixed inset-0"
                  style={{
                    zIndex: 9999998,
                    backgroundColor: 'rgba(5, 11, 23, 0.92)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                />

                {/* Modal Card - Fully Centered, height constrained to viewport */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.93, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: 15 }}
                  transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                  className="relative w-full max-w-md sm:max-w-lg bg-[#fdfaf1] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#c5a059]/40 overflow-hidden my-auto flex flex-col"
                  style={{
                    zIndex: 9999999,
                    maxHeight: 'min(88vh, 620px)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Royal Top Accent Bar */}
                  <div className="h-1.5 bg-gradient-to-r from-[#0f1f3d] via-[#c5a059] to-[#0f1f3d] shrink-0" />

                  {/* Close Button */}
                  <button
                    onClick={handleDismiss}
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center transition-all shadow-sm border border-gray-200 cursor-pointer z-20"
                    aria-label="Close alert"
                  >
                    <X size={16} />
                  </button>

                  {/* Scrollable Container inside Card */}
                  <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col">
                    {/* Header Badge & Title */}
                    <div className="flex flex-col items-center text-center mb-3 sm:mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#c5a059] to-[#9a7b38] flex items-center justify-center text-white shadow-md shadow-[#c5a059]/30 mb-2 border border-white/40">
                        <Sparkles size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#c5a059] mb-0.5">
                        Portfolio Project Showcase
                      </span>
                      <h2
                        className="text-xl sm:text-2xl font-bold text-[#0f1f3d] leading-tight"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        Welcome to Rajwada Palace
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        A Demo Project by <strong className="text-[#0f1f3d] font-semibold">Pratik Joshi</strong>
                      </p>
                    </div>

                    {/* Information Sections */}
                    <div className="space-y-2.5 mb-3 sm:mb-4 text-sm">
                      {/* Item 1: Demo Notice */}
                      <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-[#c5a059]/20 shadow-xs">
                        <div className="p-1.5 rounded-xl bg-[#c5a059]/10 text-[#c5a059] shrink-0 mt-0.5">
                          <Info size={16} />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0f1f3d] text-xs sm:text-sm mb-0.5">Demo Project Notice</h3>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            This website is an interactive demo of <strong>Pratik Joshi&apos;s</strong> portfolio project, designed with a royal luxury hotel and dining theme.
                          </p>
                        </div>
                      </div>

                      {/* Item 2: Safe Local Storage */}
                      <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-[#c5a059]/20 shadow-xs">
                        <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0f1f3d] text-xs sm:text-sm mb-0.5">Local Storage Only</h3>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            If you log in, sign up, book a room, or order food, all your data is stored locally in <strong>your browser system</strong>. Nothing is shared with external servers.
                          </p>
                        </div>
                      </div>

                      {/* Item 3: Feedback & Email */}
                      <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-[#c5a059]/20 shadow-xs">
                        <div className="p-1.5 rounded-xl bg-[#0f1f3d]/10 text-[#0f1f3d] shrink-0 mt-0.5">
                          <Mail size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#0f1f3d] text-xs sm:text-sm mb-0.5">Feedback & Reviews</h3>
                          <p className="text-gray-600 text-xs leading-relaxed mb-1.5">
                            Please explore this user-friendly website and share your valuable reviews with me:
                          </p>
                          <div className="flex items-center justify-between gap-1.5 p-1.5 sm:p-2 rounded-lg bg-gray-50 border border-gray-200">
                            <span className="text-[11px] sm:text-xs font-semibold text-[#0f1f3d] truncate">
                              pratikjoshi0068@gmail.com
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="px-2 py-0.5 text-[11px] font-semibold rounded bg-white border border-gray-300 hover:border-[#c5a059] text-gray-700 hover:text-[#c5a059] transition-all flex items-center gap-1 cursor-pointer"
                              >
                                {copied ? <Check size={11} className="text-green-600" /> : <Copy size={11} />}
                                <span>{copied ? 'Copied' : 'Copy'}</span>
                              </button>
                              <a
                                href="mailto:pratikjoshi0068@gmail.com?subject=Feedback%20for%20Rajwada%20Hotel%20Project"
                                className="px-2 py-0.5 text-[11px] font-semibold rounded bg-[#0f1f3d] text-white hover:bg-[#1a3260] transition-all flex items-center gap-1"
                              >
                                <ExternalLink size={10} />
                                <span>Mail</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Thank You Note */}
                    <div className="text-center pt-0.5 pb-2.5">
                      <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
                        Appreciate your visit to my website. Feel free to explore! <Heart size={11} className="text-red-500 fill-red-500 inline" />
                      </p>
                      <p
                        className="text-sm sm:text-base font-bold text-[#0f1f3d] mt-0.5 tracking-wider"
                        style={{ fontFamily: 'Cinzel, serif' }}
                      >
                        Thank You, Pratik Joshi
                      </p>
                    </div>

                    {/* Primary Action Button */}
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="w-full btn-primary py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a059]/25 hover:shadow-xl transition-all mt-auto"
                    >
                      <span>Explore Website</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
