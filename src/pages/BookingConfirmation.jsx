import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Download, Calendar, Users, BedDouble, Clock,
  CreditCard, MapPin, Phone, Home, BookOpen, Utensils
} from 'lucide-react';
import { formatPrice, formatDate } from '../utils/index.js';
import { usePageTitle } from '../hooks/index.js';
import toast from 'react-hot-toast';

export default function BookingConfirmation() {
  usePageTitle('Booking Confirmed!');
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#fdfaf1] flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-[#0f1f3d] mb-2">No booking found</h2>
        <p className="text-gray-500 mb-6">It looks like you arrived here directly. Please make a booking first.</p>
        <Link to="/rooms" className="btn-primary">Browse Rooms</Link>
      </div>
    );
  }

  const { room, checkIn, checkOut, nights, adults, children, rooms, guest, paymentMethod, total, base, tax, discount, coupon, id } = booking;
  const bookingId = id || `JSW${Date.now()}`;

  const paymentLabels = { hotel: 'Pay at Hotel', upi: 'UPI Payment', card: 'Credit / Debit Card' };

  return (
    <div className="min-h-screen bg-[#fdfaf1]">
      <div className="bg-[#0f1f3d] py-10 text-center">
        <p className="text-[#c5a059] text-sm tracking-widest uppercase mb-2">JoshiWada Palace Hotel</p>
        <h1 className="text-white text-3xl font-bold">Booking Confirmation</h1>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center text-center mb-10"
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
              🎉 Booking Confirmed!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-lg"
            >
              Your reservation has been successfully placed.
            </motion.p>
          </motion.div>

          {/* Booking Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0f1f3d] rounded-2xl p-6 text-center mb-6"
          >
            <p className="text-[#c5a059] text-sm font-semibold tracking-widest uppercase mb-2">Booking Reference</p>
            <p className="text-white text-3xl font-bold tracking-widest font-mono">{bookingId}</p>
            <p className="text-white/50 text-xs mt-2">Keep this reference number for your records</p>
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
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Check-in</span>
                  <span className="font-bold text-[#0f1f3d] flex items-center gap-2"><Calendar size={14} className="text-[#c5a059]" />{formatDate(checkIn)}</span>
                  <span className="text-gray-400 text-xs">After 2:00 PM</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Check-out</span>
                  <span className="font-bold text-[#0f1f3d] flex items-center gap-2"><Calendar size={14} className="text-[#c5a059]" />{formatDate(checkOut)}</span>
                  <span className="text-gray-400 text-xs">Before 11:00 AM</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Duration</span>
                  <span className="font-bold text-[#0f1f3d]">{nights} Night{nights > 1 ? 's' : ''}</span>
                  <span className="text-gray-400 text-xs">{rooms} Room{rooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Guests</span>
                  <span className="font-bold text-[#0f1f3d] flex items-center gap-2"><Users size={14} className="text-[#c5a059]" />{adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Guest Name</span>
                  <span className="font-bold text-[#0f1f3d]">{guest?.firstName} {guest?.lastName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Payment</span>
                  <span className="font-bold text-[#0f1f3d] flex items-center gap-2"><CreditCard size={14} className="text-[#c5a059]" />{paymentLabels[paymentMethod] || paymentMethod}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#fdfaf1] rounded-xl p-5 space-y-2 text-sm">
                <h4 className="font-bold text-[#0f1f3d] mb-3">Payment Breakdown</h4>
                <div className="flex justify-between text-gray-600">
                  <span>Base Amount ({nights} nights × {rooms} room{rooms > 1 ? 's' : ''})</span>
                  <span>{formatPrice(base)}</span>
                </div>
                <div className="flex justify-between text-gray-600"><span>GST (12%)</span><span>{formatPrice(tax)}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Coupon Discount {coupon && `(${coupon.label})`}</span>
                    <span>- {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-[#0f1f3d] text-base">
                  <span>Total {paymentMethod === 'hotel' ? 'Payable at Hotel' : 'Paid'}</span>
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
            <h3 className="font-bold text-[#0f1f3d] text-lg mb-4">What to Expect</h3>
            <div className="space-y-4">
              {[
                { icon: <Clock className="text-[#c5a059]" size={20} />, title: 'Check-in Time: 2:00 PM', desc: 'Early check-in is subject to availability. Please contact the hotel in advance.' },
                { icon: <Clock className="text-[#c5a059]" size={20} />, title: 'Check-out Time: 11:00 AM', desc: 'Late check-out available until 2 PM for an additional charge. Request at front desk.' },
                { icon: <MapPin className="text-[#c5a059]" size={20} />, title: 'Bring a Valid ID Proof', desc: 'Government-issued photo ID required at check-in (Aadhaar, PAN, Passport, Driving Licence).' },
                { icon: <Phone className="text-[#c5a059]" size={20} />, title: 'Hotel Contact', desc: 'For any questions or modifications, call us at +91 731 243 0000 (available 24/7).' },
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
              onClick={() => toast('PDF download coming soon! We\'ll email your confirmation.', { icon: '📧' })}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all group"
            >
              <Download size={22} className="text-[#c5a059] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#0f1f3d] text-center">Download Confirmation</span>
            </button>
            <Link to="/my-bookings" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all group">
              <BookOpen size={22} className="text-[#c5a059] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#0f1f3d] text-center">View My Bookings</span>
            </Link>
            <Link to="/restaurant" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all group">
              <Utensils size={22} className="text-[#c5a059] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#0f1f3d] text-center">Order Food</span>
            </Link>
            <Link to="/" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all group">
              <Home size={22} className="text-[#c5a059] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#0f1f3d] text-center">Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
