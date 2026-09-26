import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Star, Heart, Users, BedDouble, Maximize2, Wifi, Wind, Tv, Coffee,
  Utensils, Car, Shield, ChevronRight, ChevronLeft, ChevronDown,
  ChevronUp, Calendar, Minus, Plus, Eye, Dumbbell, Bath
} from 'lucide-react';
import { roomsData } from '../data/index.js';
import { useBooking } from '../context/BookingContext';
import { formatPrice, formatDate, calcNights, stars, today, getMinCheckout } from '../utils/index.js';
import { usePageTitle } from '../hooks/index.js';

const AMENITY_ICONS = {
  'Free Wi-Fi': <Wifi size={18} />, 'Air Conditioning': <Wind size={18} />,
  'TV': <Tv size={18} />, 'Flat-screen TV': <Tv size={18} />,
  '55" Smart TV': <Tv size={18} />, '65" Smart TV': <Tv size={18} />,
  '75" Smart TV': <Tv size={18} />, '85" Smart TV': <Tv size={18} />,
  'Multiple 4K TVs': <Tv size={18} />, 'Coffee': <Coffee size={18} />,
  'Room Service': <Utensils size={18} />, '24/7 Room Service': <Utensils size={18} />,
  'Parking': <Car size={18} />, 'Safe': <Shield size={18} />,
  'Fitness Center': <Dumbbell size={18} />, 'Spa Bathroom': <Bath size={18} />,
  'Jacuzzi Bathroom': <Bath size={18} />, 'Luxury Bathroom': <Bath size={18} />,
  'Mini Bar': <Coffee size={18} />, 'Complimentary Breakfast': <Coffee size={18} />,
};

function StarRating({ rating, size = 16 }) {
  const { full, half, empty } = stars(rating);
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(full)].map((_, i) => <Star key={`f${i}`} size={size} className="fill-[#c5a059] text-[#c5a059]" />)}
      {half ? <Star key="h" size={size} className="fill-[#c5a059]/50 text-[#c5a059]" /> : null}
      {[...Array(empty)].map((_, i) => <Star key={`e${i}`} size={size} className="text-gray-300" />)}
    </span>
  );
}

