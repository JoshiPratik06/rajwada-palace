import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ClipboardList, Clock, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/index.js';
import { formatPrice, formatDate } from '../utils/index.js';

/* ─── Service type label ─── */
const SERVICE_LABELS = {
  'dine-in': { label: 'Dine-In', emoji: '🍽️' },
  'room-service': { label: 'Room Service', emoji: '🛎️' },
  'takeaway': { label: 'Takeaway', emoji: '🛍️' },
};

/* ─── Veg dot (tiny) ─── */
const VegDot = ({ type }) =>
  type === 'veg' ? (
    <span className="inline-block w-3 h-3 rounded-full bg-green-500 border border-green-600 mr-1.5 align-middle flex-shrink-0" />
  ) : (
    <span
      className="inline-block mr-1.5 align-middle flex-shrink-0"
      style={{
        width: 0,
        height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: '10px solid #dc2626',
      }}
    />
  );

const OrderConfirmation = () => {
  usePageTitle('Order Confirmed!');

  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem('lastOrder');
    if (last) {
      try {
        setOrder(JSON.parse(last));
      } catch {
        setOrder(null);
      }
    }
  }, []);

  const handleCopy = () => {
    if (!order?.orderId) return;
    navigator.clipboard.writeText(order.orderId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const service = order ? SERVICE_LABELS[order.serviceType] || SERVICE_LABELS['dine-in'] : null;

  return (
    <div className="min-h-screen bg-[#fdfaf1] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* ── Top Success Banner ── */}
        <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3260] px-8 py-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-[#c5a059] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <CheckCircle size={42} className="text-white" strokeWidth={2} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Order Placed! 🎉
          </motion.h1>
          <p className="text-gray-300 text-sm">
            Your royal feast is on its way. Sit back and relax!
          </p>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-6 space-y-5">
          {order ? (
            <>
              {/* Order Reference */}
              <div className="bg-[#fdfaf1] border border-[#c5a059]/30 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">Order Reference</p>
                  <p className="font-mono text-sm font-bold text-[#0f1f3d] tracking-wider">{order.orderId}</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="text-[#c5a059] hover:text-[#b08a44] transition-colors p-1.5 rounded-lg hover:bg-[#c5a059]/10"
                  title="Copy order ID"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Service type + time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Service Type</p>
                  <p className="text-lg">{service?.emoji}</p>
                  <p className="text-sm font-bold text-[#0f1f3d]">{service?.label}</p>
                  {order.serviceType === 'room-service' && order.roomNumber && (
                    <p className="text-xs text-gray-500 mt-0.5">Room {order.roomNumber}</p>
                  )}
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Estimated Time</p>
                  <div className="flex items-center justify-center gap-1 text-[#c5a059] mt-1">
                    <Clock size={18} />
                  </div>
                  <p className="text-sm font-bold text-[#0f1f3d] mt-0.5">30–45 mins</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Items Ordered
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {order.items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl p-2.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <VegDot type={item.type} />
                          <p className="text-sm font-semibold text-[#0f1f3d] truncate">{item.name}</p>
                        </div>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                      <p className="text-sm font-bold text-[#c5a059] flex-shrink-0">
                        {formatPrice(item.price * item.qty)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-100 pt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>GST (5%)</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount{order.coupon ? ` (${order.coupon})` : ''}</span>
                    <span>− {formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base text-[#0f1f3d] pt-1 border-t border-gray-100">
                  <span>Total Paid</span>
                  <span className="text-[#c5a059]">{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Placed at */}
              {order.placedAt && (
                <p className="text-xs text-center text-gray-400">
                  Placed on {formatDate(order.placedAt)}
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <ClipboardList size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No recent order found.</p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              to="/restaurant"
              className="btn-secondary justify-center text-sm py-3 rounded-lg"
            >
              <ArrowLeft size={15} />
              Back to Menu
            </Link>
            <Link
              to="/bookings"
              className="btn-dark justify-center text-sm py-3 rounded-lg"
            >
              <ClipboardList size={15} />
              My Bookings
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
