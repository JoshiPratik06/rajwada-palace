import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, getSpicyLabel } from '../utils/index.js';

/* ─── Veg / Non-Veg Indicator (Indian FSSAI style) ─── */
const VegIndicator = ({ type }) => {
  if (type === 'veg') {
    return (
      <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center rounded-sm flex-shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
      </div>
    );
  }
  return (
    <div className="w-5 h-5 border-2 border-red-600 flex items-center justify-center rounded-sm flex-shrink-0">
      <div
        className="w-0 h-0"
        style={{
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '9px solid #dc2626',
        }}
      />
    </div>
  );
};

/* ─── Star Rating ─── */
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < full
              ? 'text-amber-400 fill-amber-400'
              : i === full && half
              ? 'text-amber-400 fill-amber-200'
              : 'text-gray-300 fill-gray-100'
          }
        />
      ))}
      <span className="text-xs text-gray-500 ml-1 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

/* ─── Main Card ─── */
const FoodCard = ({ item }) => {
  const { items, addItem, updateQty, removeItem } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const qty = cartItem ? cartItem.qty : 0;
  const spicy = getSpicyLabel(item.spicy);

  const handleAdd = () => addItem(item);
  const handleIncrease = () => updateQty(item.id, qty + 1);
  const handleDecrease = () => {
    if (qty === 1) removeItem(item.id);
    else updateQty(item.id, qty - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden card-shadow flex flex-col group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.popular && (
            <span className="bg-[#c5a059] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              ★ Popular
            </span>
          )}
        </div>
        {/* Category pill */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Top row: veg indicator + name */}
        <div className="flex items-start gap-2">
          <VegIndicator type={item.type} />
          <h3 className="font-bold text-[#0f1f3d] text-sm leading-snug font-sans line-clamp-1 flex-1">
            {item.name}
          </h3>
        </div>

        {/* Rating + Spicy */}
        <div className="flex items-center justify-between">
          <StarRating rating={item.rating} />
          {item.spicy > 0 && (
            <span className="text-xs text-gray-500 flex items-center gap-0.5">
              {spicy.icon}
              <span className="ml-0.5">{spicy.label}</span>
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1">
          {item.description}
        </p>

        {/* Price + Cart */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <span className="text-base font-bold text-[#0f1f3d] font-sans">
            {formatPrice(item.price)}
          </span>

          {qty === 0 ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              aria-label={`Add ${item.name} to cart`}
              className="flex items-center gap-1.5 border border-[#c5a059] text-[#c5a059] text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#c5a059] hover:text-white transition-all duration-200 uppercase tracking-wide"
            >
              <ShoppingCart size={13} />
              Add
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 bg-[#0f1f3d] rounded-full px-1 py-0.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrease}
                aria-label={`Remove one ${item.name} from cart`}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <Minus size={12} />
              </motion.button>
              <span className="text-white text-xs font-bold min-w-[16px] text-center" aria-live="polite" aria-label={`${qty} ${item.name} in cart`}>
                {qty}
              </span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrease}
                aria-label={`Add one ${item.name} to cart`}
                className="w-6 h-6 rounded-full bg-[#c5a059] hover:bg-[#b08a44] text-white flex items-center justify-center transition-colors"
              >
                <Plus size={12} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
