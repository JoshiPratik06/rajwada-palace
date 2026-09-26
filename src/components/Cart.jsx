import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Trash2, Tag, ChevronRight, Loader,
  UtensilsCrossed, BedDouble, ShoppingBag,
  Plus, Minus, AlertCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/index.js';
import { generateId } from '../utils/index.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SERVICE_TABS = [
  { id: 'dine-in', label: 'Dine-In', icon: UtensilsCrossed },
  { id: 'room-service', label: 'Room Service', icon: BedDouble },
  { id: 'takeaway', label: 'Takeaway', icon: ShoppingBag },
];

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    items, coupon, serviceType, roomNumber,
    subtotal, tax, discount, total, itemCount,
    removeItem, updateQty, clearCart,
    applyCoupon, removeCoupon, setServiceType, setRoomNumber,
  } = useCart();
  const { user } = useAuth();

  const [couponInput, setCouponInput] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  /* ── Apply coupon ── */
  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput.trim());
    if (ok) setCouponInput('');
  };

  /* ── Place order ── */
  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    if (serviceType === 'room-service' && !roomNumber.trim()) {
      toast.error('Please enter your room number for Room Service.');
      return;
    }

    setPlacingOrder(true);
    const orderId = generateId();
    const orderData = {
      orderId,
      items: [...items],
      serviceType,
      roomNumber: serviceType === 'room-service' ? roomNumber : null,
      subtotal,
      tax,
      discount,
      total,
      coupon: coupon ? coupon.code : null,
      placedAt: new Date().toISOString(),
      userEmail: user?.email || null,
      userName: user?.name || null,
    };

    // Save to localStorage under both 'foodOrders' and 'orders'
    const existing = JSON.parse(localStorage.getItem('foodOrders') || localStorage.getItem('orders') || '[]');
    const updated = [orderData, ...existing];
    localStorage.setItem('foodOrders', JSON.stringify(updated));
    localStorage.setItem('orders', JSON.stringify(updated));
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    setTimeout(() => {
      clearCart();
      setPlacingOrder(false);
      onClose();
      navigate('/order-confirmation');
    }, 1000);
  };

  /* ── Backdrop + Sidebar ── */
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.aside
            key="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#0f1f3d]">
              <div>
                <h2 className="text-white font-bold text-lg tracking-wide">Your Order</h2>
                <p className="text-[#c5a059] text-xs mt-0.5">
                  {itemCount > 0 ? `${itemCount} item${itemCount > 1 ? 's' : ''} in cart` : 'Cart is empty'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={() => { clearCart(); toast('Cart cleared', { icon: '🗑️' }); }}
                    className="text-gray-300 hover:text-red-400 transition-colors p-1.5 rounded-full hover:bg-white/10"
                    title="Clear cart"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-300 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* ── Service Type Tabs ── */}
            <div className="px-4 pt-4 pb-2">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Service Type</p>
              <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-lg">
                {SERVICE_TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setServiceType(id)}
                    className={`flex flex-col items-center gap-1 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${
                      serviceType === id
                        ? 'bg-[#0f1f3d] text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Room Number Input */}
              <AnimatePresence>
                {serviceType === 'room-service' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <label className="text-xs text-gray-600 font-medium block mb-1.5">
                      Room Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={roomNumber}
                      onChange={e => setRoomNumber(e.target.value)}
                      placeholder="e.g. 301, 512..."
                      className="input-field text-sm py-2"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Divider ── */}
            <div className="h-px bg-gray-100 mx-4" />

            {/* ── Cart Items ── */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-gray-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-medium">Your cart is empty</p>
                    <p className="text-gray-300 text-sm mt-1">Browse our menu and add delicious items!</p>
                  </div>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0f1f3d] truncate leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#c5a059] font-bold mt-0.5">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Qty Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                      <div className="flex items-center gap-1.5 bg-[#0f1f3d] rounded-full px-1 py-0.5">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-white text-xs font-bold min-w-[14px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-5 h-5 rounded-full bg-[#c5a059] hover:bg-[#b08a44] text-white flex items-center justify-center transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* ── Bottom section ── */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-4 py-4 space-y-4 bg-white">
                {/* Coupon */}
                {!coupon ? (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                        placeholder="Coupon code"
                        className="input-field input-icon-left text-xs py-2.5"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="btn-primary px-4 py-2 text-xs"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2 text-green-700">
                      <Tag size={14} />
                      <span className="text-xs font-bold">{coupon.code}</span>
                      <span className="text-xs text-green-600">— {coupon.label}</span>
                    </div>
                    <button onClick={removeCoupon} className="text-gray-400 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Hints for valid coupons */}
                <p className="text-[10px] text-gray-400 -mt-2">
                  Try: ROYAL10 · JOSHIWADA20 · FLAT100 · WELCOME50
                </p>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (5%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">− {formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="h-px bg-gray-200" />
                  <div className="flex justify-between text-[#0f1f3d] font-bold text-base">
                    <span>Total</span>
                    <span className="text-[#c5a059]">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Place Order */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                  className="w-full btn-primary justify-center py-3.5 rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {placingOrder ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Placing Order…
                    </>
                  ) : (
                    <>
                      Place Order
                      <ChevronRight size={16} />
                    </>
                  )}
                </motion.button>

                {serviceType === 'room-service' && !roomNumber.trim() && (
                  <div className="flex items-center gap-2 text-amber-600 text-xs bg-amber-50 rounded-lg px-3 py-2">
                    <AlertCircle size={14} />
                    Please enter your room number above.
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
