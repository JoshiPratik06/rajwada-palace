import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Utensils, ChevronDown, ChevronUp, X, Phone,
  Calendar, Users, BedDouble, CheckCircle2, XCircle, AlertTriangle,
  Clock, Tag, Filter, Star, ShoppingCart
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, formatDate } from '../utils/index.js';
import { usePageTitle } from '../hooks/index.js';
import toast from 'react-hot-toast';

function StatusBadge({ status }) {
  const cfg = {
    confirmed: { color: 'bg-green-100 text-green-700', icon: <CheckCircle2 size={12} />, label: 'Confirmed' },
    cancelled: { color: 'bg-red-100 text-red-600', icon: <XCircle size={12} />, label: 'Cancelled' },
    pending: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={12} />, label: 'Pending' },
  };
  const s = cfg[status] || cfg.confirmed;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.color}`}>
      {s.icon} {s.label}
    </span>
  );
}

function CancelModal({ booking, onConfirm, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
      >
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#0f1f3d] text-center mb-2">Cancel Booking?</h3>
        <p className="text-gray-500 text-sm text-center mb-2">Are you sure you want to cancel booking</p>
        <p className="text-[#0f1f3d] font-bold text-center mb-4">{booking.id}</p>
        <p className="text-gray-400 text-xs text-center mb-6">This action cannot be undone. Refund (if applicable) will be processed within 7-10 business days.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-600 hover:border-gray-400 transition-all">Keep It</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all">Yes, Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BookingCard({ booking, onCancel }) {
  const [expanded, setExpanded] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  const isCancelled = booking.status === 'cancelled';

  const handleModify = () => {
    toast('To modify your booking, please call +91 731 243 0000', { icon: '📞', duration: 4000 });
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-2xl card-shadow overflow-hidden ${isCancelled ? 'opacity-70' : ''}`}
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row gap-4 p-5">
          {booking.room?.images?.[0] && (
            <div className="relative">
              <img
                src={booking.room.images[0]}
                alt={booking.room.name}
                className="w-full sm:w-28 h-24 object-cover rounded-xl shrink-0"
              />
              {isCancelled && (
                <div className="absolute inset-0 bg-gray-900/40 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CANCELLED</span>
                </div>
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[#c5a059] text-xs font-semibold bg-[#c5a059]/10 px-2 py-0.5 rounded-full font-mono">{booking.id}</span>
                <h3 className="font-bold text-[#0f1f3d] text-lg mt-1">{booking.room?.name || 'Room Booking'}</h3>
              </div>
              <StatusBadge status={booking.status || 'confirmed'} />
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1"><Calendar size={14} className="text-[#c5a059]" />{formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}</span>
              <span className="flex items-center gap-1"><Users size={14} className="text-[#c5a059]" />{(booking.adults || 2)} guests</span>
              <span className="flex items-center gap-1"><BedDouble size={14} className="text-[#c5a059]" />{booking.nights || 1} nights · {booking.rooms || 1} room</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-gray-400 text-xs">Total Amount</span>
                <p className="font-bold text-[#0f1f3d] text-xl">{formatPrice(booking.total || 0)}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-sm text-[#0f1f3d] border border-gray-300 px-3 py-1.5 rounded-lg hover:border-[#c5a059] transition-all font-medium">
                  {expanded ? <><ChevronUp size={14} /> Hide</> : <><ChevronDown size={14} /> Details</>}
                </button>
                {!isCancelled && (
                  <>
                    <button onClick={handleModify} className="text-sm text-[#c5a059] border border-[#c5a059] px-3 py-1.5 rounded-lg hover:bg-[#c5a059] hover:text-white transition-all font-medium">
                      Modify
                    </button>
                    <button onClick={() => setShowCancelModal(true)} className="text-sm text-red-500 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all font-medium">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm bg-[#fdfaf1]">
                <div><span className="text-gray-400 text-xs block mb-1">Guest Name</span><span className="font-medium text-[#0f1f3d]">{booking.guest?.firstName} {booking.guest?.lastName}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Email</span><span className="font-medium text-[#0f1f3d] break-all">{booking.guest?.email}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Phone</span><span className="font-medium text-[#0f1f3d]">{booking.guest?.phone}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Room Type</span><span className="font-medium text-[#0f1f3d] capitalize">{booking.room?.category}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Payment</span><span className="font-medium text-[#0f1f3d] capitalize">{booking.paymentMethod === 'hotel' ? 'Pay at Hotel' : booking.paymentMethod}</span></div>
                <div><span className="text-gray-400 text-xs block mb-1">Arrival Time</span><span className="font-medium text-[#0f1f3d]">{booking.guest?.arrivalTime || 'Not specified'}</span></div>
                {booking.discount > 0 && <div><span className="text-gray-400 text-xs block mb-1">Coupon Discount</span><span className="font-medium text-green-600">- {formatPrice(booking.discount)}</span></div>}
                {booking.guest?.specialRequests && (
                  <div className="col-span-full">
                    <span className="text-gray-400 text-xs block mb-1">Special Requests</span>
                    <span className="font-medium text-[#0f1f3d]">{booking.guest.specialRequests}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showCancelModal && (
          <CancelModal
            booking={booking}
            onConfirm={() => { onCancel(booking.id); setShowCancelModal(false); }}
            onClose={() => setShowCancelModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function FoodOrderCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl card-shadow p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-[#c5a059] text-xs font-semibold bg-[#c5a059]/10 px-2 py-0.5 rounded-full font-mono">
            Order #{order.id || 'N/A'}
          </span>
          <p className="text-gray-500 text-sm mt-1">{order.date || 'Date not available'}</p>
        </div>
        <StatusBadge status="confirmed" />
      </div>
      <div className="space-y-2 mb-4">
        {(order.items || []).map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-700">{item.name} × {item.qty}</span>
            <span className="font-medium text-[#0f1f3d]">{formatPrice(item.price * item.qty)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-[#0f1f3d]">
        <span>Total</span>
        <span className="text-[#c5a059]">{formatPrice(order.total || 0)}</span>
      </div>
    </motion.div>
  );
}

export default function MyBookings() {
  usePageTitle('My Bookings');
  const { bookings, cancelBooking } = useBooking();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get food orders from localStorage
  const foodOrders = useMemo(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('foodOrders') || localStorage.getItem('orders') || '[]');
      return orders;
    } catch { return []; }
  }, []);

  const userBookings = useMemo(() => {
    return bookings.filter(b => !b.userEmail || b.userEmail === user?.email);
  }, [bookings, user]);

  const userFoodOrders = useMemo(() => {
    return foodOrders.filter(o => !o.userEmail || o.userEmail === user?.email);
  }, [foodOrders, user]);

  const filteredBookings = useMemo(() => {
    const sorted = [...userBookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (statusFilter === 'all') return sorted;
    return sorted.filter(b => (b.status || 'confirmed') === statusFilter);
  }, [userBookings, statusFilter]);

  const confirmedCount = userBookings.filter(b => (b.status || 'confirmed') === 'confirmed').length;
  const cancelledCount = userBookings.filter(b => b.status === 'cancelled').length;

  return (
    <div className="min-h-screen bg-[#fdfaf1]">
      {/* Hero */}
      <div className="bg-[#0f1f3d] py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <p className="text-[#c5a059] text-sm tracking-widest uppercase mb-2">Rajwada Palace Hotel</p>
          <h1 className="text-white text-4xl font-bold mb-2">My Bookings & Orders</h1>
          <p className="text-white/70 text-sm mb-4">
            Welcome back, <span className="text-[#c5a059] font-semibold">{user?.name || 'Valued Guest'}</span> ({user?.email})
          </p>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 rounded-full text-xs text-white/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Logged in as <strong>{user?.name || user?.email}</strong></span>
            <span className="text-white/30">|</span>
            <button
              onClick={() => logout()}
              className="text-[#c5a059] hover:text-[#d4af37] font-semibold transition-colors underline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-xl p-1.5 card-shadow mb-8 w-fit">
          {[
            { id: 'bookings', label: 'Room Bookings', icon: <BookOpen size={16} />, count: userBookings.length },
            { id: 'food', label: 'Food Orders', icon: <Utensils size={16} />, count: userFoodOrders.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === tab.id ? 'bg-[#0f1f3d] text-white' : 'text-gray-500 hover:text-[#0f1f3d]'}`}
            >
              {tab.icon} {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === tab.id ? 'bg-[#c5a059] text-white' : 'bg-gray-100 text-gray-500'}`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div>
            {/* Stats */}
            {userBookings.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Total', value: userBookings.length, color: 'text-[#0f1f3d]' },
                  { label: 'Confirmed', value: confirmedCount, color: 'text-green-600' },
                  { label: 'Cancelled', value: cancelledCount, color: 'text-red-500' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl card-shadow p-4 text-center">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Filter */}
            {userBookings.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <Filter size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">Filter:</span>
                {['all', 'confirmed', 'cancelled'].map(f => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${statusFilter === f ? 'bg-[#0f1f3d] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#c5a059]'}`}
                  >
                    {f === 'all' ? 'All' : f}
                  </button>
                ))}
              </div>
            )}

            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} onCancel={cancelBooking} />
                ))}
              </div>
            ) : userBookings.length === 0 ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-8xl mb-6">🏨</div>
                <h3 className="text-2xl font-bold text-[#0f1f3d] mb-3">No bookings yet</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't made any reservations. Book a luxurious room at Rajwada Palace and experience royal hospitality.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/rooms" className="btn-primary flex items-center justify-center gap-2">
                    <BookOpen size={18} /> Book a Room
                  </Link>
                  <Link to="/" className="btn-secondary flex items-center justify-center gap-2">
                    Explore Hotel
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No {statusFilter} bookings found.</p>
                <button onClick={() => setStatusFilter('all')} className="text-[#c5a059] text-sm mt-2 hover:underline">Show all bookings</button>
              </div>
            )}
          </div>
        )}

        {/* FOOD ORDERS TAB */}
        {activeTab === 'food' && (
          <div>
            {userFoodOrders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userFoodOrders.map((order, i) => (
                  <FoodOrderCard key={i} order={order} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-8xl mb-6">🍽️</div>
                <h3 className="text-2xl font-bold text-[#0f1f3d] mb-3">No food orders yet</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Explore our award-winning Indian cuisine and place your first food order from the restaurant.</p>
                <Link to="/restaurant" className="btn-primary flex items-center justify-center gap-2 w-fit mx-auto">
                  <ShoppingCart size={18} /> Order Food
                </Link>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
