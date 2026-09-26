import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Tag, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { usePageTitle } from '../hooks/index.js';
import { offersData } from '../data/index.js';
import { formatPrice, formatDate } from '../utils/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const faqs = [
  {
    q: 'Can I modify or cancel my offer booking?',
    a: 'Yes, modifications and cancellations are accepted up to 48 hours before check-in without any charge. Cancellations within 48 hours may incur one-night\'s room charge as per our policy.',
  },
  {
    q: 'Are the offer prices per room or per person?',
    a: 'All listed prices are per room per stay (for the specified number of nights), not per person. The includes listed are for the room unless specified otherwise.',
  },
  {
    q: 'What are the check-in and check-out times?',
    a: 'Standard check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be requested at an additional cost, subject to availability.',
  },
  {
    q: 'Can I combine multiple offers?',
    a: 'Offers cannot be combined or used in conjunction with other promotions. Only one offer can be applied per booking. We recommend choosing the offer that best fits your travel needs.',
  },
  {
    q: 'Is breakfast always included in offers?',
    a: 'Breakfast inclusion varies by offer. Please read the "Includes" section of each offer card carefully. Where not mentioned, breakfast can be added at ₹699 per person per day.',
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${open ? 'border-[#c5a059]' : 'border-amber-100'}`}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-amber-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#0f1f3d] pr-4">{faq.q}</span>
        {open ? (
          <ChevronUp className="text-[#c5a059] shrink-0" size={20} />
        ) : (
          <ChevronDown className="text-gray-400 shrink-0" size={20} />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p className="text-gray-500 leading-relaxed text-sm">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function Offers() {
  usePageTitle('Special Offers');

  return (
    <div className="bg-[#fdfaf1] min-h-screen">
      {/* Hero */}
      <section className="relative h-[400px] bg-[#0f1f3d] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551882547-ff40c4a49f5e?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1f3d]/80 to-[#0f1f3d]/90" />
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c5a059] font-medium tracking-[0.3em] uppercase text-sm mb-4"
          >
            Exclusive Deals
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-6xl font-bold text-white font-[Cinzel,serif] mb-4"
          >
            Special Offers & Packages
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
            className="text-gray-300 max-w-lg mx-auto"
          >
            Exceptional value for an extraordinary stay. Choose from our curated packages designed to make every moment count.
          </motion.p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="section-padding container-custom">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {offersData.map((offer, idx) => {
            const isFeatured = idx === 0;
            return (
              <motion.div
                key={offer.id}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 30px 60px rgba(15,31,61,0.2)' }}
                className={`relative bg-white rounded-2xl overflow-hidden card-shadow border border-amber-100 flex flex-col ${
                  isFeatured ? 'md:col-span-2 xl:col-span-1 ring-2 ring-[#c5a059]' : ''
                }`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-70`}
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-[#c5a059] text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {offer.discount}% OFF
                  </div>
                  {/* Tag Badge */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Tag size={12} />
                    {offer.tag}
                  </div>
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute bottom-4 left-4 bg-[#c5a059] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      ⭐ Featured Offer
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0f1f3d] font-[Cinzel,serif] mb-1">{offer.title}</h3>
                  <p className="text-[#c5a059] text-sm font-medium mb-3">{offer.subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{offer.description}</p>

                  {/* Includes */}
                  <div className="mb-5">
                    <p className="text-[#0f1f3d] font-semibold text-sm mb-2 uppercase tracking-wider">Package Includes:</p>
                    <ul className="space-y-1.5">
                      {offer.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check size={14} className="text-[#c5a059] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gray-400 text-sm line-through">{formatPrice(offer.originalPrice)}</span>
                    <span className="text-2xl font-bold text-[#0f1f3d] font-[Cinzel,serif]">{formatPrice(offer.finalPrice)}</span>
                  </div>

                  {/* Valid Till */}
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-5">
                    <Clock size={13} />
                    <span>Valid till: {formatDate(offer.validTill)}</span>
                  </div>

                  <Link
                    to="/booking"
                    className="mt-auto btn-primary text-center inline-flex items-center justify-center gap-2"
                  >
                    Book This Offer <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#c5a059] font-medium tracking-widest uppercase text-sm mb-3">Have Questions?</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="gold-line" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FAQItem faq={faq} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <p className="text-gray-500 mb-4">Still have questions? We're here to help.</p>
            <Link to="/contact" className="btn-dark inline-flex items-center gap-2">
              Contact Us <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
