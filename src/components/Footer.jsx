import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, ArrowRight, Crown } from 'lucide-react';
import { Instagram, Facebook, Twitter, Youtube } from './SocialIcons';
import toast from 'react-hot-toast';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Our Rooms', to: '/rooms' },
  { label: 'Restaurant', to: '/restaurant' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Special Offers', to: '/offers' },
  { label: 'Guest Reviews', to: '/reviews' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const SERVICES = [
  'Luxury Room Service',
  'Fine Dining',
  'Spa & Wellness',
  'Conference Halls',
  'Airport Transfer',
  'Wedding Venue',
  'Swimming Pool',
  'Concierge Service',
];

const SOCIAL_LINKS = [
  {
    Icon: Instagram,
    href: 'https://instagram.com/rajwadapalacehotel',
    label: 'Instagram',
    color: 'hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600',
  },
  {
    Icon: Facebook,
    href: 'https://facebook.com/rajwadapalacehotel',
    label: 'Facebook',
    color: 'hover:bg-blue-600',
  },
  {
    Icon: Twitter,
    href: 'https://twitter.com/rajwadahotel',
    label: 'Twitter / X',
    color: 'hover:bg-sky-500',
  },
  {
    Icon: Youtube,
    href: 'https://youtube.com/@rajwadapalace',
    label: 'YouTube',
    color: 'hover:bg-red-600',
  },
];

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center gap-2 text-gray-400 hover:text-[#c5a059] text-sm transition-colors duration-200"
    >
      <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-[#c5a059]" />
      {children}
    </Link>
  </li>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success('🎉 Subscribed! Welcome to the Rajwada family.', {
      duration: 4000,
      style: { background: '#0f1f3d', color: '#fdfaf1', border: '1px solid #c5a059' },
    });
    setEmail('');
  };

  return (
    <footer className="bg-[#0f1f3d] text-white" role="contentinfo">
      {/* ── Top Divider ── */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />

      {/* ── Main Footer Content ── */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-12">

          {/* ── Col 1: Brand ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Crown size={20} className="text-[#c5a059]" strokeWidth={1.5} />
                <span
                  className="text-2xl font-bold tracking-[0.3em] text-[#c5a059]"
                  style={{ fontFamily: "'Cinzel', 'Palatino Linotype', serif" }}
                >
                  RAJWADA
                </span>
              </div>
              <p
                className="text-[0.55rem] tracking-[0.35em] uppercase text-gray-400 ml-7"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                PALACE HOTEL
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Experience the timeless grandeur of Rajwada Palace Hotel — where royal Malwa heritage
              meets contemporary luxury in the heart of Indore, Madhya Pradesh.
            </p>

            {/* Star rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#c5a059] text-base">★</span>
              ))}
              <span className="text-gray-400 text-xs ml-2">5-Star Luxury Hotel</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-full bg-[#1a3260] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 ${color}`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h3 className="text-white font-semibold tracking-widest text-xs uppercase mb-5">
              Quick Links
              <div className="mt-2 w-8 h-0.5 bg-[#c5a059]" />
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, to }) => (
                <FooterLink key={to} to={to}>{label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Services ── */}
          <div>
            <h3 className="text-white font-semibold tracking-widest text-xs uppercase mb-5">
              Hotel Services
              <div className="mt-2 w-8 h-0.5 bg-[#c5a059]" />
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="w-1 h-1 rounded-full bg-[#c5a059] flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact + Newsletter ── */}
          <div>
            <h3 className="text-white font-semibold tracking-widest text-xs uppercase mb-5">
              Contact Us
              <div className="mt-2 w-8 h-0.5 bg-[#c5a059]" />
            </h3>

            <ul className="space-y-4 mb-8">
              <li>
                <a
                  href="https://maps.google.com/?q=Rajwada+Circle+Indore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-[#c5a059] transition-colors duration-200 group"
                >
                  <MapPin size={16} className="text-[#c5a059] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.8} />
                  <span className="text-sm leading-snug">
                    Rajwada Circle, Indore<br />Madhya Pradesh 452002
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917312430000"
                  className="flex items-center gap-3 text-gray-400 hover:text-[#c5a059] transition-colors duration-200 group"
                >
                  <Phone size={16} className="text-[#c5a059] flex-shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.8} />
                  <span className="text-sm">+91 731 243 0000</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:stay@rajwada.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-[#c5a059] transition-colors duration-200 group"
                >
                  <Mail size={16} className="text-[#c5a059] flex-shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.8} />
                  <span className="text-sm">stay@rajwada.com</span>
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold tracking-widest text-xs uppercase mb-3">
                Newsletter
              </h4>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                Subscribe for exclusive offers, royal packages, and heritage events.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2" noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-[#1a3260] border border-[#1a3260] focus:border-[#c5a059] text-white placeholder-gray-500 text-sm px-4 py-2.5 rounded-lg outline-none transition-colors duration-200"
                  aria-label="Newsletter email"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#b08d45] text-[#0f1f3d] font-semibold text-sm tracking-wider uppercase py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0f1f3d] border-t-transparent rounded-full animate-spin" />
                      Subscribing…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Subscribe
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-[#1a3260]" />

      {/* ── Bottom Bar ── */}
      <div className="container-custom py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Rajwada Palace Hotel. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-[#c5a059] text-xs transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="text-gray-700 text-xs">|</span>
            <Link to="/terms" className="text-gray-500 hover:text-[#c5a059] text-xs transition-colors duration-200">
              Terms &amp; Conditions
            </Link>
            <span className="text-gray-700 text-xs">|</span>
            <Link to="/sitemap" className="text-gray-500 hover:text-[#c5a059] text-xs transition-colors duration-200">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
