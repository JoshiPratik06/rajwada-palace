import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, Star, Users, Maximize2, BedDouble,
  ChevronRight, Heart, X, Filter, ArrowUpDown, CheckCircle2, XCircle
} from 'lucide-react';
import { roomsData } from '../data/index.js';
import { useBooking } from '../context/BookingContext';
import { formatPrice, stars } from '../utils/index.js';
import { usePageTitle, useDebounce } from '../hooks/index.js';

const CATEGORIES = [
  { id: 'all', label: 'All Rooms' },
  { id: 'basic', label: 'Basic' },
  { id: 'standard', label: 'Standard' },
  { id: 'deluxe', label: 'Deluxe' },
  { id: 'super-deluxe', label: 'Super Deluxe' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'premium', label: 'Premium' },
  { id: 'executive', label: 'Executive' },
  { id: 'family', label: 'Family' },
  { id: 'suite', label: 'Suite' },
  { id: 'presidential', label: 'Presidential' },
];

const SORT_OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'price-asc', label: 'Price: Low → High' },
  { id: 'price-desc', label: 'Price: High → Low' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'popularity', label: 'Most Reviewed' },
];

function StarRating({ rating }) {
  const { full, half, empty } = stars(rating);
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(full)].map((_, i) => <Star key={`f${i}`} size={12} className="fill-[#c5a059] text-[#c5a059]" />)}
      {half ? <Star key="h" size={12} className="fill-[#c5a059]/50 text-[#c5a059]" /> : null}
      {[...Array(empty)].map((_, i) => <Star key={`e${i}`} size={12} className="text-gray-300" />)}
    </span>
  );
}

function RoomCard({ room, index }) {
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useBooking();
  const wishlisted = isWishlisted(room.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="room-card group bg-white rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Availability badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${room.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {room.available ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
          {room.available ? 'Available' : 'Unavailable'}
        </div>
        {/* Category tag */}
        <div className="absolute top-3 right-12 bg-[#c5a059] text-white px-2.5 py-1 rounded-full text-xs font-semibold capitalize">
          {room.category}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(room.id); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${wishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'}`}
        >
          <Heart size={14} className={wishlisted ? 'fill-white' : ''} />
        </button>
        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white text-xl font-bold">{formatPrice(room.price)}</span>
          <span className="text-white/70 text-xs"> /night</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-[#0f1f3d] text-lg leading-tight">{room.name}</h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <StarRating rating={room.rating} />
            <span className="text-xs text-gray-500 ml-1">{room.rating} ({room.reviews})</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{room.shortDesc}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Maximize2 size={12} />{room.size}</span>
          <span className="flex items-center gap-1"><BedDouble size={12} />{room.bedType}</span>
          <span className="flex items-center gap-1"><Users size={12} />Up to {room.maxGuests}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {room.amenities.slice(0, 3).map((a) => (
            <span key={a} className="bg-[#fdfaf1] text-[#0f1f3d] text-xs px-2 py-0.5 rounded-full border border-[#c5a059]/30">{a}</span>
          ))}
          {room.amenities.length > 3 && (
            <span className="bg-[#fdfaf1] text-[#c5a059] text-xs px-2 py-0.5 rounded-full border border-[#c5a059]/30">+{room.amenities.length - 3} more</span>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            to={`/rooms/${room.slug}`}
            className="flex-1 text-center py-2.5 border-2 border-[#0f1f3d] text-[#0f1f3d] rounded-xl text-sm font-semibold hover:bg-[#0f1f3d] hover:text-white transition-all"
          >
            View Details
          </Link>
          <button
            onClick={() => navigate(`/booking/${room.slug}`, { state: { room } })}
            disabled={!room.available}
            className="flex-1 py-2.5 bg-[#c5a059] text-white rounded-xl text-sm font-semibold hover:bg-[#b08d40] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Rooms() {
  usePageTitle('Rooms & Suites');
  const { search } = useBooking();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const maxPrice = Math.max(...roomsData.map(r => r.price));
  const minPrice = Math.min(...roomsData.map(r => r.price));

  const filteredRooms = useMemo(() => {
    let rooms = [...roomsData];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      rooms = rooms.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      rooms = rooms.filter(r => r.category === selectedCategory);
    }

    if (availableOnly) {
      rooms = rooms.filter(r => r.available);
    }

    rooms = rooms.filter(r => r.price >= priceRange[0] && r.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': rooms.sort((a, b) => a.price - b.price); break;
      case 'price-desc': rooms.sort((a, b) => b.price - a.price); break;
      case 'rating': rooms.sort((a, b) => b.rating - a.rating); break;
      case 'popularity': rooms.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }

    return rooms;
  }, [debouncedSearch, selectedCategory, sortBy, availableOnly, priceRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
    setAvailableOnly(false);
    setPriceRange([0, 30000]);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || sortBy !== 'default' || availableOnly || priceRange[0] > 0 || priceRange[1] < 30000;

  return (
    <div className="min-h-screen bg-[#fdfaf1]">
      {/* Hero Banner */}
      <div className="bg-[#0f1f3d] h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <p className="text-[#c5a059] text-sm tracking-[4px] uppercase mb-3">JoshiWada Palace Hotel</p>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Our Rooms & Suites</h1>
          <div className="gold-line mx-auto" />
        </motion.div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#c5a059] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#0f1f3d] font-medium">Rooms & Suites</span>
          </nav>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Search & Top Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search rooms by name or type..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field input-icon-left w-full"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input-field pr-8 cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-medium transition-all ${showFilters ? 'bg-[#0f1f3d] text-white border-[#0f1f3d]' : 'border-gray-300 text-gray-600 hover:border-[#0f1f3d]'}`}
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && <span className="w-2 h-2 bg-[#c5a059] rounded-full" />}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl p-6 mb-6 card-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category */}
                  <div>
                    <h4 className="font-semibold text-[#0f1f3d] mb-3">Room Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id ? 'bg-[#0f1f3d] text-white' : 'bg-[#fdfaf1] text-gray-600 hover:bg-[#c5a059]/10 border border-gray-200'}`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-semibold text-[#0f1f3d] mb-3">
                      Price Range: <span className="text-[#c5a059]">{formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}</span>
                    </h4>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        step={500}
                        value={priceRange[1]}
                        onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full accent-[#c5a059]"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{formatPrice(minPrice)}</span>
                        <span>{formatPrice(maxPrice)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Other Filters */}
                  <div>
                    <h4 className="font-semibold text-[#0f1f3d] mb-3">Availability</h4>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => setAvailableOnly(!availableOnly)}
                        className={`w-12 h-6 rounded-full relative transition-all ${availableOnly ? 'bg-[#c5a059]' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${availableOnly ? 'left-7' : 'left-1'}`} />
                      </div>
                      <span className="text-sm text-gray-600">Available rooms only</span>
                    </label>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 font-medium">
                      <X size={14} /> Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Pills (always visible) */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'bg-[#c5a059] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-[#c5a059]/10 border border-gray-200'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#0f1f3d]">{filteredRooms.length}</span> of {roomsData.length} rooms
            {hasActiveFilters && <button onClick={clearFilters} className="ml-3 text-[#c5a059] text-sm hover:underline">Clear filters</button>}
          </p>
          {availableOnly && (
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
              <CheckCircle2 size={12} /> Available only
            </span>
          )}
        </div>

        {/* Rooms Grid */}
        <AnimatePresence mode="wait">
          {filteredRooms.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRooms.map((room, index) => (
                <RoomCard key={room.id} room={room} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-2xl font-bold text-[#0f1f3d] mb-2">No rooms found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