function CounterInput({ value, onChange, min = 1, max = 10, label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center font-bold text-[#0f1f3d]">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

export default function RoomDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted, addRecentlyViewed, recentlyViewed, calculatePrice, search } = useBooking();

  const room = roomsData.find(r => r.slug === slug);

  usePageTitle(room ? room.name : 'Room Not Found');

  useEffect(() => {
    if (room) {
      addRecentlyViewed(room.id);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  useEffect(() => {
    if (!room) {
      navigate('/404', { replace: true });
    }
  }, [room]);

  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState(search.checkIn ? new Date(search.checkIn) : null);
  const [checkOut, setCheckOut] = useState(search.checkOut ? new Date(search.checkOut) : null);
  const [adults, setAdults] = useState(search.adults || 2);
  const [children, setChildren] = useState(search.children || 0);
  const [rooms, setRooms] = useState(search.rooms || 1);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  if (!room) return null;

  const nights = calcNights(checkIn, checkOut);
  const pricing = nights > 0 ? calculatePrice(room, nights, rooms) : null;
  const wishlisted = isWishlisted(room.id);

  const recentRooms = recentlyViewed
    .filter(id => id !== room.id)
    .map(id => roomsData.find(r => r.id === id))
    .filter(Boolean)
    .slice(0, 3);

  const amenities = showAllAmenities ? room.amenities : room.amenities.slice(0, 6);

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    navigate(`/booking/${room.slug}`, {
      state: { room, checkIn, checkOut, adults, children, rooms, nights, pricing }
    });
  };

  return (
    <div className="min-h-screen bg-[#fdfaf1]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#c5a059] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/rooms" className="hover:text-[#c5a059] transition-colors">Rooms</Link>
            <ChevronRight size={14} />
            <span className="text-[#0f1f3d] font-medium">{room.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT — Main Content */}
          <div className="flex-1 min-w-0">
            {/* Image Gallery */}
            <div className="mb-6">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden h-72 sm:h-96 mb-3"
              >
                <img
                  src={room.images[activeImg]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Nav arrows */}
                {room.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg(i => (i - 1 + room.images.length) % room.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setActiveImg(i => (i + 1) % room.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(room.id)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${wishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'}`}
                >
                  <Heart size={18} className={wishlisted ? 'fill-white' : ''} />
                </button>
                {/* Photo count */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {activeImg + 1} / {room.images.length}
                </div>
              </motion.div>

              {/* Thumbnails */}
              {room.images.length > 1 && (
                <div className="flex gap-3">
                  {room.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-1 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? 'border-[#c5a059]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Info */}
            <div className="bg-white rounded-2xl p-6 card-shadow mb-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="capitalize text-[#c5a059] text-sm font-semibold bg-[#c5a059]/10 px-3 py-1 rounded-full">{room.category}</span>
                  <h1 className="text-3xl font-bold text-[#0f1f3d] mt-2">{room.name}</h1>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#c5a059]">{formatPrice(room.price)}</div>
                  <div className="text-gray-400 text-sm">per night + taxes</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={room.rating} />
                <span className="font-semibold text-[#0f1f3d]">{room.rating}</span>
                <span className="text-gray-400 text-sm">({room.reviews} reviews)</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[#fdfaf1] rounded-xl">
                <div className="text-center">
                  <Maximize2 className="mx-auto text-[#c5a059] mb-1" size={20} />
                  <div className="font-semibold text-[#0f1f3d] text-sm">{room.size}</div>
                  <div className="text-gray-400 text-xs">Room Size</div>
                </div>
                <div className="text-center">
                  <BedDouble className="mx-auto text-[#c5a059] mb-1" size={20} />
                  <div className="font-semibold text-[#0f1f3d] text-sm">{room.bedType}</div>
                  <div className="text-gray-400 text-xs">Bed Type</div>
                </div>
                <div className="text-center">
                  <Users className="mx-auto text-[#c5a059] mb-1" size={20} />
                  <div className="font-semibold text-[#0f1f3d] text-sm">Up to {room.maxGuests}</div>
                  <div className="text-gray-400 text-xs">Max Guests</div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{room.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 card-shadow mb-6">
              <h2 className="text-xl font-bold text-[#0f1f3d] mb-4">Room Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 p-3 bg-[#fdfaf1] rounded-xl">
                    <span className="text-[#c5a059]">
                      {AMENITY_ICONS[amenity] || <Shield size={18} />}
                    </span>
                    <span className="text-sm text-[#0f1f3d] font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
              {room.amenities.length > 6 && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="mt-4 text-[#c5a059] font-semibold flex items-center gap-1 hover:underline"
                >
                  {showAllAmenities ? <><ChevronUp size={16} /> Show less</> : <><ChevronDown size={16} /> Show all {room.amenities.length} amenities</>}
                </button>
              )}
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-6 card-shadow mb-6">
              <h2 className="text-xl font-bold text-[#0f1f3d] mb-4">Room Highlights</h2>
              <div className="flex flex-wrap gap-3">
                {room.highlights.map(h => (
                  <span key={h} className="tag border border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5 px-4 py-2 rounded-full text-sm font-medium">
                    ✦ {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Recently Viewed */}
            {recentRooms.length > 0 && (
              <div className="bg-white rounded-2xl p-6 card-shadow">
                <h2 className="text-xl font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                  <Eye size={20} className="text-[#c5a059]" /> Recently Viewed
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recentRooms.map(r => (
                    <Link key={r.id} to={`/rooms/${r.slug}`} className="group flex gap-3 p-3 rounded-xl hover:bg-[#fdfaf1] transition-colors">
                      <img src={r.images[0]} alt={r.name} className="w-20 h-16 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform" />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#0f1f3d] text-sm truncate">{r.name}</p>
                        <p className="text-[#c5a059] text-sm font-bold">{formatPrice(r.price)}<span className="text-gray-400 text-xs font-normal">/night</span></p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={10} className="fill-[#c5a059] text-[#c5a059]" />
                          <span className="text-xs text-gray-500">{r.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Sticky Booking Form */}
          <div className="lg:w-96 shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                <div className="bg-[#0f1f3d] p-5 text-white">
                  <p className="text-[#c5a059] text-sm font-semibold mb-1">Reserve Your Stay</p>
                  <div className="text-2xl font-bold">{formatPrice(room.price)} <span className="text-base font-normal text-white/60">/ night</span></div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Check-in</label>
                      <DatePicker
                        selected={checkIn}
                        onChange={date => { setCheckIn(date); if (checkOut && date >= checkOut) setCheckOut(null); }}
                        minDate={today()}
                        placeholderText="Select date"
                        className="input-field w-full text-sm cursor-pointer"
                        dateFormat="dd MMM yyyy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Check-out</label>
                      <DatePicker
                        selected={checkOut}
                        onChange={date => setCheckOut(date)}
                        minDate={checkIn ? getMinCheckout(checkIn) : today()}
                        placeholderText="Select date"
                        className="input-field w-full text-sm cursor-pointer"
                        dateFormat="dd MMM yyyy"
                        disabled={!checkIn}
                      />
                    </div>
                  </div>

                  {nights > 0 && (
                    <div className="bg-[#c5a059]/10 rounded-xl px-4 py-2 text-center text-sm font-semibold text-[#0f1f3d]">
                      📅 {nights} Night{nights > 1 ? 's' : ''} stay
                    </div>
                  )}

                  {/* Guests & Rooms */}
                  <div className="space-y-3 border border-gray-100 rounded-xl p-4">
                    <CounterInput label="Adults" value={adults} onChange={setAdults} min={1} max={6} />
                    <CounterInput label="Children" value={children} onChange={setChildren} min={0} max={4} />
                    <CounterInput label="Rooms" value={rooms} onChange={setRooms} min={1} max={3} />
                  </div>

                  {/* Price Breakdown */}
                  {pricing && (
                    <div className="bg-[#fdfaf1] rounded-xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>{formatPrice(room.price)} × {nights} nights × {rooms} room{rooms > 1 ? 's' : ''}</span>
                        <span>{formatPrice(pricing.base)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>GST (12%)</span>
                        <span>{formatPrice(pricing.tax)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-[#0f1f3d] text-base">
                        <span>Total</span>
                        <span className="text-[#c5a059]">{formatPrice(pricing.total)}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleBookNow}
                    disabled={!room.available}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {room.available ? 'Book Now' : 'Currently Unavailable'}
                  </button>
                  <button
                    onClick={() => toggleWishlist(room.id)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold transition-all ${wishlisted ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 hover:border-[#c5a059] hover:text-[#c5a059]'}`}
                  >
                    <Heart size={16} className={wishlisted ? 'fill-red-400' : ''} />
                    {wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                  </button>

                  <p className="text-center text-xs text-gray-400">Free cancellation • No credit card fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
