import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Printer, Calendar, Users, Clock,
  CreditCard, MapPin, Phone, Home, BookOpen, Utensils
} from 'lucide-react';
import { formatPrice, formatDate } from '../utils/index.js';
import { usePageTitle } from '../hooks/index.js';
import { useBooking } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';

export default function BookingConfirmation() {
  const { t } = useLanguage();
  usePageTitle(t('confirm.saved'));
  const location = useLocation();
  const { bookings } = useBooking();

  const booking = location.state?.booking || bookings[bookings.length - 1];

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#fdfaf1] flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-[#0f1f3d] mb-2">No booking found</h2>
        <p className="text-gray-600 mb-6">Confirmation details are not available in this browser session. Start a booking to see your reservation summary.</p>
        <Link to="/booking" className="btn-primary">Start a Booking</Link>
      </div>
    );
  }

  const { room, checkIn, checkOut, nights, adults, children, rooms, guest, paymentMethod, total, base, tax, discount, coupon, id } = booking;
  const bookingId = id || 'RJW-LOCAL';

  const paymentLabels = { hotel: t('confirm.hotel'), upi: t('confirm.upi'), card: t('confirm.card') };

  return (
    <div className="min-h-screen bg-[#fdfaf1]">
      <div className="bg-[#0f1f3d] py-10 text-center print:hidden">
        <p className="text-[#c5a059] text-sm tracking-widest uppercase mb-2">JoshiWada</p>
        <h1 className="text-white text-3xl font-bold">{t('confirm.title')}</h1>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center text-center mb-10"
            role="status"
            aria-live="polite"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-5 shadow-lg">
              <CheckCircle2 size={52} className="text-green-500" strokeWidth={1.5} />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-[#0f1f3d] mb-2"
            >
              🎉 {t('confirm.saved')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-lg"
            >
              {t('confirm.notice')}
            </motion.p>
          </motion.div>

          {/* Booking Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0f1f3d] rounded-2xl p-6 text-center mb-6"
          >
            <p className="text-[#c5a059] text-sm font-semibold tracking-widest uppercase mb-2">{t('confirm.reference')}</p>
            <p className="text-white text-3xl font-bold tracking-widest font-mono">{bookingId}</p>
            <p className="text-white/50 text-xs mt-2">{t('confirm.keepReference')}</p>
          </motion.div>

          {/* Booking Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl card-shadow overflow-hidden mb-6"
          >
            {/* Room image + name header */}
            {room?.images?.[0] && (
              <div className="relative h-48 overflow-hidden">
                <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <p className="text-xs text-[#c5a059] font-semibold uppercase tracking-widest mb-1 capitalize">{room.category}</p>
                  <h3 className="text-2xl font-bold">{room.name}</h3>
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">{t('confirm.checkIn')}</span>
                  <span className="font-bold text-[#0f1f3d] flex items-center gap-2"><Calendar size={14} className="text-[#c5a059]" />{formatDate(checkIn)}</span>
                  <span className="text-gray-400 text-xs">After 2:00 PM</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">{t('confirm.checkOut')}</span>
                  <span className="font-bold text-[#0f1f3d] flex items-center gap-2"><Calendar size={14} className="text-[#c5a059]" />{formatDate(checkOut)}</span>
                  <span className="text-gray-400 text-xs">Before 11:00 AM</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">{t('confirm.duration')}</span>
                  <span className="font-bold text-[#0f1f3d]">{nights} Night{nights > 1 ? 's' : ''}</span>
                  <span className="text-gray-400 text-xs">{rooms} Room{rooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">{t('confirm.guests')}</span>
                  <span className="font-bold text-[#0f1f3d] flex items-center gap-2"><Users size={14} className="text-[#c5a059]" />{adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">{t('confirm.guestName')}</span>
                  <span className="font-bold text-[#0f1f3d]">{guest?.firstName} {guest?.lastName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">{t('confirm.payment')}</span>
                  <span className="font-bold text-[#0f1f3d] flex items-center gap-2"><CreditCard size={14} className="text-[#c5a059]" />{paymentLabels[paymentMethod] || paymentMethod}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#fdfaf1] rounded-xl p-5 space-y-2 text-sm">
                <h4 className="font-bold text-[#0f1f3d] mb-3">{t('confirm.breakdown')}</h4>
                <div className="flex justify-between text-gray-600">
                  <span>{t('confirm.base')} ({nights} nights × {rooms} room{rooms > 1 ? 's' : ''})</span>
                  <span>{formatPrice(base)}</span>
                </div>
                <div className="flex justify-between text-gray-600"><span>{t('confirm.tax')}</span><span>{formatPrice(tax)}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Coupon Discount {coupon && `(${coupon.label})`}</span>
                    <span>- {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-[#0f1f3d] text-base">
                  <span>{t('confirm.total')}</span>
                  <span className="text-[#c5a059] text-xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What to Expect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl card-shadow p-6 mb-6"
          >
            <h3 className="font-bold text-[#0f1f3d] text-lg mb-4">{t('confirm.whatToExpect')}</h3>
            <div className="space-y-4">
              {[
                { icon: <Clock className="text-[#c5a059]" size={20} />, title: 'Check-in Time: 2:00 PM', desc: 'Early check-in is subject to availability. Please contact the hotel in advance.' },
                { icon: <Clock className="text-[#c5a059]" size={20} />, title: 'Check-out Time: 11:00 AM', desc: 'Late check-out available until 2 PM for an additional charge. Request at front desk.' },
                { icon: <MapPin className="text-[#c5a059]" size={20} />, title: 'Bring a Valid ID Proof', desc: 'Government-issued photo ID required at check-in (Aadhaar, PAN, Passport, Driving Licence).' },
                { icon: <Phone className="text-[#c5a059]" size={20} />, title: 'Hotel Contact', desc: 'For any questions or modifications, call us at +91 8485214578 (available 24/7).' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-[#0f1f3d] text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <button
              type="button"
              onClick={() => window.print()}
              className="print:hidden flex flex-col items-center gap-2 p-4 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all group"
            >
              <Printer size={22} className="text-[#c5a059] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#0f1f3d] text-center">{t('confirm.print')}</span>
            </button>
            <Link to="/my-bookings" className="print:hidden flex flex-col items-center gap-2 p-4 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all group">
              <BookOpen size={22} className="text-[#c5a059] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#0f1f3d] text-center">{t('confirm.myBookings')}</span>
            </Link>
            <Link to="/restaurant" className="print:hidden flex flex-col items-center gap-2 p-4 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all group">
              <Utensils size={22} className="text-[#c5a059] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#0f1f3d] text-center">Order Food</span>
            </Link>
            <Link to="/" className="print:hidden flex flex-col items-center gap-2 p-4 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all group">
              <Home size={22} className="text-[#c5a059] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#0f1f3d] text-center">{t('confirm.home')}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
