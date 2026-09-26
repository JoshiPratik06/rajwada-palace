import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { usePageTitle } from '../hooks/index.js';
import { facilitiesData } from '../data/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const categories = [
  {
    name: 'Comfort & Stay',
    subtitle: 'Everything you need for a perfect rest',
    color: '#0f1f3d',
    ids: [1, 5, 11, 13, 10, 12],
  },
  {
    name: 'Dining & Wellness',
    subtitle: 'Nourish body and soul',
    color: '#c5a059',
    ids: [3, 4, 7, 6, 2],
  },
  {
    name: 'Business & Events',
    subtitle: 'World-class venues for every occasion',
    color: '#1a3260',
    ids: [8, 9, 14],
  },
];

export default function Facilities() {
  usePageTitle('Facilities');

  return (
    <div className="bg-[#fdfaf1] min-h-screen">
      {/* Hero Banner */}
      <section
        className="relative h-[420px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0f1f3d]/75" />
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c5a059] font-medium tracking-[0.3em] uppercase text-sm mb-4"
          >
            Premium Amenities
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-6xl font-bold text-white font-[Cinzel,serif] mb-4"
          >
            World-Class Facilities
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] w-24 bg-[#c5a059] mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-gray-300 max-w-xl mx-auto"
          >
            Every facility at JoshiWada is designed to elevate your experience and ensure your comfort, convenience, and joy.
          </motion.p>
        </div>
      </section>

      {/* Quick Overview Bar */}
      <section className="bg-[#0f1f3d] py-5">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {facilitiesData.map((f) => (
              <span key={f.id} className="text-gray-400 text-sm flex items-center gap-1.5">
                <span>{f.icon}</span>
                <span>{f.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categorized Facilities */}
      {categories.map((cat, ci) => {
        const items = facilitiesData.filter((f) => cat.ids.includes(f.id));
        return (
          <section
            key={ci}
            className={`section-padding ${ci % 2 === 1 ? 'bg-white' : 'bg-[#fdfaf1]'}`}
          >
            <div className="container-custom">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-10"
              >
                <div
                  className="inline-block px-4 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.name}
                </div>
                <h2 className="text-3xl font-bold text-[#0f1f3d] font-[Cinzel,serif] mb-2">{cat.name}</h2>
                <p className="text-gray-500">{cat.subtitle}</p>
                <div className="h-[2px] w-12 bg-[#c5a059] mt-4" />
              </motion.div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {items.map((facility) => (
                  <motion.div
                    key={facility.id}
                    variants={fadeUp}
                    whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(197,160,89,0.15)' }}
                    className="bg-white rounded-2xl p-7 border border-amber-100 hover:border-[#c5a059]/50 transition-all duration-300 group card-shadow"
                  >
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {facility.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#0f1f3d] mb-3">{facility.name}</h3>
                    <div className="h-[2px] w-8 bg-[#c5a059] mb-3 group-hover:w-16 transition-all duration-300" />
                    <p className="text-gray-500 text-sm leading-relaxed">{facility.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* Highlights Strip */}
      <section className="bg-[#0f1f3d] py-16">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white font-[Cinzel,serif] mb-3">Why Choose JoshiWada?</h2>
            <div className="h-[2px] w-16 bg-[#c5a059] mx-auto" />
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              'All 14 premium facilities under one roof',
              '24/7 concierge and front desk service',
              'Award-winning spa and wellness centre',
              'Rooftop infinity pool with city panorama',
              'State-of-the-art conference and banquet halls',
              'Complimentary high-speed Wi-Fi throughout',
            ].map((point, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3 text-gray-300"
              >
                <CheckCircle className="text-[#c5a059] shrink-0" size={20} />
                <span className="text-sm">{point}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#fdfaf1]">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3260] rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="relative z-10">
              <p className="text-[#c5a059] font-medium tracking-widest uppercase text-sm mb-3">Ready to Experience?</p>
              <h2 className="text-4xl font-bold text-white font-[Cinzel,serif] mb-4">Plan Your Visit</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Immerse yourself in a world where every facility is a masterpiece and every service a memory. Book your stay at JoshiWada today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/booking" className="btn-primary inline-flex items-center gap-2">
                  Book Now <ArrowRight size={18} />
                </Link>
                <Link to="/rooms" className="btn-secondary inline-flex items-center gap-2">
                  Browse Rooms
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
