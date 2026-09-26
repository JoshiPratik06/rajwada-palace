import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  Filter,
  PlusCircle,
  X,
  Sparkles,
  Award,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { reviewsData as initialReviews } from '../data/index.js';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { usePageTitle, useLocalStorage } from '../hooks/index.js';

const TRIP_TYPES = [
  'All',
  'Family Visit',
  'Couple Getaway',
  'Business Travel',
  'Solo Travel',
  'Weekend Getaway',
  'Local Guest',
];

const ROOM_OPTIONS = [
  'Deluxe Room',
  'Super Deluxe Room',
  'Luxury Room',
  'Premium Room',
  'Executive Room',
  'Family Room',
  'Suite',
  'Presidential Suite',
  'Standard Room',
  'Restaurant Dining',
];

export default function Reviews() {
  usePageTitle('Guest Chronicles & Reviews');

  // Stored reviews in localStorage + initial fallback
  const [reviews, setReviews] = useLocalStorage('hotel_guest_reviews', initialReviews);
  const [selectedRating, setSelectedRating] = useState(0); // 0 = all
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'highest' | 'lowest'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helpfulMap, setHelpfulMap] = useLocalStorage('reviews_helpful_map', {});

  // New review form state
  const [form, setForm] = useState({
    name: '',
    location: '',
    type: 'Family Visit',
    room: 'Deluxe Room',
    rating: 5,
    text: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Overall Statistics Calculation
  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) return { avg: 5.0, count: 0, counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / total).toFixed(1);

    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
      counts[rounded] = (counts[rounded] || 0) + 1;
    });

    return { avg, total, counts };
  }, [reviews]);

  // Filtered & Sorted Reviews
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        if (selectedRating > 0 && Math.round(r.rating) !== selectedRating) return false;
        if (selectedType !== 'All' && r.type !== selectedType) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'highest') return b.rating - a.rating;
        if (sortBy === 'lowest') return a.rating - b.rating;
        // Default recent: higher id first
        return (b.id || 0) - (a.id || 0);
      });
  }, [reviews, selectedRating, selectedType, sortBy]);

  // Handle Helpful Upvote
  const handleHelpful = (id) => {
    if (helpfulMap[id]) {
      toast('You already marked this review as helpful', { icon: 'ℹ️' });
      return;
    }
    setHelpfulMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    toast.success('Thank you for your feedback!', { icon: '👍' });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      toast.error('Please fill in your name and review details');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const initials = form.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const newReview = {
        id: Date.now(),
        name: form.name.trim(),
        avatar: initials || 'GJ',
        location: form.location.trim() || 'Guest',
        type: form.type,
        rating: form.rating,
        date: new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(new Date()),
        text: form.text.trim(),
        room: form.room,
        verified: true,
      };

      setReviews([newReview, ...reviews]);
      setSubmitting(false);
      setIsModalOpen(false);
      setForm({
        name: '',
        location: '',
        type: 'Family Visit',
        room: 'Deluxe Room',
        rating: 5,
        text: '',
      });
      toast.success('Thank you! Your review has been published.', { icon: '🎉' });
    }, 600);
  };

  return (
    <div className="bg-[#fdfaf1] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[360px] md:h-[420px] bg-[#0f1f3d] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d] via-[#0f1f3d]/70 to-transparent" />

        <div className="relative z-10 max-w-4xl px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#c5a059] uppercase tracking-[4px] text-xs md:text-sm font-semibold mb-3 inline-block">
              Guest Chronicles
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide font-serif">
              Voices of Grandeur
            </h1>
            <div className="gold-line" />
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Read authentic stories, experiences, and praise shared by guests who have walked
              through our corridors and embraced our royal hospitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. BREADCRUMB */}
      <div className="container-custom pt-6">
        <Breadcrumb items={[{ label: 'Guest Reviews' }]} />
      </div>

      {/* 3. REVIEWS OVERVIEW & SCORECARD */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Overall Score */}
            <div className="lg:col-span-4 text-center lg:border-r border-gray-100 lg:pr-8">
              <span className="text-6xl md:text-7xl font-bold text-[#0f1f3d] font-serif block">
                {stats.avg}
              </span>
              <div className="flex items-center justify-center gap-1 my-3 text-[#f59e0b]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={22}
                    className={s <= Math.round(stats.avg) ? 'fill-[#f59e0b]' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Based on <span className="font-bold text-gray-900">{stats.total} verified</span> reviews
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200 mt-2">
                <ShieldCheck size={14} /> 100% Genuine Guest Feedback
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary w-full shadow-md"
                >
                  <PlusCircle size={18} /> Write a Review
                </button>
              </div>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="lg:col-span-5 space-y-2.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.counts[star] || 0;
                const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <button
                    key={star}
                    onClick={() => setSelectedRating(selectedRating === star ? 0 : star)}
                    className={`w-full flex items-center gap-3 text-xs md:text-sm group hover:opacity-90 transition-all ${
                      selectedRating === star ? 'font-bold text-[#c5a059]' : 'text-gray-600'
                    }`}
                  >
                    <span className="w-14 text-left flex items-center gap-1">
                      {star} <Star size={13} className="fill-[#f59e0b] text-[#f59e0b]" />
                    </span>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c5a059] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-gray-500">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Feature Highlights */}
            <div className="lg:col-span-3 bg-[#fdfaf1] p-5 rounded-lg border border-amber-100/60 space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#0f1f3d] flex items-center gap-2">
                <Award size={16} className="text-[#c5a059]" /> Experience Ratings
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-amber-200/40">
                  <span className="text-gray-600">Heritage & Ambience</span>
                  <span className="font-bold text-[#0f1f3d]">5.0 / 5.0</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-amber-200/40">
                  <span className="text-gray-600">Royal Dining</span>
                  <span className="font-bold text-[#0f1f3d]">4.9 / 5.0</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-amber-200/40">
                  <span className="text-gray-600">Service & Hospitality</span>
                  <span className="font-bold text-[#0f1f3d]">4.9 / 5.0</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-amber-200/40">
                  <span className="text-gray-600">Cleanliness & Spa</span>
                  <span className="font-bold text-[#0f1f3d]">4.8 / 5.0</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600">Location (JoshiWada)</span>
                  <span className="font-bold text-[#0f1f3d]">5.0 / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FILTER & SORT CONTROLS */}
      <section className="container-custom pb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Trip Type Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap flex items-center gap-1 mr-1">
              <Filter size={14} /> Type:
            </span>
            {TRIP_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-[#0f1f3d] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Sort & Reset */}
          <div className="flex items-center gap-3 justify-end">
            {(selectedRating > 0 || selectedType !== 'All') && (
              <button
                onClick={() => {
                  setSelectedRating(0);
                  setSelectedType('All');
                }}
                className="text-xs text-red-600 hover:underline font-medium whitespace-nowrap"
              >
                Reset Filters
              </button>
            )}

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-gray-50 border border-gray-200 rounded-md py-2 pl-3 pr-8 text-gray-700 font-medium focus:outline-none focus:border-[#c5a059]"
              >
                <option value="recent">Most Recent First</option>
                <option value="highest">Highest Rating (5★)</option>
                <option value="lowest">Lowest Rating First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Indicator */}
        {selectedRating > 0 && (
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
            <span>Showing only {selectedRating}-star reviews</span>
            <button
              onClick={() => setSelectedRating(0)}
              className="text-[#c5a059] font-bold hover:underline"
            >
              (Show All)
            </button>
          </div>
        )}
      </section>

      {/* 5. REVIEWS GRID */}
      <section className="container-custom pb-20">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100 p-8">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-xl font-bold text-[#0f1f3d] mb-2 font-serif">No Reviews Found</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              There are no reviews matching your currently selected filters. Try choosing a different
              category or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedRating(0);
                setSelectedType('All');
              }}
              className="btn-secondary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredReviews.map((review, index) => {
                const helpfulCount = (review.id && helpfulMap[review.id]) || 0;
                return (
                  <motion.div
                    key={review.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header: Rating & Verified */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-[#f59e0b]">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={16}
                              className={s <= review.rating ? 'fill-[#f59e0b]' : 'text-gray-300'}
                            />
                          ))}
                          <span className="text-xs font-bold text-gray-700 ml-1.5">
                            {review.rating}.0
                          </span>
                        </div>

                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle size={12} /> Verified Stay
                          </span>
                        )}
                      </div>

                      {/* Room tag & Date */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3 pb-2 border-b border-gray-100">
                        <span className="font-semibold text-[#c5a059]">{review.room || 'Deluxe Room'}</span>
                        <span>{review.date || 'Recent'}</span>
                      </div>

                      {/* Review Quote Text */}
                      <p className="text-gray-700 text-sm italic leading-relaxed mb-6">
                        "{review.text}"
                      </p>
                    </div>

                    {/* Bottom Reviewer Info & Helpful */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0f1f3d] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                          {review.avatar || 'GJ'}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0f1f3d] text-sm leading-tight">
                            {review.name}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {review.location} · {review.type}
                          </span>
                        </div>
                      </div>

                      {/* Helpful Button */}
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded border transition-colors ${
                          helpfulMap[review.id]
                            ? 'bg-amber-50 text-[#c5a059] border-amber-300 font-bold'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                        title="Mark as helpful"
                      >
                        <ThumbsUp size={12} />
                        <span>{helpfulCount > 0 ? helpfulCount : 'Helpful'}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 6. CALL TO ACTION FOR BOOKING */}
      <section className="bg-[#0f1f3d] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="mx-auto text-[#c5a059] mb-4" size={36} />
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Be Part of Our Next Royal Chapter
          </h2>
          <div className="gold-line" />
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-8">
            Experience heritage architecture, curated culinary experiences, and uncompromised luxury
            in the heart of Pune.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="btn-primary">
              Book Your Experience
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-secondary text-white border-white hover:bg-white hover:text-[#0f1f3d]"
            >
              Share Your Story
            </button>
          </div>
        </div>
      </section>

      {/* 7. WRITE A REVIEW MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-200 p-6 md:p-8 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">
                  Guest Feedback
                </span>
                <h3 className="text-2xl font-bold text-[#0f1f3d] font-serif mt-1">
                  Share Your Experience
                </h3>
                <div className="w-12 h-0.5 bg-[#c5a059] mx-auto mt-2" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating Picker */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 text-center">
                    Your Rating: {form.rating} out of 5 Stars
                  </label>
                  <div className="flex items-center justify-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setForm({ ...form, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          size={28}
                          className={
                            star <= (hoverRating || form.rating)
                              ? 'fill-[#f59e0b] text-[#f59e0b]'
                              : 'text-gray-300'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field text-sm py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, India"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="input-field text-sm py-2"
                    />
                  </div>
                </div>

                {/* Trip Type & Room */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Trip Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="input-field text-sm py-2 bg-white"
                    >
                      {TRIP_TYPES.filter((t) => t !== 'All').map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Room / Experience
                    </label>
                    <select
                      value={form.room}
                      onChange={(e) => setForm({ ...form, room: e.target.value })}
                      className="input-field text-sm py-2 bg-white"
                    >
                      {ROOM_OPTIONS.map((room) => (
                        <option key={room} value={room}>
                          {room}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell future guests about your stay, the food, palace ambiance, and service..."
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    className="input-field text-sm py-2 resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary flex-1 py-2 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex-1 py-2 text-xs disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Post Review'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
