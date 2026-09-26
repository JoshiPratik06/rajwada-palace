import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  MapPin, Phone, Mail, Clock,
  Send, CheckCircle,
} from 'lucide-react';
import { Facebook, Instagram, Twitter, Youtube } from '../components/SocialIcons';
import { usePageTitle } from '../hooks/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const subjectOptions = [
  'Room Inquiry',
  'Food Order',
  'Event Booking',
  'Complaint',
  'Other',
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  usePageTitle('Contact Us');

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.trim()) errs.email = 'Email address is required.';
    else if (!emailRegex.test(form.email)) errs.email = 'Please enter a valid email address.';
    if (!form.phone.trim()) errs.phone = 'Phone number is required.';
    if (!form.subject) errs.subject = 'Please select a subject.';
    if (!form.message.trim()) errs.message = 'Message cannot be empty.';
    else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm(initialForm);
      toast.success('Your message has been sent! We will get back to you within 24 hours.', {
        duration: 5000,
        icon: '📨',
      });
    }, 1500);
  };

  return (
    <div className="bg-[#fdfaf1] min-h-screen">
      {/* Hero */}
      <section className="relative h-[380px] bg-[#0f1f3d] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[#0f1f3d]/85" />
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c5a059] font-medium tracking-[0.3em] uppercase text-sm mb-4"
          >
            We're Here For You
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-6xl font-bold text-white font-[Cinzel,serif] mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] w-24 bg-[#c5a059] mx-auto"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[#c5a059] font-medium tracking-widest uppercase text-sm mb-3">Send a Message</p>
            <h2 className="text-3xl font-bold text-[#0f1f3d] font-[Cinzel,serif] mb-2">Write to Us</h2>
            <div className="h-[2px] w-12 bg-[#c5a059] mb-8" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
              >
                <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
                <p className="text-green-600 mb-6">
                  Your message has been received. A member of our team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Vikram Sharma"
                    className={`input-field ${errors.name ? 'border-red-400 focus:border-red-400' : ''}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`input-field ${errors.subject ? 'border-red-400' : ''}`}
                  >
                    <option value="">Select a subject…</option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us how we can assist you…"
                    className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  <p className="text-gray-400 text-xs mt-1">{form.message.length} / 500 characters</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <p className="text-[#c5a059] font-medium tracking-widest uppercase text-sm mb-3">Hotel Information</p>
              <h2 className="text-3xl font-bold text-[#0f1f3d] font-[Cinzel,serif] mb-2">Find Us</h2>
              <div className="h-[2px] w-12 bg-[#c5a059] mb-8" />
            </motion.div>

            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: 'Address',
                  lines: ['Shivajinagar, Pune,', 'Maharashtra 411005, India'],
                },
                {
                  icon: Phone,
                  label: 'Main Reservations',
                  lines: ['+91 20 2550 0000'],
                },
                {
                  icon: Phone,
                  label: 'Front Desk (24/7)',
                  lines: ['+91 20 2550 0001'],
                },
                {
                  icon: Phone,
                  label: 'Emergency',
                  lines: ['+91 20 2550 0002'],
                },
                {
                  icon: Mail,
                  label: 'Email',
                  lines: ['stay@joshiwada.com'],
                },
                {
                  icon: Clock,
                  label: 'Check-in / Check-out',
                  lines: ['Check-in: 2:00 PM', 'Check-out: 11:00 AM'],
                },
              ].map((info, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 bg-white p-5 rounded-xl border border-amber-100 card-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0f1f3d] flex items-center justify-center shrink-0">
                    <info.icon className="text-[#c5a059]" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0f1f3d] text-sm mb-0.5">{info.label}</p>
                    {info.lines.map((line, li) => (
                      <p key={li} className="text-gray-500 text-sm">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div variants={fadeUp} className="mt-6">
              <p className="text-[#0f1f3d] font-semibold text-sm mb-3 uppercase tracking-wider">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
                  { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
                  { icon: Twitter, label: 'Twitter / X', color: 'hover:bg-black' },
                  { icon: Youtube, label: 'YouTube', color: 'hover:bg-red-600' },
                ].map((social) => (
                  <button
                    key={social.label}
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-full bg-[#0f1f3d] ${social.color} flex items-center justify-center transition-all duration-300 group`}
                  >
                    <social.icon className="text-[#c5a059] group-hover:text-white" size={18} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="pb-16 container-custom">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-amber-100"
          style={{ height: '420px' }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.986877993437!2d73.8447!3d18.5314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0792d4b9b9d%3A0xa621532168d1f2b6!2sShivajinagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="JoshiWada Palace Hotel Location"
          />
        </motion.div>
      </section>
    </div>
  );
}
