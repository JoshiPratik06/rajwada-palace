import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import {
  ChevronDown,
  CalendarDays,
  Users,
  BedDouble,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  X,
  Tag,
  ChevronRight,
} from 'lucide-react';

import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/index.js';
import {
  roomsData,
  facilitiesData,
  reviewsData,
  offersData,
  galleryData,
} from '../data/index.js';

import RoomCard from '../components/RoomCard';
import ReviewCard from '../components/ReviewCard';
import SectionHeader from '../components/SectionHeader';

// ─── Featured rooms: deluxe, luxury, suite, presidential ─────────────────────
const FEATURED_SLUGS = ['deluxe-room', 'luxury-room', 'suite', 'presidential-suite'];
const featuredRooms = FEATURED_SLUGS.map((s) => roomsData.find((r) => r.slug === s)).filter(Boolean);
const featuredFacilities = facilitiesData.slice(0, 6);
const featuredReviews = reviewsData.slice(0, 3);
const featuredOffers = offersData.slice(0, 2);
const galleryPreview = galleryData.slice(0, 6);

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '10+', label: 'Room Categories' },
  { value: '500+', label: 'Happy Guests' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '24/7', label: 'Hospitality' },
];

// =============================================================================
// HOME PAGE
// =============================================================================
const Home = () => {
  const navigate = useNavigate();
  const { setSearch, search } = useBooking();

  // Quick booking bar state
  const [checkIn, setCheckIn] = useState(search.checkIn ? new Date(search.checkIn) : null);
  const [checkOut, setCheckOut] = useState(search.checkOut ? new Date(search.checkOut) : null);
  const [guests, setGuests] = useState(search.adults || 2);
  const [rooms, setRooms] = useState(search.rooms || 1);

  // Gallery lightbox
  const [lightbox, setLightbox] = useState(null); // { image, title }

  // Newsletter
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  // Trap body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    setSearch({
      checkIn: checkIn ? checkIn.toISOString() : null,
      checkOut: checkOut ? checkOut.toISOString() : null,
      adults: guests,
      rooms,
    });
    navigate('/rooms');
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Please enter a valid email.');
    setSubscribing(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubscribing(false);
    setEmail('');
    toast.success('🎉 Subscribed! Welcome to Rajwada updates.');
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minCheckout = checkIn
    ? new Date(new Date(checkIn).setDate(checkIn.getDate() + 1))
    : new Date(new Date().setDate(new Date().getDate() + 1));

  return (
    <div className="min-h-screen">
      {/* ===================================================================
          SECTION 1 — HERO
      =================================================================== */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=85')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4 flex flex-col items-center gap-6"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {/* Decorative line */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="h-px w-16 bg-[#c5a059]" />
            <span className="text-[#c5a059] text-xs tracking-[0.35em] uppercase font-medium">Est. 2009 · Indore</span>
            <div className="h-px w-16 bg-[#c5a059]" />
          </motion.div>

          {/* Hotel name */}
          <motion.h1
            variants={fadeUp}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-widest leading-none"
            style={{ fontFamily: 'Cinzel, serif', textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
          >
            RAJWADA
          </motion.h1>

          {/* Sub-line */}
          <motion.p
            variants={fadeUp}
            className="text-[#c5a059] text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase font-light"
          >
            A Legacy of Royal Hospitality &nbsp;·&nbsp; Indore
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <Link to="/booking" className="btn-primary px-8 py-3 text-base">
              Book Your Stay
            </Link>
            <Link to="/rooms" className="btn-secondary px-8 py-3 text-base">
              Explore Rooms
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-6 h-6 text-[#c5a059]" />
        </motion.div>
      </section>

      {/* ===================================================================
          SECTION 2 — QUICK BOOKING BAR
      =================================================================== */}
      <section className="relative z-20 -mt-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-6xl mx-auto bg-white rounded-2xl card-shadow px-6 py-6"
        >
          <form
            onSubmit={handleCheckAvailability}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          >
            {/* Check-in */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0f1f3d] uppercase tracking-wider">
                <CalendarDays className="w-3.5 h-3.5 text-[#c5a059]" />
                Check-In
              </label>
              <DatePicker
                selected={checkIn}
                onChange={(d) => { setCheckIn(d); if (checkOut && d >= checkOut) setCheckOut(null); }}
                minDate={today}
                dateFormat="dd MMM yyyy"
                placeholderText="Select date"
                className="input-field w-full cursor-pointer"
                autoComplete="off"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0f1f3d] uppercase tracking-wider">
                <CalendarDays className="w-3.5 h-3.5 text-[#c5a059]" />
                Check-Out
              </label>
              <DatePicker
                selected={checkOut}
                onChange={setCheckOut}
                minDate={minCheckout}
                dateFormat="dd MMM yyyy"
                placeholderText="Select date"
                className="input-field w-full cursor-pointer"
                autoComplete="off"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0f1f3d] uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                Guests
              </label>
              <div className="flex items-center gap-2 input-field">
                <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="text-[#c5a059] font-bold text-lg leading-none w-6 text-center">−</button>
                <span className="flex-1 text-center font-semibold text-[#0f1f3d]">{guests}</span>
                <button type="button" onClick={() => setGuests(Math.min(10, guests + 1))} className="text-[#c5a059] font-bold text-lg leading-none w-6 text-center">+</button>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0f1f3d] uppercase tracking-wider">
                <BedDouble className="w-3.5 h-3.5 text-[#c5a059]" />
                Rooms
              </label>
              <div className="flex items-center gap-2 input-field">
                <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className="text-[#c5a059] font-bold text-lg leading-none w-6 text-center">−</button>
                <span className="flex-1 text-center font-semibold text-[#0f1f3d]">{rooms}</span>
                <button type="button" onClick={() => setRooms(Math.min(10, rooms + 1))} className="text-[#c5a059] font-bold text-lg leading-none w-6 text-center">+</button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white bg-[#0f1f3d] hover:bg-[#1a3260] transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Check Availability
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </section>

      {/* ===================================================================
          SECTION 3 — FEATURED ROOMS
      =================================================================== */}
      <section className="section-padding bg-[#fdfaf1]">
        <div className="container-custom">
          <SectionHeader
            title="Our Accommodations"
            subtitle="From elegant deluxe rooms to the opulent Presidential Suite, every space is crafted for a royal experience."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} showBookBtn={true} />
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-[#c5a059] font-semibold hover:gap-4 transition-all duration-200 text-base group"
            >
              View All Rooms
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4 — HOTEL HIGHLIGHTS / STATS
      =================================================================== */}
      <section className="section-padding bg-[#0f1f3d] relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c5a059 0, #c5a059 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-[#c5a059]" />
                <span className="text-[#c5a059] text-xs tracking-[0.3em] uppercase">About Rajwada Palace</span>
              </div>

              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Where Royalty Meets&nbsp;Modern&nbsp;Luxury
              </h2>

              <div className="h-px w-20 bg-[#c5a059] mb-6" />

              <p className="text-white/70 text-base leading-relaxed mb-4">
                Nestled in the heart of Indore, Rajwada Palace Hotel is a tribute to the city's regal history. Our hotel blends the grandeur of Maratha architecture with the finest contemporary comforts.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                From the moment you step through our doors, you are welcomed into a world of personalized service, exquisite dining, and unmatched elegance. Every detail has been curated to ensure your stay is nothing short of extraordinary.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Link to="/about" className="btn-primary px-6 py-2.5 text-sm">
                  Our Story
                </Link>
                <Link to="/facilities" className="text-[#c5a059] text-sm font-semibold hover:underline flex items-center gap-1">
                  Explore Facilities <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Stats grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {STATS.map(({ value, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300"
                >
                  <div
                    className="text-4xl md:text-5xl font-bold text-[#c5a059] mb-2"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    {value}
                  </div>
                  <div className="h-px w-8 bg-[#c5a059]/40 mx-auto mb-2" />
                  <div className="text-white/60 text-sm uppercase tracking-wider">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5 — RESTAURANT PREVIEW
      =================================================================== */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[320px] lg:min-h-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&q=85')" }}
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#fdfaf1] flex flex-col justify-center px-8 md:px-14 py-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#c5a059]" />
              <span className="text-[#c5a059] text-xs tracking-[0.3em] uppercase font-medium">Rajwada Dining</span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-4 leading-tight"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Authentic Indian Cuisine
            </h2>

            <div className="h-px w-16 bg-[#c5a059] mb-6" />

            <p className="text-gray-600 leading-relaxed mb-4">
              Our award-winning restaurant takes you on a culinary journey across India. From the rich gravies of the North to the subtle flavors of the South, every dish is a celebration of authentic recipes, fresh ingredients, and expert craftsmanship.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Experience the magic of a royal spread — tandoori delicacies, slow-cooked biryanis, and indulgent desserts, all served in an ambiance that reflects the splendor of Indore's heritage.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/menu" className="btn-primary px-6 py-2.5 text-sm">
                Explore Menu
              </Link>
              <Link to="/food-order" className="btn-dark px-6 py-2.5 text-sm">
                Order Food
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 6 — FACILITIES
      =================================================================== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Hotel Facilities"
            subtitle="World-class amenities designed to make every moment of your stay comfortable, enjoyable, and memorable."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredFacilities.map((facility) => (
              <motion.div
                key={facility.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-[#fdfaf1] border border-[#c5a059]/15 hover:border-[#c5a059]/40 transition-all duration-300 card-shadow"
              >
                <div className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm">
                  {facility.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0f1f3d] mb-1">{facility.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 text-[#c5a059] font-semibold hover:gap-4 transition-all duration-200 group"
            >
              View All Facilities
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 7 — GUEST REVIEWS
      =================================================================== */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Guest Experiences"
            subtitle="Hear from our cherished guests about their unforgettable stays at Rajwada Palace Hotel."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-[#c5a059] font-semibold hover:gap-4 transition-all duration-200 group"
            >
              Read All Reviews
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 8 — SPECIAL OFFERS
      =================================================================== */}
      <section className="section-padding bg-[#0f1f3d]">
        <div className="container-custom">
          <SectionHeader
            title="Special Offers"
            subtitle="Exclusive packages crafted for every occasion — from romantic getaways to family adventures."
            light={true}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {featuredOffers.map((offer) => (
              <motion.div
                key={offer.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${offer.color} text-white card-shadow`}
              >
                {/* Background image overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: `url('${offer.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent" />

                <div className="relative z-10 p-8">
                  {/* Tag badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#c5a059] text-white px-3 py-1 rounded-full uppercase tracking-wider">
                      <Tag className="w-3 h-3" /> {offer.tag}
                    </span>
                    <span className="text-5xl font-black text-white/20 leading-none">
                      {offer.discount}%<span className="text-xl">OFF</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                    {offer.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-1">{offer.subtitle}</p>

                  <div className="flex items-baseline gap-3 my-4">
                    <span className="text-3xl font-black">{formatPrice(offer.finalPrice)}</span>
                    <span className="text-white/50 line-through text-lg">{formatPrice(offer.originalPrice)}</span>
                  </div>

                  <p className="text-white/75 text-sm leading-relaxed mb-6">{offer.description}</p>

                  {/* Includes */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {offer.includes.map((inc) => (
                      <li key={inc} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 bg-white text-[#0f1f3d] font-bold px-6 py-2.5 rounded-xl hover:bg-[#c5a059] hover:text-white transition-all duration-200 text-sm"
                  >
                    Book This Offer
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 text-[#c5a059] font-semibold hover:gap-4 transition-all duration-200 group"
            >
              View All Offers
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 9 — GALLERY PREVIEW
      =================================================================== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Our Gallery"
            subtitle="A visual journey through the splendor and grandeur of Rajwada Palace Hotel."
          />

          {/* Masonry-style grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {galleryPreview.map((item, idx) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                  idx === 0 ? 'row-span-2' : ''
                }`}
                style={{ minHeight: idx === 0 ? '360px' : '170px' }}
                onClick={() => setLightbox({ image: item.image, title: item.title })}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-center px-2">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/gallery" className="btn-primary px-8 py-3">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 10 — NEWSLETTER + LOCATION
      =================================================================== */}
      <section className="section-padding bg-[#fdfaf1]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Newsletter + Contact */}
            <div>
              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-10 bg-[#c5a059]" />
                  <span className="text-[#c5a059] text-xs tracking-[0.3em] uppercase font-medium">Newsletter</span>
                </div>
                <h2
                  className="text-3xl font-bold text-[#0f1f3d] mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Stay Updated
                </h2>
                <div className="h-px w-16 bg-[#c5a059] mb-4" />
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                  Subscribe to receive exclusive offers, seasonal packages, and updates from Rajwada Palace Hotel directly in your inbox.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="input-field flex-1"
                    required
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="btn-primary px-6 py-3 text-sm whitespace-nowrap disabled:opacity-70"
                  >
                    {subscribing ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-5"
              >
                <h3 className="text-lg font-bold text-[#0f1f3d]" style={{ fontFamily: 'Cinzel, serif' }}>
                  Contact Us
                </h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0f1f3d] text-[#c5a059] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f1f3d]">Address</p>
                    <p className="text-gray-500 text-sm">Near Rajwada Palace, Old Palasia, Indore, Madhya Pradesh 452001, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0f1f3d] text-[#c5a059] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f1f3d]">Phone</p>
                    <a href="tel:+917312345678" className="text-gray-500 text-sm hover:text-[#c5a059] transition-colors">
                      +91 731 234 5678
                    </a>
                    <br />
                    <a href="tel:+918005678901" className="text-gray-500 text-sm hover:text-[#c5a059] transition-colors">
                      +91 800 567 8901
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0f1f3d] text-[#c5a059] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f1f3d]">Email</p>
                    <a href="mailto:reservations@rajwadapalace.in" className="text-gray-500 text-sm hover:text-[#c5a059] transition-colors">
                      reservations@rajwadapalace.in
                    </a>
                    <br />
                    <a href="mailto:info@rajwadapalace.in" className="text-gray-500 text-sm hover:text-[#c5a059] transition-colors">
                      info@rajwadapalace.in
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden card-shadow min-h-[380px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.9563456789012!2d75.85701!3d22.71888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96b54d72d0b59816!2sRajwada%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rajwada Palace Hotel Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          LIGHTBOX MODAL
      =================================================================== */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-white/80 text-sm mt-3">{lightbox.title}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#c5a059] hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
