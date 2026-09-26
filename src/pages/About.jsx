import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Users, Star, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { usePageTitle } from '../hooks/index.js';
import { galleryData } from '../data/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const stats = [
  { label: 'Years of Excellence', value: '15', icon: Clock },
  { label: 'Rooms Served', value: '500+', icon: Star },
  { label: 'Happy Guests', value: '10,000+', icon: Users },
  { label: 'Awards Won', value: '50+', icon: Award },
];

const team = [
  { name: 'Vikram Holkar', role: 'Managing Director', initials: 'VH', color: '#0f1f3d', bio: 'A visionary hotelier with 25 years of experience, Vikram leads JoshiWada with a deep respect for heritage and a passion for world-class service.' },
  { name: 'Priya Sharma', role: 'Executive Chef', initials: 'PS', color: '#c5a059', bio: 'Trained at Le Cordon Bleu and ITC hotels, Chef Priya crafts culinary experiences that blend royal Indian traditions with modern gastronomy.' },
  { name: 'Rajan Mehta', role: 'Head of Operations', initials: 'RM', color: '#0f1f3d', bio: 'With operational expertise across five-star properties, Rajan ensures every guest experience at JoshiWada runs with seamless precision.' },
  { name: 'Ananya Kapoor', role: 'Spa Director', initials: 'AK', color: '#c5a059', bio: 'An Ayurveda practitioner and wellness expert, Ananya curates holistic spa journeys inspired by ancient royal rituals of Madhya Pradesh.' },
];

const awards = [
  { title: 'Best Heritage Hotel 2023', org: 'India Tourism Awards' },
  { title: 'TripAdvisor Excellence 2024', org: 'TripAdvisor' },
  { title: 'Best Indian Restaurant 2023', org: 'National Restaurant Awards' },
  { title: 'Luxury Spa of the Year 2023', org: 'Condé Nast Traveller' },
  { title: 'Top Employer Award 2024', org: 'Great Place to Work' },
];

const values = [
  { icon: '👑', title: 'Royal Heritage', desc: 'Inspired by the royal heritage of India, every corner of JoshiWada pays homage to rich cultural and architectural traditions. We preserve tradition while delivering modern luxury.' },
  { icon: '🍽️', title: 'Culinary Excellence', desc: 'Our kitchens celebrate India\'s diverse food culture — from age-old Indori street recipes to grand Mughal banquet feasts. Every dish is crafted with love, local produce, and culinary mastery.' },
  { icon: '🤝', title: 'Guest First', desc: 'Every decision we make starts and ends with our guests. We believe that extraordinary hospitality is not a service but an art form, and our team dedicates itself to making every moment special.' },
];

const photoItems = galleryData.slice(0, 3);

