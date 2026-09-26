import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  MapPin, Phone, Mail, Clock,
  Send,
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
    setSubmitted(true);
    toast('Your message is ready to send using your email app.', { icon: '✉️' });
  };

  const emailSubject = encodeURIComponent(form.subject);
  const emailBody = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
  );
  const emailHref = `mailto:joshiwadapalace@gmail.com?subject=${emailSubject}&body=${emailBody}`;

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
                role="status"
                className="bg-[#f5f0e8] border border-[#c5a059]/40 rounded-2xl p-6 sm:p-10 text-center"
              >
                <Mail className="text-[#a27d3f] mx-auto mb-4" size={44} />
                <h3 className="text-2xl font-bold text-[#0f1f3d] mb-2">Your message is ready</h3>
                <p className="text-gray-600 mb-6">
                  This demo does not send messages to a server. Open your email app to send your message to JoshiWada.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a href={emailHref} className="btn-primary">Open Email App</a>
                  <button type="button" onClick={() => setSubmitted(false)} className="btn-secondary">Edit Message</button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Vikram Sharma"
                    className={`input-field ${errors.name ? 'border-red-400 focus:border-red-400' : ''}`}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && <p id="contact-name-error" role="alert" className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && <p id="contact-email-error" role="alert" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    />
                    {errors.phone && <p id="contact-phone-error" role="alert" className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`input-field ${errors.subject ? 'border-red-400' : ''}`}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  >
                    <option value="">Select a subject…</option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.subject && <p id="contact-subject-error" role="alert" className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us how we can assist you…"
                    className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                    maxLength={500}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-count'}
                  />
                  {errors.message && <p id="contact-message-error" role="alert" className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  <p id="contact-message-count" className="text-gray-500 text-xs mt-1" aria-live="polite">{form.message.length} / 500 characters</p>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Prepare Email
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
                  lines: ['Shivajinagar, Pune,', 'Maharashtra, India'],
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  lines: ['+91 8485214578'],
                },
                {
                  icon: Mail,
                  label: 'Email',
                  lines: ['joshiwadapalace@gmail.com'],
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
            src="https://maps.google.com/maps?q=Shivajinagar%2C%20Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="JoshiWada location in Shivajinagar, Pune"
          />
        </motion.div>
      </section>
    </div>
  );
}
