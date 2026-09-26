import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Bed, Star, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/index.js';

const RoomCard = ({ room, showBookBtn = true }) => {
  const navigate = useNavigate();
  const {
    slug,
    name,
    price,
    bedType,
    maxGuests,
    rating,
    reviews,
    images,
    shortDesc,
    category,
  } = room;

  const categoryColors = {
    standard: 'bg-blue-100 text-blue-700',
    basic: 'bg-gray-100 text-gray-600',
    deluxe: 'bg-amber-100 text-amber-700',
    'super-deluxe': 'bg-orange-100 text-orange-700',
    luxury: 'bg-purple-100 text-purple-700',
    premium: 'bg-rose-100 text-rose-700',
    executive: 'bg-teal-100 text-teal-700',
    family: 'bg-green-100 text-green-700',
    suite: 'bg-indigo-100 text-indigo-700',
    presidential: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="room-card bg-white rounded-2xl overflow-hidden card-shadow flex flex-col h-full group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full capitalize ${categoryColors[category] || 'bg-gray-100 text-gray-600'}`}
        >
          {category.replace('-', ' ')}
        </span>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]" />
          <span className="text-xs font-bold text-[#0f1f3d]">{rating}</span>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-[#0f1f3d] text-lg leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
            {name}
          </h3>
          <p className="text-gray-500 text-sm mt-1 leading-relaxed line-clamp-2">{shortDesc}</p>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-[#c5a059]" />
            {bedType}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-[#c5a059]" />
            Up to {maxGuests}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#c5a059]">{formatPrice(price)}</span>
            </div>
            <span className="text-xs text-gray-400">per night + taxes</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          <Link
            to={`/rooms/${slug}`}
            className="flex-1 text-center text-sm font-semibold border-2 border-[#0f1f3d] text-[#0f1f3d] py-2 rounded-lg hover:bg-[#0f1f3d] hover:text-white transition-all duration-200"
          >
            View Details
          </Link>
          {showBookBtn && (
            <button
              onClick={() => navigate(`/booking?room=${slug}`)}
              className="flex-1 flex items-center justify-center gap-1 text-sm font-semibold bg-[#c5a059] text-white py-2 rounded-lg hover:bg-[#b8893f] transition-all duration-200"
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;