export default function About() {
  usePageTitle('Our Story');

  return (
    <div className="bg-[#fdfaf1] min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[420px] bg-[#0f1f3d] flex items-center justify-center overflow-hidden">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c5a059] font-medium tracking-[0.3em] uppercase text-sm mb-4"
          >
            Est. 2009
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-6xl font-bold text-white font-[Cinzel,serif] mb-4"
          >
            Our Story
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] w-24 bg-[#c5a059] mx-auto"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[#c5a059] font-medium tracking-widest uppercase text-sm mb-3">Heritage & Legacy</p>
            <h2 className="text-4xl font-bold text-[#0f1f3d] font-[Cinzel,serif] mb-6 leading-tight">
              A Palace Born from<br />Royal Inspiration
            </h2>
            <div className="h-[2px] w-16 bg-[#c5a059] mb-6" />
            <p className="text-gray-600 leading-relaxed mb-5">
              Founded in 2009, JoshiWada was conceived as a tribute to the grandeur, culture, and warmth of Pune. Located in Shivajinagar, our hotel brings together the city's rich heritage and the comforts of a modern luxury stay.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              Our founders envisioned a space where the opulence of Maratha royalty meets the comfort of modern luxury — where every guest is treated not as a visitor, but as a member of the royal family. From the hand-carved marble interiors to the gold-leaf accents that adorn our hallways, every detail at JoshiWada celebrates beauty, art, and hospitality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Over 15 years, we have grown from a boutique heritage hotel into one of Pune's most celebrated destinations — yet our founding philosophy remains unchanged: to offer every guest an experience worthy of royalty.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: 'Our Mission', text: 'To deliver an unmatched hospitality experience rooted in Indian culture, royal heritage, and genuine warmth — making every guest\'s stay a treasured memory.' },
              { label: 'Our Vision', text: 'To be the most celebrated heritage luxury hotel in Central India, recognized globally for authenticity, culinary excellence, and exceptional guest care.' },
              { label: 'Our Promise', text: 'From the moment you arrive to the moment you depart, we commit to anticipating your needs, exceeding your expectations, and leaving you with a deep desire to return.' },
              { label: 'Our Culture', text: 'We are a team of passionate hospitality professionals who believe that the true luxury is not in things, but in moments — and we dedicate ourselves to crafting those moments daily.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-xl p-5 card-shadow border border-amber-100"
              >
                <div className="h-[3px] w-10 bg-[#c5a059] mb-3" />
                <h3 className="font-bold text-[#0f1f3d] text-sm uppercase tracking-wider mb-2">{item.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0f1f3d] py-14">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center"
              >
                <s.icon className="text-[#c5a059] mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-white font-[Cinzel,serif] mb-1">{s.value}</div>
                <div className="text-gray-400 text-sm tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Management Team */}
      <section className="section-padding container-custom">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#c5a059] font-medium tracking-widest uppercase text-sm mb-3">The People Behind the Palace</p>
          <h2 className="section-title">Our Leadership Team</h2>
          <div className="gold-line" />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 text-center card-shadow border border-amber-50 hover:border-[#c5a059] transition-all duration-300"
            >
              <div
                className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                style={{ backgroundColor: member.color }}
              >
                {member.initials}
              </div>
              <h3 className="font-bold text-[#0f1f3d] text-lg mb-1 font-[Cinzel,serif]">{member.name}</h3>
              <p className="text-[#c5a059] text-sm font-medium tracking-wide mb-4">{member.role}</p>
              <div className="h-[1px] w-12 bg-amber-200 mx-auto mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Awards Section */}
      <section className="section-padding bg-[#0f1f3d]">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#c5a059] font-medium tracking-widest uppercase text-sm mb-3">Recognized Excellence</p>
            <h2 className="text-4xl font-bold text-white font-[Cinzel,serif] mb-4">Awards & Honours</h2>
            <div className="h-[2px] w-16 bg-[#c5a059] mx-auto" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          >
            {awards.map((award, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border border-[#c5a059] rounded-xl p-6 text-center hover:bg-[#c5a059]/10 transition-all duration-300 group"
              >
                <Award className="text-[#c5a059] mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-white font-semibold text-sm mb-2 leading-tight">{award.title}</h3>
                <p className="text-gray-400 text-xs">{award.org}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding container-custom">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#c5a059] font-medium tracking-widest uppercase text-sm mb-3">What We Stand For</p>
          <h2 className="section-title">Our Core Values</h2>
          <div className="gold-line" />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 card-shadow text-center border border-amber-50 hover:border-[#c5a059]/40 transition-all duration-300"
            >
              <div className="text-5xl mb-5">{v.icon}</div>
              <h3 className="text-2xl font-bold text-[#0f1f3d] font-[Cinzel,serif] mb-4">{v.title}</h3>
              <div className="h-[2px] w-12 bg-[#c5a059] mx-auto mb-4" />
              <p className="text-gray-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Photo Section */}
      <section className="section-padding bg-[#fdfaf1]">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[#c5a059] font-medium tracking-widest uppercase text-sm mb-3">A Glimpse of JoshiWada</p>
            <h2 className="section-title">Through Our Lens</h2>
            <div className="gold-line" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {photoItems.map((photo, i) => (
              <motion.div
                key={photo.id}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl h-64 group cursor-pointer"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-semibold text-sm">{photo.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link to="/gallery" className="btn-primary inline-flex items-center gap-2">
              View Full Gallery <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0f1f3d] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-custom text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[#c5a059] tracking-widest uppercase text-sm mb-3">Experience Royal Hospitality</p>
            <h2 className="text-4xl font-bold text-white font-[Cinzel,serif] mb-6">Begin Your Royal Journey</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Every stay at JoshiWada is a chapter in a story of luxury, heritage, and warmth. Let us write yours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="btn-primary inline-flex items-center gap-2">
                Book Your Stay <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
