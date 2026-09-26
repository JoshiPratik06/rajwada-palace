import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ShoppingCart, X, ChevronDown } from 'lucide-react';
import { foodData, foodCategories } from '../data/index.js';
import { useCart } from '../context/CartContext';
import { useDebounce, usePageTitle, useLockBodyScroll } from '../hooks/index.js';
import FoodCard from '../components/FoodCard';
import Cart from '../components/Cart';

/* ─── Sort options ─── */
const SORT_OPTIONS = [
  { id: 'popular', label: 'Popular First' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
];

const VEG_FILTERS = [
  { id: 'all', label: 'All', emoji: '🍽️' },
  { id: 'veg', label: 'Veg Only', emoji: '🟢' },
  { id: 'nonveg', label: 'Non-Veg Only', emoji: '🔴' },
];

const Restaurant = () => {
  usePageTitle('Restaurant & Dining');

  /* ── Filter State ── */
  const [activeCategory, setActiveCategory] = useState('all');
  const [vegFilter, setVegFilter] = useState('all');
  const [searchRaw, setSearchRaw] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  /* ── Debounced search ── */
  const searchQuery = useDebounce(searchRaw, 300);

  const { itemCount, isCartOpen, setIsCartOpen } = useCart();

  /* ── Lock scroll when cart open on mobile ── */
  useLockBodyScroll(isCartOpen);

  /* ── Filtered + Sorted data ── */
  const filteredItems = useMemo(() => {
    let list = [...foodData];

    // Category
    if (activeCategory !== 'all') {
      list = list.filter(item => item.category === activeCategory);
    }

    // Veg/Non-veg
    if (vegFilter === 'veg') {
      list = list.filter(item => item.type === 'veg');
    } else if (vegFilter === 'nonveg') {
      list = list.filter(item => item.type === 'nonveg');
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [activeCategory, vegFilter, searchQuery, sortBy]);

  const activeSortLabel = SORT_OPTIONS.find(s => s.id === sortBy)?.label;

  return (
    <div className="min-h-screen bg-[#fdfaf1]">
      {/* ── Hero ── */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
          alt="Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1f3d]/70 via-[#0f1f3d]/50 to-[#0f1f3d]/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-center px-4"
        >
          <p className="text-[#c5a059] text-sm font-semibold tracking-[4px] uppercase mb-3">
            Rajwada Palace Hotel
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Royal Dining Experience
          </h1>
          <div className="h-0.5 w-20 bg-[#c5a059] mx-auto mb-4" />
          <p className="text-gray-200 max-w-xl mx-auto text-sm md:text-base">
            Savour the finest authentic Indian cuisine, lovingly prepared by our award-winning chefs
            using age-old royal recipes and the freshest seasonal ingredients.
          </p>
        </motion.div>
      </section>

      {/* ── Sticky Filters Bar ── */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-gray-200 shadow-sm">
        {/* Category Pills Row */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 px-4 py-3 min-w-max">
            {foodCategories.map(cat => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                  activeCategory === cat.id
                    ? 'bg-[#0f1f3d] text-white border-[#0f1f3d]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#c5a059] hover:text-[#c5a059]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search + Veg Toggle + Sort Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 px-4 pb-3">
          {/* Search */}
          <div className="relative flex-1 w-full sm:w-auto">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchRaw}
              onChange={e => setSearchRaw(e.target.value)}
              placeholder="Search dishes…"
              className="w-full sm:w-64 pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] bg-gray-50"
            />
            {searchRaw && (
              <button
                onClick={() => setSearchRaw('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Veg Filter */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            {VEG_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setVegFilter(f.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  vegFilter === f.id
                    ? f.id === 'veg'
                      ? 'bg-green-600 text-white'
                      : f.id === 'nonveg'
                      ? 'bg-red-600 text-white'
                      : 'bg-[#0f1f3d] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{f.emoji}</span>
                <span className="hidden sm:inline">{f.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(v => !v)}
              className="flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:border-[#c5a059] transition-colors bg-white"
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">{activeSortLabel}</span>
              <span className="sm:hidden">Sort</span>
              <ChevronDown size={14} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-10 py-1 overflow-hidden"
                >
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => { setSortBy(opt.id); setShowSortDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === opt.id
                          ? 'bg-[#0f1f3d]/5 text-[#0f1f3d] font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#b08a44] text-white rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer shrink-0 ml-auto shadow-sm"
            aria-label={`Open Cart (${itemCount} items)`}
          >
            <ShoppingCart size={16} />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="bg-[#0f1f3d] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container-custom py-8 pb-24">
        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            Showing{' '}
            <span className="font-semibold text-[#0f1f3d]">{filteredItems.length}</span>{' '}
            {filteredItems.length === 1 ? 'item' : 'items'}
            {activeCategory !== 'all' && (
              <span className="ml-1">
                in <span className="text-[#c5a059] font-medium">{foodCategories.find(c => c.id === activeCategory)?.name}</span>
              </span>
            )}
          </p>
          {(activeCategory !== 'all' || vegFilter !== 'all' || searchRaw) && (
            <button
              onClick={() => { setActiveCategory('all'); setVegFilter('all'); setSearchRaw(''); }}
              className="text-xs text-[#c5a059] hover:text-[#b08a44] font-semibold flex items-center gap-1"
            >
              <X size={12} /> Clear Filters
            </button>
          )}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center gap-4"
          >
            <div className="text-6xl">🍽️</div>
            <h3 className="text-xl font-bold text-[#0f1f3d]">No dishes found</h3>
            <p className="text-gray-400 max-w-xs">
              Try adjusting your filters or search term.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setVegFilter('all'); setSearchRaw(''); }}
              className="btn-secondary text-sm px-5 py-2"
            >
              Show All Items
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <FoodCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ── Cart Sidebar ── */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Restaurant;
